import { defineConfig } from "vite";
import { reactSsr } from "../dist/index.mjs";

export default defineConfig({
  plugins: [reactSsr({ appModule: "./app.tsx" })],
});
