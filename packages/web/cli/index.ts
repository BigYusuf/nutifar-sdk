#!/usr/bin/env node
/// <reference types="node" />

import { init } from "./commands/init";
import { logger } from "./utils/logger";
import { version } from "../package.json";

async function main() {
  const [, , command = "help"] = process.argv;

  switch (command) {
    case "init":
      await init();
      break;

    case "-h":
    case "--help":
    case "help":
      printHelp();
      break;

    case "-v":
    case "--version":
      printVersion();
      break;

    default:
      logger.error(`Unknown command "${command}".\n`);
      printHelp();
      process.exit(1);
  }
}

function printHelp() {
  console.log(`
🚀 Nutifar Web CLI

Usage

  nutifar <command>

Commands

  init          Setup Web Push (creates public/firebase-messaging-sw.js)

Options

  -h, --help    Show help
  -v, --version Show version

Examples

  nutifar init
`);
}

function printVersion() {
  console.log(`Nutifar Web CLI v${version}`);
}

main().catch((error) => {
  logger.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});