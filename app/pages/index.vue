<template>
  <main class="home-shell">
    <div class="site-rails home-rails">
      <section class="home-panel">
        <article class="home-copy">
          <h1 class="home-title">
            <span>Ohayo</span>
            <span class="wave" aria-hidden="true">🖖🏾</span>
          </h1>

          <p>
            My name is <span class="strong">Oumar Barry</span>. I'm a passionate problem solver who
            enjoys exploring new technologies and taking on new challenges.
          </p>

          <p>
            Outside of coding, I'm passionate about manga/anime, gaming, cycling/swimming, and
            astronomy/space. When I step away from coding or delving into Github, you'll often find
            me immersed in the pages of a manga.
          </p>

          <p>
            Feel free to reach out to me anytime to chat about tech, or the latest chapter of One
            Piece...
          </p>

          <h2>Contact</h2>
          <p>You can find and contact me via social media or email.</p>

          <ul class="contact-list">
            <li>
              <NuxtLink to="https://x.com/OumarBarry59799" target="_blank">
                <Icon name="carbon:logo-x" size="14px" />
                Twitter
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="https://bsky.app/profile/oumarbarry.bsky.social" target="_blank">
                <Icon name="carbon:logo-bluesky" size="14px" />
                Bluesky
              </NuxtLink>
            </li>
            <li>
              <a href="mailto:oumar379@proton.me">
                <Icon name="carbon:email" size="14px" />
                Email
              </a>
            </li>
            <li>
              <NuxtLink to="https://github.com/oumarbarry" target="_blank">
                <Icon name="carbon:logo-github" size="14px" />
                GitHub
              </NuxtLink>
            </li>
            <li>
              <span class="contact-muted">
                <Icon name="carbon:logo-discord" size="14px" />
                Discord @oumar7
              </span>
            </li>
          </ul>

          <nav class="home-editorial-nav" aria-label="Explore this site">
            <NuxtLink to="/work" class="home-editorial-link">
              <span class="home-editorial-title">&gt; work</span>
              <span class="home-editorial-description">
                some of the stuff i've built and the problems i ran into along the way.
              </span>
            </NuxtLink>
            <NuxtLink to="/blog" class="home-editorial-link">
              <span class="home-editorial-title">&gt; blog</span>
              <span class="home-editorial-description">
                notes on tech, manga, and whatever else is on my mind.
              </span>
            </NuxtLink>
          </nav>
        </article>
      </section>
    </div>
  </main>
</template>
