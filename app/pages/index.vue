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

          <nav class="home-editorial-nav" aria-label="Explore this site">
            <div class="home-editorial-item">
              <span class="home-editorial-heading">
                <NuxtLink to="/work" class="home-editorial-command">
                  <span class="home-editorial-title">&gt; cd /work</span>
                </NuxtLink>
                <span class="status-badge">building</span>
              </span>
              <span class="home-editorial-description">
                some of the stuff i've built and the problems i ran into along the way.
              </span>
            </div>
            <div class="home-editorial-item">
              <span class="home-editorial-heading">
                <NuxtLink to="/blog" class="home-editorial-command">
                  <span class="home-editorial-title">&gt; cd /blog</span>
                </NuxtLink>
                <span class="status-badge">soon</span>
              </span>
              <span class="home-editorial-description">
                notes on tech, manga, and whatever else is on my mind.
              </span>
            </div>
          </nav>
        </article>
      </section>
    </div>
  </main>
</template>
