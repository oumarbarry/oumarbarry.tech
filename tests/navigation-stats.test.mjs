import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

import {
  createNavigationMeasurementScheduler,
  formatNavigationStats,
} from "../app/utils/navigationStats.ts"

function createSchedulerFixture(readyState) {
  const documentListeners = []
  const documentRemovedListeners = []
  const windowListeners = new Map()
  const windowRemovedListeners = []
  const timers = []
  const clearedTimers = []

  return {
    document: {
      readyState,
      addEventListener(type, listener, options) {
        documentListeners.push({ type, listener, options })
      },
      removeEventListener(type, listener) {
        documentRemovedListeners.push({ type, listener })
      },
    },
    window: {
      addEventListener(type, listener, options) {
        windowListeners.set(type, { listener, options })
      },
      removeEventListener(type, listener) {
        windowRemovedListeners.push({ type, listener })
      },
      setTimeout(callback, delay) {
        const timer = { callback, delay }
        timers.push(timer)
        return timer
      },
      clearTimeout(timer) {
        clearedTimers.push(timer)
      },
    },
    documentListeners,
    documentRemovedListeners,
    windowListeners,
    windowRemovedListeners,
    timers,
    clearedTimers,
  }
}

test("preserves the browser-reported navigation protocol", () => {
  const stats = formatNavigationStats({
    nextHopProtocol: " h3 ",
    transferSize: 0,
    requestStart: 120.2,
    responseStart: 167.8,
    duration: 803.4,
  })

  assert.deepEqual(stats, {
    protocol: "h3",
    transfer: "0 bytes",
    ttfb: "47.6 ms",
    duration: "803.4 ms",
  })

  assert.equal(formatNavigationStats({ nextHopProtocol: "h2" }).protocol, "h2")
  assert.equal(formatNavigationStats({ nextHopProtocol: "http/1.1" }).protocol, "http/1.1")
  assert.equal(formatNavigationStats({ nextHopProtocol: "custom" }).protocol, "custom")
})

test("marks absent and invalid navigation values unavailable", () => {
  const stats = formatNavigationStats({
    nextHopProtocol: "",
    transferSize: -1,
    requestStart: 30,
    responseStart: 20,
    duration: Number.NaN,
  })

  assert.deepEqual(stats, {
    protocol: "unavailable",
    transfer: "unavailable",
    ttfb: "unavailable",
    duration: "unavailable",
  })
})

test("waits for load and then a timer before measuring navigation", () => {
  const fixture = createSchedulerFixture("loading")
  let measurements = 0
  const scheduler = createNavigationMeasurementScheduler({
    ...fixture,
    measure: () => {
      measurements += 1
    },
  })

  scheduler.start()

  assert.equal(measurements, 0)
  assert.equal(fixture.timers.length, 0)
  assert.deepEqual(fixture.documentListeners, [])
  assert.deepEqual(fixture.windowListeners.get("load")?.options, { once: true })

  const loadListener = fixture.windowListeners.get("load")?.listener
  assert.ok(loadListener)
  loadListener()

  assert.equal(measurements, 0)
  assert.equal(fixture.timers.length, 1)
  assert.equal(fixture.timers[0].delay, 0)

  fixture.timers[0].callback()

  assert.equal(measurements, 1)
})

test("cleanup removes the load listener and clears a pending measurement timer", () => {
  const fixture = createSchedulerFixture("loading")
  const scheduler = createNavigationMeasurementScheduler({
    ...fixture,
    measure: () => {},
  })

  scheduler.start()
  const loadListener = fixture.windowListeners.get("load")?.listener
  assert.ok(loadListener)
  loadListener()
  scheduler.cleanup()

  assert.deepEqual(fixture.documentRemovedListeners, [])
  assert.deepEqual(fixture.windowRemovedListeners, [{ type: "load", listener: loadListener }])
  assert.deepEqual(fixture.clearedTimers, [fixture.timers[0]])
})

test("registers the component cleanup during setup", async () => {
  const source = await readFile(
    new URL("../app/components/PerfStats.client.vue", import.meta.url),
    "utf8",
  )

  assert.match(source, /onMounted\(scheduler\.start\)\s+onBeforeUnmount\(scheduler\.cleanup\)/)
  assert.match(source, /<dt>Protocol:<\/dt>/)
  assert.match(source, /<dt>Transfer:<\/dt>/)
  assert.match(source, /<dt>TTFB:<\/dt>/)
  assert.match(source, /<dt>Page load:<\/dt>/)
  assert.doesNotMatch(source, /Initial document|Navigation protocol/)
})
