import { fcmProvider } from "./fcm";

export const onForegroundNotification = (callback: (message: any) => void) => {
  return fcmProvider.onMessage(callback);
};

export const onNotificationOpened = (callback: (message: any) => void) => {
  return fcmProvider.onNotificationOpenedApp(callback);
};

export const onTokenRefresh = (callback: (token: string) => void) => {
  return fcmProvider.onTokenRefresh(callback);
};

export const getInitialNotification = async () => {
  return fcmProvider.getInitialNotification();
};
