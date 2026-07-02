import path from "node:path";

import { logger } from "../utils/logger";

import {
  getProject,
  ensurePublicDirectory,
} from "../utils/project";

import { confirm } from "../utils/prompt";

import { copyTemplate } from "../utils/copy";

import { exists } from "../utils/fs";

import { SERVICE_WORKER } from "../constants";

export async function init() {
  logger.step("Initializing Nutifar...");

  const project = await getProject();

  await ensurePublicDirectory(project);

  const destination = path.join(
    project.publicDirectory,
    SERVICE_WORKER
  );

  const alreadyExists = await exists(destination);

  let overwrite = false;

  if (alreadyExists) {
    overwrite = await confirm(
      "firebase-messaging-sw.js already exists. Overwrite?"
    );

    if (!overwrite) {
      logger.info("Initialization cancelled.");
      return;
    }
  }

  await copyTemplate({
    templateName: SERVICE_WORKER,
    destination,
    overwrite,
  });

  logger.success(
    "firebase-messaging-sw.js installed successfully."
  );

  logger.info(
    "You're ready to initialize the Nutifar SDK."
  );
}