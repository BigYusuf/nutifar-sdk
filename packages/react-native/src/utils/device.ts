import { Dimensions, Platform } from "react-native";

let DeviceInfo: any = null;

const loadDeviceInfo = () => {
  if (DeviceInfo) {
    return DeviceInfo;
  }

  try {
    DeviceInfo = require("react-native-device-info");

    return DeviceInfo;
  } catch {
    return null;
  }
};

export const getNativeDeviceInfo = async () => {
  const deviceInfo = loadDeviceInfo();

  const { width, height } = Dimensions.get("window");

  const isEmulator = deviceInfo ? await deviceInfo.isEmulator() : undefined;

  return {
    // =========================================
    // CORE IDENTITY
    // =========================================
    platform: Platform.OS,

    deviceType: deviceInfo ? await deviceInfo.getDeviceType() : "unknown",

    isPhysicalDevice: isEmulator === undefined ? undefined : !isEmulator,

    // =========================================
    // OS INFO
    // =========================================
    os: {
      name: Platform.OS,

      version: deviceInfo
        ? await deviceInfo.getSystemVersion()
        : String(Platform.Version),
    },

    // =========================================
    // APP INFO
    // =========================================
    app: {
      name: deviceInfo ? await deviceInfo.getApplicationName() : undefined,

      version: deviceInfo ? await deviceInfo.getVersion() : undefined,

      buildNumber: deviceInfo ? await deviceInfo.getBuildNumber() : undefined,

      bundleId: deviceInfo ? await deviceInfo.getBundleId() : undefined,
    },

    // =========================================
    // DEVICE INFO
    // =========================================
    device: {
      model: deviceInfo ? await deviceInfo.getModel() : undefined,

      brand: deviceInfo ? await deviceInfo.getBrand() : undefined,

      manufacturer: deviceInfo ? await deviceInfo.getManufacturer() : undefined,
    },

    // =========================================
    // SYSTEM INFO
    // =========================================
    system: {
      osName: Platform.OS,

      osVersion: deviceInfo
        ? await deviceInfo.getSystemVersion()
        : String(Platform.Version),

      platformVersion: Platform.Version,
    },

    // =========================================
    // LOCALE
    // =========================================
    locale: {
      language: deviceInfo ? await deviceInfo.getDeviceLocale() : undefined,

      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    },

    // =========================================
    // SCREEN
    // =========================================
    screen: {
      width,
      height,
    },

    // =========================================
    // META
    // =========================================
    collectedAt: new Date().toISOString(),
  };
};
