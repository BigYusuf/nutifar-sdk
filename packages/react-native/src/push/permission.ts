import { fcmProvider } from "./fcm";

export const requestPermission = async () => {
  return fcmProvider.requestPermission();
};

export const getPermissionStatus = async () => {
  return fcmProvider.getPermissionStatus();
};
