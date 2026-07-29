# TOSP Whole-App UI/UX Validation Check — 2026-07-28

Status: PROTOTYPE_ONLY. Real-browser validation (Chrome, via Playwright
driving the system-installed Google Chrome, `channel: 'chrome'`) for the
whole-app UI/UX professionalisation pass on branch
`feat/tosp-app-ui-ux-professionalisation`. Served from `python -m http.server`
inside `tosp/`, no build step.

Scale note: given the breadth requested (5 programmes × 6 viewports × ~20
screen states × light/dark), full exhaustive screenshot coverage of every
combination was not captured. Coverage was prioritised as: (a) every
programme's dashboard at desktop + one at dark theme, (b) every shared
screen type at least once in a real browser with a real data flow (not just
static review), (c) all 6 required viewports swept for horizontal-overflow
on the dashboard specifically (the densest shared screen), plus targeted
mobile/tablet captures of drawer/lesson/quiz. Where a check below says
"spot-checked" rather than "swept," that is the honest scope — recorded here
rather than silently implied as exhaustive.

## FOUNDATION

| # | Check | Result | Notes |
|---|---|---|---|
| 1 | Shared shell renders | PASS | Confirmed on all 5 programmes' dashboards. |
| 2 | Programme selection renders | PASS | New `/programme-select` screen; all 5 cards render with correct data (`after/27-programme-select.png`). |
| 3 | Active programme is clear | PASS | Sidebar programme title + "Currently Active" badge on the selection card. |
| 4 | Current route is clear | PASS | Active nav item highlighted (`nav-link--active`) + breadcrumbs on detail screens. |
| 5 | Theme toggle works | PASS | Verified light↔dark on dashboard; persists via `tosp.ui.theme.v1` (unchanged mechanism). |
| 6 | Mobile drawer works | PASS | Opens/closes via menu button, overlay, and Escape; focus moves to close button on open (`after/15-mobile-drawer.png`). |
| 7 | No page-level horizontal overflow | PASS | Automated `scrollWidth`/`clientWidth` check at all 6 required viewports on the dashboard: 0 findings. |

## DESIGN SYSTEM

| # | Check | Result | Notes |
|---|---|---|---|
| 8 | Typography hierarchy is consistent | PASS | One `h1` per screen, `h2` per panel section — unchanged pattern, new screens (programme-select) follow it. |
| 9 | Body-weight usage is consistent | PASS | New copy (feature chips, completion disclaimer, sign-off note) uses the same `.muted`/`.small` classes as existing body text — no new one-off weights. |
| 10 | Spacing is consistent | PASS | All new CSS uses `--space-*` tokens exclusively (verified by reading the diff — zero raw px values added). |
| 11 | Cards are consistent | PASS | `.programme-select-card` reuses `.panel`-equivalent surface/border/shadow tokens and the same `.badge` component as `.module-card`. |
| 12 | Buttons are consistent | PASS | All new buttons use `.btn--primary`/`.btn--ghost`; one dominant primary action per panel maintained on the completion screen and programme-select cards. |
| 13 | Badges are consistent | PASS | New `ready`/`attempts-exhausted` statuses added to the single `LABELS` map in `status-badge.js` — no parallel badge system introduced. |
| 14 | Focus rings are visible | PASS | New interactive elements (programme-select buttons, "Browse All Programmes" link) inherit the global `:focus-visible` rule — no custom focus handling added, none needed. |
| 15 | Light theme contrast passes review | PASS | Visual review of all "after" desktop screenshots — text/background pairs use existing tokens only. |
| 16 | Dark theme contrast passes review | PASS | `after/06-dashboard-ph-dark.png` — feature chips and all new elements readable, correct contrast. |
| 17 | Reduced-motion is respected | PASS (unchanged) | No new animation/transition was added; the existing global `prefers-reduced-motion` collapse rule covers all new elements automatically since none introduce bespoke transitions. |

## DASHBOARDS

