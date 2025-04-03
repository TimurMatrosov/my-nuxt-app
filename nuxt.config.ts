// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/my-nuxt-app/', // Set the base URL to match your GitHub repository name
  },

  // Enable server-side rendering
  ssr: true,

  compatibilityDate: '2025-04-02'
});