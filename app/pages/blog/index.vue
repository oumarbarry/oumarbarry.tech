<script setup lang="ts">
const { data: posts } = await useAsyncData("blog-posts", () => {
  return queryCollection("blog").where("draft", "=", false).order("date", "DESC").all()
})

useSeoMeta({
  title: "Blog",
  description: "Blog - Oumar Barry.",
  ogTitle: "Blog - Oumar Barry",
  ogDescription: "Blog - Oumar Barry.",
  twitterTitle: "Blog - Oumar Barry",
  twitterDescription: "Blog - Oumar Barry.",
})

defineOgImage("Oumar", {
  title: "Blog",
  description: "oumarbarry.tech",
  siteName: "oumarbarry.tech",
})
</script>

<template>
  <main class="page-grid">
    <section class="blog-shell">
      <header class="blog-header">
        <h1>Blog</h1>
      </header>

      <div class="blog-list-wrap">
        <ul v-if="posts?.length" class="post-list">
          <li v-for="post in posts" :key="post.id">
            <NuxtLink :to="post.path">
              <span>{{ post.title }}</span>
              <time>{{
                new Date(post.date).toLocaleDateString("en", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              }}</time>
            </NuxtLink>
          </li>
        </ul>

        <p v-else class="muted">No published notes yet.</p>
      </div>
    </section>
  </main>
</template>
