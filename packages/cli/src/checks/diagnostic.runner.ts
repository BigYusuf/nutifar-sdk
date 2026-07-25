import type { CheckResult, DiagnosticCheck } from "../types/check.types";

export async function runDiagnostics(
  checks: DiagnosticCheck[],
): Promise<CheckResult[]> {
  return Promise.all(checks.map((check) => check.run()));
}
