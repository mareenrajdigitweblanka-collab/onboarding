# TOSP Whole-App UI/UX Screen Inventory

Status: PROTOTYPE_ONLY. Produced during the 2026-07-28 whole-app UI/UX
professionalisation pass. Lists every shared screen, its owning
component/view file, which programmes use it, programme-specific variants,
the baseline weakness found (if any), the improvement implemented, and the
evidence path.

Evidence root: `tosp/evidence/tosp-whole-app-ui-ux-2026-07-28/` (`before/` and
`after/`, numbered filenames referenced below).

| # | Screen | Owning file(s) | Programmes | Variants | Baseline weakness | Implemented improvement | Evidence |
|---|---|---|---|---|---|---|---|
| 1 | Programme selection / landing | `js/views/programme-select-view.js` (new), `js/components/feature-chips.js` (new) | All 5 | Card shows "Currently Active" + "Continue" for the active programme, "Switch to X" for others | **No card-based selection screen existed** — only a `<select>` dropdown in the sidebar, so a first-time learner had no way to compare programmes, see module counts, or see which features (Tamil/sign-off/practical task) each one offers before choosing. | New `/programme-select` route + card grid: name, purpose, module count, status, feature chips, one primary action per card. Reachable via a new "Browse All Programmes" sidebar link. | `after/27-programme-select.png` (no `before/` — screen did not exist) |
| 2 | Shared shell (sidebar/topbar/drawer) | `js/components/header.js`, `css/styles.css` | All 5 | Programme switcher `<select>`, nav items sourced from `ui.navItems` per programme | Programme switching existed only via the terse `<select>`; no path to a fuller comparison view. | Added the "Browse All Programmes" entry point (see #1); shell structure otherwise already solid (persistent desktop sidebar, off-canvas mobile drawer, live overall-progress bar, theme toggle) — no other change needed. | `before/01`–`05`, `after/01`–`05` (dashboards, shell visible in every screenshot) |
| 3 | Dashboard — PH | `js/views/dashboard-view.js` | PH | Tracks: 7-Day Evaluation, PH Competency Path; readiness rows; Tamil + sign-off feature chips | Dashboard had no compact indicator of which optional features (Tamil, sign-off, practical task) the active programme offers. | Added `featureChipsRow()` under the welcome panel. | `before/01-dashboard-ph.png` → `after/01-dashboard-ph.png` |
| 4 | Dashboard — Amazon | `js/views/dashboard-view.js` | Amazon | Tracks: FBM/FBA/Vendor Central; no feature chips (none apply) | Same as above; also confirms no Tamil/sign-off/practical-task leakage. | Feature-chip row renders the "no extra features" message, generically. | `before/02` → `after/02` |
| 5 | Dashboard — eBay | `js/views/dashboard-view.js` | eBay | Tracks: 7-Day Onboarding, Listing Deep-Dive | Same as above. | Same. | `before/03` → `after/03` |
| 6 | Dashboard — Digital Marketing | `js/views/dashboard-view.js` | Digital Marketing | Tracks: Foundation/Performance Max/Shopping; practical-task chip | Same as above. | Feature-chip row shows "Final Practical Task" chip. | `before/04` → `after/04` |
| 7 | Dashboard — Purchasing | `js/views/dashboard-view.js` | Purchasing | Single track; practical-task chip | Same as above. | Same. | `before/05` → `after/05` |
| 8 | Dashboard — dark theme | `js/views/dashboard-view.js`, `css/styles.css` | PH (representative) | — | New feature-chip markup needed dark-theme contrast verification. | Verified — chips use existing surface/border/text tokens, correct contrast with zero new CSS. | `before/06` → `after/06` |
| 9 | Module journey (`/programme`, `/programme/:tier`) | `js/views/programme-view.js`, `js/components/module-card.js` | All 5 | PH has 2 named tracks; Amazon 3; eBay 2; DM 3; Purchasing 1 | `STATE_LEGEND` was missing the two states below; module cards had no distinct visual for "ready" or "attempts-exhausted". | Added `ready`/`attempts-exhausted` badge+card-border variants and legend entries. | `before/07` → `after/07` |
| 10 | Locked module | `js/views/module-view.js` | All 5 | — | Already clear ("Module Locked" + explanation + return link). No change needed. | — (regression-checked only) | `before/08` → `after/08` |
| 11 | Lesson | `js/views/lesson-view.js` | All 5 | Tamil controls (PH only) | Already solid: constrained reading width, breadcrumb, prev/next, Read Aloud. No change needed. | — (regression-checked only) | `before/09` → `after/09` |
| 12 | Programme sources | `js/views/sources-view.js` | All 5 | PH-only score-band/probation tables | Already fully data-driven, no rough edges found. No change needed. | — (regression-checked only) | `before/10` → `after/10` |
| 13 | Quiz — unsubmitted | `js/views/quiz-view.js` | All 5 | Tamil per-question controls (PH only) | Already solid. No change needed. | — (regression-checked only) | `before/11` → `after/11` |
| 14 | Quiz — failed | `js/views/quiz-view.js` | All 5 | — | N/A (state, not a distinct file). | Confirmed constructive failure messaging + attempts-remaining count unchanged. | `after/19-quiz-failed.png` (no comparable `before/` capture) |
| 15 | Quiz — passed | `js/views/quiz-view.js` | All 5 | Sign-off-required modules show the sign-off next step (PH) | Hardcoded PH citation text lived directly in this shared view (see #17). | Text now sourced from `ui.signoffNextStepText` — same rendered output for PH, no longer hardcoded for any future signoff-requiring programme. | `after/20-quiz-passed.png` |
| 16 | Quiz — attempts exhausted | `js/views/quiz-view.js`, `js/components/module-card.js` | All 5 | — | Quiz screen already explained "No attempts remain" clearly, **but the module card back on the dashboard/journey gave no visual cue** — a stuck learner had no way to see this at a glance. | Added the `attempts-exhausted` status (badge + card border + explanatory note: "No Skill Check attempts remain for this module. Contact your team leader or trainer."). | `after/21-attempts-exhausted.png` |
| 17 | Sign-off panel | `js/views/module-view.js` | PH only (11 of 18 modules) | Pending-confirm and confirmed sub-states | **Hardcoded PH-specific citation text** (`SIGNOFF_EXPLANATION_TEXT`) lived directly in this nominally-shared view — would have misattributed the source document if any other programme ever set `requiresSignoff: true`. | Moved to `ui.signoffExplanationText` on PH's programme descriptor; view now reads it generically via `getActiveProgramme()`. Zero change to the rendered text. | `after/24-ph-signoff-pending.png`, `after/25-ph-signoff-tamil.png` |
| 18 | Tamil translation (lesson) | `js/components/translation-control.js`, `js/views/lesson-view.js` | PH only | — | Already solid — component self-gates on `FEATURES.enableTamilTranslation`. No change needed. | — (regression-checked only) | `after/22-ph-tamil-lesson.png` |
| 19 | Tamil translation (quiz question) | `js/components/translation-control.js`, `js/views/quiz-view.js` | PH only | — | Already solid. No change needed. | — (regression-checked only) | `after/23-ph-tamil-quiz.png` |
| 20 | Practical task — Digital Marketing | `js/views/practical-task-view.js` | Digital Marketing | — | Already labelled PROTOTYPE_ONLY, non-gating, with a clear checklist pattern. No change needed. | — (regression-checked only) | `before/12` → `after/12` |
| 21 | Practical task — Purchasing | `js/views/practical-task-view.js` | Purchasing | — | Same as above. | — (regression-checked only) | `before/13` → `after/13` |
| 22 | Completion | `js/views/completion-view.js` | All 5 | Practical-task action shown only for DM/Purchasing | **Missing required elements**: no lessons-completed or Skill-Checks-passed counts, no "Review Programme" action, no "Back to Dashboard" action at all (only a destructive Reset button existed below the summary), and the certification disclaimer didn't explicitly rule out purchasing/advertising/seller-account authority. | Added lessons-completed + Skill-Checks-passed counts, a `.completion-panel__actions` row (Back to Dashboard / Review Programme / programme's practical task if any), and an expanded disclaimer explicitly ruling out certification, management authorisation, purchasing/advertising/seller-account authority, and employment-competency approval. | `after/26-completion.png` (no comparable `before/` capture — screen was unreachable without a full completion grind; content read directly from source) |
| 23 | Mobile drawer | `js/components/header.js`, `css/styles.css` | All 5 | — | Already solid (focus management, Escape-to-close, overlay). No change needed. | — (regression-checked only) | `before/15` → `after/15` |
| 24 | Mobile dashboard (390×844) | `js/views/dashboard-view.js` | PH (representative) | — | No overflow at baseline. | Feature-chip row confirmed to wrap correctly at 390px. | `before/14` → `after/14` |
| 25 | Mobile lesson (390×844) | `js/views/lesson-view.js` | PH (representative) | — | No change needed. | — (regression-checked only) | `before/16` → `after/16` |
| 26 | Mobile quiz (390×844) | `js/views/quiz-view.js` | PH (representative) | — | No change needed. | — (regression-checked only) | `before/17` → `after/17` |
| 27 | Tablet dashboard (768×1024) | `js/views/dashboard-view.js` | PH (representative) | — | No change needed (two-column module grid engages correctly). | — (regression-checked only) | `before/18` → `after/18` |

## Files created this session

- `js/views/programme-select-view.js`
- `js/components/feature-chips.js`
- `tosp/docs/tosp-ui-ux-design-system.md` (this doc's sibling)
- `tosp/docs/tosp-ui-ux-screen-inventory.md` (this file)
- `tosp/validation/tosp-whole-app-ui-ux-check.md`
- `tosp/handover/2026-07-28__tosp-whole-app-ui-ux-closure.md`

## Files modified this session

`css/styles.css`, `js/app.js`, `js/components/header.js`,
`js/components/module-card.js`, `js/components/status-badge.js`,
`js/programmes/ph-team-programme.js`, `js/programmes/registry.js`,
`js/services/progress-service.js`, `js/views/completion-view.js`,
`js/views/dashboard-view.js`, `js/views/module-view.js`,
`js/views/programme-view.js`, `js/views/quiz-view.js`.

`js/data.js`, `js/storage.js`, `js/rules/*.js`, `js/services/quiz-service.js`,
`js/services/theme-service.js`, `js/services/speech-service.js`,
`js/services/translation-service.js`, every `*-content.js` /
`*-modules.js` / `*-question-bank.js` content file, and all four non-PH
programme descriptors were **not** touched — confirmed via `git status`
before writing this inventory.
