import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

import type { PlatformSetup } from "../../types/platform.types";

export class WebSetup implements PlatformSetup {
  async setup() {
    const publicDirectory = path.join(process.cwd(), "public");

    const serviceWorkerPath = path.join(
      publicDirectory,
      "firebase-messaging-sw.js",
    );

    fs.mkdirSync(publicDirectory, {
      recursive: true,
    });

    if (fs.existsSync(serviceWorkerPath)) {
      console.log(chalk.yellow("⚠ Firebase service worker already exists"));

      return;
    }

    fs.writeFileSync(
      serviceWorkerPath,
      `importScripts(
  "https://api.nutifar.buzz/sw/v1/firebase-messaging-sw.js"
);
`,
      "utf-8",
    );

    console.log(chalk.green("✓ Firebase service worker created"));

    console.log(chalk.gray("  public/firebase-messaging-sw.js"));
  }
}
