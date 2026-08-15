# Terminal Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved terminal-style navigation commands to home, blog, article, and work pages while preserving the existing centered header, editorial copy, badges, and footer.

**Architecture:** Create one stateless `TerminalNav.vue` presentational component with a typed `items` prop and scoped styles. Route pages provide small immutable command arrays; the home page keeps its richer editorial navigation and changes only its two visible command labels. Source-level tests follow the repository's current `node:test` pattern, and rendered-output tests verify Nuxt's production HTML.

**Tech Stack:** Nuxt 4, Vue 3 `<script setup lang="ts">`, `NuxtLink`, scoped CSS, Bun, Node's built-in test runner.

## Global Constraints

- Keep the approved **terminal de sortie** placement: home commands inside the existing editorial navigation; compact strips at the end of blog, article, and work content.
- Keep the current centered `[oumarbarry.tech]` header and shared footer unchanged.
- Keep all visible command copy lowercase.
- Use real internal links; do not add simulated input, a blinking caret, command history, animation, sound, keyboard shortcuts, or a new dependency.
- Use a subtle dotted texture confined to the strip, the existing monospace type and color variables, and no new accent color, glow, transform, or full-strip hover.
- Preserve visible `:focus-visible` treatment, semantic list markup, and an explicit `terminal navigation` label.
- Desktop commands share one row; mobile commands stack vertically.

---

## File Map

- Create `app/components/TerminalNav.vue`: render a stateless, accessible terminal command list and own its scoped visual treatment.
- Create `tests/terminal-navigation.test.mjs`: protect the component contract, style requirements, page destinations, and placement.
- Modify `package.json`: include the new source-level test file in the default `bun test` script.
- Modify `app/pages/index.vue`: change only the two editorial labels to `> cd /work` and `> cd /blog`.
- Modify `app/pages/blog/index.vue`: provide home/work commands and render the strip after the blog list or empty state.
- Modify `app/pages/blog/[...slug].vue`: provide blog/work commands and render the strip after the article body.
- Modify `app/pages/work.vue`: provide home/blog commands and render the strip after `work-closing`.
- Modify `app/assets/styles/main.css`: let the existing work-closing divider replace the component's top border so the two lines do not double up.
- Modify `tests/work-page.test.mjs`: update the existing assertions for the approved home command copy.
- Modify `tests/rendered-work.test.mjs`: verify the terminal links in prerendered home, blog, and work HTML.

---

### Task 1: Build the Shared Terminal Navigation Component

**Files:**
- Create: `app/components/TerminalNav.vue`
- Create: `tests/terminal-navigation.test.mjs`
- Modify: `package.json:7`

**Interfaces:**
- Consumes: CSS custom properties `--content`, `--line`, `--text`, and `--dim`; Nuxt's auto-imported `NuxtLink`.
- Produces: auto-imported `<TerminalNav :items="items" />`, where `items` is `readonly { label: string; to: string }[]`.
- Emits: nothing. The component has no local state, effects, or composables.

- [ ] **Step 1: Register the new test file in the default test command**

Change the `test` script in `package.json` to:

```json
"test": "bun test tests/work-page.test.mjs tests/navigation-stats.test.mjs tests/terminal-navigation.test.mjs"
```

- [ ] **Step 2: Write the failing component contract and style tests**

Create `tests/terminal-navigation.test.mjs` with:

```js
import assert from "node:assert/strict"
import { readFile } from "node:fs/promises"
import test from "node:test"

const root = new URL("../", import.meta.url)
const terminalComponent = new URL("app/components/TerminalNav.vue", root)

test("terminal navigation exposes a typed, semantic link list", async () => {
  const source = await readFile(terminalComponent, "utf8")

  assert.match(source, /interface TerminalNavItem\s*{[\s\S]*label: string[\s\S]*to: string/)
  assert.match(source, /defineProps<{\s*items: readonly TerminalNavItem\[\]\s*}>\(\)/)
  assert.match(
    source,
    /<nav class="terminal-nav" aria-label="terminal navigation">[\s\S]*<ul class="terminal-nav-list">/,
  )
  assert.match(source, /<li v-for="item in items" :key="item\.to">/)
  assert.match(source, /<NuxtLink :to="item\.to" class="terminal-nav-link">/)
})

test("terminal navigation keeps its dotted, motionless responsive treatment", async () => {
  const source = await readFile(terminalComponent, "utf8")

  assert.match(source, /<style scoped>/)
  assert.match(source, /background-image:\s*radial-gradient/)
  assert.match(source, /\.terminal-nav-link:hover/)
  assert.match(source, /\.terminal-nav-link:focus-visible/)
  assert.match(source, /@media \(max-width: 520px\)/)
  assert.match(source, /flex-direction:\s*column/)
  assert.doesNotMatch(source, /animation:|@keyframes|transform:|text-shadow:|box-shadow:/)
})
```

