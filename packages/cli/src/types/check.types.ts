export type CheckStatus =
  | "pass"
  | "fail"
  | "warn";

export interface CheckResult {
  name: string;
  status: CheckStatus;
  message: string;
  details?: string;
}

export interface DiagnosticCheck {
  run(): Promise<CheckResult>;
}