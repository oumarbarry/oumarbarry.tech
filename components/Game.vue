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
  --at-apply: flex justify-center;
}

.game-canvas {
  --at-apply: "relative w-full max-w-640px h-450px mt-20px"
}

canvas {
  --at-apply: "w-full h-50vh lg:h-450px top-0 left-0 relative m-auto";
}
</style>
