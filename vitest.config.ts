import { defineConfig } from "vitest/dist/config";

export default defineConfig({
  test: {
    globalSetup: "./vitest.global-setup.ts",
    // ...
  },
});
