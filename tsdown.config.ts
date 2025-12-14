import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/index.ts",
  outDir: "./dist",
  clean: true,

  platform: "node",
  target: "node22",
  format: "esm",

  dts: { sourcemap: true },

  inputOptions: (options) => {
    options.moduleTypes ??= {};
    options.moduleTypes[".entry.js"] = "asset";
  },
});
