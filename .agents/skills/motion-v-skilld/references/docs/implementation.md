# Motion V Implementation Playbook

## Pick The Smallest Primitive That Solves The Task

- Use `v-motion` for lightweight animation on native elements.
- Use `motion` or `m` components when the element itself owns animated props, variants, or gestures.
- Use `AnimatePresence` only when a child must animate out before removal.
- Use motion hooks such as `useScroll`, `useTransform`, `useSpring`, or `useInView` when animation depends on runtime values instead of static variants.

## Bundle And Accessibility Defaults

- Prefer `LazyMotion` plus `m` when animation is not needed on every route.
- Choose the lighter feature bundle unless the task truly needs drag or advanced layout behavior.
- Set `reducedMotion="user"` on `MotionConfig` so OS accessibility settings are respected.

## Layout And Presence Rules

- Put layout-related visual changes on `:style` instead of `:animate` when `layout` is enabled.
- Apply `layoutScroll` to scroll containers and `layoutRoot` to fixed ancestors when measurements would otherwise drift.
- Keep `AnimatePresence` mounted and toggle only its direct children.
- For staggered lists, pass `custom` into variants instead of storing per-item delay in Vue state.

## Vue And Nuxt Integration Notes

- Treat motion-v as ESM-only when updating build or tooling code.
- Use `MotionPlugin` when the app needs globally available directives or shared presets.
- Keep motion values out of normal template reactivity when they update every frame.

## Debugging Checklist

- If an exit animation does not run, check whether `AnimatePresence` unmounted too early.
- If a layout animation jumps, inspect parent scroll and fixed-position containers first.
- If animations ignore accessibility settings, confirm `MotionConfig` is present and set correctly.
- If bundle size grows unexpectedly, replace eager `motion` usage with `LazyMotion` plus `m` where practical.
