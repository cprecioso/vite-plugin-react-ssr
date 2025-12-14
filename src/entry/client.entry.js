import { createElement } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "/@vite-plugin-react-ssr/app";

hydrateRoot(document, createElement(App));
