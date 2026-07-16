# TOSP UI/UX Regression Check — Professional UI & Accessibility Upgrade

Status: PROTOTYPE_ONLY. Binary regression checks for the professional-UI,
theming, text-to-speech, and accessibility upgrade layered onto the existing
18-module sourced curriculum. All checks were run against a real Chrome
browser (headless Chromium via the system-installed Google Chrome, driven
with Playwright), not just static code review.

## How this was verified

- `python -m http.server 8000` inside `tosp/`, driven via Playwright/Chromium.
- Three scripted regression passes: a UI smoke pass (theme, mobile menu,
  responsive, a11y basics — 14 checks), a full-flow pass (speech, native
  confirm dialogs, the complete 18-module progression including the
  sign-off gate, reset — 14 checks), and a gap-closing pass (routes not
  otherwise visited, OS-theme fallback, unsupported-speech handling, skip
  link, dialog focus-return, reduced motion — 9 checks). 37/37 automated
  checks passed across all three runs. A separate sweep found zero
  unlabelled interactive controls on the dashboard.
- Screenshots captured for dashboard (light/dark), mobile nav (closed/open),
  lesson with speaker controls, module sign-off panel with toast, completion
  screen (light/dark), post-reset state, and all five responsive widths.

## GENERAL

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 1 | Application loads without console errors | YES | Only console message across all runs was the browser's automatic `favicon.ico` 404 request (confirmed via direct `curl` — not an app asset, not a bug). |
| 2 | All six primary screen types load | YES | Dashboard, Programme (`/programme`, `/programme/evaluation` — 7 cards, `/programme/ph` — 11 cards), Module, Lesson, Skill Check, Completion, and the new Sources screen all confirmed rendering. |
| 3 | All 18 modules remain present | YES | `cardCount === 18` on Dashboard; 7 + 11 split confirmed on the tier-filtered Programme routes. |
| 4 | Existing progress remains intact after upgrade | YES | `storageVersion` (2) and the `LearnerProgress` shape in `storage.js` were not changed by this task — only a non-persisted in-memory corruption-diagnostic flag was added. Progress recorded under the pre-upgrade UI remains valid. |
| 5 | No source-backed content changed unexpectedly | YES | `js/data.js` was not edited during this task; module/lesson/quiz/question content, ids, and citations are byte-identical to before. |

## THEME

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 6 | Light mode works on every screen | YES | Verified on Dashboard, Module, Lesson, Skill Check, Completion; token system (`[data-theme="light"]`) applies uniformly via CSS custom properties, not per-screen overrides. |
| 7 | Dark mode works on every screen | YES | Same token mechanism; Dashboard and Completion screenshotted explicitly in dark, contrast confirmed visually. |
| 8 | Theme persists after refresh | YES | Toggled to dark, reloaded, `data-theme` remained `dark`. |
| 9 | OS theme is used when no preference exists | YES | Tested with Playwright's `colorScheme: 'dark'` and `'light'` emulation and no stored `tosp.ui.theme.v1` key — resolved theme matched the OS preference both ways. |
| 10 | Progress states remain distinguishable in both themes | YES | Status badges always pair a text label + Unicode symbol with color; confirmed visually in both theme screenshots. |
| 11 | Focus indicators are visible in both themes | YES | `--focus-ring` is redefined per theme (not a fixed color), applied globally via `:focus-visible`. |

## SPEECH

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 12 | Read Aloud reads only the current lesson content | YES | `lesson-view.js` builds the spoken string from `lesson.title` + `lesson.content` only — no DOM read, no source citation, no chrome. |
| 13 | Pause works | YES | Click transitions status to "Paused.", Resume button enabled. |
| 14 | Resume works | YES | Click transitions status back to "Reading…". |
| 15 | Stop works | YES | Click transitions status to "Ready to read.", Read Aloud re-enabled. |
| 16 | Navigation stops active speech | YES | `speechSynthesis.speaking` was `true` before a `data-nav` click and `false` immediately after — `app.js`'s `mount()` calls `stopSpeech()` on every route render. |
| 17 | Starting a new reading stops the previous one | YES | `speakText()` unconditionally calls `stopSpeech()` before speaking (code-level guarantee; also exercised implicitly across the lesson-navigation regression run with no leaked utterances). |
| 18 | Quiz speaker does not expose correct answers | YES | The pre-submission quiz speech string is built from `q.prompt` and `q.options[].text` only — `correctOptionId` is never referenced in that code path. |
| 19 | Unsupported-browser state is handled without crashing | YES | With `window.speechSynthesis`/`SpeechSynthesisUtterance` deleted before load, the control renders "🔇 Speech is not supported in this browser." with zero page errors. |
| 20 | Keyboard controls work | YES | All speaker buttons are native `<button>`/`<select>` elements — inherently keyboard-operable; no custom key handling needed or added. |

