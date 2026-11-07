# Leiden

Personal management app (La Merite, Thistle, Nivose, Parlamento, Edina Haritası, Academy, Oowtory, Notlar, Veri) in a single `index.html`. UI text is Turkish.

## Run
- Open `index.html` in a browser. No build, no server, no dependencies, no tests/linter.
- Published via GitHub Pages (public repo, `index.html` only).

## Structure
- `index.html`: `<style>` → module markup (`.module[data-module=...]`) → one `<script>`.
- Each module: `KEY` constant + `loadJson`/`saveJson` store, `renderX()` and `setupX()`; register in `renderLeiden()` and the setup list at the bottom.
- Backup/sync: add new stores to `buildBackup()` / `applyBackup()` and the JSON shape in `README.md`.
- Home tiles in `renderHome()`, shortcuts in `#helpModal`.
- `EDINA-TAKVIMI.md`: Edina calendar (Sept 2006 = month 1).
- PWA: `sw.js` (network-first, bump `CACHE` when shell files change), `manifest.webmanifest`, `icons/`.
- Theme: purple/white/blue from the Edina flag, EB Garamond + Jost; last `Edina teması` block in `<style>` overrides earlier rules, flag is inlined as `--flag`, line icons are the SVG sprite at the top of `<body>`.
- PDF export: `printDoc(html, footer, title)` + `@media print` rules (`.pm`, `.pd`, `.pz`).

## Rules
- `Essais/`, `Notlar/`, `Oowy/`, `Oowy Archive/` are private personal data: never read, never add to the public repo.
- Keep everything inline in `index.html`; no external libraries.
- Escape user text with `esc()` when building HTML strings.
- Update `README.md` when a module or the JSON format changes.
