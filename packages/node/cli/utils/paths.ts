import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dist/cli
const DIST_CLI = path.resolve(__dirname, "..");

// package root
const PACKAGE_ROOT = path.resolve(DIST_CLI, "..");

// templates
export const TEMPLATE_DIR = path.join(PACKAGE_ROOT, "templates");

export function template(name: string) {
  return path.join(TEMPLATE_DIR, name);
}
