# Redobrai: duas frentes Implementation Plan

> **For agentic workers:** This plan is being executed inline in the current session. Follow the tasks in order and keep each deliverable reviewable.

**Goal:** Rebuild the Redobrai landing page as one responsive React site that clearly presents Redobrai IA and Redobrai Indústrias using Astryx components.

**Architecture:** Replace the current static page entry point with a Vite + React 19 app. Import Astryx's prebuilt CSS and components, apply the neutral theme with Redobrai brand overrides, and compose one page from focused sections and the existing local brand assets.

**Tech Stack:** React 19, Vite, `@astryxdesign/core`, `@astryxdesign/theme-neutral`, `@stylexjs/stylex`, and `@astryxdesign/cli` for component documentation.

**Spec:** `docs/superpowers/specs/2026-11-21-redobrai-duas-frentes-design.md`

## Global Constraints

- Present Redobrai IA as agentic solutions for companies without inventing capabilities, integrations, or results.
- Present Redobrai Indústrias using existing source content: WattSense, energy monitoring, and machine-vision inspection.
- Keep both areas on a single page with anchor navigation.
- Keep the existing mailto contact behavior and native field validation.
- Preserve the Redobrai logo and WattSense image.
- Use React 19 or later as required by Astryx.
- Do not add or run automated tests unless requested.

---

### Task 1: Establish the React and Astryx app shell

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Modify: `index.html`
- Create: `src/main.jsx`
- Create: `src/App.jsx`
- Create: `src/styles.css`
- Create: `src/astryx-themes.js`
- Create: `src/themes/redobrai/*` and `themes/redobrai/*`
- Create: `public/assets/redobrai-logo.png`
- Create: `public/assets/wattsense.png`
- Create: `AGENTS.md` via Astryx CLI initialization, containing the generated Astryx component reference

**Interfaces:**
- `src/main.jsx` imports `src/styles.css` and renders `App` into `#root`.
- `src/App.jsx` exports the page component as the default export.
- `public/assets/*` serves the existing logo and WattSense image at `/assets/*`.

- [x] Add Vite scripts (`dev`, `build`, `preview`, `astryx`) and dependencies for React 19, Vite, Astryx core and theme, StyleX runtime, Vite React plugin, and Astryx CLI.
- [x] Update the HTML entry to Portuguese metadata, Redobrai title and description, and a `#root` mount with `/src/main.jsx` as module entry.
- [x] Create a minimal Vite configuration with the React plugin.
- [x] Copy the existing logo and WattSense image into `public/assets/` so Vite serves them from stable root paths.
- [x] Add the React entry point and starter `App` component.
- [x] Import Astryx reset, component CSS, and neutral theme in the documented cascade order; add the Astryx `Theme` provider around `App`.
- [x] Initialize Astryx using `npm run astryx -- init` and inspect the generated component reference.

### Task 2: Compose the two business areas from Astryx components

**Files:**
- Modify: `src/App.jsx`

**Interfaces:**
- Uses documented exports and prop shapes from the generated Astryx component reference.
- Retains the default `App` export mounted by `src/main.jsx`.

- [x] Read Astryx documentation for `Button`, `Card`, `TextInput`, and `TextArea` with `npm run astryx -- component <name>` before composing controls.
- [x] Build a semantic header with Redobrai logo, anchor links to both areas, and a contact CTA; provide an accessible mobile menu with expanded state.
- [x] Build a single opening section that names both Redobrai IA and Redobrai Indústrias and offers direct links to each.
- [x] Build the Redobrai IA section with concise, non-claiming copy about agentic company solutions and a CTA to contact.
- [x] Build the Redobrai Indústrias section with the existing WattSense description, energy monitoring, and Uppla machine-vision inspection project; compose the inspection visual with Astryx text and layout components.
- [x] Add a contact form with required name, email, and message fields. Preserve native validation and encode form values into the `mailto:` URL on submit.
- [x] Add a footer with the logo, current year, and back-to-top link.

### Task 3: Apply Redobrai visual identity and responsive behavior

**Files:**
- Modify: `src/styles.css`
- Modify: `src/App.jsx` only if semantic or responsive hooks need adjustment

**Interfaces:**
- CSS custom properties theme Astryx tokens and style the page's semantic section classes.
- Components retain Astryx behavior and remain keyboard operable.

- [x] Set Redobrai brand tokens, typography, page background, and focus styles after the Astryx imports so custom styles use the documented cascade.
- [x] Give Redobrai IA and Redobrai Indústrias distinct supporting color and composition while preserving one brand system.
- [x] Style desktop layout with clear separation between the opening section, the two offer sections, existing project visuals, contact, and footer.
- [x] Add responsive rules for navigation, cards, content columns, form controls, and images for narrow viewports.
- [x] Remove reliance on the legacy static styles and script from the HTML entry without deleting their files.

## Handoff note

No automated tests were added or run. `npm run build` completed successfully. `npm run astryx -- doctor --built .` reported 25 passes, zero failures, and one source-style warning: the marketing page uses page-specific CSS classes for layout and brand treatment (70 styling findings and 10 component-composition findings in the summary). The raw inspection SVG was removed and navigation now uses Astryx Link. The build notes a 680 kB JavaScript chunk before gzip (213 kB gzipped). The app scripts and dependencies are documented in `package.json`.
