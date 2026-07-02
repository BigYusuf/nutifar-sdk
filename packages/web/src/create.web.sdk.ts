import { createSDK } from "@nutifar/core";

export interface WebSDKConfig {
  baseURL: string;
  apiKey?: {
    publicKey: string;
    secretKey?: string; // optional; server-side only
  };
}
type RequestConfig = {
  headers?: Record<string, string>;
  url?: string;
};
/**
 * Create a web SDK instance
 * - Uses cookie-based transport
 * - API keys are injected if provided
 */
export const nutifar = (config: WebSDKConfig) => {
  const { baseURL, apiKey } = config;

  const sdk: any = createSDK({
    baseURL,
    transport: {
      credentials: "include", // cookies enabled
      interceptors: {
        request: [
          (req: RequestConfig) => {
            if (!req.headers) req.headers = {};

            if (apiKey?.secretKey) {
              req.headers["x-api-key"] = apiKey.secretKey;
            }
            if (apiKey?.publicKey) {
              req.headers["x-api-key"] = apiKey.publicKey;
            }

            return req;
          },
        ],
        response: [
          async (res: any) => {
            // Do not auto-refresh on 401, developer             return res;
          },
        ],
      },
    },
  });

  return sdk;
};
