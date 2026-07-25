import type { Platform } from "../types/project.types";
import type { PlatformSetup } from "../types/platform.types";

import { WebSetup } from "./web/web.setup";
import { ExpoSetup } from "./expo/expo.setup";
import { NodeSetup } from "./node/node.setup";
import { ReactNativeSetup } from "./react-native/react-native.setup";

export function resolvePlatformSetup(
  platform: Platform,
): PlatformSetup | undefined {
  switch (platform) {
    case "web":
      return new WebSetup();

    case "expo":
      return new ExpoSetup();

    case "react-native":
      return new ReactNativeSetup();

    case "node":
      return new NodeSetup();

    default:
      return undefined;
  }
}
