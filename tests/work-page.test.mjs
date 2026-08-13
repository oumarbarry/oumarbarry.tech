import assert from "node:assert/strict"
import { access, readFile } from "node:fs/promises"
import test from "node:test"

const root = new URL("../", import.meta.url)
const workPage = new URL("app/pages/work.vue", root)

test("selected work page carries the main story and proof", async () => {
  const source = await readFile(workPage, "utf8")

  assert.match(source, /impossible to ignore when you live in Guinea/i)
  assert.match(source, /Freddy, ORIA.*o3ai/i)
  assert.match(source, /nine-service/i)
  assert.match(source, /ephemeral voiceprint/i)
  assert.match(source, /strongest voice\s+product on the market/i)
  assert.match(source, /Visa Global/i)
  assert.match(source, /1,753/)
  assert.match(source, /Pygmalion/i)
  assert.match(source, /SuperBudget/i)
})

test("selected work page exposes inspectable links and honest boundaries", async () => {
  const source = await readFile(workPage, "utf8")

  assert.match(source, /href="\/oumar-barry-resume\.pdf"/)
  assert.match(source, /https:\/\/github\.com\/oumarbarry/)
  assert.match(source, /https:\/\/o3studios\.org/)
  assert.match(source, /https:\/\/bieguip\.com/)
  assert.match(source, /https:\/\/www\.leadernet-gn\.com/)
  assert.match(source, /Private build/i)
  assert.match(source, /Pre-publication/i)
  assert.match(source, /Planned for open source/i)
  assert.match(
    source,
    /<h3>Infrastructure that has to work<\/h3>[\s\S]*?LeaderNet: production · Horizon: local benchmark[\s\S]*?<\/article>/i,
  )
  assert.match(
    source,
    /<span class="status-pill">Private build<\/span>[\s\S]*?<h3>Ozone<\/h3>[\s\S]*?single-node[\s\S]*?<\/article>/i,
  )
  assert.match(
    source,
    /<span class="status-pill status-pre">Pre-publication<\/span>[\s\S]*?<\/article>/i,
  )
})

test("work is in the primary navigation and prerendered", async () => {
  const [header, config] = await Promise.all([
    readFile(new URL("app/components/Header.vue", root), "utf8"),
    readFile(new URL("nuxt.config.ts", root), "utf8"),
  ])

  assert.match(header, /to="\/work"[^>]*>Work<\/NuxtLink>/)
  assert.match(config, /"\/work"\s*:\s*\{\s*prerender:\s*true,\s*ogImage:\s*false\s*\}/)
  await access(new URL("public/oumar-barry-resume.pdf", root))
})
