<script setup lang="ts">
interface TerminalNavItem {
  command: string
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
          <span class="terminal-nav-prompt" aria-hidden="true">&gt;</span>
          <span class="terminal-nav-command">{{ item.command }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.terminal-nav {
  width: min(100%, var(--content));
  margin: 0 auto;
  border-top: 1px solid var(--line);
  padding: 1rem 1.05rem 1.15rem;
  background-image: radial-gradient(circle, rgba(240, 242, 237, 0.08) 1px, transparent 1px);
  background-position: 1.05rem 1rem;
  background-size: 14px 14px;
}

.terminal-nav-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.terminal-nav-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  gap: 0.45rem;
  color: var(--dim);
  font-size: 0.82rem;
  text-decoration: none;
}

.terminal-nav-prompt,
.terminal-nav-command {
  color: var(--dim);
}

.terminal-nav-command {
  text-underline-offset: 0.22em;
}

.terminal-nav-link:hover .terminal-nav-command {
  color: var(--text);
  text-decoration: underline;
}

.terminal-nav-link:focus-visible {
  border-radius: 2px;
  outline: 1px dashed var(--dim);
  outline-offset: 3px;
}

@media (max-width: 520px) {
  .terminal-nav-list {
    flex-direction: column;
    gap: 0;
  }
}
</style>
