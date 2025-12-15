// @ts-check

import type { Plugin } from "vite";
import pkg from "../../package.json" with { type: "json" };
import {
  clientEntryId,
  clientEntryPath,
  indexHtmlId,
  ssrEntryId,
  ssrEntryPath,
  userAppId,
} from "../common";

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
          case ssrEntryId:
            return ssrEntryPath;
          case clientEntryId:
            return clientEntryPath;

          // This is an alias to the user's app module
          case userAppId:
            return await this.resolve(appModule, undefined, { isEntry: true });
        }
      },
    },
  }) satisfies Partial<Plugin>;
