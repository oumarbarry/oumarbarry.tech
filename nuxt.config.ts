export default defineNuxtConfig({
  typescript: { shim: false },

  experimental: { inlineSSRStyles: false },

  css: ['@unocss/reset/tailwind.css'],

  extends: ['nuxt-umami'],

  appConfig: {
    umami: {
      host: 'https://analytics.umami.is/',
      id: 'effc3b45-3867-4450-9619-6f09ca678745',
      ignoreLocalhost: true,
      version: 2,
    },
  },

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
