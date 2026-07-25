import type { SDKDefinition } from "../types/sdk.types";

export const SDK_REGISTRY: SDKDefinition[] = [
  {
    packageName: "@nutifar/expo",
    platform: "expo",
    description: "Nutifar SDK for Expo applications",
  },
  {
    packageName: "@nutifar/react-native",
    platform: "react-native",
    description: "Nutifar SDK for React Native applications",
  },
  {
    packageName: "@nutifar/web",
    platform: "web",
    description: "Nutifar SDK for web applications",
  },
  {
    packageName: "@nutifar/node",
    platform: "node",
    description: "Nutifar SDK for Node.js applications",
  },
  {
    packageName: "@nutifar/python",
    platform: "python",
    description: "Nutifar SDK for Python applications",
  },
  {
    packageName: "@nutifar/laravel",
    platform: "laravel",
    description: "Nutifar SDK for Laravel applications",
  },
];
