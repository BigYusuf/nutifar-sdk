import { input } from "@inquirer/prompts";

export async function pause() {
  await input({
    message: "Press Enter to return to the main menu",
  });
}