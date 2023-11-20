<template>
  <main>
    <section class="grid grid-cols-1 gap-y-15 px-5 pb-15 pt-10 2xl:grid-cols-2 md:gap-y-20 xl:gap-x-20 lg:px-40 md:px-15">
      <article class="text-justify text-base leading-7 text-[#555557] space-y-6">
        <h1 class="text-3xl">
          Ohayo <Icon name="🖖🏾" />
        </h1>

        <p>
          My name is <span font-500>Oumar Barry</span>.
          I'm a passionate problem solver who enjoys exploring new technologies and taking on new challenges.
        </p>

        <p>
          In my life, I hold four primary passions close to heart: coding, manga/anime, gaming, and the captivating field of astronomy/space.
          When I step away from coding or delving into Github, you'll often find me immersed in the pages of a manga.
        </p>

        <p>
          Feel free to reach out to me anytime to chat about tech, or the latest chapter of One Piece... <br>
          <a
            href="mailto:hi@oumarbarry.tech"
            class="text-gray-500 underline underline-offset-1.8 decoration-dashed hover:no-underline"
          >
            cd email
          </a>
        </p>
      </article>

      <ClientOnly>
        <div class="flex items-start">
          <Game />
        </div>
        <template #fallback>
          <div class="flex items-center justify-center">
            <Icon name="i-svg-spinners-bars-rotate-fade" />
          </div>
        </template>
      </ClientOnly>
    </section>

    <div class="mb-7 mt-5 flex items-center justify-center">
      <img src="~/assets/images/ikigai.png" alt="Ikigai" class="w-87vw md:w-60vw xl:w-520px">
    </div>
  </main>
</template>
