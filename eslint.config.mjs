import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt({
  ignores: [".nuxt/**", ".output/**", "dist/**", "node_modules/**"],
  rules: {
    "no-console": "off",
    "vue/html-self-closing": "off",
    "vue/multi-word-component-names": "off",
  },
})
