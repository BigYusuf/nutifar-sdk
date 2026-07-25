import chalk from "chalk";

import { askMainMenu } from "../prompts/main-menu.prompt";
import { pause } from "../prompts/pause.prompt";

import { setupCommand } from "../commands/setup/setup.command";
import { installCommand } from "../commands/install/install.command";
import { doctorCommand } from "../commands/doctor/doctor.command";
import { infoCommand } from "../commands/info/info.command";

export async function showMainMenu() {
  const option = await askMainMenu();

  switch (option) {
    case "setup":
      await setupCommand();
      break;

    case "install":
      await installCommand();
      break;

    case "doctor":
      await doctorCommand();
      break;

    case "info":
      await infoCommand();
      break;

    case "exit":
      console.log(chalk.gray("\nGoodbye 👋\n"));

      process.exit(0);
  }

  await pause();

  return showMainMenu();
}
