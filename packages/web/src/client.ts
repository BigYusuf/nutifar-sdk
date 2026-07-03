import { createSDK } from "@nutifar/core";
import { WebPushManager } from "./push/webPush";
type Key = {
  publicKey: string;
  secretKey?: string;
};
export interface WebSDKConfig {
  apiKey?: Key | string;
}

type RequestConfig = {
  headers?: Record<string, string>;
  url?: string;
};

export const createWebSDK = (config: WebSDKConfig = {}) => {
  const { apiKey } = config;

  // =========================================
  // CORE SDK (PRECONFIGURED BACKEND)
  // =========================================
  const sdk: any = createSDK({
    baseURL: "https://api.nutifar.buzz/api/v1", // (fixed your backend url)

    transport: {
      credentials: "include",

      interceptors: {
        request: [
          (req: RequestConfig) => {
            req.headers = req.headers || {};

            const key =
              typeof apiKey === "string"
                ? apiKey
                : (apiKey?.secretKey ?? apiKey?.publicKey);

            if (key) {
              req.headers["x-api-key"] = key;
            }

            return req;
          },
        ],
      },
    },
  });

  // =========================================
  // PUSH MODULE (FULLY CONTROLLED BY YOU)
  // =========================================
  sdk.push = new WebPushManager({
    devices: sdk.device,
  });

  return sdk;
};
