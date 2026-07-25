import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: false,
  clean: true,
  sourcemap: true,
  minify: false,
  banner: {
    js: "#!/usr/bin/env node",
  },
});