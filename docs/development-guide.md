# Development Guide

This guide details the standards and procedures for extending and improving the application.

---

## 🧭 Routing & Paths (`createPath`)

To support hosting under subpaths (such as GitHub Pages), all static assets, iframe sources, component styles, and internal links **MUST** be generated using the `createPath` utility.

### Definition
The single source of truth for routing is the `createPath` utility defined in [astro.ts](file:///var/home/rumen/storage/projects/web/serverless-notes/src/utils/astro.ts). It prepends `import.meta.env.BASE_URL` while cleaning duplicate slashes.

### How to Use
Always import `createPath` from `@utils/astro` and wrap your target paths:

```astro
---
// In Astro frontmatter
import { createPath } from "@utils/astro";
---
<!-- Example Link -->
<a href={createPath("/templates")}>View Templates</a>

<!-- Realistic link -->
<TextLink href="/tempaltes">View Templates</Link>

<!-- Example Iframe Source -->
<iframe src={createPath("/template-index-fallback.html")}></iframe>
```

---

## 📄 Designing Templates

Templates define editable forms dynamically. They are managed by Astro Content Collections.

### Structure
Each template is a folder in `src/content/templates/` containing a `template.json` file.
The JSON format must conform to the schema defined in [content.config.ts](file:///var/home/rumen/storage/projects/web/serverless-notes/src/content.config.ts):

* **`title`** (string): User-facing template title.
* **`description`** (string): Explanatory text.
* **`version`** (string): Semantic versioning (e.g., `0.0.1`).
* **`content`** (array): Fields inside the editor. Supported types are `"text"`, `"number"`, and `"textarea"`.

*Example Schema (`template.json`):*
```json
{
  "title": "Minimal Note",
  "description": "A basic single-field template.",
  "version": "0.0.1",
  "content": [
    { "type": "text", "name": "title", "defaultValue": "My Note" },
    { "type": "textarea", "name": "body", "defaultValue": "Start writing..." }
  ]
}
```

---

## ⚡ Custom Window Events

The parent page (`[templateId].astro`) and the [Editor.astro](file:///var/home/rumen/storage/projects/web/serverless-notes/src/components/Editor.astro) component communicate using decoupled standard DOM custom events. **All event names and payload shapes are defined in a single typed module:** [editor-events.ts](file:///var/home/rumen/storage/projects/web/serverless-notes/src/utils/editor-events.ts).

Import the helpers instead of dispatching raw `CustomEvent`s:

```ts
import { emitEditorEvent, onEditorEvent, type EditorData } from "@utils/editor-events";

// Emit
emitEditorEvent("editor:change", data);

// Listen (returns an unsubscribe fn)
const off = onEditorEvent("editor:set-data", (data) => {
  setFormData(data);
});
```

The three events are:

1. **`editor:ready`** (Fired by: `Editor.astro` on mount)
   * *Payload*: `EditorData` — default key-value pairs from the form.
   * *Purpose*: Tells the parent layout to load existing content state or fallback to default values.
2. **`editor:set-data`** (Fired by: `[templateId].astro` parent)
   * *Payload*: `EditorData` — the decompressed content object.
   * *Purpose*: Instructs the editor fields to populate with the active state.
3. **`editor:change`** (Fired by: `Editor.astro` on form input)
   * *Payload*: `EditorData` — current key-value pairs of the form.
   * *Purpose*: Prompts the parent layout to compress data, save to the URL hash, and refresh the preview iframe.

### Initialization handshake

Both scripts are deferred ES modules, so their evaluation order is not guaranteed. To avoid the host missing `editor:ready`, the host fires **`host:request-data`** (payload `null`) immediately after registering its listeners; `Editor.astro` replies by re-firing `editor:ready`. This makes initialization order-independent.

---

## 🎨 Styling

All styling in this project is governed by the rules documented in [design-system.md](../design-system.md). The key points relevant to development are:

* **Open Props** is loaded globally via CDN in `Layout.astro`. Use its CSS custom properties (e.g. `var(--size-3)`, `var(--text-2)`, `var(--shadow-2)`) instead of hardcoded values in any component `<style>` block.
* **Theme tokens** from `src/styles/theme.css` provide semantic aliases (e.g. `--link`, `--input-border`) that adapt automatically to light/dark mode via `light-dark()`. **Always prefer theme tokens over primitive Open Props tokens** when a semantic equivalent exists.
* **No `data-theme` selectors** — `light-dark()` handles both themes automatically.
* Keep styles **minimal and scoped** — add only what is needed for readability or usability, placed in the component's own `<style>` block.
