<script setup lang="ts">
onMounted(() => {
  startGame({ selector: "#game", title: "Welcome !", autoPlay: false })
})
</script>

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
  max-width: 640px;
  height: 450px;
  position: relative;
  margin-top: 20px;
}

canvas {
  --at-apply: "w-full h-50vh lg:h-450px top-0 left-0 relative m-auto";
}
</style>
