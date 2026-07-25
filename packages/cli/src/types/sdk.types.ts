import type { Platform } from "./project.types";

export interface SDKDefinition {
  packageName: string;
  platform: Platform;
  description: string;
}
