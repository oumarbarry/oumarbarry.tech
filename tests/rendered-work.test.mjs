import assert from "node:assert/strict"
import { access, readFile } from "node:fs/promises"
import test from "node:test"

const renderedPage = new URL("../.output/public/work/index.html", import.meta.url)
const renderedResume = new URL("../.output/public/oumar-barry-resume.pdf", import.meta.url)
const renderedOgImage = new URL("../.output/public/work-og.png", import.meta.url)
const renderedSitemap = new URL("../.output/public/sitemap.xml", import.meta.url)

test("prerendered work page contains the public portfolio contract", async () => {
  const html = await readFile(renderedPage, "utf8")

  assert.match(html, /<title>Selected Work - Oumar Barry<\/title>/i)
  assert.match(html, /<main class="work-shell"/i)
  assert.match(html, /I build software for problems that are impossible to ignore/i)
  assert.match(html, /nine-service AI platform/i)
  assert.match(html, /Visa Global/i)
  assert.match(html, /href="\/oumar-barry-resume\.pdf"/)
  assert.match(html, /property="og:image" content="https:\/\/oumarbarry\.tech\/work-og\.png"/i)
  assert.match(html, /property="og:image:width" content="1200"/i)
  assert.match(html, /property="og:image:height" content="630"/i)
  assert.match(html, /name="twitter:image:alt" content="Oumar Barry - Selected Work"/i)
  assert.match(html, /name="twitter:card" content="summary_large_image"/i)

  const sitemap = await readFile(renderedSitemap, "utf8")
  assert.match(sitemap, /<loc>https:\/\/oumarbarry\.tech\/work<\/loc>/)
  await Promise.all([access(renderedResume), access(renderedOgImage)])
})
