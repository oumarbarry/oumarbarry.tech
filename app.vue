<script setup lang="ts">
useHead({ title: 'Oumar Barry\'s Boring Personal Website' })
</script>

<template>
  <div class="min-h-screen">
    <header class="flex items-center justify-between px-5 py-5 lg:px-30 md:px-10">
      <NuxtLink to="/">
        <Logo class="h-12 w-12 transition-all duration-150 ease-in-out hover:fill-gray-500" />
      </NuxtLink>

      <div class="flex items-center gap-x-8">
        <NuxtLink
          to="https://oumarbarry.notion.site/Oumar-Barry-4c46c1855f244f61b8f122837f19dda7"
          target="_blank"
          class="text-black no-underline transition-all duration-150 ease-in-out hover:text-gray-500"
        >
          Projects
        </NuxtLink>

        <NuxtLink
          to="https://github.com/oumarbarry"
          target="_blank"
          class="flex items-center justify-center"
        >
          <Icon name="carbon-logo-github" size="25px" class="text-black transition-all duration-150 ease-in-out hover:text-gray-500" />
        </NuxtLink>
      </div>
    </header>

    <main>
      <section class="grid grid-cols-1 gap-y-15 px-6 pb-15 pt-13 2xl:grid-cols-2 md:gap-y-20 xl:gap-x-30 lg:px-45 md:px-15">
        <article class="text-justify text-gray-700 space-y-4">
          <h1 class="text-3xl">
            Ohayo <Icon name="🖖🏾" />
          </h1>

          <p>
            I'm Oumar Barry. <br> <br>
            Just a human passionate about building innovative solutions and being exposed to new challenges and technologies.
          </p>

          <br>

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

          <br>

          <p>
            Don't hesitate to write to me to discuss tech, music, or the lastest chapter of One Piece.
            (<a class="text-gray-500" href="mailto:oumar.barry1202@gmail.com">cd email</a>)
          </p>
        </article>

        <NuxtLink
          to="https://ikigaitribe.com/ikigai/ikigai-worksheet/"
          target="_blank"
          class="flex justify-center"
        >
          <NuxtImg src="/ikigai.png" format="webp" sizes="sm:87vw md:60vw lg:500px xl:620px" alt="Understanding Ikigai" />
        </NuxtLink>
      </section>
    </main>

    <Plum />

    <footer class="bottom-0 w-screen py-5 text-center text-sm text-gray-400">
      &copy; 2023 Oumar Barry
    </footer>
  </div>
</template>