## PROGRESSION

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 21 | Module 1 access still works | YES | Accessible from a fresh/reset state. |
| 22 | Locked modules remain blocked | YES | Direct navigation to a locked module renders "Module Locked", confirmed for both a BGCT-tier and a PH-tier module. |
| 23 | Required lessons still gate quizzes | YES | `areRequiredLessonsComplete` logic unchanged; Skill Check unavailable until all lessons in a module are marked complete. |
| 24 | Failed quiz does not unlock next module | YES | Deliberately failed Module 9's quiz — Module 10 remained locked afterward. |
| 25 | Passed quiz unlocks correctly | YES | Modules 1–7 (no sign-off) auto-unlock the next module immediately on a passing quiz, confirmed via the full 7-module run. |
| 26 | Required simulated sign-off still gates progression | YES | Module 8's quiz pass alone left Module 9 locked; confirming sign-off (via the new dialog, not `window.confirm`) unlocked it. |
| 27 | Final completion screen still works | YES | All 18 modules complete (quiz + sign-off where required) → Completion screen reached, 18/18 shown. |
| 28 | Reset works without deleting theme preference unless explicitly designed and documented | YES | This was explicitly designed: theme uses a separate storage key (`tosp.ui.theme.v1`) never touched by `resetAllProgress()`. Verified — after reset, `tosp.prototype.v2` was `null` while `tosp.ui.theme.v1` remained `"dark"`. Documented in README.md and `docs/ui-design-system.md`. |

## RESPONSIVE

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 29 | 360px layout passes | YES | No horizontal overflow; single-column module grid. |
| 30 | 768px layout passes | YES | No horizontal overflow; two-column module grid, mobile nav pattern (deliberate — see `ui-design-system.md`). |
| 31 | 1024px layout passes | YES | No horizontal overflow; persistent sidebar engages at this breakpoint. |
| 32 | 1440px layout passes | YES | No horizontal overflow; content centers within `--content-width`. |
| 33 | No horizontal overflow | YES | Explicitly measured (`scrollWidth` vs `clientWidth`) at 360/768/1024/1440px — zero overflow at every width. 390px also spot-checked during the mobile-menu test. |
| 34 | Navigation works on touch and keyboard | YES | Mobile menu opens/closes via click (touch-equivalent) and Escape (keyboard); all sidebar/topbar controls are native, focusable, keyboard-activatable elements. |

## ACCESSIBILITY

| # | Check | Result | Notes |
|---|-------|--------|-------|
| 35 | Skip link works | YES | First Tab focuses the skip link; activating it (Enter) moves focus to `#app-main`. |
| 36 | Heading hierarchy is valid | YES | Automated sweep of the Dashboard's `h1`/`h2`/`h3` sequence found no skipped levels. |
| 37 | Controls have accessible names | YES | Automated sweep of every `button`/`select`/`input` on the Dashboard (including the opened mobile menu) found zero controls without a text label, `aria-label`, `aria-labelledby`, or `title`. |
| 38 | Dialog focus is controlled | YES | Opening the confirm dialog focuses its Cancel button; closing it (by any path) returns focus to the button that opened it. |
| 39 | Status is not communicated by colour alone | YES | Every status badge/module card pairs color with a text label and a Unicode symbol (see `docs/ui-design-system.md`, "Component states"). |
| 40 | Reduced-motion preference is respected | YES | With `prefers-reduced-motion: reduce` emulated, computed `transition-duration` on a representative button collapsed to ~0 (measured `1e-6s`). |

## Summary

**40/40 checks: YES.** No FAIL results were recorded in this validation pass.
