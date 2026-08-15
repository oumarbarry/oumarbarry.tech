import assert from "node:assert/strict"
import { access, readdir, readFile } from "node:fs/promises"
import test from "node:test"

const renderedPage = new URL("../.output/public/work/index.html", import.meta.url)
const renderedHome = new URL("../.output/public/index.html", import.meta.url)
const renderedResume = new URL("../.output/public/oumar-barry-resume.pdf", import.meta.url)
const renderedOgImage = new URL("../.output/public/work-og.png", import.meta.url)
const renderedSitemap = new URL("../.output/public/sitemap.xml", import.meta.url)

test("rendered home and work pages share a centered brand-only header", async () => {
  const [home, work] = await Promise.all([
    readFile(renderedHome, "utf8"),
    readFile(renderedPage, "utf8"),
  ])

  for (const html of [home, work]) {
    const header = html.match(/<header class="site-header">([\s\S]*?)<\/header>/i)?.[0]
    assert.ok(header)
    assert.match(
      header,
      /href="\/"[^>]*class="[^"]*\bsite-brand\b[^"]*"[^>]*>\[oumarbarry\.tech\]<\/a>/i,
    )
    assert.doesNotMatch(header, /<nav|href="\/work"|href="\/blog"|github\.com/i)
  }

  assert.match(home, /<nav class="home-editorial-nav"[^>]*>/i)
  assert.match(
    home,
    /href="\/work"[\s\S]*?&gt; work[\s\S]*?some of the stuff i&#39;ve built and the problems i ran into along the way\./i,
  )
  assert.match(
    home,
    /href="\/blog"[\s\S]*?&gt; blog[\s\S]*?notes on tech, manga, and whatever else is on my mind\./i,
  )
  assert.match(home, /href="https:\/\/github\.com\/oumarbarry"/i)
})

