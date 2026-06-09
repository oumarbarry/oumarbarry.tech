<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  siteName?: string
}>()
</script>

<template>
  <div
    class="flex h-full w-full flex-col justify-between px-18 py-16 text-white"
    style="
      background: #050605;
      font-family:
        IBM Plex Mono,
        SFMono-Regular,
        Cascadia Code,
        Menlo,
        Consolas,
        monospace;
    "
  >
    <div class="text-[24px] font-bold" style="color: #f0f2ed">
      [{{ siteName ?? "oumarbarry.tech" }}]
    </div>

    <div class="flex max-w-230 flex-col gap-7">
      <div class="text-[78px] leading-none font-bold">
        {{ title ?? "Oumar Barry" }}
      </div>
      <div v-if="description" class="text-[30px] leading-[1.35]" style="color: #c9cec7">
        {{ description }}
      </div>
    </div>

    <div class="flex items-center justify-between text-[22px]" style="color: #8d968c">
      <span>oumar379@proton.me</span>
      <span style="color: #f0f2ed">github.com/oumarbarry</span>
    </div>
  </div>
</template>
