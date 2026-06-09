<script setup lang="ts">
const title = "Oumar Barry"
const description =
  "Personal website of Oumar Barry, a developer interested in technology, manga, gaming, cycling, swimming, and space."

useHead({
  htmlAttrs: {
    lang: "en",
    class: "dark",
  },
  bodyAttrs: {
    class: "antialiased",
  },
  titleTemplate: (pageTitle) => {
    if (!pageTitle || pageTitle === title) return title
    return `${pageTitle} - ${title}`
  },
  meta: [
    { name: "theme-color", content: "#050605" },
    { name: "color-scheme", content: "dark" },
  ],
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: "website",
  ogUrl: "https://oumarbarry.tech",
  ogSiteName: title,
  ogLocale: "en_US",
  twitterCard: "summary_large_image",
  twitterSite: "@OumarBarry59799",
  twitterCreator: "@OumarBarry59799",
  twitterTitle: title,
  twitterDescription: description,
  author: title,
})

defineOgImage("Oumar", {
  title,
  description: "oumarbarry.tech",
  siteName: "oumarbarry.tech",
})
</script>

<template>
  <div class="site-shell min-h-screen">
    <Header />

    <NuxtPage />

    <Footer />
  </div>
</template>
