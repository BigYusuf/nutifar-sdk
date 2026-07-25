import chalk from "chalk";

import { ProjectCheck } from "../../checks/project.check";
import { SDKCheck } from "../../checks/sdk.check";
import { DependencyCheck } from "../../checks/dependency.check";
// import { ConfigCheck } from "../../checks/config.check";

import { runDiagnostics } from "../../checks/diagnostic.runner";
import { printCheckResult } from "../../ui/check-result";

export async function doctorCommand() {
  console.log(chalk.cyan("\n🩺 Nutifar Doctor\n"));

  const results = await runDiagnostics([
    new ProjectCheck(),
    new SDKCheck(),
    new DependencyCheck(),
    // new ConfigCheck(), // disabled for now
  ]);

  for (const result of results) {
    printCheckResult(result);
  }

  const failures = results.filter((result) => result.status === "fail");

  const warnings = results.filter((result) => result.status === "warn");

  console.log();

  if (failures.length > 0) {
    console.log(
      chalk.red(
        `✖ ${failures.length} issue${failures.length === 1 ? "" : "s"} found`,
      ),
    );

    return;
  }

  if (warnings.length > 0) {
    console.log(
      chalk.yellow(
        `⚠ ${warnings.length} warning${warnings.length === 1 ? "" : "s"}`,
      ),
    );

    return;
  }

  console.log(chalk.green("✓ Everything looks good 🚀"));
}
