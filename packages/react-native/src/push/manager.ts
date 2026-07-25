import messaging from "@react-native-firebase/messaging";

import { getFCMToken } from "./token";
import { requestPermission, getPermissionStatus } from "./permission";

import {
  onForegroundNotification,
  onNotificationOpened,
  onTokenRefresh,
} from "./listeners";

import { getNativeDeviceInfo } from "../utils/device";
import { Platform } from "react-native";

interface ReactNativePushManagerOptions {
  devices: {
    register: (data: any) => Promise<any>;
    unregister: (data: any) => Promise<any>;
    refreshToken: (data: any) => Promise<any>;
    heartbeat?: (data: any) => Promise<any>;
  };

  client: any;
}

export class ReactNativePushManager {
  private options: ReactNativePushManagerOptions;

  constructor(options: ReactNativePushManagerOptions) {
    this.options = options;

    this.listenForTokenRefresh();
  }

  // =========================================
  // REGISTER DEVICE
  // =========================================
  async register(metadata?: Record<string, any>) {
    const { devices } = this.options;

    console.log("📩 registering device...");

    // 1. Request permission
    await requestPermission();

    console.log("📩 permission granted");

    // 2. Get FCM token
    const token = await getFCMToken();

    console.log("📩 FCM token:", token);

    // 3. Device metadata
    const meta = await getNativeDeviceInfo();

    // 4. Register device
    const response = await devices.register({
      pushToken: token,
      provider: "FCM",
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
  // REFRESH TOKEN
  // =========================================
  async refreshToken(oldToken: string) {
    const { devices } = this.options;

    const newToken = await getFCMToken();

    await devices.refreshToken({
      oldToken,
      newToken,
    });

    return newToken;
  }
  private listenForTokenRefresh() {
    return messaging().onTokenRefresh(async (pushToken) => {
      await this.options.devices.refreshToken({
        pushToken,
        provider: "FCM",
        platform: Platform.OS.toUpperCase(),
      });
    });
  }
  // =========================================
  // TOKEN REFRESH LISTENER
  // =========================================
  onTokenRefresh(callback: (token: string) => void) {
    return onTokenRefresh(callback);
  }

  // =========================================
  // FOREGROUND LISTENER
  // =========================================
  onForeground(callback: (message: any) => void) {
    return onForegroundNotification(callback);
  }

  // =========================================
  // NOTIFICATION OPENED
  // =========================================
  onNotificationOpened(callback: (message: any) => void) {
    return onNotificationOpened(callback);
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
    if (!this.options.devices.heartbeat) return;

    return this.options.devices.heartbeat({
      pushToken,
    });
  }

  // =========================================
  // PERMISSION STATUS
  // =========================================
  async getPermissionStatus() {
    return getPermissionStatus();
  }

  // =========================================
  // CHECK SUPPORT
  // =========================================
  isSupported() {
    return true;
  }
}
