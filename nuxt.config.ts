export default defineNuxtConfig({
  app: {
    head: {
      title: 'Oumar Barry\'s Boring Personal Website',
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
      script: [
        {
          'async': true,
          'src': 'https://analytics.umami.is/script.js',
          'data-website-id': '63c3ff1e-af8b-47ed-814f-5dd299e193e5',
        },
      ],
    },
    pageTransition: false,
    layoutTransition: false,
  },

  css: ['@unocss/reset/tailwind.css'],

  typescript: { shim: false },
  devtools: { enabled: true },

  experimental: {
    typescriptBundlerResolution: true,
    componentIslands: true,
    typedPages: true,
  },

  modules: [
    'nuxt-icon',
    '@unocss/nuxt',
    '@vueuse/nuxt',
    '@vue-macros/nuxt',
    'nuxt-viewport',
  ],
})
