import { defineVitestConfig } from "nuxt-vitest/config";

export default defineVitestConfig({
  test: {
    globalSetup: "./vitest.global-setup.ts",
    globals: true,
    css: {
      modules: {
        classNameStrategy: "non-scoped",
      },
    },
  },
});
