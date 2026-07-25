import fs from "node:fs";
import path from "node:path";

export interface SetupServiceWorkerOptions {
  cwd?: string;
  publicDirectory?: string;
}

export interface SetupServiceWorkerResult {
  created: boolean;
  path: string;
  directory: string;
}

const SERVICE_WORKER_FILE = "firebase-messaging-sw.js";

const SERVICE_WORKER_CONTENT = `importScripts(
  "https://api.nutifar.buzz/sw/v1/firebase-messaging-sw.js"
);
`;

export function setupFirebaseServiceWorker(
  options: SetupServiceWorkerOptions = {},
): SetupServiceWorkerResult {
  const cwd = options.cwd ?? process.cwd();

  const publicDirectory = options.publicDirectory ?? path.join(cwd, "public");

  const serviceWorkerPath = path.join(publicDirectory, SERVICE_WORKER_FILE);

  fs.mkdirSync(publicDirectory, {
    recursive: true,
  });

  if (fs.existsSync(serviceWorkerPath)) {
    return {
      created: false,
      path: serviceWorkerPath,
      directory: publicDirectory,
    };
  }

  fs.writeFileSync(serviceWorkerPath, SERVICE_WORKER_CONTENT, "utf-8");

  return {
    created: true,
    path: serviceWorkerPath,
    directory: publicDirectory,
  };
}
