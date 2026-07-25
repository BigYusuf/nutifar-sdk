import { detectProject } from "../detectors/project.detector";
import type {
  CheckResult,
  DiagnosticCheck,
} from "../types/check.types";

export class ProjectCheck implements DiagnosticCheck {
  async run(): Promise<CheckResult> {
    const project = detectProject();

    if (project.platform === "unknown") {
      return {
        name: "Project",
        status: "fail",
        message: "Supported project not detected",
      };
    }

    return {
      name: "Project",
      status: "pass",
      message: "Project detected",
      details: project.platform,
    };
  }
}