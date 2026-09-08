# Design System

This document outlines the design architecture, styling philosophy, token dictionary, and component specifications for **Serverless Notes**.

---

## 🏛️ Architecture & Philosophy

The project uses **intentional minimalism** — only the styles strictly required to improve readability, usability, and accessible contrast are applied. No runtime CSS libraries or bulky utility frameworks (such as Tailwind) are used.

### Three-Layer Token Architecture

```
Layer 1: Open Props (Primitives)
  │      Loaded globally via CDN in Layout.astro (sizes, easing, fonts, raw color ramps)
  ▼
Layer 2: Theme Tokens (src/styles/theme.css)
  │      Semantic tokens mapping primitives via CSS light-dark() for zero-JS theming
  ▼
Layer 3: UI Components (src/components/*)
         Astro components consuming semantic tokens with scoped styles
```

1. **Primitives**: Base properties provided by **[Open Props](https://open-props.style/)** and loaded in [`Layout.astro`](src/layouts/Layout.astro).
2. **Semantic Theme Tokens**: Defined in [`src/styles/theme.css`](src/styles/theme.css). Maps primitives to semantic names using `light-dark()`.
3. **Components**: Scoped `.astro` components that reference semantic theme tokens exclusively.

---

## 🎨 Theme Tokens (`theme.css`)

All components and pages **MUST** use these semantic theme tokens rather than raw colors or primitive Open Props. Automatic dark/light adaptation occurs natively in the browser via `light-dark()` with `:root { color-scheme: light dark; }`.

### Brand & Accent
| Token | Purpose | Light / Dark Source |
|---|---|---|
| `--brand` | Primary brand & call-to-action color | `var(--indigo-7)` / `var(--indigo-4)` |
| `--brand-hover` | Hover state for primary interactions | `var(--indigo-8)` / `var(--indigo-3)` |
| `--brand-active` | Active/press state for primary interactions | `var(--indigo-9)` / `var(--indigo-2)` |
| `--brand-subtle` | Subtle tinted background | `var(--indigo-0)` / `var(--indigo-11)` |
| `--brand-contrast` | Text color on top of brand backgrounds | `white` / `var(--gray-12)` |

### Links
| Token | Purpose |
|---|---|
| `--link` | Text link color (`light-dark(var(--indigo-7), var(--indigo-4))`) |
| `--link-hover` | Hover color for text links (`light-dark(var(--indigo-9), var(--indigo-2))`) |

### Typography & Foreground
| Token | Purpose |
|---|---|
| `--text-1` | Primary text, titles, headings, and active labels |
| `--text-2` | Secondary body text and subtitles |
| `--text-muted` | Hints, placeholders, captions, and secondary metadata |
| `--text-inverse` | Inverted text for dark surfaces in light mode |

### Surfaces & Backgrounds
| Token | Purpose |
|---|---|
| `--surface-base` | Root document background |
| `--surface-card` | Container, panel, and card background |
| `--surface-raised` | Elevated modal or floating card surface |
| `--surface-raised-hover` | Hover surface for interactive cards |
| `--surface-sunken` | Inset wells or recessed code blocks |
| `--surface-overlay` | Translucent backdrop overlay |
| `--preview-bg` | Background for iframe preview viewport |

### Borders & Dividers
| Token | Purpose |
|---|---|
| `--border-subtle` | Subtle card borders and minor dividers |
| `--border-default` | Standard input and component borders |
| `--border-strong` | High-emphasis borders and active outlines |
| `--border-muted` | Alias to `--border-subtle` for backwards compatibility |

### Inputs & Form Controls
| Token | Purpose |
|---|---|
| `--input-bg` | Form field background |
| `--input-border` | Default resting border |
| `--input-border-hover` | Border on hover |
| `--input-border-focus` | Border when focused |
| `--input-placeholder` | Placeholder text |
| `--input-text` | Typed text value |
| `--input-disabled-bg` | Disabled input fill |
| `--input-disabled-border` | Disabled input border |

### Buttons
| Variant | Background Token | Hover Token | Text Token |
|---|---|---|---|
| **Primary** | `--button-primary-bg` | `--button-primary-bg-hover` | `--button-primary-text` |
| **Secondary** | `--button-secondary-bg` | `--button-secondary-bg-hover` | `--button-secondary-text` |
| **Ghost** | `--button-ghost-bg` (transparent) | `--button-ghost-bg-hover` | `--button-ghost-text` |
| **Danger** | `--button-danger-bg` | `--button-danger-bg-hover` | `--button-danger-text` |

### Status Indicators (Badges & Alerts)
| Status | Background | Text | Border |
|---|---|---|---|
| **OK** | `--status-ok-bg` | `--status-ok-text` | `--status-ok-border` |
| **Warning** | `--status-warning-bg` | `--status-warning-text` | `--status-warning-border` |
| **Critical** | `--status-critical-bg` | `--status-critical-text` | `--status-critical-border` |
| **Info** | `--status-info-bg` | `--status-info-text` | `--status-info-border` |
| **Neutral** | `--status-neutral-bg` | `--status-neutral-text` | `--status-neutral-border` |

### Focus Ring, Elevation & Spacing
| Category | Token | Value |
|---|---|---|
| **Focus Ring** | `--focus-ring` | `light-dark(var(--indigo-5), var(--indigo-4))` |
| | `--focus-ring-width` | `2px` |
| **Shadows** | `--shadow-card` | `var(--shadow-1)` |
| | `--shadow-raised` | `var(--shadow-2)` |
| **Radii** | `--radius-control` | `var(--radius-2)` (Inputs, buttons) |
| | `--radius-card` | `var(--radius-3)` (Cards, panels) |
| | `--radius-badge` | `var(--radius-round)` (Pill badges) |
| **Spacing** | `--space-1` to `--space-8` | Maps to Open Props `--size-1` through `--size-8` |

---

## 📋 Rules & Best Practices

1. **Strict Token Usage**: Never use primitive Open Props (e.g. `--indigo-6`, `--gray-5`) or hardcoded hex colors (`#333`) in component styles. Reference `--link`, `--input-border`, `--brand`, `--surface-base`, etc.
2. **Automatic Theme Adaptation**: Never write `[data-theme]` selectors or manual mode switching media queries in components. Let `light-dark()` resolve colors automatically.
3. **Accessible Focus Rings**: Interactive elements (`Button`, `Input`, `Textarea`, `TextLink`) must support `:focus-visible` with `var(--focus-ring)`.
4. **Scoped Styles**: Place styles in the component's own `<style>` block. Avoid ad-hoc global stylesheets.
5. **Path Resolution**: Internal links, asset URLs, and iframe targets must be resolved with `createPath` (or through `Link` / `TextLink`).

