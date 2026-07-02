export interface DeviceMetadata {
  // =========================================
  // CORE IDENTITY
  // =========================================
  platform: "web" | "ios" | "android" | "desktop" | "unknown";

  deviceType: "mobile" | "tablet" | "desktop" | "unknown";

  isPhysicalDevice?: boolean;

  // =========================================
  // OS INFO
  // =========================================
  os: {
    name?: string;
    version?: string;
  };

  // =========================================
  // APP INFO (important for Expo / RN)
  // =========================================
  app?: {
    name?: string;
    version?: string;
    buildNumber?: string;
    bundleId?: string;
  };

  // =========================================
  // DEVICE INFO
  // =========================================
  device: {
    model?: string;
    brand?: string;
    manufacturer?: string;
  };

  // =========================================
  // BROWSER INFO (WEB ONLY)
  // =========================================
  browser?: {
    name?: string;
    version?: string;
    engine?: string;
  };

  // =========================================
  // SYSTEM INFO
  // =========================================
  system?: {
    userAgent?: string;
    language?: string;
    timezone?: string;
  };

  // =========================================
  // SCREEN INFO
  // =========================================
  screen?: {
    width?: number;
    height?: number;
    density?: number;
  };

  // =========================================
  // NETWORK INFO
  // =========================================
  network?: {
    effectiveType?: string; // 4g, 3g
    downlink?: number;
    rtt?: number;
    saveData?: boolean;
  };

  // =========================================
  // CPU INFO (WEB ONLY)
  // =========================================
  cpu?: {
    architecture?: string;
  };

  // =========================================
  // LOCALE INFO
  // =========================================
  locale: {
    language?: string;
    timezone: string;
  };

  // =========================================
  // META
  // =========================================
  collectedAt: string;
}
