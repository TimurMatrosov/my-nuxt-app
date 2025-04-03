// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  app: {
    baseURL: '/my-nuxt-app/', // Correct base URL for GitHub Pages
  },
  router: {
    options: {
      hashMode: true, // Enable hash mode for routing
    },
  },
  // Disable server-side rendering for static deployment
  ssr: false,
});