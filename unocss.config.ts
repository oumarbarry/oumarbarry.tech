import {
  defineConfig,
  presetAttributify,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  presets: [
    presetWind4({
      // wind4 ships the tailwind4 reset internally — replaces @unocss/reset/tailwind.css
      preflights: {
        reset: true,
      },
    }),
    presetAttributify(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    font: {
      // og-image scans the preset's default sans stack (Segoe UI, Roboto, Helvetica
      // Neue…) and tries to download every family — pin it to the site's real font.
      sans: '"IBM Plex Mono", ui-monospace, monospace',
    },
  },
})
