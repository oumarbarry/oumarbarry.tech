# Motion V Release Notes

## Current Baseline

- Curated from motion-vue 2.2.0.

## Changes That Matter In Practice

- v2 introduced the `v-motion` directive and `MotionPlugin` for directive-based use.
- v2 is ESM-only. Build or tooling work must not assume CommonJS entry points.
- Old shorthand props like `focus`, `hover`, `press`, and `inView` were removed. Use `whileFocus`, `whileHover`, `whilePress`, and `whileInView` for animation state, with event handlers for logic.
- `AnimatePresence` internals changed in v2, so tree shape matters more than before.
- Older stagger helpers such as `staggerChildren` and `staggerDirection` have been superseded by the `stagger()` utility inside transitions.

## Upgrade Checklist

- Replace shorthand gesture props removed in v2.
- Audit imports for ESM-safe usage.
- Favor directive or preset registration if the app repeatedly animates native elements.
- Re-test `AnimatePresence` and layout transitions after version bumps.
