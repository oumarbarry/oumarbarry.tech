<script setup lang="ts">
const stats = ref<{
  protocol: string
  transfer: string
  request: string
  duration: string
} | null>(null)

onMounted(() => {
  const navigation = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined

  if (!navigation) return

  stats.value = {
    protocol: navigation.nextHopProtocol || "n/a",
    transfer: navigation.transferSize ? `${navigation.transferSize} bytes` : "cached",
    request: `${Math.max(0, navigation.responseStart - navigation.requestStart).toFixed(1)} ms`,
    duration: `${navigation.duration.toFixed(1)} ms`,
  }
})
</script>

<template>
  <details class="perf-stats">
    <summary>Perf Stats</summary>

    <dl v-if="stats">
      <div>
        <dt>Protocol:</dt>
        <dd>{{ stats.protocol }}</dd>
      </div>
      <div>
        <dt>Transfer:</dt>
        <dd>{{ stats.transfer }}</dd>
      </div>
      <div>
        <dt>Request:</dt>
        <dd>{{ stats.request }}</dd>
      </div>
      <div>
        <dt>Duration:</dt>
        <dd>{{ stats.duration }}</dd>
      </div>
    </dl>

    <p v-else>Measuring...</p>
  </details>
</template>
