<script setup lang="ts">
useHead({ title: 'Oumar Barry\'s Boring Personal Website' })
</script>

<template>
  <div class="font-roboto min-h-screen">
    <header class="flex items-center justify-between px-5 py-5 lg:px-30 md:px-10">
      <NuxtLink to="/">
        <Logo class="h-12 w-12" />
      </NuxtLink>

      <div class="flex items-center gap-x-8">
        <NuxtLink
          to="https://oumarbarry.notion.site/Oumar-Barry-4c46c1855f244f61b8f122837f19dda7"
          target="_blank"
          class="text-gray-500 no-underline transition-all duration-150 ease-in-out hover:text-black"
        >
          Projects
        </NuxtLink>

        <NuxtLink
          to="https://github.com/oumarbarry"
          target="_blank"
          class="flex items-center justify-center"
        >
          <Icon
            name="carbon-logo-github"
            size="25px"
            class="text-gray-500 transition-all duration-150 ease-in-out hover:text-black"
          />
        </NuxtLink>
      </div>
    </header>

    <main>
      <section class="grid grid-cols-1 gap-y-15 px-6 pb-15 pt-10 2xl:grid-cols-2 md:gap-y-20 xl:gap-x-30 lg:px-50 md:px-15">
        <article class="text-justify text-base leading-7 text-#555557 space-y-6">
          <h1 class="text-3xl">
            Ohayo <Icon name="🖖🏾" />
          </h1>

          <p>
            My name is <span font-500>Oumar Barry</span>.
            I'm a passionate problem solver who enjoys exploring new technologies and taking on new challenges.
            <!-- I am an ardent problem solver who loves to push the boundaries of innovation through technology. -->
            <!-- I believe in taking on challenges that are beyond my comfort zone to hone my skills and constantly improve myself. -->
          </p>

          <p>
            My life revolves around three things that keep me fired up: coding, music, and manga/anime. <br>

            Coding, for me, is not just a skill, but an art form - a way of expressing creativity through lines of code. <br>

            When I'm not coding or exploring Github, you can find me enjoying music, usually French rap, or immersing myself in the captivating worlds of manga/anime.
            I love action-packed anime like Attack on Titan, Naruto and  My Hero Academia, but I also particularly enjoy heart-warming slice-of-life stories like Barakamon and Silver Spoon.
          </p>

          <p>
            Feel free to reach out to me anytime to chat about tech, music, or the latest chapter of One Piece. <br>
            <a
              href="mailto:oumar.barry1202@gmail.com"
              class="text-gray-500 underline underline-offset-1.8 decoration-dashed hover:no-underline"
            >
              cd email
            </a>
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
