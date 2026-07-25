import ora from "ora";
import type { SDKDefinition } from "../types/sdk.types";
import { installPackage } from "../utils/package-manager";

export async function installSDK(
  sdk: SDKDefinition,
  packageManager: string,
) {
  const spinner = ora(
    `Installing ${sdk.packageName}...`,
  ).start();

  try {
    await installPackage(
      sdk.packageName,
      packageManager,
    );

    spinner.succeed(
      `${sdk.packageName} installed 🚀`,
    );
  } catch (error) {
    spinner.fail(
      `Failed to install ${sdk.packageName}`,
    );

    throw error;
  }
}