- [ ] **Step 3: Run the component tests and verify the missing component fails**

Run:

```bash
bun test tests/terminal-navigation.test.mjs
```

Expected: FAIL with `ENOENT` for `app/components/TerminalNav.vue`.

- [ ] **Step 4: Implement the stateless component and scoped styles**

Create `app/components/TerminalNav.vue` with:

```vue
<script setup lang="ts">
interface TerminalNavItem {
  label: string
  to: string
}

defineProps<{
  items: readonly TerminalNavItem[]
}>()
</script>

<template>
  <nav class="terminal-nav" aria-label="terminal navigation">
    <ul class="terminal-nav-list">
      <li v-for="item in items" :key="item.to">
        <NuxtLink :to="item.to" class="terminal-nav-link">
          {{ item.label }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.terminal-nav {
  width: min(100%, var(--content));
  margin: 0 auto;
  border-top: 1px solid var(--line);
  padding: 1rem 1.05rem 1.15rem;
  background-image: radial-gradient(circle, rgba(240, 242, 237, 0.08) 1px, transparent 1px);
  background-position: 1.05rem 1rem;
  background-size: 14px 14px;
}

.terminal-nav-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.terminal-nav-link {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  color: var(--dim);
  font-size: 0.82rem;
  text-decoration: none;
  text-underline-offset: 0.22em;
}

.terminal-nav-link:hover {
  color: var(--text);
  text-decoration: underline;
}

.terminal-nav-link:focus-visible {
  border-radius: 2px;
  outline: 1px dashed var(--dim);
  outline-offset: 3px;
}

@media (max-width: 520px) {
  .terminal-nav-list {
    flex-direction: column;
    gap: 0;
  }
}
</style>
```

- [ ] **Step 5: Format and rerun the focused tests**

Run:

```bash
bunx oxfmt app/components/TerminalNav.vue tests/terminal-navigation.test.mjs package.json
bun test tests/terminal-navigation.test.mjs
```

Expected: both tests PASS.

- [ ] **Step 6: Commit the shared component atomically**

```bash
git add app/components/TerminalNav.vue tests/terminal-navigation.test.mjs package.json
git commit -m "Add shared terminal navigation"
```

---

### Task 2: Add Commands to Home, Blog, Articles, and Work

**Files:**
- Modify: `tests/terminal-navigation.test.mjs`
- Modify: `tests/work-page.test.mjs:144-170`
- Modify: `app/pages/index.vue:79-103`
- Modify: `app/pages/blog/index.vue:1-48`
- Modify: `app/pages/blog/[...slug].vue:1-44`
- Modify: `app/pages/work.vue:1-5,526-543`
- Modify: `app/assets/styles/main.css:409-413`

**Interfaces:**
- Consumes: `<TerminalNav :items="terminalItems" />` from Task 1.
- Produces: `terminalItems` immutable arrays with exact `{ label, to }` pairs for blog, article, and work.
- Home remains an editorial `nav`; only its two visible command labels change.

- [ ] **Step 1: Add failing source-level page integration tests**

Append to `tests/terminal-navigation.test.mjs`:

```js
test("home keeps editorial navigation and exposes cd commands", async () => {
  const source = await readFile(new URL("app/pages/index.vue", root), "utf8")

  assert.match(source, /to="\/work"[\s\S]*&gt; cd \/work[\s\S]*class="status-badge">building/)
  assert.match(source, /to="\/blog"[\s\S]*&gt; cd \/blog[\s\S]*class="status-badge">soon/)
  assert.doesNotMatch(source, /<TerminalNav/)
})

test("blog and article terminal exits use their correct parent routes", async () => {
  const [blog, article] = await Promise.all([
    readFile(new URL("app/pages/blog/index.vue", root), "utf8"),
    readFile(new URL("app/pages/blog/[...slug].vue", root), "utf8"),
  ])

  assert.match(blog, /{ label: "> cd \.\.", to: "\/" }/)
  assert.match(blog, /{ label: "> cd \/work", to: "\/work" }/)
  assert.match(blog, /blog-list-wrap[\s\S]*<TerminalNav :items="terminalItems" \/>/)

  assert.match(article, /{ label: "> cd \.\.", to: "\/blog" }/)
  assert.match(article, /{ label: "> cd \/work", to: "\/work" }/)
  assert.match(article, /<ContentRenderer[\s\S]*<TerminalNav :items="terminalItems" \/>/)
})

test("work closes with home and blog terminal commands", async () => {
  const [source, styles] = await Promise.all([
    readFile(new URL("app/pages/work.vue", root), "utf8"),
    readFile(new URL("app/assets/styles/main.css", root), "utf8"),
  ])
  const closingPosition = source.indexOf('<section class="work-closing"')
  const terminalPosition = source.indexOf('<TerminalNav :items="terminalItems" />')

  assert.match(source, /{ label: "> cd \.\.", to: "\/" }/)
  assert.match(source, /{ label: "> cd \/blog", to: "\/blog" }/)
  assert.ok(closingPosition >= 0)
  assert.ok(terminalPosition > closingPosition)
  assert.match(styles, /\.work-closing \+ \.terminal-nav\s*{[^}]*border-top:\s*0/)
})
```

