// core/sdk/createSDK.ts

import { createClient } from "../core/client";
import { createNotificationModule } from "../modules/event";
import { createDeviceModule } from "../modules/device";
import { createScheduleModule } from "../modules/schedule";
import { createLogger } from "../core/logger";
import { createInAppClient } from "../modules/inapp/inapp.service";
import {
  createInAppStream,
  CreateTransport,
} from "../modules/inapp/inapp.stream";

export const createSDK = ({
  baseURL,
  transport,
  createEventSource, // NEW — platform supplies this (web: EventSource, RN: react-native-sse)

  debug = false,
}: {
  baseURL: string;
  transport: any;
  createEventSource?: CreateTransport; // optional — @nutifar/node won't pass this

  debug?: boolean;
}) => {
  const logger = createLogger({ debug: debug });
  const client = createClient({ baseURL, transport, debug });

  const initialize = async () => {
    return Promise.resolve();
  };

  return {
    notification: createNotificationModule(client),
    device: createDeviceModule(client),
    schedules: createScheduleModule(client),
    inapp: {
      ...createInAppClient(client),
      stream: createEventSource
        ? createInAppStream(client, baseURL, createEventSource)
        : undefined,
    },
    initialize,
    _logger: logger,
  };
};
