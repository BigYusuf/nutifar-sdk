import chalk from "chalk";
import { askSDK } from "../../prompts/sdk.prompt";
import { installSDK } from "../../installers/sdk.installer";
import { detectProject } from "../../detectors/project.detector";

export async function installCommand() {
  const sdk = await askSDK();

  const project = detectProject();

  if (project.packageManager === "unknown") {
    console.log(chalk.red("\n✖ Could not detect a package manager.\n"));

    return;
  }

  await installSDK(sdk, project.packageManager);

  console.log(chalk.green(`\n✓ ${sdk.packageName} installed 🚀\n`));
}
