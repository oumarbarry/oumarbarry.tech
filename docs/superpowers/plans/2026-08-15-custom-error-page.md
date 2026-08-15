# Custom Error Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a custom Nuxt error page for 404, 500, and fallback errors using the approved quiet Konoha design.

**Architecture:** Put the status-to-copy decision in a small pure utility that can be tested without mounting Nuxt, then consume it from one self-contained `app/error.vue` that owns the recovery actions. Extend the existing global stylesheet so the error page reuses the site's rails, panel, typography, and responsive behavior without depending on the normal app shell or footer.

**Tech Stack:** Nuxt 4, Vue 3 Composition API with `<script setup lang="ts">`, TypeScript, global CSS, Bun test runner.

## Global Constraints

- Keep the centered `[oumarbarry.tech]` brand bar, rails, thin borders, dark panel, rounded corners, and monospace typography.
- Use `404`, `looks like this page took a wrong turn.`, and `← konoha is this way` for not-found errors.
- Use `500`, `something broke on my side. try again in a bit.`, `try again`, and the Konoha home link for server errors.
- Use `something went wrong.` for other status codes.
- Keep all visible copy lowercase and never render raw messages, stack traces, route details, or server internals.
- Do not render the normal footer or performance statistics.
- Mark the error page `noindex, nofollow` and preserve keyboard focus, mobile tap targets, and current contrast.

---

### Task 1: Custom Nuxt Error Experience

**Files:**

- Create: `tests/error-page.test.ts`
- Create: `app/utils/error-page.ts`
- Create: `app/error.vue`
- Modify: `app/assets/styles/main.css:102-131, 417-449`

**Interfaces:**

- Produces: `getErrorPageContent(statusCode: number): { message: string; canRetry: boolean }` from `app/utils/error-page.ts`.
- Consumes: that pure utility, Nuxt's `NuxtError` prop, global `clearError({ redirect: string })`, and the existing CSS variables and shared rail/panel classes.
- Produces: a root Nuxt error component that renders safe status-specific copy and exposes `goHome(): void` and `retry(): void` UI actions.

- [ ] **Step 1: Write the failing source-contract test**

```ts
import { describe, expect, test } from "bun:test"
import { getErrorPageContent } from "../app/utils/error-page"

describe("getErrorPageContent", () => {
  const cases = [
    {
      statusCode: 404,
      expected: { message: "looks like this page took a wrong turn.", canRetry: false },
    },
    {
      statusCode: 500,
      expected: {
        message: "something broke on my side. try again in a bit.",
        canRetry: true,
      },
    },
    {
      statusCode: 418,
      expected: { message: "something went wrong.", canRetry: false },
    },
  ] as const

  for (const { statusCode, expected } of cases) {
    test(`returns safe content for ${statusCode}`, () => {
      expect(getErrorPageContent(statusCode)).toEqual(expected)
    })
  }
})
```

- [ ] **Step 2: Run the test and confirm the red state**

Run: `bun test tests/error-page.test.ts`

Expected: FAIL because `app/utils/error-page.ts` does not exist yet.

- [ ] **Step 3: Implement the tested status mapping**

Create `app/utils/error-page.ts` with:

```ts
export interface ErrorPageContent {
  message: string
  canRetry: boolean
}

export function getErrorPageContent(statusCode: number): ErrorPageContent {
  if (statusCode === 404) {
    return { message: "looks like this page took a wrong turn.", canRetry: false }
  }

  if (statusCode === 500) {
    return {
      message: "something broke on my side. try again in a bit.",
      canRetry: true,
    }
  }

  return { message: "something went wrong.", canRetry: false }
}
```

- [ ] **Step 4: Run the focused utility test and confirm the green state**

Run: `bun test tests/error-page.test.ts`

Expected: 3 tests pass.

- [ ] **Step 5: Implement the minimal root error component and styles**

Create `app/error.vue` with:

```vue
<script setup lang="ts">
import type { NuxtError } from "#app"
import { getErrorPageContent } from "~/utils/error-page"

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error.status || props.error.statusCode || 500)
const content = computed(() => getErrorPageContent(statusCode.value))

useHead({
  title: () => `${statusCode.value} — oumarbarry.tech`,
  meta: [{ name: "robots", content: "noindex, nofollow" }],
})

function goHome() {
  clearError({ redirect: "/" })
}

function retry() {
  if (import.meta.client) window.location.reload()
}
</script>

<template>
  <div class="error-shell">
    <header class="site-header">
      <div class="site-rails header-rails">
        <a href="/" class="site-brand" @click.prevent="goHome">[oumarbarry.tech]</a>
      </div>
    </header>

    <main class="error-main">
      <div class="site-rails content-rails">
        <section class="content-panel error-panel">
          <article class="error-copy">
            <h1 class="error-code">{{ statusCode }}</h1>
            <p class="error-message">{{ content.message }}</p>
            <div class="error-actions">
              <button v-if="content.canRetry" type="button" class="error-action" @click="retry">
                try again
              </button>
              <a href="/" class="error-action error-home-link" @click.prevent="goHome">
                ← konoha is this way
              </a>
            </div>
          </article>
        </section>
      </div>
    </main>
  </div>
</template>
```

Extend `app/assets/styles/main.css` with `.error-shell`, `.error-main`, `.error-panel`, `.error-copy`, `.error-code`, `.error-message`, `.error-actions`, `.error-action`, `.error-home-link`, hover, and `:focus-visible` rules. Reuse `var(--max)`, `var(--content)`, `var(--line)`, `var(--line-strong)`, `var(--text)`, `var(--muted)`, and `var(--dim)`. Keep the panel vertically calm with `min-height: clamp(360px, 60dvh, 620px)` and stack actions below `520px`.

- [ ] **Step 6: Run the focused test again after component integration**

Run: `bun test tests/error-page.test.ts`

Expected: 3 tests pass.

- [ ] **Step 7: Format and run static verification**

Run: `bun run format`

Run: `bun run lint`

Run: `bun run build`

Expected: all commands exit 0. The existing intentionally pre-linked `/work` route may still be reported by the production link checker until its separate page lands.

- [ ] **Step 8: Verify the rendered 404 and 500 states**

Open `http://127.0.0.1:3101/this-route-does-not-exist` and verify the custom 404, safe copy, centered brand, Konoha link, desktop rails, and mobile layout.

For a temporary 500 verification, create `app/pages/__error-500.vue` containing:

```vue
<script setup lang="ts">
throw createError({ status: 500 })
</script>
```

Open `http://127.0.0.1:3101/__error-500`, verify the 500 copy and retry action, then delete the temporary page before the final diff.

- [ ] **Step 9: Commit only the error-page implementation**

```bash
git add app/error.vue app/utils/error-page.ts tests/error-page.test.ts docs/superpowers/plans/2026-08-15-custom-error-page.md
git add -p app/assets/styles/main.css
git diff --cached --check
git commit -m "feat: add custom error pages"
```

When staging `app/assets/styles/main.css`, accept only the new error-page CSS hunks because that file already contains unrelated uncommitted work from the current branch.
