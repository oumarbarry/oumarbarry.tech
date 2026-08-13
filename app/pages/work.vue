<script setup lang="ts">
const title = "Selected Work"
const description =
  "AI platforms, developer tools, payments and internet infrastructure built by Oumar Barry in Conakry, Guinea."

useSeoMeta({
  title,
  description,
  ogTitle: `${title} - Oumar Barry`,
  ogDescription: description,
  ogType: "profile",
  ogUrl: "https://oumarbarry.tech/work",
  ogImage: "https://oumarbarry.tech/work-og.png",
  ogImageAlt: "Oumar Barry - Selected Work",
  twitterCard: "summary_large_image",
  twitterTitle: `${title} - Oumar Barry`,
  twitterDescription: description,
  twitterImage: "https://oumarbarry.tech/work-og.png",
})
</script>

<template>
  <main class="work-shell">
    <div class="site-rails work-rails">
      <section class="work-hero" aria-labelledby="work-title">
        <div class="work-hero-copy">
          <p class="work-kicker">Software architect · Conakry, Guinea</p>
          <h1 id="work-title" class="work-title">
            I build software for problems that are impossible to ignore when you live in Guinea.
          </h1>
          <p class="work-lede">
            My work spans AI systems, payments, internet infrastructure, open source, and products
            shaped by African realities. Some of it is public. Some is private work I can walk
            through in a call.
          </p>

          <div class="work-actions" aria-label="Portfolio actions">
            <a class="work-button work-button-primary" href="/oumar-barry-resume.pdf" download>
              <Icon name="carbon:document-pdf" size="16px" />
              Download resume
            </a>
            <NuxtLink class="work-button" to="https://github.com/oumarbarry" target="_blank">
              <Icon name="carbon:logo-github" size="16px" />
              GitHub
            </NuxtLink>
            <a class="work-button" href="mailto:ob@oumarbarry.tech">
              <Icon name="carbon:email" size="16px" />
              Email me
            </a>
          </div>
        </div>

        <dl class="work-signal-grid" aria-label="Selected engineering signals">
          <div>
            <dt>10 years</dt>
            <dd>building and operating software</dd>
          </div>
          <div>
            <dt>9 services</dt>
            <dd>inside the current o3ai platform</dd>
          </div>
          <div>
            <dt>1,753 TPS</dt>
            <dd>settled by Horizon in a local benchmark</dd>
          </div>
          <div>
            <dt>790 tests</dt>
            <dd>behind Pygmalion before publication</dd>
          </div>
        </dl>
      </section>

      <section class="work-note" aria-labelledby="how-i-work">
        <p class="work-section-index">00 / How I work</p>
        <div>
          <h2 id="how-i-work" class="work-section-title">Product ambition, operational reality.</h2>
          <p>
            I am comfortable taking a product from a blank page to production, but I also stay close
            to the systems underneath it. I recently spent two days on critical service migrations
            for LeaderNet, a Guinean ISP, and got home at 1:30 a.m. after the last one.
          </p>
          <p>
            Most days, I am building with Amadou or turning a recurring product problem into
            infrastructure other products can reuse.
          </p>
        </div>
      </section>

      <section id="featured" class="work-section" aria-labelledby="featured-title">
        <header class="work-section-header">
          <p class="work-section-index">01 / Featured work</p>
          <h2 id="featured-title" class="work-section-title">The work I would show you first.</h2>
        </header>

        <div class="feature-stack">
          <article class="feature-card feature-card-lead">
            <div class="feature-card-head">
              <div>
                <p class="feature-number">01</p>
                <h3>Freddy, ORIA &amp; o3ai</h3>
              </div>
              <span class="status-pill">Private platform · Live products</span>
            </div>

            <div class="feature-lead-grid">
              <div class="feature-copy">
                <p class="feature-intro">Freddy was the beginning.</p>
                <p>
                  Amadou and I started it almost two years ago after running into a basic problem:
                  large AI systems know too little about Africa. Much of the knowledge that matters
                  here has never made it online. A lot of it still exists only on paper.
                </p>
                <p>
                  Every iteration exposed another problem worth solving. That work led to ORIA at
                  the start of 2026, then to o3ai a few months later. We fused the codebases so that
                  Freddy and ORIA could share every improvement instead of evolving apart.
                </p>
                <p>
                  o3ai is now a config-driven, multi-product, nine-service AI platform serving
                  education and legal products through shared infrastructure with isolated data.
                </p>
              </div>

              <aside class="voice-proof" aria-label="Current voice research">
                <p class="voice-label">Current edge · Voice</p>
                <h4>It listens to you, not the room.</h4>
                <p>
                  Our self-hosted speaker gate creates an ephemeral voiceprint, continuously refines
                  it, and suppresses non-matching speech before it reaches the live model's VAD.
                  This is identity-aware filtering, not generic denoising.
                </p>
                <p>
                  After extensive head-to-head testing, I believe we have built the strongest voice
                  product on the market today, including the situations where ChatGPT Voice and
                  Gemini Live lose focus.
                </p>
                <p class="demo-line">Working demo available.</p>
              </aside>
            </div>
          </article>

          <div class="feature-grid">
            <article class="feature-card">
              <div class="feature-card-head">
                <div>
                  <p class="feature-number">02</p>
                  <h3>Pygmalion</h3>
                </div>
                <span class="status-pill status-pre">Pre-publication</span>
              </div>
              <p>
                A Nuxt-native commerce framework where one project provides the API, admin,
                authentication, database and storefront. It already contains 282 API endpoints, 98
                Postgres tables, 32 service modules, 49 admin pages and 14 storefront routes.
              </p>
              <dl class="feature-metrics">
                <div>
                  <dt>282</dt>
                  <dd>API endpoints</dd>
                </div>
                <div>
                  <dt>790</dt>
                  <dd>automated tests</dd>
                </div>
              </dl>
              <p class="feature-footnote">The first npm release is the remaining public step.</p>
            </article>

            <article class="feature-card">
              <div class="feature-card-head">
                <div>
                  <p class="feature-number">03</p>
                  <h3>Infrastructure that has to work</h3>
                </div>
                <span class="status-pill status-live">Production + benchmarked</span>
              </div>
              <p>
                At LeaderNet, I work on critical software, network and infrastructure systems for a
                Guinean ISP. Horizon is my Rust and PostgreSQL instant-payment switch and
                cross-border corridor.
              </p>
              <dl class="feature-metrics">
                <div>
                  <dt>1,753</dt>
                  <dd>settled TPS</dd>
                </div>
                <div>
                  <dt>33 ms</dt>
                  <dd>internal p99</dd>
                </div>
                <div>
                  <dt>315,522</dt>
                  <dd>benchmark transfers</dd>
                </div>
                <div>
                  <dt>0</dt>
                  <dd>non-business errors</dd>
                </div>
              </dl>
            </article>

            <article class="feature-card">
              <div class="feature-card-head">
                <div>
                  <p class="feature-number">04</p>
                  <h3>o3money</h3>
                </div>
                <span class="status-pill status-partner">Visa Global partner work</span>
              </div>
              <p>
                A digital wallet and public-finance platform for Guinea, with an internal
                double-entry ledger and customer and operations surfaces.
              </p>
              <p>
                We have an active partnership with Visa Global. Our team travelled to Côte d'Ivoire
                as part of making it happen. The platform is built; the remaining card-rail work is
                to complete its integration with Visa's platform.
              </p>
              <p class="feature-footnote">Integration in progress.</p>
            </article>

            <article class="feature-card">
              <div class="feature-card-head">
                <div>
                  <p class="feature-number">05</p>
                  <h3>SuperBudget</h3>
                </div>
                <span class="status-pill status-demo">Complete prototype</span>
              </div>
              <p>
                A voice-first personal-finance app. You describe several expenses naturally; the
                system turns them into structured, editable transactions, then grounds an AI adviser
                in the real ledger and renders native charts through tool calls.
              </p>
              <p>
                I am now evaluating small text and speech models that could run directly on a phone,
                with the goal of open-sourcing the project later.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="work-section open-source-section" aria-labelledby="oss-title">
        <header class="work-section-header">
          <p class="work-section-index">02 / Open source</p>
          <h2 id="oss-title" class="work-section-title">
            I turn repeated problems into primitives.
          </h2>
        </header>

        <div class="oss-grid">
          <NuxtLink
            to="https://github.com/oumarbarry/better-auth-py"
            target="_blank"
            class="oss-card oss-card-lead"
          >
            <div class="oss-card-top">
              <span class="status-pill status-public">Public</span>
              <Icon name="carbon:arrow-up-right" size="18px" />
            </div>
            <h3>better-auth-py</h3>
            <p>
              A framework-agnostic Python port of Better Auth with FastAPI, Litestar, Flask and
              Django integrations, 35 social providers and 26 plugins.
            </p>
          </NuxtLink>

          <div class="oss-card">
            <span class="status-pill status-public">Public</span>
            <h3>fastapi-file-routing</h3>
            <p>
              File-based routing for FastAPI, shaped around the ergonomics I wanted in practice.
            </p>
          </div>

          <div class="oss-card">
            <span class="status-pill status-public">Public</span>
            <h3>Mongoz</h3>
            <p>Part of my current return to sustained open-source work in Python.</p>
          </div>

          <div class="oss-card">
            <span class="status-pill status-pre">Pre-publication</span>
            <h3>Pygmalion</h3>
            <p>Will join the public set after its first package release.</p>
          </div>
        </div>

        <p class="oss-more">
          I have also authored more than 20 Nuxt and Nitro starters and contributed across the Nuxt
          ecosystem.
          <NuxtLink to="https://github.com/oumarbarry" target="_blank">
            Explore my GitHub <Icon name="carbon:arrow-up-right" size="14px" />
          </NuxtLink>
        </p>
      </section>

      <section class="work-section" aria-labelledby="more-title">
        <header class="work-section-header">
          <p class="work-section-index">03 / More work</p>
          <h2 id="more-title" class="work-section-title">Different surfaces, same instinct.</h2>
        </header>

        <div class="more-grid">
          <article class="more-card">
            <span class="status-pill">Private build</span>
            <h3>Ozone</h3>
            <p>
              An account-based Layer 1 written from scratch in Rust, with a non-custodial Flutter
              wallet and Nuxt explorer. The current milestone is single-node; P2P and consensus are
              next.
            </p>
          </article>

          <article class="more-card">
            <span class="status-pill">Private build</span>
            <h3>GRIOT</h3>
            <p>
              An end-to-end podcast platform for Francophone Africa: Nuxt listener and creator
              experiences, native Android, and a queue-driven ffmpeg media pipeline.
            </p>
          </article>

          <article class="more-card">
            <span class="status-pill status-planned">Planned for open source</span>
            <h3>Afromaps</h3>
            <p>
              A Guinea-first geolocation stack with self-hosted maps and routing, PostGIS APIs and
              an offline-first Android app seeded with 2,434 real Conakry places.
            </p>
          </article>

          <article class="more-card">
            <span class="status-pill status-planned">Planned for open source</span>
            <h3>o3health</h3>
            <p>
              A French-first offline clinic assistant for Raspberry Pi where deterministic engines
              make triage and dosing decisions and a local LLM is limited to explanation.
            </p>
          </article>

          <article class="more-card">
            <span class="status-pill">Private build</span>
            <h3>pointgn</h3>
            <p>
              An end-to-end platform for discovering, buying and managing .gn domains as operation
              of the national namespace returns to Guinea.
            </p>
          </article>

          <article class="more-card">
            <span class="status-pill">Private build</span>
            <h3>African-folklore Metroidvania</h3>
            <p>
              A browser game built with Phaser and TypeScript. Two playable slices are implemented,
              backed by 189 unit tests.
            </p>
          </article>
        </div>
      </section>

      <section class="work-section public-work-section" aria-labelledby="public-title">
        <header class="work-section-header">
          <p class="work-section-index">04 / Public surfaces</p>
          <h2 id="public-title" class="work-section-title">Other things you can visit now.</h2>
        </header>

        <div class="public-links">
          <NuxtLink to="https://o3studios.org" target="_blank">
            <span>O3 Studios</span>
            <Icon name="carbon:arrow-up-right" size="18px" />
          </NuxtLink>
          <NuxtLink to="https://bieguip.com/" target="_blank">
            <span>BIEGUIP</span>
            <Icon name="carbon:arrow-up-right" size="18px" />
          </NuxtLink>
          <NuxtLink to="https://www.leadernet-gn.com/" target="_blank">
            <span>LeaderNet</span>
            <Icon name="carbon:arrow-up-right" size="18px" />
          </NuxtLink>
        </div>
      </section>

      <section class="work-closing" aria-labelledby="closing-title">
        <p class="work-section-index">05 / Let's talk</p>
        <h2 id="closing-title" class="work-section-title">
          The private work is available for a real walkthrough.
        </h2>
        <p>I can show the architecture, code or a working demo for any of the projects above.</p>
        <div class="work-actions">
          <a class="work-button work-button-primary" href="mailto:ob@oumarbarry.tech">
            Start a conversation
          </a>
          <a class="work-button" href="/oumar-barry-resume.pdf" download>Download resume</a>
        </div>
      </section>
    </div>
  </main>
</template>
