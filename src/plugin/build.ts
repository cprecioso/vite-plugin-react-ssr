import assert from "node:assert";
import path from "node:path";
import { Plugin } from "vite";
import { clientEntryId, indexHtmlId, ssrEntryId } from "../common";
import { makePluginBase } from "./base";

/*
  This plugin handles the build process for both SSR and client builds.
  It ensures that the SSR entry is built first, captures its output path,
  and then uses that to prerender the HTML during the client build.
*/

export const makeBuildPlugin = ({
  appModule,
}: {
  appModule: string;
}): Plugin => {
  // We'll need this in the `load` hook, but we can only determine it
  // after the SSR build is complete, so we bump it up here so we can
  // share it between hooks.
  let outputSsrEntryPath: string | null = null;

  return {
    ...makePluginBase("build", { appModule }),

    sharedDuringBuild: true,

    config(config) {
      (config.builder ??= {}).buildApp = async (builder) => {
        const ssrOutput = await builder.build(builder.environments.ssr);

        // `ssrOutput` is `RollupOutput | RollupOutput[] | RollupWatcher`
        // We know it's `RollupOutput` because we're building a single build,
        // so we can assert that here.
        assert("output" in ssrOutput, "Unexpected SSR build output");

        const ssrEntry = ssrOutput.output[0]; // The first chunk is our ssr entry
        outputSsrEntryPath = path.resolve(
          process.cwd(),
          builder.environments.ssr.config.build.outDir,
          ssrEntry.fileName,
        );

        await builder.build(builder.environments.client);
      };
    },

    configEnvironment(name) {
      switch (name) {
        case "ssr":
          return { build: { rollupOptions: { input: ssrEntryId } } };
        case "client":
          return { build: { rollupOptions: { input: indexHtmlId } } };
      }
    },

    async load(name) {
      if (name === indexHtmlId) {
        assert(outputSsrEntryPath, "SSR build was not run before");
        const { default: prerender } = await import(outputSsrEntryPath);
        const html = await prerender({ clientEntryId });
        return { code: html };
      }
    },
  };
};
