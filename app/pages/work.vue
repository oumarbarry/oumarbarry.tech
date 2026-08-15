<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue"

const title = "Selected Work"
const description =
  "AI products, open-source developer tools, payment systems and internet infrastructure built by Oumar Barry in Conakry, Guinea, West Africa."

const terminalItems = [
  { label: "> cd ..", to: "/" },
  { label: "> cd /blog", to: "/blog" },
] as const

useSeoMeta({
  title,
  description,
  ogTitle: `${title} - Oumar Barry`,
  ogDescription: description,
  ogType: "profile",
  ogUrl: "https://oumarbarry.tech/work",
  ogImage: "https://oumarbarry.tech/work-og.png",
  ogImageAlt: "Oumar Barry - Selected Work",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  twitterCard: "summary_large_image",
  twitterTitle: `${title} - Oumar Barry`,
  twitterDescription: description,
  twitterImage: "https://oumarbarry.tech/work-og.png",
  twitterImageAlt: "Oumar Barry - Selected Work",
})

let revealObserver: IntersectionObserver | undefined

onMounted(() => {
  const root = document.documentElement
  const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]")]
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  root.classList.add("reveal-enabled")

  if (reduceMotion || !("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add("is-visible")
        revealObserver?.unobserve(entry.target)
      }
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  )

  targets.forEach((target) => revealObserver?.observe(target))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  document.documentElement.classList.remove("reveal-enabled")
})
</script>

