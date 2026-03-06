import { defineConfig } from "tsdown";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    publint: true,
    platform: "neutral",
    exports: true,
    sourcemap: true,
    deps: {
        neverBundle: [],
    },
    format: {
        esm: {
            target: ["es2015"]
        },
        cjs: {
            target: ["node20"]
        }
    }
});
