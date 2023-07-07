export default defineNuxtConfig({
  typescript: { shim: false },

  devtools: { enabled: true },

  app: {
    head: {
      title: 'Oumar Barry\'s Boring Personal Website',
      script: [
        {
          'async': true,
          'src': 'https://analytics.umami.is/script.js',
          'data-website-id': '63c3ff1e-af8b-47ed-814f-5dd299e193e5',
        },
      ],
    },
  },

  css: ['@unocss/reset/tailwind.css'],

  modules: [
    'nuxt-icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@kevinmarrec/nuxt-pwa',
    '@vue-macros/nuxt',
  ],

  pwa: { manifest: { name: '' } },
})
