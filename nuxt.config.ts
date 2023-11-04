// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@pinia/nuxt",
    [
      "@nuxtjs/google-fonts",
      {
        Lato: true,
      },
    ],
    "nuxt-svgo",
  ],
  runtimeConfig: {
    public: {
      apiBe: "",
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  css: ["~/assets/styles/global.css"],
});
