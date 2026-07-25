import fs from "node:fs";
import path from "node:path";

import { detectProject } from "../detectors/project.detector";
import { resolveSDK } from "../installers/sdk.resolver";

import type { CheckResult, DiagnosticCheck } from "../types/check.types";

interface PackageJSON {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
}

export class SDKCheck implements DiagnosticCheck {
  async run(): Promise<CheckResult> {
    const project = detectProject();

    if (project.platform === "unknown") {
      return {
        name: "SDK",
        status: "warn",
        message: "Skipped",
        details: "No supported project detected",
      };
    }

    const sdk = resolveSDK(project.platform);

    if (!sdk) {
      return {
        name: "SDK",
        status: "warn",
        message: "No SDK available",
      };
    }

    const packageJson = readPackageJSON();

    if (!packageJson) {
      return {
        name: "SDK",
        status: "fail",
        message: "package.json not found",
      };
    }

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (!(sdk.packageName in dependencies)) {
      return {
        name: "SDK",
        status: "fail",
        message: `${sdk.packageName} is not installed`,
      };
    }

    // if (!("@nutifar/core" in dependencies)) {
    //   return {
    //     name: "SDK",
    //     status: "fail",
    //     message: "@nutifar/core is not installed",
    //   };
    // }

    return {
      name: "SDK",
      status: "pass",
      message: "Nutifar SDK installed",
      //   details: `${sdk.packageName} + @nutifar/core`,
      details: `${sdk.packageName}`,
    };
  }
}

function readPackageJSON(): PackageJSON | null {
  const packageJsonPath = path.join(process.cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(packageJsonPath, "utf-8")) as PackageJSON;
}
