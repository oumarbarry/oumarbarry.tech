# oumarbarry.tech

Personal site of Oumar Barry — terminal-styled home, selected work, and blog.
Nuxt 4, static-first: the public pages are prerendered and deployed on Vercel.

## Commands

```bash
bun run dev            # Nuxt dev server
bun run build          # Production build (prerenders /, /work, /blog/**)
bun run lint           # ESLint (--fix to autofix)
bun run fmt            # oxfmt --check (write with `bunx oxfmt .`)
bun run typecheck      # nuxt typecheck (vue-tsc)
bun run check          # oxfmt + eslint --fix + typecheck
bun run test           # Unit tests (bun test, glob over tests/)
bun run test:rendered  # Build, then verify the prerendered output
just                   # Same entry points as recipes (just check, …)
```

## Stack & conventions

- Nuxt 4.5+, Vue 3 `<script setup>` + TypeScript. Package manager and test runner: **bun**.
- Styling: UnoCSS (`unocss.config.ts`) + design tokens in `app/assets/styles/main.css`.
- Content: @nuxt/content v3 — posts in `content/blog/*.md`, zod schema in `content.config.ts`.
- SEO: @nuxtjs/seo — sitemap, robots, schema.org and OG images, all **zero-runtime**
  (generated at build time). OG images render with the **takumi** renderer: the template is
  `app/components/OgImage/Oumar.takumi.vue`, referenced by `defineOgImage("Oumar", …)` in
  `app/app.vue` (site-wide) and overridden per page. `/work` uses a static `public/work-og.png`.
- **Stable error codes** (Nuxt ≥ 4.5): build & runtime errors carry a code like `NUXT_E1001`.
  Treat the code as the search key — production builds strip the prose and keep the code.
- Formatting: oxfmt (`oxfmt.config.ts`, no semicolons). Lint: @nuxt/eslint flat config.
  `.agents/` and `.claude/` are vendored content — never formatted or linted.

## Layout

| Path                 | Purpose                                                           |
| -------------------- | ----------------------------------------------------------------- |
| `app/pages/`         | `index` (terminal home) · `work` · `blog/`                        |
| `app/components/`    | Header/Footer/Logo, TerminalNav, PerfStats (client-only), OgImage |
| `app/utils/`         | pure logic (navigationStats, error-page) — unit-tested            |
| `content/blog/`      | markdown posts (@nuxt/content)                                    |
| `server/middleware/` | atproto DID well-known route                                      |
| `tests/`             | bun unit tests + `rendered-work.check.mjs` (post-build gate)      |
| `.agents/skills/`    | vendored skills — `.claude/skills/` symlinks into it              |

## Testing

- `bun test tests` discovers every `tests/*.test.*` file — never list test files by hand;
  a new test file must never be silently skipped.
- Pure logic gets a unit test that locks the behavior (node:test and bun:test styles both
  run under bun).
- `tests/rendered-work.check.mjs` is deliberately named `.check.mjs` so the unit glob skips
  it: it asserts the **prerendered output** (`.output/public` — headers, SEO tags, resume
  PDF, OG images, sitemap) and only makes sense after a build. `bun run test:rendered`
  builds first, then runs it. Never trust a passing build alone — this is the deployment
  gate.
- Assert values and behavior, never existence or internal call order. Cover error paths,
  not just the happy path. Repetitive cases → loop over a case table.
- Gate — smallest run that covers the blast radius: while coding → the touched test file;
  before committing → `bun run test`; before merging/deploying → `bun run test:rendered`.

## Skills & MCP

- `.mcp.json` wires the **nuxt** and **context7** MCP servers — use them for up-to-date
  API docs before guessing.
- `.agents/skills/` ships curated skills for the stack (Nuxt, Vue, TypeScript, testing,
  and a full design/UX pack). `.claude/skills/` contains relative symlinks into it so
  Claude Code discovers them automatically. Consult the matching skill before non-trivial
  work in its area.
- When a dependency is dropped, delete the matching skill and its `.claude/skills/` symlink.
