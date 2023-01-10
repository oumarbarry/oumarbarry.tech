export default defineNuxtConfig({
  typescript: { shim: false },
  experimental: { reactivityTransform: true },

  modules: [
    'nuxt-icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image-edge',
    '@kevinmarrec/nuxt-pwa',
  ],

  unocss: {
    attributify: true,
  },
  pwa: {
    manifest: { name: '' },
    workbox: { enabled: false }
  }
})
