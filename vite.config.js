import legacy from "@vitejs/plugin-legacy";
import {globSync} from "glob";
import { resolve } from 'path';
import autoprefixer from "autoprefixer";
import handlebars from 'vite-plugin-handlebars';

const isProd = process.env.NODE_ENV === "production" || null;

const buildFolder = "__build__";
const assetsFolder = "___assets__";
const isLegacy = false; // set True if you want to support older browsers or < ES2015

console.log(handlebars)

export default {
    root: "./src",
    build: {
        rollupOptions: {
            input: globSync(resolve(__dirname, 'src/**/*.html')),
            output: {
                entryFileNames: `${buildFolder}/js/[name].js`,
                chunkFileNames: `${buildFolder}/chunks/[name].js`,
                assetFileNames: (e) => {
                    if (/\.css$/.test(e.name))
                        return `${buildFolder}/css/[name].[hash].css`;

                    return `${buildFolder}/images/[name].[hash].[ext]`;
                },
            },
        },
        outDir: "../dist",
        assetsDir: assetsFolder,
        emptyOutDir: true,
        clear: true,
    },
    css: {
        postcss: {
            plugins: isProd && [
                autoprefixer({ grid: "autoplace" }),
            ],
        },
    },
    plugins: [
        isLegacy &&
        legacy({
            targets: ["defaults"],
        }),
        handlebars({
            partialDirectory: resolve(__dirname, 'src/partials'),
        }),
    ],
};