<script setup lang="ts">
interface TerminalNavItem {
  label: string
  to: string
}

defineProps<{
  items: readonly TerminalNavItem[]
}>()
</script>

<template>
  <nav class="terminal-nav" aria-label="terminal navigation">
    <ul class="terminal-nav-list">
      <li v-for="item in items" :key="item.to">
        <NuxtLink :to="item.to" class="terminal-nav-link">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
