# Terminal Navigation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the approved terminal-style navigation commands to home, blog, article, and work pages while preserving the existing centered header, editorial copy, badges, and footer.

**Architecture:** Create one stateless `TerminalNav.vue` component with a typed `items` prop. Route pages provide small immutable command arrays; the home page keeps its richer editorial navigation, presents its two destinations as shell commands, and limits each link to the command itself. Test user-visible navigation through Nuxt's prerendered HTML, then verify the responsive visual contract through computed styles in a real browser.

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

- Create `app/components/TerminalNav.vue`: render the typed terminal command list and own its scoped styles.
- Modify `app/pages/index.vue`: change only the two editorial labels to `> cd /work` and `> cd /blog`.
- Modify `app/pages/blog/index.vue`: provide home/work commands and render the strip after the list or empty state.
- Modify `app/pages/blog/[...slug].vue`: provide blog/work commands and render the strip after the article body.
- Modify `app/pages/work.vue`: provide home/blog commands and render the strip after `work-closing`.
- Modify `app/assets/styles/main.css`: prevent the work closing divider and terminal top border from doubling.
- Modify `tests/work-page.test.mjs`: update the existing home command expectations.
- Modify `tests/rendered-work.test.mjs`: verify actual prerendered home, blog, and work navigation.

---

### Task 1: Add the Real Navigation Behavior

**Files:**
- Create: `app/components/TerminalNav.vue`
- Modify: `app/pages/index.vue:79-103`
- Modify: `app/pages/blog/index.vue:1-48`
- Modify: `app/pages/blog/[...slug].vue:1-44`
- Modify: `app/pages/work.vue:1-5,526-543`
- Modify: `tests/work-page.test.mjs:144-170`
- Modify: `tests/rendered-work.test.mjs:5-39`

**Interfaces:**
- Consumes: Nuxt's auto-imported `NuxtLink`.
- Produces: auto-imported `<TerminalNav :items="terminalItems" />`, where `items` is `readonly { label: string; to: string }[]`.
- Emits: nothing. The component has no local state, effects, or composables.

- [ ] **Step 1: Write the failing prerendered navigation regression**

Add to the rendered page URL declarations in `tests/rendered-work.test.mjs`:

```js
const renderedBlog = new URL("../.output/public/blog/index.html", import.meta.url)
```

Update the existing rendered home expectations to require `&gt; cd /work` and `&gt; cd /blog`:

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

Add this behavior test:

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

Update the existing source-level home assertions in `tests/work-page.test.mjs` to expect `&gt; cd /work` and `&gt; cd /blog`. This existing test protects the editorial descriptions and badges; it is not used to test the new component internals.

- [ ] **Step 2: Run the rendered test and verify RED**

Run:

```bash
bun run test:rendered
```

Expected: FAIL because the rendered home lacks `cd` and blog/work lack `nav.terminal-nav`.

- [ ] **Step 3: Implement the stateless semantic component without its final visual styling**

