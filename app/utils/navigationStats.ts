export interface NavigationTimingLike {
  nextHopProtocol?: string
  transferSize?: number
  requestStart?: number
  responseStart?: number
  duration?: number
}

export interface NavigationStats {
  protocol: string
  transfer: string
  ttfb: string
  duration: string
}

export interface NavigationMeasurementSchedulerDependencies {
  document: Pick<Document, "readyState">
  window: Pick<Window, "addEventListener" | "removeEventListener" | "setTimeout" | "clearTimeout">
  measure: () => void
}

const unavailable = "unavailable"

const formatMilliseconds = (value: number) => `${value.toFixed(1)} ms`

const formatProtocol = (value: unknown) => {
  const protocol = typeof value === "string" ? value.trim() : ""
  return protocol || unavailable
}

const isNonNegativeNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0

export function formatNavigationStats(navigation: NavigationTimingLike): NavigationStats {
  const protocol = formatProtocol(navigation.nextHopProtocol)

  const transfer =
    Number.isSafeInteger(navigation.transferSize) && navigation.transferSize >= 0
      ? `${navigation.transferSize} bytes`
      : unavailable

  const hasValidTtfb =
    isNonNegativeNumber(navigation.requestStart) &&
    isNonNegativeNumber(navigation.responseStart) &&
    navigation.responseStart >= navigation.requestStart
  const ttfb = hasValidTtfb
    ? formatMilliseconds(navigation.responseStart - navigation.requestStart)
    : unavailable

  const duration = isNonNegativeNumber(navigation.duration)
    ? formatMilliseconds(navigation.duration)
    : unavailable

  return { protocol, transfer, ttfb, duration }
}

export function createNavigationMeasurementScheduler({
  document,
  window,
  measure,
}: NavigationMeasurementSchedulerDependencies) {
  let timer: ReturnType<typeof window.setTimeout> | undefined

  const scheduleMeasurement = () => {
    timer = window.setTimeout(measure, 0)
  }

  const start = () => {
    if (document.readyState === "complete") scheduleMeasurement()
    else window.addEventListener("load", scheduleMeasurement, { once: true })
  }

  const cleanup = () => {
    window.removeEventListener("load", scheduleMeasurement)
    if (timer !== undefined) window.clearTimeout(timer)
  }

  return { start, cleanup }
}