<template>
  <main class="work-shell">
    <div class="site-rails work-rails">
      <section class="work-hero" aria-labelledby="work-title">
        <p class="work-kicker" data-reveal>Software architect · Conakry, Guinea · West Africa</p>
        <h1 id="work-title" class="work-title" data-reveal>
          I build software for problems that are impossible to ignore in Guinea, across Africa, and
          globally.
        </h1>
        <div class="work-hero-bottom" data-reveal>
          <p class="work-lede">
            AI products, payment systems, open-source developer tools, and the infrastructure needed
            to run them.
          </p>
          <div class="work-actions" aria-label="Portfolio actions">
            <a class="work-button work-button-primary" href="mailto:oumar379@proton.me">
              <Icon name="carbon:email" size="16px" />
              Email
            </a>
            <NuxtLink class="work-button" to="https://github.com/oumarbarry" target="_blank">
              <Icon name="carbon:logo-github" size="16px" />
              GitHub
            </NuxtLink>
          </div>
        </div>
        <a class="story-cue" href="#platform" aria-label="Enter Oumar Barry's work story">
          <span>Welcome to my world</span>
          <Icon name="carbon:arrow-down" size="16px" />
        </a>
      </section>

      <section id="platform" class="story-act story-act-platform" aria-labelledby="platform-title">
        <aside class="story-marker" data-reveal>
          <span>01</span>
          <p>AI products</p>
        </aside>

        <div class="story-content">
          <header class="story-heading" data-reveal>
            <p class="story-eyebrow">Nearly two years of iteration</p>
            <h2 id="platform-title">From a gap to a platform.</h2>
            <p>
              Too much African knowledge is still absent from the internet. Freddy began as a way to
              make one part of it usable. Each product exposed the next piece of infrastructure we
              needed to build.
            </p>
          </header>

          <div class="lineage" aria-label="Freddy to ORIA to o3ai product lineage">
            <article class="lineage-step reveal-delay-1" data-reveal>
              <p class="lineage-index">01 / Legal</p>
              <h3>Freddy</h3>
              <p>An AI legal research assistant for OHADA law.</p>
            </article>
            <span class="lineage-connector" aria-hidden="true"></span>
            <article class="lineage-step reveal-delay-2" data-reveal>
              <p class="lineage-index">02 / Education</p>
              <h3>ORIA</h3>
              <p>The same foundations, rebuilt around Guinea's education system.</p>
            </article>
            <span class="lineage-connector" aria-hidden="true"></span>
            <article class="lineage-step lineage-step-current reveal-delay-3" data-reveal>
              <p class="lineage-index">03 / Platform</p>
              <h3>o3ai</h3>
              <p>
                Amadou and I turned it into a product-agnostic, nine-service platform. Improvements
                now benefit every product while data and identity remain isolated.
              </p>
            </article>
          </div>

          <div class="platform-now">
            <article class="oria-release" data-reveal>
              <div class="release-heading">
                <div>
                  <p class="story-eyebrow">ORIA today</p>
                  <h3>The product is already running.</h3>
                </div>
                <NuxtLink class="inline-link" to="https://chat.o3flow.com" target="_blank">
                  Open ORIA
                  <Icon name="carbon:arrow-up-right" size="15px" />
                </NuxtLink>
              </div>
              <ul class="release-strip" aria-label="ORIA release availability">
                <li><span class="release-dot release-dot-live"></span>Web live</li>
                <li><span class="release-dot"></span>iOS on TestFlight</li>
              </ul>
            </article>

            <article class="voice-lab" data-reveal>
              <div class="voice-wave" aria-hidden="true">
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
              </div>
              <p class="story-eyebrow">Current voice R&amp;D</p>
              <h3>Identity-aware speaker filtering.</h3>
              <p>
                I am building a self-hosted, identity-aware speaker gate that learns an ephemeral
                voiceprint during each session, then silences other speakers before their audio
                reaches the live model's VAD.
              </p>
              <p class="quiet-proof">Live demo and TestFlight access available.</p>
            </article>
          </div>
        </div>
      </section>

      <section class="story-act story-act-oss" aria-labelledby="oss-title">
        <aside class="story-marker" data-reveal>
          <span>02</span>
          <p>Developer tools</p>
        </aside>

        <div class="story-content">
          <header class="story-heading" data-reveal>
            <p class="story-eyebrow">Open source</p>
            <h2 id="oss-title">I build the tools I wish already existed.</h2>
          </header>

          <article class="better-auth-story" data-reveal>
            <div class="better-auth-copy">
              <div class="project-heading">
                <span class="project-state project-state-public">Public</span>
                <h3>better-auth-py</h3>
              </div>
              <p class="project-lead">
                An independent Python port of Better Auth with compatible routes, sessions and
                storage. Python and TypeScript services can use the same authentication system
                without translating their data model.
              </p>
              <p>
                It supports FastAPI, Litestar, Flask and Django, alongside 35 social providers and
                26 plugins.
              </p>
              <div class="project-links">
                <NuxtLink to="https://github.com/oumarbarry/better-auth-py" target="_blank">
                  GitHub <Icon name="carbon:arrow-up-right" size="14px" />
                </NuxtLink>
                <NuxtLink to="https://better-auth-py.oumarbarry.tech" target="_blank">
                  Documentation <Icon name="carbon:arrow-up-right" size="14px" />
                </NuxtLink>
              </div>
            </div>

            <div class="auth-map" role="group" aria-label="Better Auth compatibility diagram">
              <div class="auth-runtime">
                <strong>TypeScript</strong>
              </div>
              <div class="auth-contract">
                <span>same routes</span>
                <span>same sessions</span>
                <span>same storage</span>
              </div>
              <div class="auth-runtime auth-runtime-python">
                <strong>Python</strong>
              </div>
            </div>
          </article>

          <div class="tool-shelf" tabindex="0" aria-label="More open-source developer tools">
            <article class="tool-card" data-reveal>
              <div class="tool-card-top">
                <span class="project-state project-state-public">Public</span>
                <NuxtLink
                  to="https://github.com/oumarbarry/nitro-openapi-schemas"
                  target="_blank"
                  aria-label="Open nitro-openapi-schemas on GitHub"
                >
                  <Icon name="carbon:arrow-up-right" size="16px" />
                </NuxtLink>
              </div>
              <h3>nitro-openapi-schemas</h3>
              <p>
                The same Standard Schema validates a Nitro request at runtime and generates its
                OpenAPI 3.1 contract, FastAPI-style, without duplicated route metadata.
              </p>
              <NuxtLink
                class="text-link"
                to="https://github.com/nitrojs/nitro/discussions/4402"
                target="_blank"
              >
                Read the Nitro proposal <Icon name="carbon:arrow-up-right" size="13px" />
              </NuxtLink>
            </article>

            <article class="tool-card reveal-delay-1" data-reveal>
              <span class="project-state project-state-preview">Ready for npm</span>
              <h3>Pygmalion</h3>
              <p>
                A Nuxt-native commerce framework that gives a Nuxt app its commerce API, admin,
                authentication, database and storefront without a separate backend.
              </p>
              <p class="tool-proof">282 business endpoints · 790 automated tests</p>
            </article>

            <article class="tool-card reveal-delay-2" data-reveal>
              <div class="tool-card-top">
                <span class="project-state project-state-public">Public</span>
                <NuxtLink
                  to="https://github.com/oumarbarry/mongoz"
                  target="_blank"
                  aria-label="Open Mongoz on GitHub"
                >
                  <Icon name="carbon:arrow-up-right" size="16px" />
                </NuxtLink>
              </div>
              <h3>Mongoz</h3>
              <p>
                My modern TypeScript/Node rewrite of UnJS's dormant Mongoz package: a zero-config
                CLI and library that downloads and runs MongoDB locally across macOS, Linux and
                Windows.
              </p>
            </article>

            <article class="tool-card reveal-delay-3" data-reveal>
              <span class="project-state project-state-preview">Ready for PyPI</span>
              <h3>fastapi-file-routing</h3>
              <p>
                Nuxt/Nitro-style file routing for FastAPI, including dynamic parameters, catch-alls,
                private helper files and typed HTTP handlers.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="story-act story-act-money" aria-labelledby="money-title">
        <aside class="story-marker" data-reveal>
          <span>03</span>
          <p>Financial systems</p>
        </aside>

        <div class="story-content">
          <header class="story-heading" data-reveal>
            <p class="story-eyebrow">Built from Guinea</p>
            <h2 id="money-title">Financial infrastructure from Guinea.</h2>
          </header>

          <article class="money-system" data-reveal>
            <div class="money-copy">
              <div class="project-heading">
                <h3>o3money</h3>
              </div>
              <p class="project-lead">
                o3money is a mobile wallet and public-finance platform for Guinea, built on a
                double-entry ledger for payments, controlled disbursements, customer flows and
                operations.
              </p>
              <p>
                o3money is developed under an active partnership with Visa Global. It is also
                covered by a Central Bank of Guinea licence that permits payment switch operations.
              </p>
            </div>

            <div class="money-flow" aria-label="o3money system flow">
              <div class="money-node money-node-entry">Wallets<br />and partners</div>
              <span class="money-arrow" aria-hidden="true">→</span>
              <div class="money-node money-node-core">Double-entry<br />ledger</div>
              <span class="money-arrow" aria-hidden="true">→</span>
              <div class="money-node money-node-exit">Operations<br />and switch</div>
            </div>
          </article>

          <div class="money-research">
            <article class="horizon-story" data-reveal>
              <p class="story-eyebrow">Personal R&D offshoot</p>
              <h3>Horizon</h3>
              <p>
                Horizon is my personal R&D offshoot of o3money: a country-agnostic instant-payment
                switch written in Rust, with prefunded settlement, alias routing, a hash-chained
                ledger and cross-border corridors.
              </p>
              <p class="benchmark-label">Local reference benchmark on an Apple M3 Pro</p>
              <ul class="benchmark-line" aria-label="Horizon local benchmark">
                <li><strong>1,753 TPS</strong><span>settled</span></li>
                <li><strong>33.24 ms</strong><span>internal p99</span></li>
                <li><strong>315,522</strong><span>transfers</span></li>
                <li><strong>0</strong><span>system errors</span></li>
              </ul>
            </article>

            <article class="ozone-story" data-reveal>
              <div class="ozone-orbit" aria-hidden="true">
                <span></span><span></span><span></span>
              </div>
              <p class="story-eyebrow">Protocol ambition</p>
              <h3>Ozone</h3>
              <p>
                Ozone is my attempt to build a sovereign African Layer 1 from scratch, designed in
                Africa for everyday African use cases. The account-based core is written in Rust; a
                non-custodial Flutter wallet uses the same cryptography through FFI.
              </p>
              <p class="quiet-proof">
                The ambition: the first production-grade Layer 1 designed and built in Africa.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="story-act story-act-reality" aria-labelledby="reality-title">
        <aside class="story-marker" data-reveal>
          <span>04</span>
          <p>Production reality</p>
        </aside>

        <div class="story-content reality-layout">
          <div class="reality-copy" data-reveal>
            <p class="story-eyebrow">ExeApps × LeaderNet</p>
            <h2 id="reality-title">Software that has to survive reality.</h2>
            <p>
              Through ExeApps' partnership with LeaderNet, a Guinean ISP, I lead software, network
              and infrastructure work across its production systems. Amadou and I build ISPMAN, the
              operating platform used across sales and onboarding, support and ticketing, network
              operations and field interventions for customer accounts, billing, interventions and
              service status. We build and operate the self-hosted infrastructure behind LeaderNet's
              software, including deployment, observability, QoS, connectivity and critical
              production operations.
            </p>
            <p>
              Amadou and I also built a local LibreQoS and ClickHouse pipeline that brings
              interface-level traffic history directly into ISPMAN.
            </p>
          </div>

          <figure class="network-map" data-reveal aria-labelledby="leadernet-map-caption">
            <figcaption id="leadernet-map-caption" class="sr-only">
              ISPMAN gives sales and onboarding, support and ticketing, network operations and field
              interventions distinct workflows for customer accounts, billing, interventions,
              service status, QoS and traffic history.
            </figcaption>
            <div class="ispman-overview-head">
              <div>
                <p class="network-plane-label">One platform, distinct workflows</p>
                <h3>ISPMAN</h3>
              </div>
              <p>Built with Amadou for the teams that run LeaderNet every day.</p>
            </div>

            <ul class="ispman-role-grid" aria-label="Teams using ISPMAN">
              <li class="ispman-role">Sales &amp; onboarding</li>
              <li class="ispman-role">Support &amp; tickets</li>
              <li class="ispman-role">Network operations</li>
              <li class="ispman-role">Field interventions</li>
            </ul>

            <ul class="ispman-capabilities" aria-label="ISPMAN operational scope">
              <li>Customer accounts</li>
              <li>Billing</li>
              <li>Ticketing</li>
              <li>Interventions</li>
              <li>Service status</li>
              <li>QoS</li>
              <li>Traffic history</li>
            </ul>
          </figure>
        </div>
      </section>

      <section class="story-act story-act-map" aria-labelledby="map-title">
        <aside class="story-marker" data-reveal>
          <span>05</span>
          <p>More products</p>
        </aside>

        <div class="story-content">
          <header class="story-heading" data-reveal>
            <p class="story-eyebrow">Selected product work</p>
            <h2 id="map-title">The rest of the map.</h2>
          </header>

          <article class="griot-story" data-reveal>
            <div class="griot-copy">
              <p class="story-eyebrow">African media infrastructure</p>
              <h3>Le Griot</h3>
              <p class="project-lead">
                Le Griot spans the full African podcast lifecycle: discovery and listening on the
                web, publishing tools for creators and a native Android player.
              </p>
              <p>
                A shared API and queued FFmpeg pipeline handle audio and video ingestion,
                transcoding and adaptive streaming across web and Android.
              </p>
            </div>

            <div class="media-pipeline" aria-label="Le Griot media pipeline">
              <span>Creator upload</span>
              <i aria-hidden="true">→</i>
              <span>Queue</span>
              <i aria-hidden="true">→</i>
              <span>FFmpeg worker</span>
              <i aria-hidden="true">→</i>
              <span>Web + Android</span>
            </div>
          </article>

          <div class="project-map" tabindex="0" aria-label="More selected products">
            <article class="map-card" data-reveal>
              <p class="map-card-index">01 / Personal finance</p>
              <h3>SuperBudget</h3>
              <p>
                Spoken expenses become editable proposals before anything is saved. Voice capture,
                budgets and multi-currency tracking feed an AI advisor grounded in the user's real
                ledger.
              </p>
            </article>

            <article class="map-card reveal-delay-1" data-reveal>
              <p class="map-card-index">02 / Health</p>
              <h3>o3health</h3>
              <p>
                An offline clinic assistant for places without reliable internet. Deterministic code
                handles triage and dosing; a local LLM explains and translates but never makes
                clinical decisions.
              </p>
            </article>

            <article class="map-card reveal-delay-2" data-reveal>
              <p class="map-card-index">03 / Geolocation</p>
              <h3>Afromaps</h3>
              <p>
                Geolocation infrastructure for places without reliable street addresses. Community
                places and short AFM codes resolve through PostGIS and a self-hosted map stack.
              </p>
            </article>

            <article class="map-card" data-reveal>
              <p class="map-card-index">04 / National infrastructure</p>
              <h3>PointGN</h3>
              <p>
                A self-service platform for `.gn` domains: search, registration, payment, renewal
                and DNS management in one account.
              </p>
            </article>

            <article class="map-card map-card-game reveal-delay-1" data-reveal>
              <div class="cavern-mark" aria-hidden="true"><span></span></div>
              <p class="map-card-index">05 / Game</p>
              <h3>African-folklore Metroidvania</h3>
              <p>
                A Metroidvania in development, inspired by African folklore and built with Phaser
                and TypeScript.
              </p>
            </article>
          </div>

          <nav class="elsewhere" data-reveal aria-label="Other public work">
            <p>Elsewhere on the web</p>
            <NuxtLink to="https://exeapps.com" target="_blank">
              ExeApps <Icon name="carbon:arrow-up-right" size="14px" />
            </NuxtLink>
            <NuxtLink to="https://o3studios.org" target="_blank">
              O3 Studios <Icon name="carbon:arrow-up-right" size="14px" />
            </NuxtLink>
            <NuxtLink to="https://bieguip.com/" target="_blank">
              BIEGUIP <Icon name="carbon:arrow-up-right" size="14px" />
            </NuxtLink>
            <NuxtLink to="https://www.leadernet-gn.com/" target="_blank">
              LeaderNet <Icon name="carbon:arrow-up-right" size="14px" />
            </NuxtLink>
            <NuxtLink to="https://www.javat365.com/" target="_blank">
              Javat365 <Icon name="carbon:arrow-up-right" size="14px" />
            </NuxtLink>
          </nav>
        </div>
      </section>

      <section class="work-closing" aria-labelledby="closing-title">
        <div data-reveal>
          <h2 id="closing-title">Let's talk.</h2>
          <p>Questions, ideas, or just curious? My DMs are open.</p>
        </div>
        <div class="work-actions" data-reveal>
          <a
            class="work-button work-button-primary"
            href="https://x.com/messages/compose?recipient_id=1775284977170538496"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Start a conversation with Oumar Barry on X"
          >
            Start a conversation
          </a>
        </div>
      </section>

      <TerminalNav :items="terminalItems" />
    </div>
  </main>
</template>
