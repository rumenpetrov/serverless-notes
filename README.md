# Serverless Notes

A Proof-of-Concept (POC) serverless note-taking and card application built with **Astro**. This project stores all data and application state **entirely within the URL hash** instead of a database, making notes private, serverless, and instantly shareable.

---

## 📖 Essential Documentation

To prevent documentation drift, detailed specifications are kept in dediced files (single sources of truth). Please refer to:

* **Core Architecture**: [docs/architecture.md](docs/architecture.md) — Explains the Zero-DB engine, Oreh SDK compression, and iframe reactive lifecycle.
* **Development Guide**: [docs/development-guide.md](docs/development-guide.md) — Contains dynamic template layouts, event protocols, and the critical **`createPath`** routing standard.
* **Naming Standards**: [docs/standards/naming.md](docs/standards/naming.md) — Strict project naming conventions.
* **Styling Philosophy**: [design-system.md](design-system.md) — Intentional minimalist styling policies.
* **AI Assistant Guidelines**: [.cursorrules](.cursorrules) — Enforced constraints for automated coding systems.

---

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed.

```bash
# Install dependencies
npm install

# Start local development server (runs at localhost:4321)
npm run dev

# Compile the production application to `./dist/`
npm run build

# Preview your production build locally
npm run preview
```
