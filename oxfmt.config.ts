import { defineConfig } from "oxfmt"

export default defineConfig({
  semi: false,
  singleQuote: false,
  quoteProps: "as-needed",
  arrowParens: "always",
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "lf",
  insertFinalNewline: true,
  proseWrap: "preserve",
  htmlWhitespaceSensitivity: "css",
  experimentalSortImports: true,
  experimentalSortPackageJson: true,
  experimentalTailwindcss: true,
  // .agents/.claude skills are vendored content, public/ is served as-is — never format them
  ignorePatterns: [
    ".nuxt/**",
    ".output/**",
    "dist/**",
    "node_modules/**",
    ".agents/**",
    ".claude/**",
    "public/**",
  ],
})
