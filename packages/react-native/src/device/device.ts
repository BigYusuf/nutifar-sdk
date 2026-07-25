import { getNativeDeviceInfo } from "./nativeDevice";

export class ReactNativeDeviceManager {
  constructor(private device: any) {}

  async getInfo() {
    return getNativeDeviceInfo();
  }

  async register(input: any) {
    const deviceInfo = await this.getInfo();

    return this.device.register({
      ...input,
      platform: deviceInfo.platform.toUpperCase(),
    });
  }

  async unregister(input: any) {
    return this.device.unregister(input);
  }

  async refreshToken(input: any) {
    return this.device.refreshToken(input);
  }

  async heartbeat(input: any) {
    return this.device.heartbeat?.(input);
  }
}
