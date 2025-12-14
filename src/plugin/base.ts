// @ts-check

import type { Plugin } from "vite";
import pkg from "../../package.json" with { type: "json" };
import { clientEntryPath, indexHtmlId, ssrEntryPath } from "../common";

export const makePluginBase = (
  phase: Extract<Plugin["apply"], string>,
  { appModule }: { appModule: string },
) =>
  ({
    name: `${pkg.name}:${phase}`,

    apply: phase,

    resolveId: {
      order: "pre",
      async handler(source) {
        switch (source) {
          case indexHtmlId:
            // We return the ID itself here, means this plugin will handle the `load` for it
            return indexHtmlId;

          // These are just aliases to our bundled entry points
          case "/@vite-plugin-react-ssr/ssr":
            return ssrEntryPath;
          case "/@vite-plugin-react-ssr/client":
            return clientEntryPath;

          // This is an alias to the user's app module
          case "/@vite-plugin-react-ssr/app":
            return await this.resolve(appModule, undefined, { isEntry: true });
        }
      },
    },
  }) satisfies Partial<Plugin>;
