export interface ProjectInfo {
  root: string;
  packageJsonPath?: string;

  packageJson: string;
  publicDirectory: string;
}

export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export interface CopyResult {
  success: boolean;
  destination: string;
}

export interface InitOptions {
  force?: boolean;
}

export interface CopyTemplateOptions {
  templateName: string;
  destination: string;
  overwrite: boolean;
}

export type Framework = "next" | "vite" | "react" | "unknown";
