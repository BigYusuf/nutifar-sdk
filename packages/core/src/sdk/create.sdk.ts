// core/sdk/createSDK.ts

import { createClient } from "../core/client";
import { createNotificationModule } from "../modules/event";
import { createDeviceModule } from "../modules/device";
import { createLogger } from "../core/logger";

export const createSDK = ({
  baseURL,
  transport,
  debug = false,
}: {
  baseURL: string;
  transport: any;
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
    initialize,
    _logger: logger,
  };
};
