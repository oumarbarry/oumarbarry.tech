<script setup lang="ts">
onMounted(() => {
  startGame({ selector: "#game", title: "Welcome !", autoPlay: false })
})
</script>

<!-- <template>
  <div class="game-container">
    <div id="game" class="game-canvas" />
  </div>
</template> -->

<template>
  <div id="game" />
</template>

<style>
.game-container {
  display: flex;
  justify-content: center;
}

.game-canvas {
  width: 100%;
  max-width: 640px; /* Adjust the maximum width as needed */
  height: 450px; /* Adjust the height as needed */
  position: relative;
  margin-top: 20px; /* Adjust the top margin as needed */
}

canvas {
  @apply: w-full h-50vh lg:h-450px top-0 left-0 relative m-auto;
}
</style>
