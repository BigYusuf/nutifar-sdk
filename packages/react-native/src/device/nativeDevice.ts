import { Platform } from "react-native";

export interface NativeDeviceInfo {
  platform: "ios" | "android";
  osVersion: string | null;
  model: string | null;
}

export const getNativeDeviceInfo = (): NativeDeviceInfo => {
  return {
    platform: Platform.OS === "ios" ? "ios" : "android",
    osVersion: Platform.Version?.toString() ?? null,
    model: null,
  };
};