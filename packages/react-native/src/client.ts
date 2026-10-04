import { createSDK, devUrl } from "@nutifar/core";
import RNEventSource from "react-native-sse";

import { ReactNativePushManager } from "./push/manager";

export interface ReactNativeSDKConfig {
  apiKey: string;
}

type RequestConfig = {
  headers?: Record<string, string>;
  url?: string;
};

export const createReactNativeClient = (config: ReactNativeSDKConfig) => {
  const { apiKey } = config;

  const sdk: any = createSDK({
    baseURL: devUrl,

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

    debug: __DEV__,
  });

  sdk.push = new ReactNativePushManager({
    devices: sdk.device,
    client: sdk,
  });

  return sdk;
};
