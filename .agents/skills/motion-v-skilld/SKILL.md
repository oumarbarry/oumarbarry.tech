---
name: motion-v-skilld
description: Use when a Vue or Nuxt task touches motion-v or motion-vue, including AnimatePresence, LazyMotion, MotionValue hooks, layout animation, gestures, or v-motion directives.
metadata:
  version: "2026-03-31"
  curated_from: motion-vue 2.2.0
---

# Motion V

Use this skill when motion-v is already in play or when a Vue animation task clearly needs layout animation, gesture handling, shared motion values, scroll-driven motion, or exit orchestration.

## Read First

- `references/docs/_INDEX.md`
- `references/docs/implementation.md`
- `references/releases/_INDEX.md`

## Workflow

1. Confirm motion-v is the right tool. Prefer Vue `Transition` or plain CSS for simple enter and leave effects.
2. Decide whether the task needs `motion` or `m`, `AnimatePresence`, a hook such as `useScroll`, or a directive via `v-motion`.
3. Keep animation state declarative. Variants, `custom`, and motion values should do the work instead of ad hoc watchers.
4. Check accessibility and bundle cost before finishing. Reduced motion support and lazy loading are part of the implementation, not optional polish.
5. Verify exit and layout behavior in the actual DOM structure. Most motion-v bugs come from the wrong tree shape, not from easing values.

## Rules

- Prefer `LazyMotion` with `m` in bundle-sensitive routes or repeated UI.
- Set `reducedMotion="user"` on `MotionConfig` when adding app-level motion configuration.
- Keep layout-changing visual properties on `:style` when using `layout`.
- Do not put `v-if` on `AnimatePresence` itself. Condition the direct child.
- Use variant functions with `custom` for staggered lists instead of computing delays in Vue state.
- Use `v-motion` when the task only needs to animate native elements and a wrapper component would add noise.
- Keep high-frequency motion values off Vue's reactive render path whenever possible.

## Deliverables

- State why motion-v is justified for the task.
- Leave clear notes if the change depends on plugin registration, ESM-only imports, or reduced-motion behavior.
- Mention any structural caveat that future edits must preserve, especially around `AnimatePresence` or layout containers.
