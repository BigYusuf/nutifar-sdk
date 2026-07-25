import { fcmProvider } from "./fcm";

export const getFCMToken = async () => {
  const token = await fcmProvider.getToken();

  if (!token) {
    throw new Error("Unable to retrieve FCM registration token");
  }

  return token;
};
