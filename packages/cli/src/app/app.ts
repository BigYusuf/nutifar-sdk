import { showWelcome } from "./welcome";
import { showMainMenu } from "./menu";

export async function startCLI() {
  showWelcome();

  await showMainMenu();
}