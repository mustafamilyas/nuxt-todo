import * as path from "path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vitest/config";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";

const r = (p: string) => path.resolve(__dirname, p);

export default defineConfig({
  plugins: [
    vue(),
    Components({ dirs: ["./components"] }),
    AutoImport({
      imports: ["vue", "vitest", "pinia"],
      dirs: ["./components", "./composables"],
      dts: true,
    }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    globalSetup: "./vitest.global-setup.ts",
  },
  resolve: {
    alias: {
      "~": r("."),
    },
  },
});
