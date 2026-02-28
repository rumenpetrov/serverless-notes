# Naming Standards

This document outlines the naming conventions for the project to ensure consistency across the codebase for both developers and AI agents.

## Files and Folders

### Default Rule
- **Kebab Case**: By default, all files and folders should follow the `kebab-case` naming convention (lowercase letters, numbers, and hyphens). This applies unless a more specific rule is defined below.

### Components
- **PascalCase**: All component files (e.g., `.astro`, `.tsx`) and their containing folders within `src/components/` and `src/layouts/` must use `PascalCase` to match the component name.
- **Consistency**: The filename must exactly match the name of the component it exports/defines.

### Classes
- **PascalCase**: Files that primarily export a single class (e.g., `.ts`, `.js`) and their containing folders may use `PascalCase` to match the class name.

### Exceptions
- **Library-specific files**: Files or folders that require a specific naming convention by a library or framework (e.g., Astro pages with dynamic parameters like `[id].astro`, or `content.config.ts`).
- **Standard Project Files**: Common root-level files that typically use uppercase naming (e.g., `README.md`, `CONTRIBUTING.md`, `LICENSE`).

### Examples
- ✅ `src/components/UserProfile.astro` (Component rule)
- ✅ `src/layouts/MainLayout.astro` (Component rule)
- ✅ `src/oreh-sdk/Oreh/Oreh.ts` (Class rule)
- ✅ `docs/standards/naming.md` (Default rule)
- ✅ `public/assets/main-logo.png` (Default rule)
- ✅ `src/pages/[templateId].astro` (Library exception)
- ✅ `README.md` (Standard project file exception)
- ❌ `src/components/user-profile.astro`
- ❌ `public/assets/mainLogo.png`
- ❌ `src/components/user_profile.astro`
- ❌ `src/oreh-sdk/Oreh/oreh.ts`
