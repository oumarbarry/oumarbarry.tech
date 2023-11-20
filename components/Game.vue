<script setup>
async function startGame() {
  const { startGame } = await import('https://cdn.jsdelivr.net/gh/pi0/space-invaders/index.js')
  startGame({ selector: '#game', title: 'Welcome !' })
}

onMounted(() => { startGame() })
</script>

<template>
  <div id="game" class="w-full" />
</template>

<style>
canvas {
  @apply: w-full h-50vh lg:h-450px top-0 left-0 relative m-auto;
}
</style>
