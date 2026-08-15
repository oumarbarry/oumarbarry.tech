export default defineNuxtConfig({
  compatibilityDate: "2026-06-03",

  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg?v=2" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/icon-32x32.png?v=2" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/icon-16x16.png?v=2" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png?v=2" },
      ],
    },
  },

  css: ["@unocss/reset/tailwind.css", "~/assets/styles/main.css"],

  experimental: { componentIslands: true },

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/seo",
    "@nuxt/scripts",
    "@nuxt/content",
    "@nuxt/icon",
    "@vue-macros/nuxt",
    "@vueuse/nuxt",
    "@unocss/nuxt",
  ],

  site: {
    url: "https://oumarbarry.tech",
    name: "Oumar Barry",
    description:
      "Oumar Barry is a software architect building AI products, developer platforms and infrastructure from Conakry, Guinea.",
    defaultLocale: "en",
    indexable: true,
    trailingSlash: false,
  },

  seo: {
    meta: {
      author: "Oumar Barry",
      applicationName: "Oumar Barry",
      themeColor: "#050605",
      colorScheme: "dark",
      twitterCreator: "@obwann8",
      twitterSite: "@obwann8",
      ogLocale: "en_US",
      ogType: "website",
    },
    fallbackTitle: true,
    redirectToCanonicalSiteUrl: true,
  },

  sitemap: {
    zeroRuntime: true,
    autoLastmod: true,
    urls: ["/work", "/blog"],
    defaults: {
      changefreq: "weekly",
      priority: 0.7,
    },
  },

  robots: {
    enabled: true,
    sitemap: ["/sitemap.xml"],
    blockAiBots: false,
    metaTag: true,
    allow: ["/"],
  },

  schemaOrg: {
    identity: {
      type: "Person",
      name: "Oumar Barry",
      url: "https://oumarbarry.tech",
      email: "oumar379@proton.me",
      sameAs: [
        "https://github.com/oumarbarry",
        "https://x.com/obwann8",
        "https://bsky.app/profile/oumarbarry.bsky.social",
      ],
    },
  },

  ogImage: {
    enabled: true,
    zeroRuntime: true,
    defaults: {
      component: "Oumar",
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7,
      alt: "Oumar Barry - oumarbarry.tech",
    },
  },

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },

  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },

  nitro: {
    externals: {
      inline: ["unhead"],
    },
  },

  eslint: {
    config: {
      standalone: true,
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/work": { prerender: true, ogImage: false },
    "/blog/**": { prerender: true },
    "/robots.txt": { prerender: true },
  },

  runtimeConfig: {
    public: {
      siteUrl: "https://oumarbarry.tech",
    },
  },

  $production: {
    sourcemap: {
      server: false,
      client: false,
    },
    scripts: {
      registry: {
        umamiAnalytics: {
          hostUrl: "https://analytics.umami.is",
          websiteId: "63c3ff1e-af8b-47ed-814f-5dd299e193e5",
          scriptInput: {
            src: "https://analytics.umami.is/script.js",
          },
          scriptOptions: {
            bundle: false,
          },
          trigger: "onNuxtReady",
        },
      },
    },
  },
})