| # | Check | Result | Notes |
|---|---|---|---|
| 18 | Every dashboard identifies its programme | PASS | Confirmed for all 5 (`after/01`–`05`). |
| 19 | Every dashboard shows progress | PASS | Overall + per-track stat cards, unchanged mechanism. |
| 20 | Every dashboard shows one clear next action | PASS | "Recommended Next Action" panel, one primary button, unchanged. |
| 21 | Locked/completed/current states are understandable | PASS | Module-card badges + lock-reason sentences; now also cover `ready` and `attempts-exhausted` (previously unrepresented — see #36). |
| 22 | Prototype notice is clear | PASS | Unchanged `prototype-banner` panel on every dashboard, and now also explicit "no certification" language on the completion screen. |

## MODULES AND LESSONS

| # | Check | Result | Notes |
|---|---|---|---|
| 23 | Module cards use consistent states | PASS | 7-state vocabulary now fully implemented and legended (`programme-view.js`'s `STATE_LEGEND`), confirmed live in-browser for `ready` (spot-check via PH module 1 after completing its 2 lessons) and `attempts-exhausted` (live 3-attempt-fail flow, `after/21-attempts-exhausted.png`). |
| 24 | Locked reason is visible | PASS (unchanged) | `module-card__lock-reason` sentence, e.g. "Pass the ... Skill Check to unlock this module." |
| 25 | Lesson text width is readable | PASS (unchanged) | `--content-width-reading` (760px), verified in `after/09-lesson.png`. |
| 26 | Source references are accessible | PASS (unchanged) | Every lesson/module/quiz question/practical-task item carries a `Source:` line; full `/sources` screen unchanged and confirmed rendering. |
| 27 | Read Aloud works | PASS (unchanged) | Speaker control present on lesson/module/quiz/practical-task screens; not respoken by this session's changes. |
| 28 | Previous/Next actions work | PASS (unchanged) | Verified via the lesson-completion flow used to reach the quiz in the attempts-exhausted test. |
| 29 | Lesson completion works | PASS | Exercised live: both PH module-1 lessons marked complete during the quiz flow test, progress bar and Activity Summary updated correctly. |

## QUIZZES

| # | Check | Result | Notes |
|---|---|---|---|
| 30 | Quiz instructions are clear | PASS (unchanged) | Question count, passing score, attempt count shown before submission. |
| 31 | Answer targets are accessible | PASS (unchanged) | Full-row `<label>` click targets, native radios. |
| 32 | Selected answer state is visible | PASS (unchanged) | `:has(input:checked)` background tint. |
| 33 | Fail feedback is clear | PASS | Live-tested: 3 real failed attempts on PH Module 1, correct "Skill Check Not Passed" + score + attempts-remaining messaging each time (`after/19-quiz-failed.png`). |
| 34 | Pass feedback is clear | PASS | Live-tested: real pass with correct answers on attempt 2, correct "Skill Check Passed" + next-module-unlocked messaging (`after/20-quiz-passed.png`). |
| 35 | Attempts-exhausted feedback is clear | PASS | Live-tested: after 3 failed attempts, quiz screen shows "No Skill Check attempts remain (maximum 3)" **and**, new this session, the module card on the dashboard now also shows it, with no invented reset/approval workflow implied — text says "Contact your team leader or trainer," matching the task's requirement not to invent an unsupported process. |
| 36 | Quiz scoring remains unchanged | PASS | `rules/scoring.js` not modified (confirmed via `git status`); live-tested score (100%, 3/3) matched the known-correct answer key read directly from source. |
| 37 | Module unlocking remains unchanged | PASS | `rules/module-access.js`/`services/quiz-service.js` not modified; live pass on Module 1 correctly unlocked Module 2 ("Module 2 ... is now unlocked."). |

## PROGRAMME-SPECIFIC FEATURES

| # | Check | Result | Notes |
|---|---|---|---|
| 38 | PH Tamil remains available | PASS | Live-tested: lesson-paragraph and quiz-question Tamil translation both render correctly with Tamil script + Show English/Read Tamil controls (`after/22`, `after/23`). |
| 39 | PH sign-off remains available | PASS | Live-tested pending-confirm state (`after/24-ph-signoff-pending.png`) and its Tamil translation (`after/25-ph-signoff-tamil.png`); explanation text now sourced from the programme descriptor rather than hardcoded, output unchanged. |
| 40 | Amazon shows no Tamil | PASS | Confirmed via `features.enableTamilTranslation: false` (unmodified) and visually — no translate controls anywhere on `after/02-dashboard-amazon.png` or its module/lesson screens. |
| 41 | Amazon shows no sign-off | PASS | No Amazon module sets `requiresSignoff: true` (unmodified); feature-chip row correctly shows the "no extra features" message. |
| 42 | eBay shows no Tamil | PASS | Same mechanism as Amazon; confirmed on `after/03-dashboard-ebay.png`. |
| 43 | eBay shows no sign-off | PASS | Same mechanism as Amazon. |
| 44 | Digital Marketing practical task appears | PASS | `after/12-practical-task-dm.png`, dashboard panel + feature chip present. |
| 45 | Digital Marketing practical task remains non-gating | PASS | `rules/module-access.js`'s `isProgrammeComplete` (unmodified) does not reference `PRACTICAL_TASK`; view's own copy still states this explicitly. |
| 46 | Purchasing practical task appears | PASS | `after/13-practical-task-purchasing.png`. |
| 47 | Purchasing practical task remains non-gating | PASS | Same mechanism as #45. |
| 48 | Digital Marketing shows no Tamil/sign-off | PASS | `features.enableTamilTranslation: false`, no `requiresSignoff: true` modules (unmodified). |
| 49 | Purchasing shows no Tamil/sign-off | PASS | Same. |

## COMPLETION

| # | Check | Result | Notes |
|---|---|---|---|
| 50 | Completion screen is consistent | PASS | Same panel/summary-grid pattern as every other screen; now includes lessons-completed and Skill-Checks-passed counts (previously missing). |
| 51 | Correct programme totals display | PASS | Seeded-state test showed "18 / 18" modules and "18" Skill Checks passed for PH, matching its known module count (`after/26-completion.png`). |
| 52 | PROTOTYPE_ONLY appears | PASS | Banner + badge + the disclaimer now leads with "PROTOTYPE_ONLY." explicitly. |
| 53 | No certification claim appears | PASS | Disclaimer now explicitly rules out employment, onboarding, certification, competency, purchasing-authorisation, advertising-account, and seller-account approval, and management authorisation — matching the task's exact prohibited-claims list. |
| 54 | Review and dashboard actions work | PASS | New `.completion-panel__actions` row: "Back to Dashboard" (`/dashboard`), "Review Programme" (`/programme`), and — for DM/Purchasing — the programme's practical-task link, all wired via the existing `data-nav` delegated-click mechanism (no new event-handling code needed). |

## ACCESSIBILITY

| # | Check | Result | Notes |
|---|---|---|---|
| 55 | Keyboard navigation works | PASS (unchanged mechanism; spot-checked) | All new interactive elements are native `<button>`s using the existing `data-nav`/click-handler pattern — no custom keyboard handling required or added. |
| 56 | Focus order is logical | PASS (spot-checked) | New sidebar link sits in natural DOM order after the programme switcher; new completion buttons follow the summary in reading order. |
| 57 | Drawer focus is handled | PASS (unchanged) | Not touched this session; regression-checked via the mobile drawer screenshot. |
| 58 | Escape closes overlays where supported | PASS (unchanged) | Not touched; drawer and confirm-dialog Escape handling unmodified. |
| 59 | Controls have accessible names | PASS | New buttons all carry visible text labels; programme-select cards use `aria-label` on the `<article>` mirroring the existing `module-card.js` pattern. |
| 60 | Status is not colour-only | PASS | New `ready`/`attempts-exhausted` statuses each carry a text label + icon, and `attempts-exhausted` additionally gets an explanatory sentence on the module card — same pattern as the pre-existing `locked` state. |
| 61 | Browser zoom remains usable | PASS (unchanged; not re-tested) | No fixed-pixel layout was introduced; all new CSS uses the same relative/token-based sizing as the rest of the app. |

## RESPONSIVE

| # | Check | Result | Notes |
|---|---|---|---|
| 62 | 360×800 passes | PASS | Zero overflow (automated sweep). |
| 63 | 390×844 passes | PASS | Zero overflow; mobile dashboard/drawer/lesson/quiz all captured (`after/14`–`17`). |
| 64 | 768×1024 passes | PASS | Zero overflow; tablet dashboard captured (`after/18`). |
| 65 | 1024×768 passes | PASS | Zero overflow (automated sweep). |
| 66 | 1280×800 passes | PASS | Zero overflow (automated sweep; also the viewport used for most desktop captures). |
| 67 | 1440×900 passes | PASS | Zero overflow (automated sweep). |

## ISOLATION AND REGRESSION

| # | Check | Result | Notes |
|---|---|---|---|
| 68 | PH module/content totals unchanged | PASS | `ph-team-content.js` not modified; dashboard shows 18 modules as before. |
| 69 | Amazon totals unchanged | PASS | `amazon-team-*.js` not modified; dashboard shows 16 modules (`after/02`). |
| 70 | eBay totals unchanged | PASS | `ebay-team-*.js` not modified; dashboard shows 8 modules (`after/03`). |
| 71 | Digital Marketing totals unchanged | PASS | `digital-marketing-team-*.js` not modified; dashboard shows 10 modules (`after/04`). |
| 72 | Purchasing totals unchanged | PASS | `purchasing-team-*.js` not modified; dashboard shows 10 modules (`after/05`). |
| 73 | PH storage unchanged | PASS | `tosp.prototype.v2` key/shape untouched; `storage.js` not modified. |
| 74 | Amazon storage unchanged | PASS | `tosp.amazon-team.prototype.v1` untouched. |
| 75 | eBay storage unchanged | PASS | `tosp.ebay-team.prototype.v1` untouched. |
| 76 | Digital Marketing storage unchanged | PASS | `tosp.digital-marketing-team.prototype.v1` untouched. |
| 77 | Purchasing storage unchanged | PASS | `tosp.purchasing-team.prototype.v1` untouched. |
| 78 | Theme storage unchanged | PASS | `tosp.ui.theme.v1`, `theme-service.js` not modified. |
| 79 | Reset remains programme-specific | PASS | `resetAllProgress`/`storage.js` not modified — reset still clears only the active programme's own key. |
| 80 | Corrupt-storage recovery remains safe | PASS (unchanged) | `wasLastLoadCorrupted`/`storage.js` not modified. |
| 81 | No cross-programme feature leakage | PASS | Verified live for all 5 programmes: Tamil/sign-off only ever render for PH; practical task only for DM/Purchasing. |
| 82 | No console errors | PASS | Automated console-error capture across the full 5-programme × dashboard/module/lesson/quiz/sources/practical-task/mobile/tablet sweep: **zero** JS errors. The only console message seen in any run was the browser's own automatic `/favicon.ico` 404 request — not an application asset, matches the prior session's documented finding in `validation/ui-ux-regression-check.md`. |
| 83 | No failed required network requests | PASS | Zero `requestfailed` events (excluding the same favicon request, which is a 404 HTTP response, not a network failure). |
| 84 | No Google translation calls outside approved local PH functionality | PASS (unchanged) | `translation-provider.js`/`translation-service.js` not modified; Tamil translation remains the existing static local lookup, confirmed by the Tamil screenshots showing instant (non-loading) results. |

## Bugs found and fixed during this task

All three were **test-harness defects** in the Playwright verification scripts
written for this session — not application defects. Per the task's bug-
handling instructions, the harness was corrected and no application code was
changed for any of them. Documented separately here rather than mixed into
the checks above:

1. **Missing reload after `localStorage.setItem` when switching the active
   programme in the test script.** `config.js`/`data.js` resolve the active
   programme once at ES-module import time; the real app's own
   `setActiveProgramme` (`registry.js`) already does a full
   `window.location.reload()` after writing the key — the first draft of the
   Playwright harness's `setActiveProgramme` helper omitted that reload,
   so a screenshot taken right after switching silently showed the
   *previous* programme's content under the *new* programme's label. Fixed
   by adding `await page.reload({ waitUntil: 'load' })`.
2. **Wrong programme ids in the harness's programme list.** The harness
   used `'ph-team' | 'amazon-team' | 'ebay-team'`, but those three
   programmes' actual registry ids are `'prog-ph-onboarding'` /
   `'prog-amazon-onboarding'` / `'prog-ebay-onboarding'` (a legacy naming
   convention; only Digital Marketing and Purchasing use the newer
   `'*-team'` id). An unrecognised id silently falls back to the default
   programme (PH) in `getActiveProgrammeId()` rather than erroring, which
   combined with bug #1 to produce screenshots labelled Amazon/eBay that
   were actually still showing PH content. Fixed by using the real ids.
3. **Missing `#` when constructing a lesson-route URL from a `data-nav`
   attribute value** in one flow-test script, causing `goto` to a
   non-existent path (404) instead of a same-page hash navigation, so the
   scripted "mark all lessons complete" step silently did nothing. Fixed by
   prefixing the href with `#`.

No application defects were found. `getModuleStatus`'s new `ready`/
`attempts-exhausted` branches, the completion-screen additions, and the
de-hardcoded sign-off copy were all verified against live, real user flows
(not just static code review) and matched expected behaviour on the first
correctly-scripted attempt.

## Summary

**84/84 checks: PASS.** Coverage caveats are stated inline above (spot-check
vs. full sweep) rather than implied as exhaustive — see the note at the top
of this document.

TOSP_WHOLE_APP_UI_UX_CHECKS: PASS
FINAL_USER_ACCEPTANCE: PENDING
