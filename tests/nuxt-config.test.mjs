import assert from "node:assert/strict"
import test from "node:test"
import { fileURLToPath } from "node:url"

import { loadNuxt } from "@nuxt/kit"

const cwd = fileURLToPath(new URL("..", import.meta.url))

async function getSourcemapOptions(dev) {
  const nuxt = await loadNuxt({
    cwd,
    dev,
    envName: dev ? "development" : "production",
    ready: false,
  })

  try {
    return { ...nuxt.options.sourcemap }
  } finally {
    await nuxt.close()
  }
}

test("disables production sourcemaps without removing development sourcemaps", async () => {
  assert.deepEqual(await getSourcemapOptions(false), {
    server: false,
    client: false,
  })
  assert.deepEqual(await getSourcemapOptions(true), {
    server: true,
    client: true,
  })
})
