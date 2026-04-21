# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@acrool/window-launcher` is a TypeScript library that wraps `window.open` to handle browser compatibility issues — particularly for async operations in iOS Safari. It pre-opens a blank tab before the async request, then redirects to the resolved URL or writes HTML content into that tab.

## Commands

### Library (root)

```bash
yarn test               # Run Jest unit tests (jsdom environment)
yarn test --testPathPattern src/Launcher.spec.ts   # Run a single test file
yarn build              # Clean dist/, run tsc, then vite build
yarn dev                # Watch mode build
yarn lint:fix           # ESLint auto-fix on src/
```

### Example / Storybook (`example/`)

```bash
cd example && yarn storybook          # Start Storybook dev server on port 6006
cd example && yarn build-storybook    # Build static Storybook
```

### Playwright E2E (`playwright/`)

```bash
# Requires Storybook to be running on port 6006 first
cd playwright && yarn playwright test
```

## Architecture

```
src/
  index.ts        — re-exports Launcher (default + named) and all utils
  Launcher.ts     — main Launcher class
  types.ts        — ILauncherOption, IOpenData, TOpenType
  utils.ts        — browser/OS detection helpers + writeHtml()

example/          — Storybook app (React + Vite) that uses the library via `link:..`
playwright/       — E2E tests against the running Storybook
```

### Core flow (`Launcher`)

1. `open(promiseFn)` calls `_ready()` which immediately calls `window.open(readyUrl)` to get a `WindowProxy` — this must happen synchronously in the user gesture event to avoid popup blockers.
2. `promiseFn` runs (async, e.g. an API call).
3. On resolve: `_openUrl(url)` navigates the pre-opened window, or `_openHtml(html)` writes HTML directly into its `document`.
4. On reject: if `isEnableCatchClose` is true, the pre-opened window is closed.

### Browser detection (`utils.ts`)

Detection order in `getBrowser()` matters — Line/Facebook/Firefox/Wechat/Edge are checked before Chrome/Safari because their UA strings also contain "safari". Line, Wechat, and Facebook browsers skip `window.open` entirely (popup blocked in these environments).

## Release

```bash
yarn release:patch   # bump patch via standard-version
yarn release:minor
yarn release:major
yarn cz              # commitizen commit (uses cz-git)
```
