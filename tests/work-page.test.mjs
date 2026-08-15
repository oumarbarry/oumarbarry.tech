import assert from "node:assert/strict"
import { access, readFile } from "node:fs/promises"
import test from "node:test"

const root = new URL("../", import.meta.url)
const workPage = new URL("app/pages/work.vue", root)
const workStyles = new URL("app/assets/styles/main.css", root)

test("selected work page tells one five-act story", async () => {
  const source = await readFile(workPage, "utf8")
  const normalized = source.replace(/\s+/g, " ")

  assert.match(normalized, /Conakry, Guinea · West Africa/i)
  assert.match(normalized, /in Guinea, across Africa, and globally/i)
  assert.match(source, /href="mailto:oumar379@proton\.me"/i)
  assert.doesNotMatch(source, /href="mailto:ob@oumarbarry\.tech"/i)

  const acts = [
    "From a gap to a platform",
    "I build the tools I wish already existed",
    "Financial infrastructure from Guinea",
    "Software that has to survive reality",
    "The rest of the map",
  ]

  let previousPosition = -1
  for (const act of acts) {
    const position = source.indexOf(act)
    assert.ok(position > previousPosition, `${act} must appear in narrative order`)
    previousPosition = position
  }
})

test("o3ai lineage and availability are concrete", async () => {
  const source = await readFile(workPage, "utf8")
  const styles = await readFile(workStyles, "utf8")
  const normalized = source.replace(/\s+/g, " ")

  assert.match(normalized, /Freddy.*OHADA/i)
  assert.match(normalized, /ORIA.*Guinea's education/i)
  assert.match(normalized, /nine-service/i)
  assert.match(source, /https:\/\/chat\.o3flow\.com/)
  assert.match(source, />\s*Open ORIA\s*/i)
  assert.match(styles, /\.release-heading\s*>\s*\.inline-link\s*\{[^}]*white-space:\s*nowrap;/)
  assert.match(source, /Web live/i)
  assert.match(source, /TestFlight/i)
  assert.doesNotMatch(source, /Android APK/i)
  assert.doesNotMatch(source, /Public release/i)
  assert.doesNotMatch(source, /Internationalization/i)
  assert.match(normalized, /identity-aware speaker gate/i)
  assert.match(normalized, /ephemeral voiceprint/i)
})

test("public developer work follows o3ai and uses accurate boundaries", async () => {
  const source = await readFile(workPage, "utf8")
  const normalized = source.replace(/\s+/g, " ")
  const o3ai = source.indexOf("o3ai")
  const betterAuth = source.indexOf("better-auth-py")
  const finance = source.indexOf("Financial infrastructure from Guinea")

  assert.ok(o3ai >= 0 && betterAuth > o3ai && finance > betterAuth)
  assert.match(source, /https:\/\/github\.com\/oumarbarry\/better-auth-py/)
  assert.match(source, /https:\/\/better-auth-py\.oumarbarry\.tech/)
  assert.match(normalized, /compatible routes, sessions and storage/i)
  assert.match(source, /https:\/\/github\.com\/oumarbarry\/nitro-openapi-schemas/)
  assert.match(source, /https:\/\/github\.com\/nitrojs\/nitro\/discussions\/4402/)
  assert.match(normalized, /same Standard Schema/i)

  const nitroLink = source.indexOf('aria-label="Open nitro-openapi-schemas on GitHub"')
  const nitroCardStart = source.lastIndexOf("<article", nitroLink)
  const nitroCardEnd = source.indexOf("</article>", nitroLink)
  const nitroCard = source.slice(nitroCardStart, nitroCardEnd)
  assert.match(nitroCard, /class="project-state project-state-public">Public<\/span>/)

  assert.match(normalized, /modern TypeScript\/Node rewrite of UnJS's dormant Mongoz/i)
  assert.match(normalized, /Nuxt\/Nitro-style file routing for FastAPI/i)
  assert.match(source, /Pygmalion/i)
  assert.match(normalized, /without a separate backend/i)
  assert.match(source, /<strong>TypeScript<\/strong>/)
  assert.match(source, /<strong>Python<\/strong>/)
  assert.match(
    source,
    /class="auth-map" role="group" aria-label="Better Auth compatibility diagram"/,
  )
  assert.doesNotMatch(source, /<strong>Better Auth<\/strong>/)
  assert.doesNotMatch(source, /<strong>better-auth-py<\/strong>/)
  assert.match(source, /Ready for npm/i)
  assert.match(source, /Ready for PyPI/i)
  assert.doesNotMatch(source, /Public RFC \+ prototype/i)
  assert.doesNotMatch(source, /Pre-publication/i)
  assert.doesNotMatch(source, /In the workshop/i)
})

test("finance, production infrastructure and the wider portfolio stay distinct", async () => {
  const source = await readFile(workPage, "utf8")
  const normalized = source.replace(/\s+/g, " ")

  assert.match(normalized, /active partnership with Visa Global/i)
  assert.match(normalized, /Central Bank of Guinea licence/i)
  assert.match(
    normalized,
    /It is also covered by a Central Bank of Guinea licence that permits payment switch operations\./i,
  )
  assert.doesNotMatch(source, />\s*Visa Global partner\s*</i)
  assert.match(normalized, /Horizon is my personal R&D offshoot of o3money/i)
  assert.match(normalized, /local reference benchmark/i)
  assert.match(normalized, /1,753 TPS/i)
  assert.match(source, /<strong>0<\/strong><span>system errors<\/span>/i)
  assert.doesNotMatch(normalized, /non-business errors/i)
  assert.match(normalized, /attempt to build a sovereign African Layer 1 from scratch/i)
  assert.match(normalized, /non-custodial Flutter wallet/i)
  assert.match(normalized, /Through ExeApps' partnership with LeaderNet/i)
  assert.match(normalized, /LeaderNet, a Guinean ISP/i)
  assert.match(normalized, /Amadou and I build ISPMAN/i)
  assert.match(normalized, /Sales &amp; onboarding/i)
  assert.match(normalized, /Support &amp; tickets/i)
  assert.match(normalized, /Network operations/i)
  assert.match(normalized, /Field interventions/i)
  assert.match(normalized, /self-hosted infrastructure behind LeaderNet's software/i)
  assert.match(normalized, /We build and operate the self-hosted infrastructure/i)
  assert.match(source, /<ul class="ispman-role-grid" aria-label="Teams using ISPMAN">/i)
  assert.match(normalized, /LibreQoS/i)
  assert.match(normalized, /ClickHouse/i)
  assert.match(normalized, /Billing/i)
  assert.match(normalized, /Traffic history/i)
  assert.match(source, />\s*Welcome to my world\s*</i)
  assert.match(normalized, /Le Griot/i)
  assert.match(normalized, /publishing tools for creators and a native Android player/i)
  assert.match(normalized, /queued FFmpeg pipeline/i)
  assert.match(normalized, /adaptive streaming across web and Android/i)
  assert.doesNotMatch(normalized, /staff operations/i)
  assert.doesNotMatch(normalized, /lock-screen controls/i)
  assert.match(normalized, /SuperBudget/i)
  assert.match(source, /<h3>o3health<\/h3>/)
  assert.match(normalized, /Afromaps/i)
  assert.match(normalized, /PointGN/i)
  assert.match(
    normalized,
    /PointGN.*self-service platform for `\.gn` domains: search, registration, payment, renewal and DNS management in one account/i,
  )
  assert.doesNotMatch(normalized, /WHOIS/i)
  assert.match(normalized, /Metroidvania/i)
})

test("stale catalogue copy and misleading labels are absent", async () => {
  const source = await readFile(workPage, "utf8")

  assert.doesNotMatch(source, /work-signal-grid/)
  assert.doesNotMatch(source, /00 \/ How I work/i)
  assert.doesNotMatch(source, /got home at 1:30/i)
  assert.doesNotMatch(source, /Private platform · Live products/i)
  assert.doesNotMatch(source, /strongest voice product on the market/i)
  assert.doesNotMatch(source, /French-first offline clinic/i)
  assert.doesNotMatch(source, /current milestone is single-node/i)
  assert.doesNotMatch(source, /Integration in progress/i)
  assert.doesNotMatch(source, /work in Python[\s\S]*Mongoz/i)
  assert.doesNotMatch(source, /oumar-barry-resume\.pdf/i)
  assert.doesNotMatch(source, />\s*Resume\s*</i)
  assert.doesNotMatch(source, /Afro Maps/i)
  assert.doesNotMatch(source, /tiny child crossing a vast subterranean world/i)
  assert.doesNotMatch(source, /Ask me about the architecture/i)
  assert.doesNotMatch(source, /self-hosted delivery/i)
  assert.doesNotMatch(source, /for a Guinean ISP/i)
  assert.doesNotMatch(source, /PostgreSQL/i)
  assert.doesNotMatch(source, /Splynx/i)
  assert.doesNotMatch(source, /Customer portal/i)
  assert.doesNotMatch(source, />\s*Follow the work\s*</i)

  assert.match(
    source,
    /A Metroidvania in development, inspired by African folklore and built with\s+Phaser\s+and TypeScript\./i,
  )
  assert.doesNotMatch(source, /Architecture, code, or a live product/i)
  assert.doesNotMatch(source, /Want to go deeper\?/i)

  const closingStart = source.indexOf('<section class="work-closing"')
  const closingEnd = source.indexOf("</section>", closingStart)
  const closing = source.slice(closingStart, closingEnd)
  assert.match(closing, />\s*Let's talk\.\s*</i)
  assert.match(closing, />\s*Questions, ideas, or just curious\? My DMs are open\.\s*</i)
  assert.match(
    closing,
    /href="https:\/\/x\.com\/messages\/compose\?recipient_id=1775284977170538496"/i,
  )
  assert.match(closing, />\s*Start a conversation\s*</i)

  const elsewhere = source.indexOf("Elsewhere on the web")
  const exeapps = source.indexOf("https://exeapps.com")
  const o3studios = source.indexOf("https://o3studios.org")
  const bieguip = source.indexOf("https://bieguip.com/")
  const leadernet = source.indexOf("https://www.leadernet-gn.com/")
  const javat365 = source.indexOf("https://www.javat365.com/")
  assert.ok(
    elsewhere >= 0 &&
      exeapps > elsewhere &&
      o3studios > exeapps &&
      bieguip > o3studios &&
      leadernet > bieguip &&
      javat365 > leadernet,
  )
})

test("secondary open-source cards stay readable across desktop and mobile", async () => {
  const styles = await readFile(workStyles, "utf8")
  const shelfRules = [...styles.matchAll(/(?:^|[,\n])\s*\.tool-shelf\s*\{([^}]*)\}/gm)].map(
    (match) => match[1],
  )
  const mobileStart = styles.indexOf("@media (max-width: 720px)")
  const mobileEnd = styles.indexOf("@media (max-width: 420px)", mobileStart)
  const mobileStyles = styles.slice(mobileStart, mobileEnd)

  assert.ok(shelfRules.length > 0)
  assert.match(shelfRules[0], /grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/)
  assert.match(mobileStyles, /\.tool-shelf\s*\{[^}]*grid-template-columns:\s*1fr\s*;/)
})

test("scroll reveals are progressive enhancement and motion-safe", async () => {
  const [source, styles] = await Promise.all([
    readFile(workPage, "utf8"),
    readFile(workStyles, "utf8"),
  ])

  assert.match(source, /IntersectionObserver/)
  assert.match(source, /reveal-enabled/)
  assert.match(source, /data-reveal/)
  assert.match(styles, /\.reveal-enabled[\s\S]*\[data-reveal\]/)
  assert.match(styles, /prefers-reduced-motion:\s*reduce/)
})

test("work hero follows its content instead of forcing viewport height", async () => {
  const styles = await readFile(workStyles, "utf8")
  const heroRules = [...styles.matchAll(/\.work-hero\s*\{([^}]*)\}/g)].map((match) => match[1])
  const titleRules = [...styles.matchAll(/\.work-title\s*\{([^}]*)\}/g)].map((match) => match[1])

  assert.equal(heroRules.length, 2)
  heroRules.forEach((rule) => assert.doesNotMatch(rule, /min-height/))
  assert.match(heroRules[0], /grid-template-rows:\s*repeat\(4,\s*auto\)/)
  assert.match(heroRules[0], /row-gap:\s*clamp\(1\.5rem,\s*3\.2vw,\s*2\.5rem\)/)
  titleRules.forEach((rule) => assert.match(rule, /margin:\s*0/))
})

test("the shared header stays minimal while the homepage carries editorial navigation", async () => {
  const [header, home, config] = await Promise.all([
    readFile(new URL("app/components/Header.vue", root), "utf8"),
    readFile(new URL("app/pages/index.vue", root), "utf8"),
    readFile(new URL("nuxt.config.ts", root), "utf8"),
  ])

  assert.match(header, /<NuxtLink to="\/" class="site-brand">\[oumarbarry\.tech\]<\/NuxtLink>/)
  assert.doesNotMatch(header, /<nav|to="\/work"|to="\/blog"|github\.com/i)
  assert.match(home, /class="home-editorial-nav"/)
  assert.match(
    home,
    /to="\/work"[\s\S]*&gt; work[\s\S]*some of the stuff i've built and the problems i ran into along the way\./i,
  )
  assert.match(
    home,
    /to="\/blog"[\s\S]*&gt; blog[\s\S]*notes on tech, manga, and whatever else is on my mind\./i,
  )
  assert.match(home, /to="https:\/\/github\.com\/oumarbarry"/i)
  assert.match(config, /"\/work"\s*:\s*\{\s*prerender:\s*true,\s*ogImage:\s*false\s*\}/)
  await assert.rejects(access(new URL("public/oumar-barry-resume.pdf", root)), { code: "ENOENT" })
})

test("LeaderNet keeps its copy above the network map in a single-column flow", async () => {
  const [source, styles] = await Promise.all([
    readFile(workPage, "utf8"),
    readFile(workStyles, "utf8"),
  ])
  const realityCopy = source.indexOf('class="reality-copy"')
  const networkMap = source.indexOf('class="network-map"')
  const realityGridRules = [
    ...styles.matchAll(/(?:^|[,\n])\s*\.reality-layout\s*\{([^}]*)\}/gm),
  ].map((match) => match[1])

  assert.ok(realityCopy >= 0 && networkMap > realityCopy)
  assert.ok(realityGridRules.length > 0)
  realityGridRules.forEach((rule) => assert.match(rule, /grid-template-columns:\s*1fr\s*;/))
})

test("Ozone decoration keeps steady points visible while the orbit rotates", async () => {
  const styles = await readFile(workStyles, "utf8")
  const reducedMotion = styles.match(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*)\}/,
  )

  assert.match(
    styles,
    /\.ozone-orbit\s*\{[^}]*top:\s*-35px;[^}]*right:\s*-35px;[^}]*animation:\s*ozone-orbit-rotate\s+22s\s+linear\s+infinite;/,
  )
  assert.match(styles, /\.ozone-orbit span\s*\{[^}]*opacity:\s*0\.9;/)
  assert.doesNotMatch(styles, /ozone-orbit-pulse/)
  assert.match(
    styles,
    /\.ozone-orbit span:first-child\s*\{[^}]*top:\s*calc\(50% - 2\.5px\);[^}]*left:\s*-2\.5px;/,
  )
  assert.match(
    styles,
    /\.ozone-orbit span:nth-child\(2\)\s*\{[^}]*right:\s*40\.9px;[^}]*bottom:\s*40\.9px;/,
  )
  assert.match(
    styles,
    /\.ozone-orbit span:nth-child\(3\)\s*\{[^}]*top:\s*59\.3px;[^}]*left:\s*59\.3px;/,
  )
  assert.match(styles, /@keyframes ozone-orbit-rotate\s*\{[\s\S]*?transform:\s*rotate\(360deg\)/)
  assert.ok(reducedMotion)
  assert.match(reducedMotion[1], /\.ozone-orbit\s*\{[^}]*animation:\s*none;/)
})
