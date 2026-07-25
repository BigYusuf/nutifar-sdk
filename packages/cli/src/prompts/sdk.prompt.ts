import { select } from "@inquirer/prompts";
import { SDK_REGISTRY } from "../constants/sdk.constants";

export async function askSDK() {
  return select({
    message: "Which SDK do you want to install?",
    choices: SDK_REGISTRY.map((sdk) => ({
      name: sdk.packageName,
      value: sdk,
      description: sdk.description,
    })),
  });
}
