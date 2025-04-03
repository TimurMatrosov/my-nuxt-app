// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/my-nuxt-app/', // Correct base URL for GitHub Pages
  },
  
  
  ssr: true,
});