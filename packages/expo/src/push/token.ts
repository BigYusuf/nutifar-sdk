import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

export async function getExpoPushToken() {
  if (!Device.isDevice) {
    throw new Error("Must use physical device");
  }

  // const permission = await Notifications.requestPermissionsAsync();

  // if (!permission.granted) {
  //   throw new Error("Permission denied");
  // }

  const token = await Notifications.getExpoPushTokenAsync();

  return token.data;
}