Update the two existing home assertions in `tests/work-page.test.mjs` so they expect `&gt; cd /work` and `&gt; cd /blog`:

```js
  assert.match(
    home,
    /to="\/work"[\s\S]*&gt; cd \/work[\s\S]*some of the stuff i've built and the problems i ran into along the way\./i,
  )
  assert.match(
    home,
    /to="\/blog"[\s\S]*&gt; cd \/blog[\s\S]*notes on tech, manga, and whatever else is on my mind\./i,
  )
```

- [ ] **Step 2: Run the source tests and verify the old labels and missing strips fail**

Run:

```bash
bun test tests/terminal-navigation.test.mjs tests/work-page.test.mjs
```

Expected: FAIL because home still says `> work` / `> blog` and route pages do not yet contain `terminalItems` or `<TerminalNav>`.

- [ ] **Step 3: Update the two home command labels only**

In `app/pages/index.vue`, replace:

```vue
<span class="home-editorial-title">&gt; work</span>
```

with:

```vue
<span class="home-editorial-title">&gt; cd /work</span>
```

Replace:

```vue
<span class="home-editorial-title">&gt; blog</span>
```

with:

```vue
<span class="home-editorial-title">&gt; cd /blog</span>
```

Do not change either link wrapper, description, or badge.

- [ ] **Step 4: Add the blog index commands and strip**

In `app/pages/blog/index.vue`, add after the `useAsyncData` block:

```ts
const terminalItems = [
  { label: "> cd ..", to: "/" },
  { label: "> cd /work", to: "/work" },
] as const
```

Render the component after `.blog-list-wrap` and before `</section>`:

```vue
<TerminalNav :items="terminalItems" />
```

- [ ] **Step 5: Add the article commands and strip**

In `app/pages/blog/[...slug].vue`, add after `const route = useRoute()`:

```ts
const terminalItems = [
  { label: "> cd ..", to: "/blog" },
  { label: "> cd /work", to: "/work" },
] as const
```

Render the component immediately after `ContentRenderer` and before `</article>`:

```vue
<TerminalNav :items="terminalItems" />
```

- [ ] **Step 6: Add the work commands and closing strip**

In `app/pages/work.vue`, add after `description`:

```ts
const terminalItems = [
  { label: "> cd ..", to: "/" },
  { label: "> cd /blog", to: "/blog" },
] as const
```

Render the component after the closing `</section>` for `.work-closing` and before the closing `.work-rails` `</div>`:

```vue
<TerminalNav :items="terminalItems" />
```

In `app/assets/styles/main.css`, add immediately after the shared `.work-hero`, `.story-act`, `.work-closing` border rule:

```css
.work-closing + .terminal-nav {
  border-top: 0;
}
```

The existing full-width bottom border on `.work-closing` remains the divider, while the compact strip keeps its own top border on blog and article pages.

- [ ] **Step 7: Format and run the full source-level suite**

Run:

```bash
bunx oxfmt app/pages/index.vue app/pages/blog/index.vue 'app/pages/blog/[...slug].vue' app/pages/work.vue app/assets/styles/main.css tests/terminal-navigation.test.mjs tests/work-page.test.mjs
bun test
```

Expected: all source-level tests PASS.

- [ ] **Step 8: Commit page integration atomically**

```bash
git add app/pages/index.vue app/pages/blog/index.vue 'app/pages/blog/[...slug].vue' app/pages/work.vue app/assets/styles/main.css tests/terminal-navigation.test.mjs tests/work-page.test.mjs
git commit -m "Add terminal navigation across pages"
```

---

### Task 3: Verify Production Rendering and Responsive Presentation

