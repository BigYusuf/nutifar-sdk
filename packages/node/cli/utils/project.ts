import path from "node:path";

import { exists, mkdir, read } from "./fs";

import type { Framework, ProjectInfo } from "../types";

import {
  PACKAGE_JSON,
  PUBLIC_DIRECTORY,
} from "../constants";

/**
 * Returns the current project information.
 */
export async function getProject(): Promise<ProjectInfo> {
  const root = process.cwd();

  const packageJson = path.join(root, PACKAGE_JSON);

  if (!(await exists(packageJson))) {
    throw new Error(
      "No package.json found.\nPlease run this command inside your project."
    );
  }

  return {
    root,
    packageJson,
    publicDirectory: path.join(root, PUBLIC_DIRECTORY),
  };
}

/**
 * Reads package.json
 */
export async function getPackageJson(project: ProjectInfo) {
  const content = await read(project.packageJson);

  return JSON.parse(content);
}

/**
 * Detect framework
 */
export async function detectFramework(
  project: ProjectInfo
): Promise<Framework> {
  const pkg = await getPackageJson(project);

  const dependencies = {
    ...pkg.dependencies,
    ...pkg.devDependencies,
  };

  if ("next" in dependencies) {
    return "next";
  }

  if ("vite" in dependencies) {
    return "vite";
  }

  if ("react-scripts" in dependencies) {
    return "react";
  }

  return "unknown";
}

/**
 * Ensures public directory exists.
 */
export async function ensurePublicDirectory(
  project: ProjectInfo
) {
  if (!(await exists(project.publicDirectory))) {
    await mkdir(project.publicDirectory);
  }

  return project.publicDirectory;
}