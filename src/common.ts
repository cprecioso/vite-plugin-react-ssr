import path from "node:path";

import clientEntryRelativePath from "./entry/client.entry.js";
import ssrEntryRelativePath from "./entry/ssr.entry.js";

export const indexHtmlId = path.resolve(process.cwd(), "index.html");
export const ssrEntryId = "/@vite-plugin-react-ssr/ssr";
export const clientEntryId = "/@vite-plugin-react-ssr/client";
export const userAppId = "/@vite-plugin-react-ssr/app";

export const ssrEntryPath = path.resolve(
  import.meta.dirname,
  ssrEntryRelativePath,
);
export const clientEntryPath = path.resolve(
  import.meta.dirname,
  clientEntryRelativePath,
);
