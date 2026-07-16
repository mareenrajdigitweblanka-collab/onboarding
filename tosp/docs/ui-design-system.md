# TOSP UI Design System

Status: PROTOTYPE_ONLY (system/UI implementation) — this document describes the
frontend design system only. Programme content remains FINAL_TRUTH; see
README.md and docs/architecture.md for that boundary.

## Design goals

- **Professional internal EdTech**, not a marketing site: calm, trustworthy,
  information-dense without feeling cluttered.
- **Comfortable for long reading sessions**: a constrained reading width for
  lesson content, generous line-height, no low-contrast grey-on-grey text.
- **Consistent everywhere**: one design-token system drives every screen —
  no raw hex colors or magic pixel values scattered through component CSS.
- **No dependency on color alone**: every status (locked, available,
  in-progress, awaiting sign-off, passed, failed) carries a text label and a
  symbol, in addition to its color.
- **System fonts only, no CDN, no icon font/library, no build step.**

## Design tokens

All tokens live in `css/styles.css`, `:root` block, grouped by category.

### Color (light theme, `:root[data-theme="light"]`)

| Token | Purpose |
|---|---|
| `--color-bg` | Page background |
| `--color-surface` | Card/panel background |
| `--color-surface-elevated` | Toasts, dialogs — sits above `--color-surface` |
| `--color-nav-bg` | Sidebar / top bar background |
| `--color-text` | Primary text |
| `--color-text-secondary` | Secondary text (summaries, descriptions) |
| `--color-text-muted` | Lowest-emphasis text (meta, timestamps, captions) |
| `--color-border` | Default hairline borders |
| `--color-border-strong` | Borders on elevated surfaces (dialogs, toasts) |
| `--color-primary` / `--color-primary-hover` | Primary action color and its hover state |
| `--color-primary-soft` | Selected/hover background tint (nav links, quiz options) |
| `--color-success` / `--color-success-bg` | Passed/complete states |
| `--color-warning` / `--color-warning-bg` | Awaiting sign-off, prototype banner |
| `--color-danger` / `--color-danger-bg` | Failed, destructive actions |
| `--color-info` / `--color-info-bg` | Informational toasts |
| `--focus-ring` | Keyboard focus outline (all interactive elements) |
| `--color-overlay` | Modal/drawer backdrop |
| `--shadow-card` | Standard card elevation |
| `--shadow-nav` | Sidebar/drawer edge shadow |
| `--shadow-elevated` | Toasts and dialogs |

