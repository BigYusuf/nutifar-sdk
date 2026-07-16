import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

import { getExpoPushToken } from "./token";
import { requestPermission } from "./permission";
import { getExpoDeviceInfo } from "../utils/device";

interface ExpoPushManagerOptions {
  devices: {
    register: (data: any) => Promise<any>;
    // register: any;
    unregister: (data: any) => Promise<any>;
    refreshToken: (data: any) => Promise<any>;
    heartbeat?: (data: any) => Promise<any>;
  };

  client: any; // core SDK instance
}

export class ExpoPushManager {
  private options: ExpoPushManagerOptions;

  constructor(options: ExpoPushManagerOptions) {
    this.options = options;
  }

  // =========================================
  // REGISTER DEVICE
  // =========================================
  async register(metadata?: Record<string, any>) {
    const { devices } = this.options;
    console.log("📩 registering device...");
    if (!Device.isDevice) {
      throw new Error("Push notifications require a physical device");
    }

    // 1. Permission
    await requestPermission();
    console.log("📩 permission granted");
    // 2. Get Expo push token
    const token = await getExpoPushToken();
    console.log("📩 Expo push token:", token);

    const meta = getExpoDeviceInfo();

    // 3. Register device in backend
    const response = await devices.register({
      pushToken: token,
      provider: "EXPO",
      platform: Platform?.OS.toUpperCase() || "UNKNOWN",
      metadata: { ...meta, ...metadata },
    });

    return {
      token,
      response,
    };
  }

  // =========================================
  // REFRESH TOKEN
  // =========================================
  async refreshToken(oldToken: string) {
    const { devices } = this.options;

    const newToken = await getExpoPushToken();

    await devices.refreshToken({
      oldToken,
      newToken,
    });

    return newToken;
  }

  // =========================================
  // LISTEN FOR NOTIFICATIONS
  // =========================================
  listen(callback: (payload: any) => void) {
    const sub1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        callback({
          type: "received",
          data: notification,
        });
      },
    );

    const sub2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        callback({
          type: "response",
          data: response,
        });
      },
    );

    return () => {
      sub1.remove();
      sub2.remove();
    };
  }

  // =========================================
  // UNREGISTER DEVICE
  // =========================================
  async unregister(pushToken: string) {
    return this.options.devices.unregister({
      pushToken,
    });
  }

  // =========================================
  // HEARTBEAT (OPTIONAL)
  // =========================================
  async heartbeat(pushToken: string) {
    if (!this.options.devices.heartbeat) return;

    return this.options.devices.heartbeat({
      pushToken,
    });
  }

  // =========================================
  // PERMISSION STATUS
  // =========================================
  async getPermissionStatus() {
    const { status } = await Notifications.getPermissionsAsync();
    return status;
  }

  // =========================================
  // CHECK SUPPORT
  // =========================================
  isSupported() {
    return Device.isDevice;
  }
}
