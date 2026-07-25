import fs from "node:fs";
import path from "node:path";

import type { CheckResult, DiagnosticCheck } from "../types/check.types";

export class ConfigCheck implements DiagnosticCheck {
  async run(): Promise<CheckResult> {
    const configFiles = [
      "nutifar.config.ts",
      "nutifar.config.js",
      "nutifar.config.mjs",
    ];

    const configExists = configFiles.some((file) =>
      fs.existsSync(path.join(process.cwd(), file)),
    );

    if (!configExists) {
      return {
        name: "Configuration",
        status: "warn",
        message: "Nutifar configuration not found",
      };
    }

    return {
      name: "Configuration",
      status: "pass",
      message: "Configuration found",
    };
  }
}
