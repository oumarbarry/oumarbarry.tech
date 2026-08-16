// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
  {
    // Installed skill bundles — vendored tooling docs, not project source.
    ignores: [".agents/**", ".claude/**"],
  },
  {
    rules: {
      "no-console": "off",
      "vue/html-self-closing": "off",
      "vue/multi-word-component-names": "off",
      // oxfmt owns attribute layout — this rule fights it (join/split loop)
      "vue/max-attributes-per-line": "off",
      // `any` is allowed but flagged — type it at the boundaries over time.
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
)
