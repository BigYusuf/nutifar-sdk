import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import { Platform } from "react-native";

import { getExpoPushToken } from "./token";
import { requestPermission } from "./permission";
import { getExpoDeviceInfo } from "../utils/device";

interface ExpoPushManagerOptions {
  devices: {
    register: (data: any) => Promise<any>;
    unregister: (data: any) => Promise<any>;
    refreshToken: (data: any) => Promise<any>;
    heartbeat?: (data: any) => Promise<any>;
  };

  client: any;
}

export class ExpoPushManager {
  private options: ExpoPushManagerOptions;

  constructor(options: ExpoPushManagerOptions) {
    this.options = options;

    this.listenForTokenRefresh();
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

    await requestPermission();

    const token = await getExpoPushToken();

    const meta = getExpoDeviceInfo();

    const response = await devices.register({
      pushToken: token,
      provider: "EXPO",
      platform: Platform.OS.toUpperCase(),
      metadata: {
        ...meta,
        ...metadata,
      },
    });

    return {
      token,
      response,
    };
  }

  // =========================================
  // LISTEN FOR TOKEN REFRESH
  // =========================================
  private listenForTokenRefresh() {
    const { devices } = this.options;

    return Notifications.addPushTokenListener(async (token) => {
      try {
        const pushToken = token.data;

        console.log("🔄 Expo push token changed:", pushToken);

        await devices.refreshToken({
          pushToken,
          provider: "EXPO",
          platform: Platform.OS.toUpperCase(),
        });

        console.log("✅ Expo push token refreshed");
      } catch (error) {
        console.error("❌ Failed to refresh Expo push token", error);
      }
    });
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
  // HEARTBEAT
  // =========================================
  async heartbeat(pushToken: string) {
    if (!this.options.devices.heartbeat) {
      return;
    }

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
