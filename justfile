# Show this help
default:
    @just --list --unsorted

# Install dependencies
install:
    bun install

# Start the dev server
dev:
    bun run dev

# Build for production (prerenders /, /work, /blog/**)
build:
    bun run build

# Build then run the production server locally
serve: build
    node .output/server/index.mjs

# Run ESLint
lint:
    bun run lint

# Run ESLint with auto-fix
lint-fix:
    bun run lint --fix

# Check formatting
fmt:
    bun run fmt

# Format the tree (writes)
fmt-fix:
    bunx oxfmt .

# Run TypeScript type checking
typecheck:
    bun run typecheck

# Run unit tests
test:
    bun run test

# Build, then verify the prerendered output (deployment gate)
test-rendered:
    bun run test:rendered

# Lint + typecheck + tests
check: lint typecheck test
