import { promises as fs } from "node:fs";

export async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}

export async function ensureDirectory(path: string): Promise<void> {
  await fs.mkdir(path, {
    recursive: true,
  });
}

export async function mkdir(path: string) {
  await fs.mkdir(path, {
    recursive: true,
  });
}

export async function copy(source: string, destination: string): Promise<void> {
  await fs.copyFile(source, destination);
}

export async function read(path: string): Promise<string> {
  return fs.readFile(path, "utf8");
}

export async function write(path: string, data: string): Promise<void> {
  await fs.writeFile(path, data, "utf8");
}

export async function remove(path: string): Promise<void> {
  await fs.rm(path, {
    recursive: true,
    force: true,
  });
}

//  import { promises as fs } from "node:fs";

// export async function exists(path: string) {
//   try {
//     await fs.access(path);
//     return true;
//   } catch {
//     return false;
//   }
// }

// export async function mkdir(path: string) {
//   await fs.mkdir(path, {
//     recursive: true,
//   });
// }

// export async function copy(source: string, destination: string) {
//   await fs.copyFile(source, destination);
// }

// export async function read(path: string) {
//   return fs.readFile(path, "utf8");
// }