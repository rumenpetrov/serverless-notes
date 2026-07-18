# Design System

This document outlines the styling philosophy and design system approach for the project.

## Styling Philosophy

The project uses **intentional minimalism** — only the styles strictly required to improve readability and usability are applied.

## Tooling

### Open Props

CSS custom properties are provided by **[Open Props](https://open-props.style/)**, loaded globally via CDN in [`Layout.astro`](src/layouts/Layout.astro).

Full token reference: https://open-props.style/

### Theme Tokens (`theme.css`)

A semantic token layer lives in [`src/styles/theme.css`](src/styles/theme.css). It maps Open Props primitives (and a few curated raw values) to semantic names like `--link`, `--input-border`, `--status-ok-bg`.

**Components and pages MUST use these theme tokens, never primitive Open Props or raw colors directly.** This ensures theme adaptation works automatically via `light-dark()` — no `data-theme` selectors needed.

## Guidelines

1. **Use theme tokens** — reference `--link`, `--input-border`, `--surface-raised`, etc. from `theme.css`. Never use `--indigo-6`, `#ccc`, or other primitives in component styles.
2. **Stay minimal** — only add styles that meaningfully improve the user experience.
3. **No `data-theme` selectors** — `light-dark()` handles both themes automatically.
4. **Avoid ad-hoc stylesheets** — scoped `<style>` blocks in `.astro` files are preferred.
