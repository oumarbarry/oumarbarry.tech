<script setup lang="ts">
import {
  createNavigationMeasurementScheduler,
  formatNavigationStats,
  type NavigationStats,
  type NavigationTimingLike,
} from "~/utils/navigationStats"

const stats = ref<NavigationStats | null>(null)

const scheduler = createNavigationMeasurementScheduler({
  document,
  window,
  measure: () => {
    const navigation = performance.getEntriesByType("navigation")[0] as
      | PerformanceNavigationTiming
      | undefined

    stats.value = formatNavigationStats((navigation ?? {}) as NavigationTimingLike)
  },
})

onMounted(scheduler.start)
onBeforeUnmount(scheduler.cleanup)
</script>

<template>
  <details class="perf-stats" open>
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
        <dt>TTFB:</dt>
        <dd>{{ stats.ttfb }}</dd>
      </div>
      <div>
        <dt>Page load:</dt>
        <dd>{{ stats.duration }}</dd>
      </div>
    </dl>

    <p v-else>Measuring...</p>
  </details>
</template>
