import * as Notifications from "expo-notifications";

export function onForegroundNotification(callback: any) {
  return Notifications.addNotificationReceivedListener(callback);
}