<script setup lang="ts">
const stats = ref({
  protocol: "h2",
  transfer: "0 bytes",
  request: "0.0 ms",
  duration: "0.0 ms",
})

onMounted(() => {
  const navigation = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined

  if (!navigation) return

  stats.value = {
    protocol: navigation.nextHopProtocol || "h2",
    transfer: `${navigation.transferSize || 0} bytes`,
    request: `${Math.max(0, navigation.responseStart - navigation.requestStart).toFixed(1)} ms`,
    duration: `${navigation.duration.toFixed(1)} ms`,
  }
})
</script>

<template>
  <details class="perf-stats">
    <summary>Perf Stats</summary>

    <dl>
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
  </details>
</template>
