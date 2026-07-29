# Handover — TOSP Whole-App UI/UX Professionalisation

Date: 2026-07-28
Status: PROTOTYPE_ONLY (UI/system implementation) · programme content:
FINAL_TRUTH per programme (unchanged)
Branch: `feat/tosp-app-ui-ux-professionalisation`

## Requirement

Professionalise the UI/UX of the entire TOSP application — coherently across
all five programmes (PH, Amazon, eBay, Digital Marketing, Purchasing), not a
Purchasing-only redesign — without changing curriculum, business rules,
scoring, progression, storage, source authority, or completion logic.

## Starting branch and HEAD

- Started on `feat/purchasing-team-onboarding` at `9908282`.
- Confirmed `feat/purchasing-team-onboarding` was merged into `origin/main`
  via PR #4 (`git merge-base --is-ancestor` returned true; `origin/main` at
  `ef7fe6f` is the merge commit).
- Local `main` was 2 commits behind `origin/main`; fast-forwarded via
  `git pull --ff-only origin main`.
- Created `feat/tosp-app-ui-ux-professionalisation` from `origin/main` at
  `ef7fe6f`.

## Design goals

Professional, calm, modern, trustworthy, consistent, accessible internal
learning platform — see `tosp/docs/tosp-ui-ux-design-system.md` for the full
principles list. Critically: **extend and complete** the existing design
system (built in a prior 2026-07-16 session, `docs/ui-design-system.md`)
rather than replace it — the prior work was already a solid, professional
token-driven system applied consistently to PH, then later extended (by
subsequent sessions) to Amazon, eBay, Digital Marketing, and Purchasing.

## Baseline findings

Baseline discovery (reading every shared view/component/service file, plus a
dedicated read-only inventory subagent pass) found the shared codebase
already in strong shape: a full design-token system, a clean
programme-descriptor architecture (`programmes/*-programme.js` with a `ui`
object consumed generically by every shared view — no programme-id
conditionals in shared code), and a prior 40/40-check validation pass. Real,
scoped gaps found:

1. **No card-based programme-selection screen** — only a terse `<select>` in
   the sidebar. The task explicitly required a proper selection/landing
   experience (name, purpose, module count, features, one clear action).
2. **Module status vocabulary incomplete** — no distinct "Ready for Skill
   Check" or "Attempts Exhausted" state on module cards, despite the task
   listing both as required states. A learner who exhausted their 3 attempts
   saw no visual cue on the dashboard/journey grid, only inside the quiz
   screen itself.
3. **Hardcoded PH-specific copy in two nominally-shared views** —
   `module-view.js`'s `SIGNOFF_EXPLANATION_TEXT` and a matching inline
   sentence in `quiz-view.js` both hardcoded "PH/Sales BGCT Handbook"
   citation text, harmless today (only PH sets `requiresSignoff`) but
   architecturally inconsistent with every other programme-specific string
   in the app (which flows through the `ui` descriptor) and would
   misattribute the source if a future programme also required sign-off.
4. **Completion screen missing required elements** — no lessons-completed or
   Skill-Checks-passed counts, no "Review Programme" action, no "Back to
   Dashboard" action at all, and no practical-task mention for
   Digital Marketing/Purchasing.
5. **Dashboards had no compact "what features does this programme have"
   indicator** — Tamil/sign-off/practical-task availability was only
   discoverable by clicking around.

Everything else reviewed (lesson width, source references, quiz UX, locked
states, responsive breakpoints, focus handling, toasts/dialogs, dark theme)
was already correct and was left unchanged.

## Files created

- `tosp/js/views/programme-select-view.js`
- `tosp/js/components/feature-chips.js`
- `tosp/docs/tosp-ui-ux-design-system.md`
- `tosp/docs/tosp-ui-ux-screen-inventory.md`
- `tosp/validation/tosp-whole-app-ui-ux-check.md`
- `tosp/handover/2026-07-28__tosp-whole-app-ui-ux-closure.md` (this file)
- `tosp/evidence/tosp-whole-app-ui-ux-2026-07-28/before/` (18 screenshots)
- `tosp/evidence/tosp-whole-app-ui-ux-2026-07-28/after/` (27 screenshots)

