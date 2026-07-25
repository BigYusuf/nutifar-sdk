export type Platform =
  | "expo"
  | "react-native"
  | "web"
  | "node"
  | "python"
  | "laravel"
  | "unknown";

export type PackageManager =
  | "pnpm"
  | "yarn"
  | "npm"
  | "bun"
  | "unknown";

export interface ProjectInfo {
  platform: Platform;
  name?: string;
  packageManager: PackageManager;
}