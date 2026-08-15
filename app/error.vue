<script setup lang="ts">
import type { NuxtError } from "#app"
import { getErrorPageContent } from "~/utils/error-page"

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error.status || props.error.statusCode || 500)
const content = computed(() => getErrorPageContent(statusCode.value))

useHead({
  title: () => `${statusCode.value} — oumarbarry.tech`,
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})

function goHome() {
  clearError({ redirect: "/" })
}

function retry() {
  if (import.meta.client) window.location.reload()
}
</script>

<template>
  <div class="error-shell">
    <header class="site-header">
      <div class="site-rails header-rails">
        <a href="/" class="site-brand" @click.prevent="goHome">[oumarbarry.tech]</a>
      </div>
    </header>

    <main class="error-main">
      <div class="site-rails content-rails">
        <section class="content-panel error-panel">
          <article class="error-copy">
            <h1 class="error-code">{{ statusCode }}</h1>
            <p class="error-message">{{ content.message }}</p>

            <div class="error-actions">
              <button
                v-if="content.canRetry"
                type="button"
                class="error-action error-retry"
                @click="retry"
              >
                try again
              </button>
              <a href="/" class="error-action error-home-link" @click.prevent="goHome">
                ← konoha is this way
              </a>
            </div>
          </article>
        </section>
      </div>
    </main>
  </div>
</template>
