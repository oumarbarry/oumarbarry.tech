<template>
  <main class="home-shell">
    <div class="site-rails content-rails">
      <section class="content-panel">
        <article class="home-copy">
          <h1 class="home-title">
            <span>Ohayo</span>
            <span class="wave" aria-hidden="true">🖖🏾</span>
          </h1>

          <p>
            hey, i'm <span class="strong">oumar</span>. i spend most of my time building stuff,
            fixing problems, and trying to understand how things work.
          </p>

          <p>
            outside of code, i'm into manga, anime, gaming, cycling, swimming, and space. if i'm not
            on github, i'm probably reading manga, and there's a very good chance it's one piece.
          </p>

          <p>want to talk tech or argue about the latest chapter? send me a message.</p>

          <p>you can find and contact me via social media or email.</p>

          <ul class="contact-list">
            <li>
              <span class="contact-label">
                <Icon name="carbon:logo-x" size="14px" />
                <span class="contact-name">twitter</span>
              </span>
              <NuxtLink to="https://x.com/obwann8" target="_blank" class="contact-handle-link">
                @obwann8
              </NuxtLink>
            </li>
            <li>
              <span class="contact-label">
                <Icon name="carbon:logo-bluesky" size="14px" />
                <span class="contact-name">bluesky</span>
              </span>
              <NuxtLink
                to="https://bsky.app/profile/did:plc:cqi3s7yscf7gtht3tg5osdqu"
                target="_blank"
                class="contact-handle-link"
              >
                @oumarbarry.tech
              </NuxtLink>
            </li>
            <li>
              <span class="contact-label">
                <Icon name="carbon:email" size="14px" />
                <span class="contact-name">email</span>
              </span>
              <a href="mailto:oumar379@proton.me" class="contact-handle-link">
                oumar379@proton.me
              </a>
            </li>
            <li>
              <span class="contact-label">
                <Icon name="carbon:logo-github" size="14px" />
                <span class="contact-name">github</span>
              </span>
              <NuxtLink
                to="https://github.com/oumarbarry"
                target="_blank"
                class="contact-handle-link"
              >
                @oumarbarry
              </NuxtLink>
            </li>
            <li>
              <span class="contact-label">
                <Icon name="carbon:logo-discord" size="14px" />
                <span class="contact-name">discord</span>
              </span>
              <span class="contact-handle">@oumar7</span>
            </li>
          </ul>

          <section class="home-destinations" aria-label="more">
            <div class="home-destination">
              <div class="destination-heading">
                <!-- eslint-disable-next-line link-checker/valid-route, link-checker/valid-sitemap-link -->
                <NuxtLink to="/work" class="destination-link" data-link-checker-ignore>
                  work
                </NuxtLink>
                <span class="status-badge">building</span>
              </div>
              <p class="destination-copy">
                some of the stuff i've built and the problems i ran into along the way.
              </p>
            </div>

            <div class="home-destination">
              <div class="destination-heading">
                <NuxtLink to="/blog" class="destination-link">blog</NuxtLink>
                <span class="status-badge">soon</span>
              </div>
              <p class="destination-copy">notes on tech, manga, and whatever else is on my mind.</p>
            </div>
          </section>
        </article>
      </section>
    </div>
  </main>
</template>
