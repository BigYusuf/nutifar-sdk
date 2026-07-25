import chalk from "chalk";
import ora from "ora";
import { confirm } from "@inquirer/prompts";

import { detectProject } from "../../detectors/project.detector";
import { PLATFORM_LABELS } from "../../constants/platform.constants";
import { resolveSDK } from "../../installers/sdk.resolver";
import { installSDK } from "../../installers/sdk.installer";

export async function setupCommand() {
  const spinner = ora("Detecting project...").start();

  await new Promise((resolve) =>
    setTimeout(resolve, 700),
  );

  const project = detectProject();

  spinner.stop();

  if (project.platform === "unknown") {
    console.log(
      chalk.red(
        "\n✖ Could not detect a supported project.\n",
      ),
    );

    return;
  }

  console.log(chalk.green("\n✓ Project detected\n"));

  console.log(
    `${chalk.gray("Platform:")} ${
      PLATFORM_LABELS[project.platform]
    }`,
  );

  console.log(
    `${chalk.gray("Package manager:")} ${
      project.packageManager
    }\n`,
  );

  const sdk = resolveSDK(project.platform);

  if (!sdk) {
    console.log(
      chalk.red(
        "\n✖ No Nutifar SDK available for this platform.\n",
      ),
    );

    return;
  }

  const shouldContinue = await confirm({
    message: `Install ${sdk.packageName}?`,
    default: true,
  });

  if (!shouldContinue) {
    console.log(chalk.gray("\nSetup cancelled."));

    return;
  }

  await installSDK(
    sdk,
    project.packageManager,
  );

  console.log(
    chalk.green(
      "\n✓ Nutifar setup complete 🚀\n",
    ),
  );
}