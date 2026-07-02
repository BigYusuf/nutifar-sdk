import { createSDK } from "@nutifar/core";
import { ExpoPushManager } from "./push/expo";

export interface ExpoSDKConfig {
  apiKey?: {
    publicKey: string;
    secretKey?: string;
  };
}

type RequestConfig = {
  headers?: Record<string, string>;
  url?: string;
};

export const createExpoSDK = (config: ExpoSDKConfig = {}) => {
  const { apiKey } = config;

  // =========================================
  // CORE SDK (PRECONFIGURED BACKEND)
  // =========================================
  const sdk: any = createSDK({
    baseURL: "http://localhost:6500/api/v1", // (fixed your backend url)

    transport: {
      credentials: "include",

      interceptors: {
        request: [
          (req: RequestConfig) => {
            req.headers = req.headers || {};

            const key = apiKey?.secretKey ?? apiKey?.publicKey;

            if (key) {
              req.headers["x-api-key"] = key;
            }

            return req;
          },
        ],
      },
    },
  });
  sdk.push = new ExpoPushManager({
    devices: sdk.devices,
    client: sdk,
  });

  return sdk;
};
