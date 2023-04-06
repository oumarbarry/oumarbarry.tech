export default defineNuxtConfig({
  typescript: { shim: false },

  experimental: { inlineSSRStyles: false },

  css: ['@unocss/reset/tailwind.css'],

  modules: [
    'nuxt-icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    '@kevinmarrec/nuxt-pwa',
    '@vue-macros/nuxt',
  ],

  pwa: {
    manifest: { name: '' },
    workbox: { enabled: false },
  },
})
