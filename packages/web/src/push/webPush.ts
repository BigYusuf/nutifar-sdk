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

    return {
      token,
      response,
    };
  }

  // =========================================
  // Refresh Existing Push Token
  // =========================================
  async refreshToken(oldToken: string) {
    const { devices } = this.options;

    // 1. Initialize Firebase
    const { messaging } = initializeFirebase(firebaseConfig);

    // 2. Ensure service worker exists
    const serviceWorkerRegistration = await registerServiceWorker();

    // 3. Generate new token
    const newToken = await generatePushToken({
      messaging,
      vapidKey: firebaseConfig?.vapidKey,
      serviceWorkerRegistration,
    });

    // 4. Sync backend
    await devices.refreshToken({
      oldToken,
      newToken,
    });

    return newToken;
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
  async unregister(pushToken: string) {
    return this.options.devices.unregister({
      pushToken,
    });
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
