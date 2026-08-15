# terminal navigation design

## goal

add a small terminal-style navigation motif that connects the home, blog, article, and work pages without replacing the site's existing structure. the commands should feel native to oumarbarry.tech, remain useful as real navigation, and avoid looking like a decorative fake terminal.

## selected direction

use the approved **terminal de sortie** direction.

- on the home page, make the two existing editorial destinations read like shell commands.
- on blog, article, and work pages, place a quiet terminal navigation strip at the end of the page content and before the shared footer.
- keep the motif restrained: dark dotted texture, real links, no prompt animation, no blinking caret, and no simulated input.

the terminal element acts as a calm exit from the current page rather than a new navbar or a floating control.

## page structure and copy

### home

retain the current editorial navigation, descriptions, and status badges. change only the command titles:

- `> cd /work` with the existing `building` badge and work description.
- `> cd /blog` with the existing `soon` badge and blog description.

only the shell command is a link. the status badge and supporting description stay non-interactive, so hover and focus feedback remain limited to the actual destination.

### blog index

place the terminal strip after the post list or empty-state message, inside the content panel:

- `> cd ..` navigates to `/`.
- `> cd /work` navigates to `/work`.

### blog articles

place the same terminal strip after the rendered article body, inside the article panel:

- `> cd ..` navigates to `/blog` because the article's parent directory is the blog index.
- `> cd /work` navigates to `/work`.

the existing `back to blog` link in the article header stays in place. it helps readers who want to leave immediately, while the terminal strip serves readers who reach the end.

### work

place the terminal strip after the final `let's talk` section and before the shared footer:

- `> cd ..` navigates to `/`.
- `> cd /blog` navigates to `/blog`.

this preserves the rhythm of the long work narrative and turns the strip into its closing navigation rather than interrupting a project section.

## component design

add one focused shared component for the terminal strip. its only responsibility is to render a labelled navigation region from a typed list of command links.

- component: `TerminalNav.vue`.
- input: a typed `items` prop containing `label` and `to` for each command.
- output: semantic navigation only; no emitted events, local state, composable, or client-only behavior.
- usage: blog index, blog article, and work supply their page-specific command list.
- home keeps its existing editorial navigation because its descriptions and badges make it structurally different from the compact strip.

nuxt's auto-imported `NuxtLink` handles internal routing. no new dependency is required.

## visual treatment

- use the site's current monospace type, colors, border language, radius, and rail alignment.
- separate the strip from preceding content with the existing quiet divider treatment and comfortable top spacing.
- give the strip a subtle dotted grid made with CSS background layers. the pattern must remain low-contrast and should not compete with body copy.
- keep the strip transparent or near-black within the existing panel rather than introducing a second card.
- place commands side by side on wider screens with enough space to read them as separate destinations.
- use the literal `> ` prompt as part of each visible command.
- keep all visible labels lowercase.

the memorable detail is the dotted terminal exit, not a new color, glow, animation, or oversized control.

## interaction

- every command is a real internal link with the full command text as its hit target.
- on hover, shift the command to the site's brighter text color and reveal a restrained underline or bottom rule.
- do not move, rotate, scale, glow, or highlight the entire strip on hover.
- preserve a clear `:focus-visible` outline that works independently of color.
- mark the current destination only when needed in the future; this iteration contains no self-links.

## responsive behavior

- desktop: commands share one row and align with the content column.
- mobile: commands stack vertically with a comfortable tap area and consistent left alignment.
- the dotted background remains clipped to the strip and does not extend across the whole page.
- command text must not overflow at narrow widths.

## accessibility and semantics

- render the strip as a `nav` with an explicit accessible label such as `terminal navigation`.
- render commands as a list of `NuxtLink` elements.
- retain meaningful DOM order and visible keyboard focus.
- do not convey link state through the dotted texture or color alone.
- respect reduced-motion preferences by adding no motion in the first place.

## verification

- verify the two home commands preserve their descriptions, badges, and destinations.
- verify `cd ..` resolves to `/` on blog and work, and to `/blog` on an article.
- verify the sibling commands resolve to `/work` or `/blog` as specified.
- verify the strip appears after content and before the footer on blog, article, and work pages.
- verify the layout at desktop and narrow mobile widths.
- verify hover, keyboard focus, and tap targets.
- run formatting, linting, type checking, and the production build.

## out of scope

- replacing the centered brand header or shared footer.
- adding a global navbar, floating terminal dock, command palette, or working shell input.
- adding animation, sound, a blinking cursor, command history, or keyboard shortcuts.
- changing blog content, work copy, status badges, or the article header navigation.
