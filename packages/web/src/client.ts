import { createSDK, UnauthorizedError, ValidationError } from "@nutifar/core";
import { WebPushManager } from "./push/webPush";

export interface WebSDKConfig {
  apiKey: string;
}

type RequestConfig = {
  headers?: Record<string, string>;
  url?: string;
};

export const Nutifar = (config: WebSDKConfig) => {
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
            const isPublic = apiKey.startsWith("pk_");

            if (isSecret) {
              throw new ValidationError("Only Public key allowed for Web SDK");
            }
            if (!isPublic) {
              throw new UnauthorizedError("Invalid Public key");
            }
            if (apiKey && isPublic) {
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
