import * as Notifications from "expo-notifications";

export const requestPermission = async () => {
  const { status: existing } = await Notifications.getPermissionsAsync();

  let finalStatus = existing;

  if (existing !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    throw new Error("Push permission not granted");
  }

  return finalStatus;
};
