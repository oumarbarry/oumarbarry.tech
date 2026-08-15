<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(`blog-${route.path}`, () => {
  return queryCollection("blog").path(route.path).first()
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Post not found",
  })
}

useSeoMeta({
  title: () => `${post.value?.title} - Oumar Barry`,
  description: () => post.value?.description,
})
</script>

<template>
  <main class="page-grid">
    <div class="site-rails content-rails">
      <article v-if="post" class="content-panel">
        <header class="article-header">
          <NuxtLink to="/blog" class="back-link">back to blog</NuxtLink>
          <p class="post-meta">
            {{
              new Date(post.date).toLocaleDateString("en", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })
            }}
          </p>
          <h1>{{ post.title }}</h1>
          <p v-if="post.description">{{ post.description }}</p>
        </header>

        <ContentRenderer :value="post" class="article-body" />
      </article>
    </div>
  </main>
</template>
