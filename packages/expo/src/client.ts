import { createSDK } from "@nutifar/core";
import { ExpoPushManager } from "./push/expo";

export interface ExpoSDKConfig {
  apiKey: string;
}

type RequestConfig = {
  headers?: Record<string, string>;
  url?: string;
};

export const Nutifar = (config: ExpoSDKConfig) => {
  const { apiKey } = config;

  // =========================================
  // CORE SDK (PRECONFIGURED BACKEND)
  // =========================================
  const sdk: any = createSDK({
    baseURL: "http://192.168.76.44:6500/api/v1", // (fixed your backend url)192.168.76.44
    // baseURL: "http://localhost:6500/api/v1", // (fixed your backend url)
    // baseURL: "https://api.nutifar.buzz/api/v1", // (fixed your backend url)

    transport: {
      credentials: "include",

      interceptors: {
        request: [
          (req: RequestConfig) => {
            req.headers = req.headers || {};

            if (apiKey) {
              req.headers["x-api-key"] = apiKey;
            }

            return req;
          },
        ],
      },
    },
    debug: true,
  });
  sdk.push = new ExpoPushManager({
    devices: sdk.device,
    client: sdk,
  });

  return sdk;
};
