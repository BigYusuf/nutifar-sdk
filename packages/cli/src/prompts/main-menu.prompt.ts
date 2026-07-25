import { select } from "@inquirer/prompts";

export type MainMenuOption =
  | "setup"
  | "install"
  | "doctor"
  | "info"
  | "exit";

export async function askMainMenu(): Promise<MainMenuOption> {
  return select<MainMenuOption>({
    message: "What do you want to do?",
    choices: [
      {
        name: "Setup Nutifar",
        value: "setup",
      },
      {
        name: "Install an SDK",
        value: "install",
      },
      {
        name: "Check project",
        value: "doctor",
      },
      // {
      //   name: "View configuration",
      //   value: "info",
      // },
      {
        name: "Exit",
        value: "exit",
      },
    ],
  });
}