Create `app/components/TerminalNav.vue`:

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
```

- [ ] **Step 4: Wire the approved command arrays into every page**

Change only the home title strings:

```vue
<span class="home-editorial-title">&gt; cd /work</span>
<span class="home-editorial-title">&gt; cd /blog</span>
```

Add to `app/pages/blog/index.vue` and render `<TerminalNav :items="terminalItems" />` after `.blog-list-wrap`:

```ts
const terminalItems = [
  { label: "> cd ..", to: "/" },
  { label: "> cd /work", to: "/work" },
] as const
```

Add to `app/pages/blog/[...slug].vue` and render the component after `ContentRenderer`:

```ts
const terminalItems = [
  { label: "> cd ..", to: "/blog" },
  { label: "> cd /work", to: "/work" },
] as const
```

Add to `app/pages/work.vue` and render the component after `.work-closing` and before the closing `.work-rails` div:

```ts
const terminalItems = [
  { label: "> cd ..", to: "/" },
  { label: "> cd /blog", to: "/blog" },
] as const
```

- [ ] **Step 5: Format and verify GREEN through source and rendered behavior**

Run:

```bash
bunx oxfmt app/components/TerminalNav.vue app/pages/index.vue app/pages/blog/index.vue 'app/pages/blog/[...slug].vue' app/pages/work.vue tests/work-page.test.mjs tests/rendered-work.test.mjs
bun run test
bun run test:rendered
```

Expected: all source and rendered tests PASS. The build inside `test:rendered` also type-checks and renders the component through Nuxt.

- [ ] **Step 6: Commit behavior atomically**

```bash
git add app/components/TerminalNav.vue app/pages/index.vue app/pages/blog/index.vue 'app/pages/blog/[...slug].vue' app/pages/work.vue tests/work-page.test.mjs tests/rendered-work.test.mjs
git commit -m "Add terminal navigation across pages"
```

---

### Task 2: Apply and Verify the Approved Visual Treatment

**Files:**
- Modify: `app/components/TerminalNav.vue`
- Modify: `app/assets/styles/main.css:409-413`

**Interfaces:**
- Consumes: the semantic component and route integration from Task 1.
- Produces: dotted, motionless, responsive styling using existing CSS variables only.

- [ ] **Step 1: Start the feature worktree server on a free port**

Run:

```bash
bun run dev -- --port 3102
```

Use `/blog` as the visual test surface because it always renders the compact strip, even with no posts.

- [ ] **Step 2: Verify the unstyled component does not yet satisfy the visual contract**

At desktop width, inspect computed styles for `.terminal-nav` and `.terminal-nav-list`.

Expected RED evidence before styling:

- `.terminal-nav` has no radial-gradient background.
- `.terminal-nav-link` does not have a `44px` minimum height.
- the mobile list does not change to `flex-direction: column`.

- [ ] **Step 3: Add the exact scoped component styles**

Append to `app/components/TerminalNav.vue`:

```vue
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

Add to `app/assets/styles/main.css` immediately after the shared work section border rule:

```css
.work-closing + .terminal-nav {
  border-top: 0;
}
```

The existing full-width border below `.work-closing` remains the divider, avoiding a double line.

- [ ] **Step 4: Verify the computed styles and interactions GREEN**

At approximately `1440 × 900`, verify on `/blog`:

- `background-image` contains `radial-gradient`.
- links share one row.
- each link reports `min-height: 44px`.
- hovering one link brightens only that command text and leaves the other command muted.
- keyboard focus shows a dashed outline.

At approximately `390 × 844`, verify:

- `.terminal-nav-list` reports `flex-direction: column`.
- both links remain fully visible and left-aligned.
- the dotted texture is clipped to the content strip.

Then inspect `/` and `/work`:

- home retains descriptions and badges with no compact strip.
- work places the strip after `let's talk`, before the footer, with one divider rather than two.

- [ ] **Step 5: Run the complete automated quality gate**

Run:

```bash
bunx oxfmt app/components/TerminalNav.vue app/assets/styles/main.css
bun run format:check
bun run lint
bun run test
bun run build
bun run test:rendered
```

Expected: every command exits successfully.

- [ ] **Step 6: Commit visual treatment atomically**

```bash
git add app/components/TerminalNav.vue app/assets/styles/main.css
git commit -m "Style terminal navigation"
```

---

## Completion Criteria

- Home displays `> cd /work` and `> cd /blog` without losing descriptions or badges.
- Blog index displays `cd .. → /` and `cd /work → /work` after its content.
- Blog articles display `cd .. → /blog` and `cd /work → /work` after article content.
- Work displays `cd .. → /` and `cd /blog → /blog` after `let's talk` and before the footer.
- `TerminalNav.vue` remains stateless, typed, semantic, motionless, and dependency-free.
- Desktop and mobile layouts match approved option A.
- Behavior and visual treatment remain independently reviewable commits.
