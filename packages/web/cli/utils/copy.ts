import path from "node:path";

import { copy, exists } from "./fs";
import { template } from "./paths";

export interface CopyTemplateOptions {
  templateName: string;
  destination: string;
  overwrite?: boolean;
}

/**
 * Copies a template from the package templates directory
 * to the specified destination.
 */
export async function copyTemplate({
  templateName,
  destination,
  overwrite = false,
}: CopyTemplateOptions): Promise<void> {
  const source = template(templateName);

  if (!(await exists(source))) {
    throw new Error(
      `Template "${templateName}" does not exist.`
    );
  }

  if ((await exists(destination)) && !overwrite) {
    throw new Error(
      `File already exists:\n${destination}`
    );
  }

  await copy(source, destination);
}

/**
 * Returns the destination path inside a directory.
 */
export function destination(
  directory: string,
  filename: string
) {
  return path.join(directory, filename);
}