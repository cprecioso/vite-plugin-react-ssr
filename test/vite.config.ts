import { defineConfig } from "vite";
import { reactSsr } from "../dist/index.mjs";

export default defineConfig({
  build: { outDir: "out" },
  plugins: [reactSsr({ appModule: "./app.tsx" })],
});
