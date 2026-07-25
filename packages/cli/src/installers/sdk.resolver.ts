import { SDK_REGISTRY } from "../constants/sdk.constants";
import type { Platform } from "../types/project.types";
import type { SDKDefinition } from "../types/sdk.types";

export function resolveSDK(platform: Platform): SDKDefinition | undefined {
  return SDK_REGISTRY.find((sdk) => sdk.platform === platform);
}
