import { initializeFirebase } from "./firebase";
import { registerServiceWorker } from "./serviceWorker";
import { requestPushPermission } from "./permission";
import { generatePushToken } from "./token";
import { attachForegroundListener } from "./listeners";
import { firebaseConfig } from "../firebase.config";
import { getDeviceInfo } from "../util/deviceInfo";

interface WebPushManagerOptions {
  devices: {
    register: (data: any) => Promise<any>;
    unregister: (data: any) => Promise<any>;
    refreshToken: (data: any) => Promise<any>;
    heartbeat?: (data: any) => Promise<any>;
  };
}

export class WebPushManager {
  private options: WebPushManagerOptions;
  private getCachedToken() {
    return localStorage.getItem("nutifar_push_token");
  }

  private cacheToken(token: string) {
    localStorage.setItem("nutifar_push_token", token);
  }

  private clearCachedToken() {
    localStorage.removeItem("nutifar_push_token");
  }
  constructor(options: WebPushManagerOptions) {
    this.options = options;
  }

  // =========================================
  // Register Browser For Push
  // =========================================
  async register(metadata?: Record<string, any>) {
    const { devices } = this.options;

    // 1. Request browser permission
    await requestPushPermission();

    // 2. Initialize Firebase
    const { messaging } = initializeFirebase(firebaseConfig);

    // 3. Register service worker
    const serviceWorkerRegistration = await registerServiceWorker();

    // 4. Generate FCM token
    const token = await generatePushToken({
      messaging,
      vapidKey: firebaseConfig?.vapidKey,
      serviceWorkerRegistration,
    });
    const meta = getDeviceInfo();

    // 5. Register device in backend
    const response = await devices.register({
      pushToken: token,
      platform: "WEB",
      provider: "FCM",
      metadata: { ...meta, ...metadata },
    });

    // Cache the current token
    localStorage.setItem(
      "nutifar_push_token",
      response?.data?.nutifarToken ?? token,
    );
    localStorage.setItem("nutifar_fcm_token", token);

    return {
      token,
      response,
    };
  }

  // =========================================
  // Sync Device Registration
  // =========================================
  async syncDevice() {
    const { devices } = this.options;

    // Browser doesn't support push
    if (!this.isSupported()) {
      return {
        synced: false,
        reason: "unsupported",
      };
    }

    // User denied notifications
    if (Notification.permission !== "granted") {
      return {
        synced: false,
        reason: "permission-denied",
      };
    }

    // Initialize Firebase
    const { messaging } = initializeFirebase(firebaseConfig);

    // Register service worker
    const serviceWorkerRegistration = await registerServiceWorker();

    // Get current FCM token
    const currentToken = await generatePushToken({
      messaging,
      vapidKey: firebaseConfig?.vapidKey,
      serviceWorkerRegistration,
    });

    // Compare against cached token
    const cachedToken = localStorage.getItem("nutifar_fcm_token");
    const nutifarToken = localStorage.getItem("nutifar_push_token");

    // Already in sync
    if (cachedToken === currentToken) {
      return {
        synced: true,
        changed: false,
        token: nutifarToken,
      };
    }

    // Notify backend
    await devices.refreshToken({
      nutifarToken,
      pushToken: currentToken,
      provider: "FCM",
      platform: "WEB",
    });

    // Cache latest token
    localStorage.setItem("nutifar_fcm_token", currentToken);

    return {
      synced: true,
      changed: true,
      token: nutifarToken,
    };
  }
  // =========================================
  // Listen For Foreground Messages
  // =========================================
  async listen(callback: (payload: any) => void) {
    const { messaging } = initializeFirebase(firebaseConfig);

    return attachForegroundListener(messaging, callback);
  }

  // =========================================
  // Unregister Device
  // =========================================
  async unregister(pushToken?: string) {
    const token = pushToken ?? this.getCachedToken();

    if (!token) {
      return;
    }

    await this.options.devices.unregister({
      pushToken: token,
    });

    this.clearCachedToken();
  }
  // =========================================
  // Heartbeat / Keep Alive
  // =========================================
  async heartbeat(pushToken: string) {
    if (!this.options.devices.heartbeat) return;

    return this.options.devices.heartbeat({
      pushToken,
    });
  }

  // =========================================
  // Check Browser Support
  // =========================================
  isSupported() {
    return (
      typeof window !== "undefined" &&
      "Notification" in window &&
      "serviceWorker" in navigator
    );
  }

  // =========================================
  // Current Notification Permission
  // =========================================
  getPermissionStatus() {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return "unsupported";
    }

    return Notification.permission;
  }
}
