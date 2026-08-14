# custom error page design

## goal

replace nuxt's default error screen with a small, self-contained error page that feels like the rest of oumarbarry.tech. it must handle 404, 500, and unexpected status codes without exposing internal error details.

## selected direction

use the approved **quiet konoha** direction. the page keeps the site's dark terminal language, while the manga reference appears only in the home link so the joke stays subtle.

## visual structure

- keep the centered `[oumarbarry.tech]` brand bar.
- keep the same maximum width, vertical rails, thin borders, dark panel, rounded corners, and monospace typography as the rest of the site.
- place one compact error block inside the panel with generous empty space around it.
- show the status code as the main heading with the existing `> ` terminal prefix.
- do not render the normal footer or performance statistics. the error page should remain dependable when the application itself has failed, and the statistics would not help the user recover.
- do not add illustrations, gradients, animations, badges, or extra navigation.

## copy and actions

### 404

- heading: `404`
- message: `looks like this page took a wrong turn.`
- home link: `← konoha is this way`

### 500

- heading: `500`
- message: `something broke on my side. try again in a bit.`
- primary action: `try again`
- secondary home link: `← konoha is this way`

### other status codes

- display the provided numeric status code, falling back to `500` when it is missing.
- use the neutral message `something went wrong.`
- provide the home link.

all visible copy stays lowercase except the numeric status code and the existing brand. raw error messages, stack traces, route details, and server internals are never shown.

## behavior

- implement the design as Nuxt's root `error.vue`, which handles both route misses and application errors.
- the home link clears the active Nuxt error and navigates to `/`.
- the 500 retry action performs a full browser reload of the current URL.
- set a page title based on the status code, for example `404 — oumarbarry.tech`.
- mark error pages `noindex, nofollow`.
- keep the page self-contained and avoid depending on data fetching, performance measurements, or content queries.

## responsive and accessibility requirements

- retain the site's current desktop rails and compact mobile padding.
- keep the action links comfortably tappable on small screens.
- use a real `h1` for the status code and preserve visible keyboard focus states.
- meet the contrast already established by the site's text variables.
- the page must remain understandable without color or motion.

## verification

- open an unknown URL and confirm the custom 404 renders with the selected copy and a working home link.
- simulate a 500 error and confirm the retry and home actions work without exposing the underlying exception.
- verify desktop and mobile layouts.
- run formatting, linting, type/build checks, and the production link check.

## out of scope

- building the `/work` page.
- adding error monitoring or analytics.
- changing the normal header, footer, or home page.
