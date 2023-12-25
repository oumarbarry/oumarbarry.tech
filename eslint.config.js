import antfu from "@antfu/eslint-config"

export default antfu({
  unocss: true,
  stylistic: { quotes: "double" },
  rules: {
    "node/prefer-global/process": 0,
  },
})
