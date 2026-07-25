import fs from "node:fs";
import path from "node:path";

export interface SetupWebServiceWorkerResult {
  created: boolean;
  path: string;
}

const SERVICE_WORKER_FILE =
  "firebase-messaging-sw.js";

const SERVICE_WORKER_CONTENT = `importScripts(
  "https://api.nutifar.buzz/sw/v1/firebase-messaging-sw.js"
);
`;

export function setupWebServiceWorker(): SetupWebServiceWorkerResult {
  const publicDirectory = path.join(
    process.cwd(),
    "public",
  );

  const serviceWorkerPath = path.join(
    publicDirectory,
    SERVICE_WORKER_FILE,
  );

  fs.mkdirSync(publicDirectory, {
    recursive: true,
  });

  if (fs.existsSync(serviceWorkerPath)) {
    return {
      created: false,
      path: serviceWorkerPath,
    };
  }

  fs.writeFileSync(
    serviceWorkerPath,
    SERVICE_WORKER_CONTENT,
    "utf-8",
  );

  return {
    created: true,
    path: serviceWorkerPath,
  };
}