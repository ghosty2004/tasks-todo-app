import { resolve } from "node:path";
import { swc } from "rollup-plugin-swc3";
import commonjsPlugin from "@rollup/plugin-commonjs";
import jsonPlugin from "@rollup/plugin-json";
import nodeResolvePlugin from "@rollup/plugin-node-resolve";
import tsPaths from "rollup-plugin-tsconfig-paths";

import packageJson from "./package.json" assert { type: "json" };

const tsConfigPath = resolve("tsconfig.json");
const external = Object.keys(packageJson.dependencies);

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
    input: resolve("src", "index.ts"),
    output: {
        file: "dist/index.js",
        format: "cjs",
    },
    plugins: [
        tsPaths({ tsConfigPath }),
        nodeResolvePlugin(),
        jsonPlugin(),
        commonjsPlugin(),
        swc({
            tsconfig: tsConfigPath,
            minify: process.env.NODE_ENV === "production",
            jsc: {
                target: "es2020",
                parser: {
                    syntax: "typescript",
                    dynamicImport: true,
                    decorators: true,
                },
                transform: {
                    legacyDecorator: true,
                    decoratorMetadata: true,
                },
                externalHelpers: true,
                keepClassNames: true,
                loose: true,
            },
        }),
    ],
    external,
};
