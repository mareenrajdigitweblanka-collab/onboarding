# TOSP Whole-App UI/UX Design System

Status: PROTOTYPE_ONLY (system/UI implementation) — this document describes the
frontend design system only. Programme content remains FINAL_TRUTH per
programme; see each programme's `docs/*-programme-architecture.md` and
`docs/*-source-map.md` for that boundary.

This document supersedes `docs/ui-design-system.md` as the canonical design
reference now that the token system, shell, and component library are shared
by all five programmes (PH, Amazon, eBay, Digital Marketing, Purchasing), not
PH alone. `docs/ui-design-system.md` is left in place for its detailed
history of the original token rollout and is still accurate for everything it
describes — this document adds the whole-app coverage and the additions made
during the 2026-07-28 whole-app professionalisation pass (see the handover at
`tosp/handover/2026-07-28__tosp-whole-app-ui-ux-closure.md` for the full diff).

## Design principles

- **Professional internal EdTech, not a marketing site.** Calm, trustworthy,
  information-dense without feeling cluttered. No decorative gradients, no
  unnecessary shadows or animation, no oversized headings.
- **One system, five programmes.** Every visual and interaction pattern is
  driven by CSS custom properties and shared component classes, never by a
  programme-id conditional in shared view/component code. Programme
  differences are expressed through each programme's descriptor object
  (`programmes/*-programme.js`'s `ui`/`features`/`content` fields), consumed
  generically by the shared views. See "Programme-feature variants" below.
- **No dependency on colour alone.** Every status (locked, available, ready,
  in-progress, attempts-exhausted, awaiting sign-off, passed, failed)
  carries a text label and a symbol in addition to colour.
- **Comfortable for long reading.** Constrained reading width for lesson
  content, generous line-height, no low-contrast grey-on-grey text.
- **System fonts only, no CDN, no icon font/library, no build step.**

## Typography

Hierarchy (see `css/styles.css`'s base rules and `--font-size-*` tokens):

| Level | Token / element | Used for |
|---|---|---|
| Application title | `.app-sidebar__project` (14px, 700) | "Team Onboarding & Skill Progression Platform" in the shell |
| Programme title | `h1` inside `.dashboard-welcome` (28px, 700) | "Welcome back, Demo Learner" |
| Page title | `h1` (28px, 700) | One per screen |
| Page introduction | `p.muted` under the page `h1` | Short descriptive paragraph |
| Section title | `h2` (22px, 700) | One per panel |
| Card title | `h3` / `.module-card__title` / `.programme-select-card__title` (18px, 700) | Module cards, programme cards |
| Body text | default `p` (16px) / `.lesson-content__body` (18px, relaxed line-height) | Ordinary descriptions and lesson content |
| Supporting text | `.muted.small` (14px) | Meta lines, captions, timestamps |
| Labels | `.programme-select-card__team`, `dt` in `.summary-grid` (12px, uppercase) | Field labels |
| Status badges | `.badge` (12px, 700, uppercase) | Always icon + label, see below |
| Source references | `.muted.small` next to a "Source:" prefix | Every lesson, module, question, practical-task item |

Body text and descriptions consistently use the base weight (400) and the
`--color-text-secondary`/`--color-text-muted` tokens — never a heavier weight
than headings, and never smaller than `--font-size-xs` (12px). Lesson
content uses `--content-width-reading` (760px) as its max width so a line
never runs uncomfortably long.

## Spacing

`--space-1` (4px) through `--space-8` (64px) in a roughly 1.5× scale. All
padding/margin/gap in every component and every addition from this session
(feature chips, the programme-selection grid, the new module-card note
lines, the completion-screen action row) draws from this scale — no ad-hoc
pixel values.

## Colour roles

All colours are CSS custom properties re-themed per `data-theme`, defined
once in `css/styles.css`'s `:root` blocks (see `docs/ui-design-system.md` for
the full token table — unchanged by this session). Roles used throughout:

- `--color-primary` / `--color-primary-soft` — primary action, active nav,
  "available"/"ready" status, active programme-selection card border.
- `--color-success` / `--color-success-bg` — passed states.
- `--color-warning` / `--color-warning-bg` — in-progress, awaiting sign-off,
  the prototype banner.
- `--color-danger` / `--color-danger-bg` — failed, attempts-exhausted,
  destructive actions.
- `--color-text-muted` — locked state, meta text, source citations.
- `--color-border` — locked badge background, default card borders.

## Themes

Light and dark themes redefine every token (see `docs/ui-design-system.md`).
All additions in this pass (feature chips, programme-selection cards, the two
new module statuses, the completion-screen action row) use only existing
tokens, so both themes were correct with zero new theme-specific rules —
verified in `tosp/evidence/tosp-whole-app-ui-ux-2026-07-28/after/06-dashboard-ph-dark.png`.

## Cards

- `.panel` — the base surface for every section (dashboard cards, module
  detail sections, quiz panels, etc).
- `.module-card` — module-journey card; state expressed via
  `.module-card--<status>` modifier (border colour) plus a text/icon badge
  plus, for `locked` and the new `attempts-exhausted` state, an explanatory
  sentence (`.module-card__lock-reason`) — never colour alone.
- `.programme-select-card` (new) — programme-selection card; same visual
  language as `.module-card` (bordered panel, `--active` modifier using
  `--color-primary`), reusing `.badge` for the "Currently Active" indicator
  and the new `featureChipsRow()` component for feature availability.
- `.stat-card` — dashboard progress tiles.

## Buttons

`.btn--primary` / `.btn--ghost` / `.btn--danger`, unchanged from the existing
system. Every screen keeps exactly one dominant primary action per panel
(e.g. dashboard's "Continue: Module N", the programme-selection card's single
"Switch to X" / "Continue to Dashboard" button, the completion screen's
"Back to Dashboard" as primary with "Review Programme" and any practical-task
link as secondary `.btn--ghost`).

## Badges / status vocabulary

`components/status-badge.js`'s `LABELS` map is the single source of truth for
every status pill in the app. This session added two entries to close a real
gap (module cards previously had no way to show "ready to test" or "no
attempts left" distinctly from "available"):

| Status key | Label | Icon | Meaning |
|---|---|---|---|
| `locked` | Locked | 🔒 | Not yet unlocked |
| `available` | Available | ● | Unlocked, no lessons complete yet |
| `ready` **(new)** | Ready for Skill Check | ◎ | All required lessons complete, quiz not yet attempted |
| `in-progress` | In Progress | ◐ | Unlocked, ≥1 lesson complete, quiz not yet passed |
| `attempts-exhausted` **(new)** | Attempts Exhausted | ⚠ | Quiz not passed and no attempts remain |
| `awaiting-signoff` | Awaiting Sign-off | ◔ | Quiz passed, sign-off pending (sign-off-requiring modules only) |
| `passed` / `complete` | Passed / Complete | ✓ | Fully complete |
| `failed` | Failed | ✗ | A specific quiz attempt result |

This derivation lives in `services/progress-service.js`'s `getModuleStatus` —
a presentation-only layer on top of the unchanged unlock/scoring/sign-off
rules in `rules/module-access.js` and `rules/scoring.js`. No unlock rule,
attempt limit, or scoring calculation changed; only which label a given
already-computed state maps to.

## Feature chips (new)

`components/feature-chips.js`'s `featureChipsRow(programme)` renders a
compact chip row (Tamil Translation / Team Leader Sign-off / Final Practical
Task) derived from `programmeFeatureSummary()` in `programmes/registry.js` —
itself derived generically from each programme's `features` flags and
`content`/`ui` shape, never a hardcoded programme id. Used on every
programme's dashboard (`dashboard-view.js`) and every card on the new
programme-selection screen, so both surfaces automatically stay in sync with
whatever a programme actually declares.

## Progress indicators

`components/progress-bar.js`, unchanged — a labelled `role="progressbar"`
track with a computed-width fill (the one legitimate inline `style` in the
codebase, since the width is a runtime percentage).

## Feedback states

Toasts (`components/toast.js`) and the native-`<dialog>` confirm pattern
(`components/confirm-dialog.js`) are unchanged and shared by every programme.
Feedback copy avoids technical terms (`localStorage`, `JSON`, route hash,
etc.) throughout — see `docs/ui-design-system.md`'s existing coverage and the
completion-screen disclaimer added this session (below).

## Navigation

Persistent desktop sidebar / mobile top bar + slide-in drawer, unchanged
structurally. This session added one entry point:

- **"Browse All Programmes"** nav-style link in the sidebar's programme
  section (`components/header.js`), routing to the new `/programme-select`
  screen. The existing `<select>` programme switcher remains for fast
  in-place switching; the new screen is for first-time/considered switching
  where the learner wants to see all five programmes side by side before
  choosing.

Programme switching (either via the `<select>` or the new cards) is
unchanged at the mechanism level: `registry.js`'s `setActiveProgramme`
writes the `tosp.active-programme.v1` key and does a full page reload so the
engine re-reads that programme's content/config/storage key — no progress
ever mixes between programmes.

## Responsive rules

Unchanged breakpoints (`--breakpoint-mobile: 767px`, `--breakpoint-tablet:
1023px`) and behaviour (off-canvas drawer below 1024px, persistent sidebar
at/above it). The new `.programme-select-grid` uses the same
`repeat(auto-fill, minmax(…, 1fr))` pattern as `.module-grid`, so it
collapses to one column on narrow viewports with no new media query needed.
Verified at all six required viewports with zero horizontal-overflow
findings — see the validation report.

## Accessibility rules

Unchanged mechanisms (skip link, `:focus-visible` ring, native `<dialog>`
focus trap, Escape-to-close drawer, `aria-live` regions, icon+label status).
New markup follows the same rules: the programme-select cards use
`aria-label` on the `<article>` (mirroring `module-card.js`'s existing
pattern), the "Browse All Programmes" link is a real `<button>` with
`aria-current`, and the new module-card exhausted-attempts note uses the
same visible, non-colour-only pattern as the existing lock-reason note.

## Programme-feature variants

| Programme | Tamil | Sign-off | Practical Task | Modules |
|---|---|---|---|---|
| PH / Sales Team | ✓ | ✓ (11 of 18 modules) | — | 18 |
| Amazon Team | — | — | — | 16 |
| eBay Team | — | — | — | 8 |
| Digital Marketing Team | — | — | ✓ (non-gating) | 10 |
| Purchasing Team | — | — | ✓ (non-gating) | 10 |

Every variant above is expressed through programme descriptor fields
(`features.enableTamilTranslation`, `module.requiresSignoff`,
`ui.practicalTask`) and read generically by shared components
(`translation-control.js`, `module-card.js`, `dashboard-view.js`,
`feature-chips.js`) — no shared file branches on a programme id.

## Known limits (carried over + new)

- Two-tier tablet behaviour (drawer nav rather than a condensed persistent
  sidebar) remains a deliberate simplification (see
  `docs/ui-design-system.md`).
- The programme-selection cards show live progress only for the **active**
  programme (via the existing `getOverallProgress()`); other programmes'
  cards intentionally do not read localStorage for the *inactive*
  programmes' progress, because `storage.js` is documented as "the ONLY
  module allowed to touch window.localStorage" and only exposes the active
  programme's data. Reading a second programme's raw storage key from a view
  would violate that boundary; extending `storage.js` with a
  read-only-peek-by-key API is a reasonable follow-up if per-programme
  progress previews are wanted on the selection screen, but was out of scope
  for this pass (see "Next action" in the handover).
- No print stylesheet — out of scope, unchanged from the original design
  system doc.
