import { Platform } from "react-native";

export const platform = {
  os: Platform.OS,

  isIOS: Platform.OS === "ios",

  isAndroid: Platform.OS === "android",

  isNative: true,
};
