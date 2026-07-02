#!/usr/bin/env node
/// <reference types="node" />

import { logger } from "./utils/logger";

import { init } from "./commands/init";

async function main() {
  //   const command = process.argv[2];
  const [, , command, ...args] = process.argv;

  switch (command) {
    case "init":
      await init();
      break;

    case "--help":
    case "-h":
      printHelp();
      break;

    case "--version":
    case "-v":
      printVersion();
      break;

    default:
      logger.error(`Unknown command "${command ?? ""}".`);

      printHelp();

      process.exit(1);
  }
}

function printHelp() {
  console.log(`
Nutifar CLI

Commands

  init          Install firebase-messaging-sw.js

Options

  -h, --help
  -v, --version
`);
}

function printVersion() {
  console.log("0.0.1");
}

main().catch((error) => {
  logger.error(error.message);

  process.exit(1);
});