**Files:**
- Modify: `tests/rendered-work.test.mjs:7-11,13-39`

**Interfaces:**
- Consumes: prerendered HTML from `bun run build` and the page/component integration from Task 2.
- Produces: production-output regression coverage for home, blog, and work terminal navigation.

- [ ] **Step 1: Point the rendered tests at the blog output**

Add beside the existing rendered page URLs in `tests/rendered-work.test.mjs`:

```js
const renderedBlog = new URL("../.output/public/blog/index.html", import.meta.url)
```

- [ ] **Step 2: Add the rendered terminal navigation test while leaving the stale home expectations in place**

Add this test below the existing centered-header test:

```js
test("prerendered blog and work pages expose their terminal exits", async () => {
  const [blog, work] = await Promise.all([
    readFile(renderedBlog, "utf8"),
    readFile(renderedPage, "utf8"),
  ])

  const blogNav = blog.match(
    /<nav[^>]*class="[^"]*terminal-nav[^"]*"[^>]*aria-label="terminal navigation"[^>]*>[\s\S]*?<\/nav>/i,
  )?.[0]
  const workNav = work.match(
    /<nav[^>]*class="[^"]*terminal-nav[^"]*"[^>]*aria-label="terminal navigation"[^>]*>[\s\S]*?<\/nav>/i,
  )?.[0]

  assert.ok(blogNav)
  assert.match(blogNav, /href="\/"[^>]*>[\s\S]*?&gt; cd \.\./i)
  assert.match(blogNav, /href="\/work"[^>]*>[\s\S]*?&gt; cd \/work/i)

  assert.ok(workNav)
  assert.match(workNav, /href="\/"[^>]*>[\s\S]*?&gt; cd \.\./i)
  assert.match(workNav, /href="\/blog"[^>]*>[\s\S]*?&gt; cd \/blog/i)
})
```

- [ ] **Step 3: Run rendered tests once and confirm the stale home expectations fail**

Run the test before changing its old home expectations:

```bash
bun run test:rendered
```

Expected: FAIL on the existing rendered home regexes because the production home now contains `cd`; the new blog/work terminal test should pass.

- [ ] **Step 4: Update the rendered home expectations and rerun the rendered suite**

In the existing centered-header test, update the two home regexes to expect `&gt; cd /work` and `&gt; cd /blog`:

```js
  assert.match(
    home,
    /href="\/work"[\s\S]*?&gt; cd \/work[\s\S]*?some of the stuff i&#39;ve built and the problems i ran into along the way\./i,
  )
  assert.match(
    home,
    /href="\/blog"[\s\S]*?&gt; cd \/blog[\s\S]*?notes on tech, manga, and whatever else is on my mind\./i,
  )
```

Rerun:

```bash
bun run test:rendered
```

Expected: all rendered tests PASS after the automatic production build.

- [ ] **Step 5: Run the complete automated quality gate**

Run:

```bash
bun run format:check
bun run lint
bun test
bun run build
bun run test:rendered
```

Expected: every command exits successfully with no formatting, lint, source-test, build, or rendered-test errors.

- [ ] **Step 6: Verify the approved layout visually**

Use the running local site, or start it with:

```bash
bun run dev -- --port 3101
```

Inspect these routes at approximately `1440 × 900` and `390 × 844`:

- `/`: `> cd /work` and `> cd /blog` retain their descriptions and badges; there is no compact terminal strip.
- `/blog`: the dotted strip follows the empty state or post list; `cd ..` and `cd /work` are horizontal on desktop and stacked on mobile.
- `/work`: the dotted strip follows `let's talk` and appears before the shared footer; commands are `cd ..` and `cd /blog`.
- A real article route when content exists: the strip follows the article body, and `cd ..` returns to `/blog`.

Keyboard-tab through each command and confirm focus is visible. Hover one command and confirm only that link brightens and underlines; the strip must not animate or glow.

- [ ] **Step 7: Commit production verification atomically**

```bash
git add tests/rendered-work.test.mjs
git commit -m "Verify rendered terminal navigation"
```

---

## Completion Criteria

- Home displays `> cd /work` and `> cd /blog` without losing its descriptions or status badges.
- Blog index displays `cd .. → /` and `cd /work → /work` after its content.
- Blog articles display `cd .. → /blog` and `cd /work → /work` after article content.
- Work displays `cd .. → /` and `cd /blog → /blog` after `let's talk` and before the footer.
- `TerminalNav.vue` remains stateless, typed, semantic, motionless, and dependency-free.
- Desktop and mobile layouts match the approved option A.
- Three implementation commits remain independently reviewable.