test("prerendered work page contains the five-act public portfolio", async () => {
  const html = await readFile(renderedPage, "utf8")

  assert.match(html, /<title>Selected Work - Oumar Barry<\/title>/i)
  assert.match(html, /<main class="work-shell"/i)
  assert.match(html, /Conakry, Guinea · West Africa/i)
  assert.match(html, /From a gap to a platform/i)
  assert.match(html, /I build the tools I wish already existed/i)
  assert.match(html, /href="mailto:oumar379@proton\.me"/i)
  assert.doesNotMatch(html, /href="mailto:ob@oumarbarry\.tech"/i)
  assert.match(html, /Financial infrastructure from Guinea/i)
  assert.match(html, /Software that has to survive reality/i)
  assert.match(html, /The rest of the map/i)
  assert.match(html, /href="https:\/\/chat\.o3flow\.com/i)
  assert.match(html, /class="inline-link">\s*Open ORIA\s*<span/i)
  assert.match(html, /Web live/i)
  assert.match(html, /iOS on TestFlight/i)
  assert.doesNotMatch(html, /Android APK|Public release|Internationalization/i)
  assert.match(html, /better-auth-py/i)
  assert.match(html, /nitro-openapi-schemas/i)
  assert.match(html, /Horizon is my personal R&amp;D offshoot of o3money/i)
  assert.match(html, /Le Griot/i)
  assert.match(html, /Afromaps/i)
  assert.match(
    html,
    /A Metroidvania in development, inspired by African folklore and built with\s+Phaser\s+and TypeScript\./i,
  )
  assert.match(html, />Let&#39;s talk\.<\/h2>/i)
  assert.doesNotMatch(html, /See something worth discussing|glad to hear from you/i)
  assert.match(
    html,
    /href="https:\/\/x\.com\/messages\/compose\?recipient_id=1775284977170538496"[^>]*>\s*Start a conversation\s*<\/a>/i,
  )
  assert.doesNotMatch(html, /Architecture, code, or a live product/i)
  assert.doesNotMatch(html, /Want to go deeper\?/i)
  assert.doesNotMatch(html, />Visa Global partner</i)
  assert.match(
    html,
    /o3money is developed under an active partnership with Visa Global\. It is also\s+covered by a Central Bank of Guinea licence that permits payment switch operations\./i,
  )
  assert.match(html, /LeaderNet, a Guinean ISP/i)
  assert.match(html, /Amadou and I build ISPMAN/i)
  assert.match(html, /We build and operate the self-hosted infrastructure/i)
  assert.match(html, /Sales &amp; onboarding/i)
  assert.match(html, /Support &amp; tickets/i)
  assert.match(html, /Network operations/i)
  assert.match(html, /Field interventions/i)
  assert.match(html, /<ul class="ispman-role-grid" aria-label="Teams using ISPMAN">/i)
  assert.match(html, /Billing/i)
  assert.match(html, /Traffic history/i)
  assert.match(html, />Welcome to my world</i)
  assert.match(html, /Ready for npm/i)
  assert.match(html, /Ready for PyPI/i)
  assert.match(html, /0<\/strong><span>system errors/i)
  assert.match(html, /publishing tools for creators and a native Android player/i)
  assert.match(html, /queued FFmpeg pipeline/i)
  assert.match(html, /adaptive streaming across web and Android/i)
  assert.doesNotMatch(html, /Public RFC \+ prototype|Pre-publication|In the workshop/i)
  assert.doesNotMatch(html, /non-business errors|staff operations|lock-screen controls/i)
  assert.doesNotMatch(html, /PostgreSQL/i)
  assert.doesNotMatch(html, /Splynx/i)
  assert.doesNotMatch(html, /Customer portal/i)
  assert.doesNotMatch(html, /self-hosted delivery/i)
  assert.doesNotMatch(html, /href="\/oumar-barry-resume\.pdf"/)
  assert.doesNotMatch(html, />Resume</i)

  const elsewhere = html.indexOf("Elsewhere on the web")
  const exeapps = html.indexOf("https://exeapps.com")
  const o3studios = html.indexOf("https://o3studios.org")
  const bieguip = html.indexOf("https://bieguip.com/")
  const leadernet = html.indexOf("https://www.leadernet-gn.com/")
  const javat365 = html.indexOf("https://www.javat365.com/")
  assert.ok(
    elsewhere >= 0 &&
      exeapps > elsewhere &&
      o3studios > exeapps &&
      bieguip > o3studios &&
      leadernet > bieguip &&
      javat365 > leadernet,
  )
})

test("rendered client assets provide an open performance panel with unambiguous labels", async () => {
  const assets = await readdir(new URL("../.output/public/_nuxt/", import.meta.url))
  const clientAssets = await Promise.all(
    assets
      .filter((asset) => asset.endsWith(".js"))
      .map((asset) =>
        readFile(new URL(`../.output/public/_nuxt/${asset}`, import.meta.url), "utf8"),
      ),
  )
  const panelOutput = clientAssets.find((asset) => asset.includes("perf-stats"))
  const panelTemplate = panelOutput?.slice(
    panelOutput.indexOf("perf-stats"),
    panelOutput.indexOf("perf-stats") + 2_000,
  )

  assert.ok(panelTemplate)
  assert.match(panelTemplate, /perf-stats/)
  assert.match(panelTemplate, /Protocol/)
  assert.match(panelTemplate, /Transfer/)
  assert.match(panelTemplate, /TTFB/)
  assert.match(panelTemplate, /Page load/)
  assert.doesNotMatch(panelTemplate, /Initial document|Navigation protocol|Request/)
  assert.match(panelTemplate, /perf-stats.{0,120}open|open.{0,120}perf-stats/)
})

test("prerendered work page preserves SEO and downloadable assets", async () => {
  const html = await readFile(renderedPage, "utf8")

  assert.match(html, /property="og:image" content="https:\/\/oumarbarry\.tech\/work-og\.png"/i)
  assert.match(html, /property="og:image:width" content="1200"/i)
  assert.match(html, /property="og:image:height" content="630"/i)
  assert.match(html, /name="twitter:image:alt" content="Oumar Barry - Selected Work"/i)
  assert.match(html, /name="twitter:card" content="summary_large_image"/i)

  const sitemap = await readFile(renderedSitemap, "utf8")
  assert.match(sitemap, /<loc>https:\/\/oumarbarry\.tech\/work<\/loc>/)
  await Promise.all([
    assert.rejects(access(renderedResume), { code: "ENOENT" }),
    access(renderedOgImage),
  ])
})
