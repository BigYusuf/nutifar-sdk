import { createSDK, UnauthorizedError } from "@nutifar/core";
import { WebPushManager } from "./push/webPush";

export interface NodeSDKConfig {
  apiKey: string;
}

type RequestConfig = {
  headers?: Record<string, string>;
  url?: string;
};

export const Nutifar = (config: NodeSDKConfig) => {
  const { apiKey } = config;

  // =========================================
  // CORE SDK (PRECONFIGURED BACKEND)
  // =========================================
  const sdk: any = createSDK({
    baseURL: "https://api.nutifar.buzz/api/v1",

    transport: {
      credentials: "include",

      interceptors: {
        request: [
          (req: RequestConfig) => {
            req.headers = req.headers || {};

            const isSecret = apiKey.startsWith("sk_");

            if (!isSecret) {
              throw new UnauthorizedError("Invalid Secret key");
            }

            if (apiKey) {
              req.headers["x-api-key"] = apiKey;
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
