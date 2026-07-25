import chalk from "chalk";
import { detectProject } from "../../detectors/project.detector";
import { PLATFORM_LABELS } from "../../constants/platform.constants";

export async function infoCommand() {
  const project = detectProject();

  console.log(chalk.cyan("\n⚙️ Nutifar Configuration\n"));

  if (project.platform === "unknown") {
    console.log(chalk.yellow("No supported project detected.\n"));

    return;
  }

  console.log(
    `${chalk.gray("Platform:")} ${PLATFORM_LABELS[project.platform]}`,
  );

  console.log(`${chalk.gray("Package manager:")} ${project.packageManager}\n`);
}
