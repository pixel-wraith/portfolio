# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run dev              # Start dev server
npm run dev -- --open    # Start dev server and open browser

# Build & Preview
npm run build            # Production build
npm run preview          # Preview production build

# Testing
npm run test             # Run all tests (unit + e2e)
npm run test:unit        # Run Vitest unit tests (watch mode)
npm run test:unit -- --run  # Run unit tests once
npm run test:e2e         # Run Playwright e2e tests

# Code Quality
npm run lint             # Run ESLint
npm run check            # Run svelte-check for TypeScript errors
npm run check:watch      # Run svelte-check in watch mode
```

## Architecture

This is a SvelteKit 2 portfolio site using Svelte 5 with TypeScript, built with the Node adapter for deployment.

### Testing Setup

The project uses a dual-project Vitest configuration:
- **Server tests** (`*.test.ts`, `*.spec.ts`): Run in Node environment
- **Component tests** (`*.svelte.test.ts`, `*.svelte.spec.ts`): Run in browser via Playwright
- **E2E tests** (`e2e/`): Playwright tests against the built application

Note: All tests require assertions (`expect.requireAssertions: true` in vitest config).

### Key Conventions

**Styling**:
- Global CSS variables defined in `src/lib/assets/css/styles.css`
- Colors use OKLCH color space
- Color constants in `src/lib/constants/colors.ts` must stay in sync with CSS variables (for JS usage)
- Fonts: Bangers (headers), Playfair Display (body)
- Uses Font Awesome icons (fa-regular, fa-brands classes)

**Layout**:
- `+layout.svelte` contains the full app shell: header with nav, career experience progress bar, and footer
- Navigation items are defined in +layout.svelte's `navItems` array
- Uses Svelte 5 snippets pattern (`{@render children()}`)

**Constants**:
- Personal data in `src/lib/constants/me.ts` (career start date, birthday)