## Files modified

`tosp/css/styles.css`, `tosp/js/app.js`, `tosp/js/components/header.js`,
`tosp/js/components/module-card.js`, `tosp/js/components/status-badge.js`,
`tosp/js/programmes/ph-team-programme.js`, `tosp/js/programmes/registry.js`,
`tosp/js/services/progress-service.js`, `tosp/js/views/completion-view.js`,
`tosp/js/views/dashboard-view.js`, `tosp/js/views/module-view.js`,
`tosp/js/views/programme-view.js`, `tosp/js/views/quiz-view.js`.

**Not touched** (confirmed via `git status`/`git diff --stat` before writing
this handover): `data.js`, `storage.js`, `router.js`, `state.js`,
`rules/module-access.js`, `rules/progression.js`, `rules/scoring.js`,
`services/quiz-service.js`, `services/speech-service.js`,
`services/theme-service.js`, `services/translation-provider.js`,
`services/translation-service.js`, every programme's own content/modules/
question-bank file, and the Amazon/eBay/Digital Marketing/Purchasing
programme descriptors.

## Design-system changes

See `tosp/docs/tosp-ui-ux-design-system.md` for the full write-up. Summary:
two new module statuses (`ready`, `attempts-exhausted`) added to the single
`status-badge.js` LABELS map and given `.module-card--ready`/
`.module-card--attempts-exhausted` border-colour variants; a new
`.feature-chip`/`.feature-chip-row` component; a new
`.programme-select-grid`/`.programme-select-card` family reusing existing
panel/badge/button primitives; a `.completion-panel__actions` row. All new
CSS uses only existing design tokens — zero new colours, spacing values, or
font sizes introduced.

## Shared-component changes

