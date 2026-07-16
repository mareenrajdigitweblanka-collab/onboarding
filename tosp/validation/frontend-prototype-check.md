# TOSP Frontend Prototype — Validation Checklist

Status: PROTOTYPE_ONLY (system evidence) · programme content: FINAL_TRUTH (sourced).
Binary checks against the requirements for the PH/Sales Team onboarding-platform
frontend prototype, updated for the 18-module sourced curriculum and the
simulated Team Leader Sign-off step.

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | `index.html` loads successfully | YES | Served via `python -m http.server 8000`; returns HTTP 200 and renders the app shell. |
| 2 | No external package or CDN is required | YES | Only local `css/styles.css` and `js/app.js` are referenced; no CDN scripts, fonts, or icons; no `npm`/`node_modules`. |
| 3 | Module 1 is initially accessible | YES | `storage.js` seeds `unlockedModuleIds: [MODULES[0].id]` (Module 1: "Day 1: Company Foundation & BGCT Introduction") on first load. |
| 4 | Module 2 is initially locked | YES | Module 2's id is absent from a fresh `unlockedModuleIds`; `canAccessModule` returns false and `module-view.js` renders "Module Locked" if navigated to directly. |
| 5 | Completing required lessons enables the quiz | YES | `areRequiredLessonsComplete` gates `lessonsReadyForQuiz`; the Skill Check button stays hidden/blocked until all required lessons are in `completedLessonIds`. |
| 6 | Failed quiz does not unlock the next module | YES | `quiz-service.submitQuizAttempt` only calls `tryUnlockNextModule` inside the `if (passed)` branch. |
| 7 | Passed quiz unlocks the next module | YES | For Modules 1–7 (no sign-off required), `tryUnlockNextModule` unlocks the next module immediately on pass. |
| 7b | Passed quiz on a sign-off-required module (8–18) does **not** unlock the next module until sign-off is confirmed | YES | `isModuleFullyComplete` requires both `passedQuizIds` and, when `module.requiresSignoff`, `signedOffModuleIds`; verified live — passing Module 8's quiz alone left Module 9 locked until sign-off was confirmed. |
| 7c | Confirming the simulated Team Leader Sign-off unlocks the next module | YES | `progress-service.confirmSignoff` adds the module to `signedOffModuleIds` and calls `tryUnlockNextModule`, which now unlocks the next module since the module is fully complete. |
| 8 | Refresh preserves progress | YES | All progress (including `signedOffModuleIds`) is written to `localStorage` under `tosp.prototype.v2` on every mutation and re-read on load. |
| 9 | Reset removes prototype progress | YES | `resetProgress()` calls `localStorage.removeItem(STORAGE_KEY)` for that one key only, wired to "Reset Demo Progress" (with a confirm dialog) on the Dashboard and Completion screens. |
| 10 | Locked module cannot be opened by normal navigation | YES | `module-view.js` and `lesson-view.js` call `canOpenModule` before rendering content, regardless of how the URL hash was reached. |
| 11 | Overall progress updates correctly | YES | `calculateOverallProgress` derives the percentage from `completedLessonIds`/`passedQuizIds`/`signedOffModuleIds` on every read; `completedModuleCount` only counts modules that are fully complete (`isModuleFullyComplete`), not merely quiz-passed. |
| 12 | Final module pass (+ sign-off) shows completion | YES | Passing and signing off Module 18 sets `progress.completedAt` via `tryUnlockNextModule`; `completion-view.js` guards on `programmeIsComplete()`, which now requires every module's sign-off where applicable. |
| 13 | Corrupted localStorage does not break the app | YES | `loadProgress()` wraps `JSON.parse` in try/catch and validates shape (including `signedOffModuleIds`), falling back to a fresh initial progress object instead of throwing. |
| 14 | Mobile layout remains usable | YES | Responsive `module-grid`, `@media (max-width: 640px)` breakpoint, no fixed pixel widths; reference tables use standard flow (no horizontal overflow at 18-module scale). |
| 15 | No real personal information exists | YES | The only learner identity is the hard-coded `DEMO_LEARNER` (`Demo Learner`, no email/phone/employee ID) — unaffected by the content sourcing change. Programme *content* is real, sourced company material (see #16). |
| 16 | Prototype warning is visible | YES | Persistent footer text on every screen plus an explicit warning banner on the Dashboard and Completion screens, using the required wording. Additionally, `README.md` and the Dashboard's reference panel flag both source documents' "Confidential"/"Internal Use Only" markings. |
| 17 | README explains future migration | YES | `README.md` links to `docs/migration-notes.md`, updated to cover the sourced-content mapping and the simulated-sign-off → real-reviewer-workflow migration step. |
| 18 | Business logic is not embedded entirely in `index.html` | YES | `index.html` contains only the static shell; all logic lives in `js/`. |
| 19 | Rules modules have no DOM or localStorage access | YES | `rules/module-access.js` (incl. new `isModuleFullyComplete`), `rules/scoring.js`, and `rules/progression.js` (incl. sign-off-aware `calculateModuleProgress`) contain no references to `window`, `document`, or `localStorage`. |
| 20 | Every lesson, quiz question, threshold, and progression rule carries a source reference | YES | All 41 lessons and ~60 questions in `data.js` carry a `source` field cited from one of the two named documents; `PROGRESSION_RULES`, `EVALUATION_SCORE_BANDS`, and `PROBATION_SCORE_GATES` are exported with citations and rendered on the Dashboard. Only the per-module passing percentage and max-attempts remain `CONFIGURATION_REQUIRED` (not stated in source), and are labelled as such. |
| 21 | PROTOTYPE_READY is recorded as YES or NO | **YES** | All checks above pass; see the main conversation's output report for the full verification log. |

## How this was verified

- **Static checks:** `node --check` against every file in `js/**/*.js` (no
  syntax errors) after the full data.js rewrite and the sign-off feature
  addition.
- **Serve check:** `python -m http.server 8000` inside `tosp/`, HTTP 200
  confirmed for `index.html`, `css/styles.css`, `js/app.js`, `js/data.js`.
- **Live workflow check:** the app was driven in a real headless-Chrome
  browser through the full golden path across the new 18-module structure —
  Dashboard → Module 1 (BGCT tier, no sign-off) → pass → auto-unlock →
  ... → Module 7 → Module 8 (PH tier, sign-off required) → pass quiz →
  confirm next module still locked → confirm simulated Team Leader Sign-off →
  confirm next module unlocks → ... → Module 18 → Completion screen — plus a
  deliberate quiz failure (next module stays locked), a page refresh
  mid-programme (all state including `signedOffModuleIds` persisted), and
  Reset Demo Progress (storage key cleared, app returns to Module-1-only
  state).
