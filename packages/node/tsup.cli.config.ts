import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "cli/index.ts" },
  outDir: "dist/cli",
  format: ["esm"],
  clean: false,
  dts: true,
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
  target: "node18",
  platform: "node",
  tsconfig: "./tsconfig.cli.json",
  // banner: {
  //   js: "#!/usr/bin/env node",
  // },
});
