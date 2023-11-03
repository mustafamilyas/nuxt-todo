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
});
