import fs from "node:fs";
import path from "node:path";
import type {
  PackageManager,
  Platform,
  ProjectInfo,
} from "../types/project.types";

interface PackageJSON {
  name?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export function detectProject(): ProjectInfo {
  const cwd = process.cwd();

  const packageJsonPath = path.join(cwd, "package.json");

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(
      fs.readFileSync(packageJsonPath, "utf-8"),
    ) as PackageJSON;

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    return {
      platform: detectJavaScriptPlatform(dependencies),
      name: packageJson.name,
      packageManager: detectPackageManager(cwd),
    };
  }

  if (fs.existsSync(path.join(cwd, "artisan"))) {
    return {
      platform: "laravel",
      packageManager: "unknown",
    };
  }

  if (
    fs.existsSync(path.join(cwd, "requirements.txt")) ||
    fs.existsSync(path.join(cwd, "pyproject.toml"))
  ) {
    return {
      platform: "python",
      packageManager: "unknown",
    };
  }

  return {
    platform: "unknown",
    packageManager: "unknown",
  };
}

function detectJavaScriptPlatform(
  dependencies: Record<string, string>,
): Platform {
  if ("expo" in dependencies) {
    return "expo";
  }

  if ("react-native" in dependencies) {
    return "react-native";
  }

  if ("next" in dependencies) {
    return "web";
  }

  if ("react" in dependencies) {
    return "web";
  }

  return "unknown";
}

function detectPackageManager(cwd: string): PackageManager {
  if (fs.existsSync(path.join(cwd, "pnpm-lock.yaml"))) {
    return "pnpm";
  }

  if (fs.existsSync(path.join(cwd, "yarn.lock"))) {
    return "yarn";
  }

  if (fs.existsSync(path.join(cwd, "bun.lockb"))) {
    return "bun";
  }

  if (fs.existsSync(path.join(cwd, "package-lock.json"))) {
    return "npm";
  }

  return "unknown";
}
