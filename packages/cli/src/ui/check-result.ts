import chalk from "chalk";
import type { CheckResult } from "../types/check.types";

export function printCheckResult(result: CheckResult) {
  const icon = getStatusIcon(result.status);

  const color =
    result.status === "pass"
      ? chalk.green
      : result.status === "fail"
      ? chalk.red
      : chalk.yellow;

  console.log(`${color(`${icon} ${result.name}`)} ${result.message}`);

  if (result.details) {
    console.log(chalk.gray(`  ${result.details}`));
  }
}

function getStatusIcon(status: CheckResult["status"]) {
  switch (status) {
    case "pass":
      return "✓";

    case "fail":
      return "✖";

    case "warn":
      return "⚠";
  }
}
