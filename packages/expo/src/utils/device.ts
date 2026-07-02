import * as Device from "expo-device";
import Constants from "expo-constants";
import { Platform } from "react-native";

export const getExpoDeviceInfo = () => {
  const appConfig = Constants.expoConfig || Constants.manifest;

  return {
    // =========================================
    // CORE IDENTITY
    // =========================================
    platform: Platform.OS,

    deviceType: Device.deviceType || "unknown",

    isPhysicalDevice: Device.isDevice,

    // =========================================
    // OS INFO
    // =========================================
    os: {
      name: Platform.OS,
      version: Device.osVersion,
    },

    // =========================================
    // APP INFO
    // =========================================
    app: {
      name: appConfig?.name,
      version: appConfig?.version,
      buildNumber:
        appConfig?.ios?.buildNumber ||
        appConfig?.android?.versionCode,
      bundleId:
        appConfig?.ios?.bundleIdentifier ||
        appConfig?.android?.package,
    },

    // =========================================
    // DEVICE INFO
    // =========================================
    device: {
      model: Device.modelName,
      brand: Device.brand,
      manufacturer: Device.manufacturer,
    },

    // =========================================
    // SYSTEM INFO
    // =========================================
    system: {
      osName: Platform.OS,
      osVersion: Device.osVersion,
      platformVersion: Platform.Version,
    },

    // =========================================
    // LOCALE INFO
    // =========================================
    locale: {
      language: null, // Expo does not reliably expose this directly
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },

    // =========================================
    // SCREEN INFO (RAW RN)
    // =========================================
    screen: {
      width: undefined, // intentionally raw (you can add Dimensions later if needed)
      height: undefined,
    },

    // =========================================
    // META
    // =========================================
    collectedAt: new Date().toISOString(),
  };
};