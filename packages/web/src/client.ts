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
    // baseURL: "http://localhost:6500/api/v1",

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
    // NEW — native browser EventSource. `withCredentials: true` so the
    // stream request carries cookies same as your other requests do via
    // `credentials: "include"` above — matters if `/notifications/stream`
    // ever sits behind anything cookie-checked in front of the token check.
    createEventSource: (url: string) =>
      new EventSource(url, { withCredentials: true }) as any,
  });

  // =========================================
  // PUSH MODULE (FULLY CONTROLLED BY YOU)
  // =========================================
  sdk.push = new WebPushManager({
    devices: sdk.device,
  });

  return sdk;
};
