import readline from "node:readline/promises";

import { stdin, stdout } from "node:process";

export async function confirm(
  message: string
): Promise<boolean> {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  const answer = await rl.question(
    `${message} (y/N): `
  );

  rl.close();

  return ["y", "yes"].includes(
    answer.trim().toLowerCase()
  );
}