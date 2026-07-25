import chalk from "chalk";
import figlet from "figlet";

export function showWelcome() {
  console.clear();

  console.log(
    chalk.cyan(
      figlet.textSync("NUTIFAR", {
        horizontalLayout: "default",
        verticalLayout: "default",
      }),
    ),
  );

  console.log(
    chalk.gray("Notification infrastructure for developers 🚀\n"),
  );
}