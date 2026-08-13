import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const renderedPage = new URL("../.output/public/work/index.html", import.meta.url)

test("prerendered work page contains the public portfolio contract", async () => {
  const html = await readFile(renderedPage, "utf8")

  assert.match(html, /<title>Selected Work - Oumar Barry<\/title>/i)
  assert.match(html, /<main class="work-shell"/i)
  assert.match(html, /I build software for problems that are impossible to ignore/i)
  assert.match(html, /nine-service AI platform/i)
  assert.match(html, /Visa Global/i)
  assert.match(html, /href="\/Oumar-Barry-Resume\.pdf"/i)
  assert.match(html, /property="og:image" content="https:\/\/oumarbarry\.tech\/work-og\.png"/i)
  assert.match(html, /name="twitter:card" content="summary_large_image"/i)
})
