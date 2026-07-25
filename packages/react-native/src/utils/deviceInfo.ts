let DeviceInfo: any = null;

export const loadDeviceInfo = () => {
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