The dark theme (`:root[data-theme="dark"]`) redefines every one of the above
tokens — nothing is left to default/inherit, so no screen can end up
half-themed. A `@media (prefers-color-scheme: dark)` block provides the same
values as a fallback only for the brief case where no `data-theme` attribute
is present at all (shouldn't happen in practice — see Theme implementation).

### Spacing scale

`--space-1` (4px) through `--space-8` (64px), in roughly 1.5× steps. Used for
all padding/margin/gap — no ad-hoc pixel values in component rules.

### Typography scale

`--font-size-xs` (0.75rem) through `--font-size-3xl` (2.25rem), plus
`--line-height-tight` / `--line-height-normal` / `--line-height-relaxed`.
`--font-family` is the system-font stack (`-apple-system, BlinkMacSystemFont,
"Segoe UI", Roboto, Helvetica, Arial, sans-serif`) — no web fonts, no CDN.

### Radius and shadow scales

`--radius-sm` (6px, buttons/inputs) / `--radius-md` (10px, cards) /
`--radius-lg` (16px, reserved for large surfaces) / `--radius-full` (pills,
badges, progress bars).

### Motion

`--transition-fast` (120ms) for hover/focus feedback, `--transition-base`
(200ms) for layout changes (sidebar slide, toast enter). A global
`@media (prefers-reduced-motion: reduce)` block collapses all transitions
and animations to near-zero duration.

### Layout

`--content-width` (1100px, general panel max-width), `--content-width-reading`
(760px, lesson body text only), `--sidebar-width` (272px), `--topbar-height`
(60px). `--breakpoint-mobile` (767px) and `--breakpoint-tablet` (1023px) are
defined as custom properties for documentation/consistency, but — because CSS
media queries cannot consume `var()` — the actual `@media` rules use the
literal pixel values; keep the two in sync if either changes.

## Typography

- Headings use a strict hierarchy: one `<h1>` per screen, `<h2>` per panel
  section, `<h3>` for sub-groups. No level is skipped (verified in the
  regression check).
- Body text: `--font-size-base` (1rem) in panels, `--font-size-lg` (1.125rem)
  for lesson reading content specifically — comfortably larger for extended
  reading.
- Muted/secondary text never drops below `--font-size-xs` (0.75rem), and
  never uses a lighter-than-`--color-text-muted` grey (contrast-checked
  against both theme backgrounds).

## Spacing

Panels use `--space-5` internal padding; sections within a panel are
separated by `--space-3`–`--space-4`; page-level sections stack with
`--space-5` gaps via `.app-main`'s flex `gap`.

## Component states

Every interactive/status component expresses state through **label + icon +
color**, never color alone:

- **Status badges** (`status-badge.js`): each status has a fixed text label
  and a Unicode symbol (🔒 locked, ● available, ◐ in-progress, ◔ awaiting
  sign-off, ✓ passed, ✗ failed).
- **Module cards**: status badge, a progress bar, an explicit "Locked
  because…" sentence when locked, the last quiz result (score + pass/fail
  text), sign-off status (Required / Confirmed (simulated)) for PH modules,
  and the module's source citation — all as text, not just a colored border.
- **Buttons**: `.btn--primary` / `.btn--ghost` / `.btn--danger`, each with a
  distinct hover state; `:disabled` reduces opacity and disables pointer
  events via `cursor: not-allowed`.
- **Form validation**: inline `.form-error` box (icon-free but high-contrast
  danger colors + explicit text), tied to the form via `role="alert"`.
- **Toasts**: left border color + icon-equivalent role (`status` vs `alert`)
  distinguish success/warning/error; always paired with readable text.

## Responsive behavior

Single fluid layout, no separate mobile template:

- **< 768px (mobile)**: sticky top app bar (menu button, brand, theme
  toggle), sidebar becomes an off-canvas drawer (`transform: translateX`),
  opened via the menu button, closed via the ✕ button, the overlay, or
  Escape. Module grid collapses to one column.
- **768–1023px (tablet)**: same off-canvas nav pattern as mobile (a
  deliberate choice — a persistent sidebar at this width would leave too
  little room for content), module grid becomes two columns.
- **≥ 1024px (laptop/desktop)**: persistent sidebar (`position: fixed`,
  `--sidebar-width` wide), `body` gets `padding-left: var(--sidebar-width)`
  so content is never hidden underneath it, main content centers within
  `--content-width` up to 1440px+ screens.

Validated at 360, 390, 768, 1024, and 1440px — see
`validation/ui-ux-regression-check.md`.

## Light/dark themes

See `docs/accessibility-and-speech.md`'s "Theme implementation" note is
covered in README.md; in short: `data-theme="light"|"dark"` on `<html>`,
resolved from saved preference → OS preference → light fallback, persisted
to the **separate** `tosp.ui.theme.v1` storage key (never mixed with learner
progress in `tosp.prototype.v2`).

## Known limits

- Two-tier tablet behavior (drawer nav rather than a condensed persistent
  sidebar) is a deliberate simplification, not a bug — revisit if the
  product ever needs a tablet-optimized icon-only sidebar.
- `:has()` is used for the quiz-option selected-state highlight
  (`.quiz-option:has(input:checked)`); this is a progressive enhancement —
  browsers without `:has()` support still show the native radio button's
  checked state correctly, they just don't get the extra background tint.
- No print stylesheet — out of scope for this prototype.
