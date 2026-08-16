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
const protocolLabels: Record<string, string> = {
  h2: "http/2",
  h3: "http/3",
}

const formatMilliseconds = (value: number) => `${value.toFixed(1)} ms`

const formatProtocol = (value: unknown) => {
  const protocol = typeof value === "string" ? value.trim() : ""
  return protocol ? (protocolLabels[protocol] ?? protocol) : unavailable
}

const isNonNegativeNumber = (value: unknown): value is number =>
  typeof value === "number" && Number.isFinite(value) && value >= 0

export function formatNavigationStats(navigation: NavigationTimingLike): NavigationStats {
  const { transferSize, requestStart, responseStart } = navigation

  const protocol = formatProtocol(navigation.nextHopProtocol)

  const transfer =
    isNonNegativeNumber(transferSize) && Number.isSafeInteger(transferSize)
      ? `${transferSize} bytes`
      : unavailable

  const hasValidTtfb =
    isNonNegativeNumber(requestStart) &&
    isNonNegativeNumber(responseStart) &&
    responseStart >= requestStart
  const ttfb = hasValidTtfb ? formatMilliseconds(responseStart - requestStart) : unavailable

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
