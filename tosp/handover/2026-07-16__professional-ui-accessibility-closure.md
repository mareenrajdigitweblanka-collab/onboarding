# Handover — Professional UI, Theming, Speech & Accessibility Upgrade

Date: 2026-07-16
Status: PROTOTYPE_ONLY (UI/system implementation) · programme content: FINAL_TRUTH (unchanged)

## Requirement

Upgrade the existing TOSP PH/Sales frontend prototype (18-module sourced
curriculum, built in a prior session) to a professional, accessible,
themeable internal EdTech interface with text-to-speech, without rebuilding
the application, changing business rules, or altering source-backed content.

## Files changed

**Created (11):**
`js/services/theme-service.js`, `js/services/speech-service.js`,
`js/components/toast.js`, `js/components/confirm-dialog.js`,
`js/components/theme-toggle.js`, `js/components/speaker-control.js`,
`js/views/sources-view.js`, `docs/ui-design-system.md`,
`docs/accessibility-and-speech.md`, `validation/ui-ux-regression-check.md`,
this handover file.

**Modified (15):**
`index.html`, `css/styles.css` (full design-token rewrite),
`js/app.js` (shell target, speech/theme cleanup per navigation, new routes,
startup corruption diagnostic), `js/components/header.js` (rewritten as the
full application shell), `js/components/module-card.js` (quiz result,
sign-off status, source citation added), `js/components/status-badge.js`
(icon+label per status), `js/rules/module-access.js` (readiness helpers
added, no existing rule logic changed), `js/services/progress-service.js`
(readiness/activity-summary helpers added), `js/storage.js` (non-persisted
corruption-diagnostic flag added), and all six view files
(`dashboard-view.js`, `programme-view.js`, `module-view.js`,
`lesson-view.js`, `quiz-view.js`, `completion-view.js`).

**Not touched:** `js/data.js`, `js/rules/scoring.js`,
`js/rules/progression.js`, `js/router.js`, `js/state.js`,
`js/services/quiz-service.js` (only its *callers* changed — the file itself
did not need to). Confirmed via `git status` before writing this handover.

## Design improvements

- Full design-token system (color, spacing, typography, radius, shadow,
  motion, layout) — see `docs/ui-design-system.md`.
- Persistent desktop sidebar / mobile top-bar + slide-in drawer application
  shell, replacing the old single flat header.
- New nav sections: Dashboard, 7-Day Evaluation, PH Competency Path,
  Current Module (dynamic), Programme Sources, Reset Demo Progress.
- Dashboard redesign: welcome header, three progress stat cards (overall /
  evaluation-track / PH-track), recommended next action, ASIN Allocation
  Readiness + Independent Ownership Readiness statuses (both derived from
  existing progress data, cited to the Handbook), an honestly-derived
  Activity Summary (no fabricated "streak"), and a condensed source-summary
  card linking to the new full Sources screen.
- Module cards now show quiz result, sign-off status, and source citation
  in addition to state/progress/action.
- Breadcrumbs added to Module, Lesson, Skill Check, and Sources screens.
- Lesson reading width constrained to `--content-width-reading` (760px) for
  comfortable long-form reading.
- Every `window.alert()`/`window.confirm()` replaced with a toast
  (`components/toast.js`) or a native `<dialog>`-based confirm
  (`components/confirm-dialog.js`).

## Theme implementation

`data-theme="light"|"dark"` on `<html>`. Resolution order: saved
preference → OS preference (`prefers-color-scheme`) → light fallback,
implemented once in an inline `<head>` script (avoids flash-of-wrong-theme)
and mirrored in `js/services/theme-service.js` for the toggle/OS-live-update
behavior. **Storage key: `tosp.ui.theme.v1`** — fully separate from learner
progress (`tosp.prototype.v2`); reset never touches it (verified in
validation checks 9 and 28).

## Speech implementation

`js/services/speech-service.js` wraps the native Web Speech API. Controls
(`js/components/speaker-control.js`) added to Lesson (full content), Module
(summary only, on request), and Skill Check (question + options,
pre-submission only, never the correct answer). Full behavior spec and
browser-support caveats in `docs/accessibility-and-speech.md`.

## Bugs found and fixed (during this task, in this UI layer)

1. **Theme-listener leak**: `theme-service.js`'s `onThemeChange` subscribers
   would have accumulated on every shell re-render (new toggle button, old
   subscription never removed). Fixed by adding `clearThemeListeners()`,
   called once per navigation in `app.js`'s `mount()` — mirrors the same
   pattern already needed for `speech-service.js`'s listeners.
2. **Toast pile-up**: rapid-fire toasts (e.g. many lessons/sign-offs
   completed in quick succession) could stack without bound. Fixed with a
   `MAX_VISIBLE_TOASTS = 4` cap in `toast.js` that drops the oldest toast
   when exceeded. Found via the automated 18-module regression run, which
   fires far more toasts per minute than a real learner would.
3. **Redundant double-render**: an early draft of the sidebar reset handler
   called both `navigate('/dashboard')` and an explicit `rerender()`,
   double-rendering when reset was triggered from a non-dashboard page.
   Fixed to rely solely on `navigate()`'s existing same-hash/different-hash
   handling (same fix pattern already proven correct in a prior session for
   the quiz-result header-refresh bug).

No regressions found in existing business logic (scoring, progression,
sign-off gating, storage) — see validation results below.

## Validation results

**40/40 checks passed** — see `validation/ui-ux-regression-check.md` for
the full breakdown (General, Theme, Speech, Progression, Responsive,
Accessibility). 37 automated Playwright/Chromium checks across three
regression passes, plus a zero-unlabelled-controls accessibility sweep.

## Screenshots / evidence

Captured during this session (paths are from the local verification run,
not committed to the repo):
- Dashboard, light and dark, desktop (1440px)
- Mobile top bar (closed) and slide-in nav (open), 390px
- Lesson screen with speaker controls
- Module screen showing the Team Leader Sign-off panel + a stacked toast
- Completion screen, light and dark
- Post-reset dashboard (dark theme preserved)
- Responsive captures at 360 / 768 / 1024 / 1440px

## Known browser limitations

- `speechSynthesis` voice availability and audio backend behavior vary by
  browser/OS; headless/embedded contexts may fire `onstart` without ever
  firing `onend` (observed in this session's own test environment) — the
  UI's Pause/Resume/Stop logic does not depend on `onend`, so it stays
  correct regardless.
- `:has()` CSS (used for the quiz-option selected-state highlight) is a
  progressive enhancement; unsupported browsers still show the native radio
  checked state correctly, just without the extra background tint.

## Production blockers

Unchanged from the prior session's audit (`docs/migration-notes.md`) — this
task did not add or remove any: no real backend/auth, client-side quiz
answers, editable `localStorage`, simulated (not real) sign-off. New for
this layer: theme and speech state are correctly kept out of learner
progress, so they introduce no new prototype-evidence risk.

## Next action

None required for this task's scope. Suggested follow-ups if continued:
add a voice picker once `voiceschanged` is awaited properly (currently
omitted per the task's own "only when available and stable" guidance), and
consider a tablet-specific persistent-but-condensed sidebar if user
feedback indicates the shared mobile/tablet drawer pattern feels cramped at
768–1023px.

## PASS/FAIL

**PASS.**