- `services/progress-service.js`'s `getModuleStatus` — added `ready` and
  `attempts-exhausted` branches, purely presentational (no change to
  `rules/module-access.js`'s unlock/completion logic it sits on top of).
- `components/module-card.js` — added an `attempts-exhausted` explanatory
  note, mirroring the existing `lockReason` pattern (icon + text, never
  colour alone).
- `components/status-badge.js` — two new LABELS entries.
- `components/header.js` — one new sidebar link ("Browse All Programmes").
- `views/dashboard-view.js` — added the feature-chip row.
- `views/completion-view.js` — added counts, actions row, expanded
  disclaimer.
- `views/module-view.js`, `views/quiz-view.js` — PH sign-off copy now reads
  from `getActiveProgramme().ui.signoffExplanationText` /
  `.signoffNextStepText` instead of a hardcoded string constant.
- `programmes/registry.js` — added two small, generic helpers consumed by
  the above: `programmeFeatureSummary(programme)` and
  `programmeShortPurpose(programme, maxLen)`. Both operate on any
  programme descriptor generically; neither references a programme id.
- `programmes/ph-team-programme.js` — added `ui.signoffExplanationText` /
  `ui.signoffNextStepText` fields containing the **exact same text** that
  was previously hardcoded in the two views above — zero content change,
  only a relocation to the programme-owned descriptor.

## Programme-specific variants

No new programme-specific *code paths* were added. The new programme-select
cards and dashboard feature-chip row both render whatever a programme's
existing descriptor (`features.enableTamilTranslation`, `module
.requiresSignoff` presence, `ui.practicalTask` presence) already declares —
confirmed correct for all 5 programmes (PH shows Tamil+sign-off chips;
Amazon/eBay show neither; Digital Marketing/Purchasing show the practical-
task chip).

## Responsive results

All 6 required viewports (360×800, 390×844, 768×1024, 1024×768, 1280×800,
1440×900) swept with an automated `scrollWidth`/`clientWidth` overflow check
on the dashboard (the densest shared screen): **zero overflow findings**,
both before and after this session's changes. Mobile drawer, mobile lesson,
mobile quiz, and tablet dashboard additionally captured as screenshots. See
the coverage note at the top of `tosp/validation/tosp-whole-app-ui-ux-check.md`
for exactly which combinations were swept vs. spot-checked.

## Accessibility results

No new interaction patterns were introduced (all new controls are native
`<button>`s using the app's existing delegated `data-nav` click handler), so
no new accessibility code was needed. Existing mechanisms (skip link,
`:focus-visible`, native `<dialog>` focus trap, Escape-to-close drawer,
icon+label status, `aria-live` regions) were spot-checked for regression and
found intact. New elements follow existing patterns exactly: `aria-label` on
the programme-select `<article>` cards (mirroring `module-card.js`), visible
text labels on every new button, and icon+text (never colour alone) on the
two new statuses.

## Light/dark results

Both themes verified via direct screenshot comparison
(`after/06-dashboard-ph-dark.png`). All new CSS draws from the existing
per-theme custom-property set — no new theme-specific rules were needed or
added.

## Functional regressions

**None found.** Live browser flow-testing (not just static review) exercised:
a real 3-attempt quiz failure sequence reaching `attempts-exhausted` on PH
Module 1; a real pass on retry with the correct answer key read from source;
lesson completion and the resulting progress-bar/Activity-Summary updates;
Tamil translation on both a lesson paragraph and a quiz question; the PH
sign-off pending-confirm state and its Tamil translation; and a seeded
full-completion state exercising the new completion-screen fields and
actions. All matched expected behaviour.

## Bugs found and fixed

Three **test-harness** defects were found and fixed in the Playwright
verification scripts used for this session (not application code) — see the
"Bugs found and fixed during this task" section of
`tosp/validation/tosp-whole-app-ui-ux-check.md` for the full detail:
(1) a missing page reload after switching the active programme in the
harness, which silently showed the previous programme's content under the
new programme's label; (2) wrong hardcoded programme ids in the harness
(PH/Amazon/eBay use a legacy `prog-*-onboarding` id, not `*-team`); (3) a
missing `#` when building a lesson-route URL in one flow-test script. No
application defects were found or fixed.

## Screenshot evidence

`tosp/evidence/tosp-whole-app-ui-ux-2026-07-28/before/` (18 files) and
`.../after/` (27 files) — see
`tosp/docs/tosp-ui-ux-screen-inventory.md` for the full per-screen mapping
between screen, evidence file, and improvement.

## Known limits

- The programme-selection cards show live progress for the **active**
  programme only. Showing a preview of another (inactive) programme's
  progress would require either duplicating `storage.js`'s
  read/validate/migrate logic in a second file, or extending `storage.js`
  itself with a read-only "peek by storage key" API — `storage.js` is
  explicitly documented as "the ONLY module allowed to touch
  window.localStorage," so this was deliberately left out of scope rather
  than worked around. Each card still shows its module count, purpose, and
  feature availability without needing to read another programme's storage.
- `/programme/evaluation` and `/programme/ph` remain registered
  unconditionally in `app.js` as PH-specific deep links (pre-existing
  behaviour, not touched this session) — for the other 4 programmes they
  silently fall through to the full-journey view rather than 404ing. Noted
  in the screen inventory as a pre-existing rough edge, not fixed here
  since it is route-registration behaviour, not a UI/UX presentation issue,
  and changing it risks altering routing behavior beyond this task's scope.
- Full exhaustive screenshot coverage of every (5 programmes) × (6
  viewports) × (~20 states) × (2 themes) combination was not captured —
  see the coverage note in the validation doc for exactly what was swept
  vs. spot-checked. The underlying design system is shared and
  token-driven, so screens not individually screenshotted use the same
  verified components as screens that were.

## Next action

None required for this task's scope. Suggested follow-ups if continued: a
read-only cross-programme progress peek (see "Known limits" above) if
product feedback wants progress previews on the selection screen before
switching; consider whether `/programme/evaluation` and `/programme/ph`
should be scoped to PH-only registration for routing clarity.

## PASS/FAIL

**PASS.**
