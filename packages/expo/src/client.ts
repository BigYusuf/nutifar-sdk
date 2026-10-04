import { createSDK } from "@nutifar/core";
import RNEventSource from "react-native-sse";
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
    baseURL: "https://api.nutifar.buzz/api/v1",

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

    // NEW — react-native-sse mirrors the EventSource API closely enough
    // (onopen/onerror/addEventListener/close) that InAppStream needs no
    // platform branching at all
    createEventSource: (url: string) => new RNEventSource(url) as any,

    debug: __DEV__ ? true : false,
  });
  sdk.push = new ExpoPushManager({
    devices: sdk.device,
    client: sdk,
  });

  return sdk;
};
