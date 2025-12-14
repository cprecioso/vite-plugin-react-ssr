import { Plugin } from "vite";
import { makeBuildPlugin } from "./plugin/build";
import { makeServePlugin } from "./plugin/serve";

export const reactSsr = ({ appModule }: { appModule: string }): Plugin[] => [
  makeServePlugin({ appModule }),
  makeBuildPlugin({ appModule }),
];
