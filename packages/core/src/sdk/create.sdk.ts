// core/sdk/createSDK.ts

import { createClient } from "../core/client";
import { createNotificationModule } from "../modules/event";
import { createDeviceModule } from "../modules/device";

export const createSDK = ({
  baseURL,
  transport,
}: {
  baseURL: string;
  transport: any;
}) => {
  const client = createClient({ baseURL, transport });

  return {
    notification: createNotificationModule(client),
    device: createDeviceModule(client),
  };
};
