import messaging from "@react-native-firebase/messaging";

// Explicit any annotation to avoid leaking types from @react-native-firebase/messaging
export const fcmProvider: any = {
  // =========================================
  // GET TOKEN
  // =========================================
  async getToken() {
    await messaging().registerDeviceForRemoteMessages();

    return messaging().getToken();
  },

  // =========================================
  // REQUEST PERMISSION
  // =========================================
  async requestPermission() {
    return messaging().requestPermission();
  },

  // =========================================
  // PERMISSION STATUS
  // =========================================
  async getPermissionStatus() {
    return messaging().hasPermission();
  },

  // =========================================
  // TOKEN REFRESH
  // =========================================
  onTokenRefresh(callback: (token: string) => void) {
    return messaging().onTokenRefresh(callback);
  },

  // =========================================
  // FOREGROUND MESSAGE
  // =========================================
  onMessage(callback: (message: any) => void) {
    return messaging().onMessage(callback);
  },

  // =========================================
  // NOTIFICATION OPENED
  // =========================================
  onNotificationOpenedApp(callback: (message: any) => void) {
    return messaging().onNotificationOpenedApp(callback);
  },

  // =========================================
  // INITIAL NOTIFICATION
  // =========================================
  async getInitialNotification() {
    return messaging().getInitialNotification();
  },
};
