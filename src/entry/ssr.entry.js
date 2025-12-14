import { text } from "node:stream/consumers";
import { createElement } from "react";
import * as reactStatic from "react-dom/static";
import App from "/@vite-plugin-react-ssr/app";

const prerender = async ({ clientEntryId }) => {
  const { prelude } = await reactStatic.prerenderToNodeStream(
    createElement(App),
    { bootstrapModules: [{ src: clientEntryId }] },
  );
  return await text(prelude);
};

if (import.meta.hot) {
  import.meta.hot.accept();
}

export default prerender;
