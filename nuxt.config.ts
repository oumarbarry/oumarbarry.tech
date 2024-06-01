export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: "Oumar Barry's Boring Personal Website",
      link: [{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
      script: [
        {
          "async": true,
          "src": "https://analytics.umami.is/script.js",
          "data-website-id": "63c3ff1e-af8b-47ed-814f-5dd299e193e5",
        },
      ],
    },
  },

  css: ["@unocss/reset/tailwind.css"],

  routeRules: {
    "/projects": { redirect: import.meta.env.NOTION_PORTFOLIO },
  },

  experimental: { componentIslands: true },

  modules: [
    "@nuxt/eslint",
    "@vue-macros/nuxt",
    "@vueuse/nuxt",
    "@unocss/nuxt",
    "nuxt-icon",
    "nuxt-clarity-analytics",
  ],

  eslint: { config: { standalone: false } },
})
