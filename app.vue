<script setup lang="ts">
useHead({
  title: "Oumar Barry's Boring Personal Website",
  script: [{
    src: "https://oackeee.vercel.app/tracker.js",
    "data-ackee-server": "https://oackeee.vercel.app",
    "data-ackee-domain-id": "2a3d9283-90f7-40d6-a338-09b29e911707"
  }]
})
</script>

<template>
  <div class="min-h-screen">
    <header class="flex justify-between items-center px-5 py-5 md:px-10 lg:px-30">
      <NuxtLink to="/">
        <Logo class="w-12 h-12 transition-all duration-150 ease-in-out hover:fill-gray-500" />
      </NuxtLink>

      <NuxtLink to="https://github.com/oumarbarry" target="_blank">
        <Icon name="carbon-logo-github" size="25px"
          class="text-black transition-all duration-150 ease-in-out hover:text-gray-500" />
      </NuxtLink>
    </header>

    <main>
      <section class="grid grid-cols-1 2xl:grid-cols-2 gap-y-15 md:gap-y-20 xl:gap-x-30 px-6 py-15 md:px-15 lg:px-45">

        <article class="space-y-4 text-gray-700 text-justify">
          <h1 class="text-3xl">
            Ohayo
            <Icon name="🖖🏾" />
          </h1>

          <p>
            I'm Oumar Barry.
            Just a human passionate about building innovative solutions and being exposed to new challenges and
            technologies.
          </p>

          <br />

          <p>I have 3 main passions in life:</p>
          <ul class="space-y-3">
            <li list-square>
              <span font-bold>CODING</span>.
              Code is Art
              <Icon name="✨" />. Creating/building/shaping things with code, what a pleasure
              <Icon name="🤩" />.
            </li>
            <li list-square>
              <span font-bold>MUSIC</span>.
              I listen to almost everything, but what I listen to the most is French Rap.
            </li>
            <li list-square>
              And finally <span font-bold>MANGA/ANIME</span>. What to say
              <Icon name="🤩" />
              <Icon name="✨" /> !
            </li>
          </ul>

          <br />

          <p>
            Don't hesitate to write to me to discuss tech, music, or the lastest chapter of One Piece.
            (<a class="text-gray-500" href="mailto:oumar.barry1202@gmail.com">cd email</a>)
          </p>
        </article>

        <NuxtLink to="https://ikigaitribe.com/ikigai/ikigai-worksheet/" target="_blank" class="flex justify-center">
          <NuxtImg src="/ikigai.png" format="webp" sizes="sm:87vw md:60vw lg:500px xl:620px" alt="IKIGAI" />
        </NuxtLink>

      </section>
    </main>

    <Plum />

    <footer class="w-screen bottom-0 py-5 text-sm text-gray-400 text-center">
      &copy; 2022 Oumar Barry
    </footer>
  </div>
</template>

<style>
html,
body {
  margin: 0;
}
</style>
