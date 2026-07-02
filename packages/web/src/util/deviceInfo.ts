import { UAParser } from "ua-parser-js";

export const getDeviceInfo = () => {
  const isBrowser =
    typeof window !== "undefined" && typeof navigator !== "undefined";

  const parser = isBrowser ? new UAParser() : null;
  const result = parser?.getResult();

  return {
    // =========================================
    // CORE IDENTITY
    // =========================================
    userAgent: isBrowser ? navigator.userAgent : null,

    platform: isBrowser ? navigator.platform : null,

    language: isBrowser ? navigator.language : null,

    timezone: isBrowser
      ? Intl.DateTimeFormat().resolvedOptions().timeZone
      : null,

    // =========================================
    // BROWSER INFO
    // =========================================
    browser: {
      name: result?.browser?.name || null,
      version: result?.browser?.version || null,
      major: result?.browser?.major || null,
    },

    // =========================================
    // OS INFO
    // =========================================
    os: {
      name: result?.os?.name || null,
      version: result?.os?.version || null,
    },

    // =========================================
    // DEVICE INFO
    // =========================================
    device: {
      type: result?.device?.type || "desktop",
      vendor: result?.device?.vendor || null,
      model: result?.device?.model || null,
    },

    // =========================================
    // CPU INFO
    // =========================================
    cpu: {
      architecture: result?.cpu?.architecture || null,
    },

    // =========================================
    // SCREEN INFO
    // =========================================
    screen: isBrowser
      ? {
          width: window.screen?.width || null,
          height: window.screen?.height || null,
          availWidth: window.screen?.availWidth || null,
          availHeight: window.screen?.availHeight || null,
          colorDepth: window.screen?.colorDepth || null,
        }
      : null,

    // =========================================
    // CONNECTION INFO (VERY USEFUL FOR PUSH)
    // =========================================
    connection: isBrowser
      ? {
          effectiveType: (navigator as any)?.connection?.effectiveType || null,
          downlink: (navigator as any)?.connection?.downlink || null,
          rtt: (navigator as any)?.connection?.rtt || null,
          saveData: (navigator as any)?.connection?.saveData || null,
        }
      : null,

    // =========================================
    // METADATA (YOUR OWN SYSTEM)
    // =========================================
    collectedAt: new Date().toISOString(),
  };
};
