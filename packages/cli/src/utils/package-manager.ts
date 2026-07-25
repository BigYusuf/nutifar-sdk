import { execa } from "execa";

export async function installPackage(
  packageName: string,
  packageManager: string,
) {
  switch (packageManager) {
    case "pnpm":
      await execa("pnpm", ["add", packageName], {
        stdio: "inherit",
      });
      break;

    case "yarn":
      await execa("yarn", ["add", packageName], {
        stdio: "inherit",
      });
      break;

    case "bun":
      await execa("bun", ["add", packageName], {
        stdio: "inherit",
      });
      break;

    case "npm":
      await execa("npm", ["install", packageName], {
        stdio: "inherit",
      });
      break;

    default:
      throw new Error(
        "Could not detect your package manager.",
      );
  }
}