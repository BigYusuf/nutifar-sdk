import type { Platform } from "../types/project.types";

export const PROJECT_LABELS: Record<Platform, string> = {
  expo: "Expo React Native",
  "react-native": "Bare React Native",
  //   next: "Next.js",
  //   react: "React.js",
  web: "Web",
  node: "Node.js",
  python: "Python",
  laravel: "Laravel",
  unknown: "Unknown",
};
