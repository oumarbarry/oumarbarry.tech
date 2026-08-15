export default defineEventHandler((event) => {
  if (event.path !== "/.well-known/atproto-did") return

  setHeader(event, "content-type", "text/plain; charset=utf-8")

  return "did:plc:cqi3s7yscf7gtht3tg5osdqu"
})
