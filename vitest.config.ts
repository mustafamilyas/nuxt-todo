import { defineVitestConfig } from "nuxt-vitest/config";

export default defineVitestConfig({
  test: {
    globalSetup: "./vitest.global-setup.ts",
  },
});
