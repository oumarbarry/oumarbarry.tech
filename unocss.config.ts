import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss"

export default defineConfig({
  presets: [presetWind3(), presetAttributify()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    fontFamily: {
      // og-image scans the preset's default sans stack (Segoe UI, Roboto, Helvetica
      // Neue…) and tries to download every family — pin it to the site's real font.
      sans: '"IBM Plex Mono", ui-monospace, monospace',
    },
  },
})
