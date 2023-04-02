export default defineNuxtConfig({
  typescript: { shim: false },

  experimental: { inlineSSRStyles: false, reactivityTransform: true  },

  css: ['@unocss/reset/tailwind.css'],

  modules: [
    'nuxt-icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    '@kevinmarrec/nuxt-pwa',
  ],

  pwa: {
    manifest: { name: '' },
    workbox: { enabled: false }
  }
})
