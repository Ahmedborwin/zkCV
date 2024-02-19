import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill"
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill"

export default defineConfig({
    plugins: [react()],
    server: {
        host: "0.0.0.0",
    },
    define: {
        "process.env": process.env,
    },
    ptimizeDeps: {
        esbuildOptions: {
            // Enable esbuild polyfill plugins
            plugins: [
                NodeGlobalsPolyfillPlugin({
                    process: true,
                    buffer: true,
                }),
                NodeModulesPolyfillPlugin(),
            ],
        },
    },
    build: {
        target: ["esnext"],
    },
})
