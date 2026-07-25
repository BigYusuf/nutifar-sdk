import type { Platform } from "./project.types";

export interface PlatformSetup {
  setup(): Promise<void>;
}

export type PlatformSetupFactory = () => PlatformSetup;

export type SupportedSetupPlatform = Exclude<Platform, "unknown">;
