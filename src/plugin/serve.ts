import assert from "node:assert";
import { isRunnableDevEnvironment, Plugin } from "vite";
import { clientEntryId, ssrEntryId } from "../common";
import { makePluginBase } from "./base";

/*
  This plugin handles SSR during `vite dev` by intercepting requests to `/`
  and responding with the server-rendered HTML.
*/

export const makeServePlugin = ({
  appModule,
}: {
  appModule: string;
}): Plugin => ({
  ...makePluginBase("serve", { appModule }),

  configureServer(server) {
    const ssrEnv = server.environments.ssr;
    assert(isRunnableDevEnvironment(ssrEnv));

    server.middlewares.use(async (req, res, next) => {
      if (req.url === "/") {
        const { default: prerender } = await ssrEnv.runner.import(ssrEntryId);

        const html = await prerender({ clientEntryId });
        const transformedHtml = await server.transformIndexHtml(req.url, html);

        res.setHeader("Content-Type", "text/html");
        res.end(transformedHtml);
        return;
      }

      return next();
    });
  },
});
