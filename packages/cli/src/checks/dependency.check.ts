import { detectProject } from "../detectors/project.detector";

import type {
  CheckResult,
  DiagnosticCheck,
} from "../types/check.types";

export class DependencyCheck
  implements DiagnosticCheck
{
  async run(): Promise<CheckResult> {
    const project = detectProject();

    if (project.packageManager === "unknown") {
      return {
        name: "Dependencies",
        status: "fail",
        message: "Package manager not detected",
      };
    }

    return {
      name: "Dependencies",
      status: "pass",
      message: "Package manager detected",
      details: project.packageManager,
    };
  }
}