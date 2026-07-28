# Digital Marketing Team — Programme Architecture

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced, user-confirmed). This document describes how the Digital Marketing
Team programme was added to the existing TOSP application **without
duplicating the shared engine**.

---

## 1. Purpose

Add a Digital Marketing Team onboarding programme that reuses the entire
existing TOSP engine (UI shell, themes, responsive layout, accessibility,
English text-to-speech, module journey, lesson/quiz workflow, scoring
engine, progress engine, localStorage safety, toasts/dialogs,
source-reference UI, completion screen) while carrying **none** of the
PH/Sales, Amazon, or eBay curriculum, sign-off, Tamil, or track/readiness
content — and adds exactly one new, non-gating screen (the final practical
task) that the other three programmes do not use.

---

## 2. The programme boundary (unchanged — a fourth programme added to it)

The programme-registry boundary already existed on `main` (added when
Amazon merged, extended when eBay merged). No boundary code was written for
Digital Marketing — only a fourth descriptor was added to the existing
pattern:

```
programmes/
  registry.js                         active-programme selection + list — now [PH, Amazon, eBay, Digital Marketing]
  ph-team-content.js                   (unchanged)
  ph-team-programme.js                 (unchanged)
  amazon-team-modules.js               (unchanged)
  amazon-team-question-bank.js         (unchanged)
  amazon-team-programme.js             (unchanged)
  ebay-team-modules.js                 (unchanged)
  ebay-team-question-bank.js           (unchanged)
  ebay-team-programme.js               (unchanged)
  digital-marketing-team-modules.js        Digital Marketing MODULES + LESSONS         ← new
  digital-marketing-team-question-bank.js  Digital Marketing QUIZZES + QUESTIONS       ← new
  digital-marketing-team-programme.js      Digital Marketing descriptor (content+config+features+ui+practical task) ← new

data.js    → re-exports getActiveContent()  (MODULES/LESSONS/QUIZZES/QUESTIONS/PRACTICAL_TASK/…)
config.js  → CONFIG/FEATURES/STORAGE_KEY resolve from the active descriptor
```

- **The shared engine was not modified**: `rules/`, `services/`,
  `storage.js`, `state.js`, `router.js`, and the generic lesson/quiz/module
  views still operate on "the active programme's data" without knowing
  which programme is loaded.
- `registry.js` gained one import and one array entry
  (`import { digitalMarketingTeamProgramme } from
  './digital-marketing-team-programme.js'`; `PROGRAMMES = [phTeamProgramme,
  amazonTeamProgramme, ebayTeamProgramme, digitalMarketingTeamProgramme]`) —
  one of two edits to a previously-existing file (the other is described in
  §4 below).
- `data.js` gained one additive re-export line
  (`export const PRACTICAL_TASK = C.PRACTICAL_TASK;`) — `undefined` for
  PH/Amazon/eBay, since their content bundles do not define it.
- `app.js` gained one additive route registration (`/practical-task`),
  guarded exactly like the existing Tamil `/translation-review` guard: if
  the active programme's content has no `PRACTICAL_TASK`, the route
  redirects to `/dashboard` instead of rendering.
- `dashboard-view.js` gained one additive, guarded section (only renders
  when `ui.practicalTask` is defined on the active programme).
- Switching programmes is still a page reload
  (`registry.setActiveProgramme`); the existing programme switcher in the
  header sidebar now lists four options.

---

## 3. Module structure — Foundation + Performance Max + Shopping

Ten modules, strictly sequential, in the order the user specified directly
(see `digital-marketing-team-source-map.md` for the exact source mapping):

| # | Module | Track | Why it exists |
|---|--------|-------|-----------------|
| 1 | Digital Marketing and Google Ads Foundation | Foundation | Shared context (account/campaign structure, PMax-vs-Shopping choice, conversion tracking, feed relationship, governance) needed before either specialist track |
| 2 | Feed Optimisation and Merchant Center Readiness | Performance Max | Feed/Merchant Center readiness is an explicit prerequisite in the source material, ahead of campaign creation |
| 3 | Performance Max Campaign Creation | Performance Max | The end-to-end build workflow |
| 4 | Asset Group Design | Performance Max | Creative asset requirements within a created campaign |
| 5 | Audience Signals and Search Themes | Performance Max | Signal configuration within a created campaign |
| 6 | Bidding Strategy | Performance Max | Target-setting and learning-phase protection |
| 7 | Budget Management and Allocation | Performance Max | Budget sizing, approval, and the monthly review cycle |
| 8 | Performance Max Campaign Audit | Performance Max | Ongoing optimisation once a campaign is live (assumes Module 3 is complete) |
| 9 | Shopping Campaign Creation: Automated Route | Shopping | One of two Shopping creation workflows |
| 10 | Shopping Campaign Creation: Manual Route | Shopping | The distinct, deliberately-chosen manual-control alternative |

Grouped for the dashboard/journey as three **tracks**: Foundation (Module 1),
Performance Max Track (Modules 2-8), Shopping Track (Modules 9-10).

PMAX-005 (Budget Bleed Control) was **not** built as an 11th module — see
`digital-marketing-team-exclusions.md`. The programme has exactly 10 active
modules.

---

## 4. Quiz configuration reuse

The Digital Marketing programme **reuses the exact existing TOSP quiz
configuration** — no new scoring logic and no new thresholds, matching the
confirmed decision:

- `passingScorePct: 80`, `maxAttempts: 3` (identical to PH, Amazon, and eBay).
- `requireAllLessonsBeforeQuiz: true`.
- Scoring, attempt handling, pass/fail, progress calculation, and
  next-module unlocking all run through the **unchanged**
  `rules/scoring.js`, `rules/progression.js`, `rules/module-access.js`,
  `services/quiz-service.js`, and `services/progress-service.js`.
- A failed Skill Check never unlocks the next module; a passed one unlocks
  the next module immediately (Digital Marketing modules require no
  sign-off).
- 10 quizzes (one per module), 60 questions total (6 per quiz), every
  question source-cited. No question tests PMAX-005, any numeric NCA
  ceiling, the disputed Shopping approval-metadata conflict, the defective
  naming example, confidential information, or unsourced concepts.

---

## 5. No-sign-off rule

Digital Marketing Team requires **no** team-leader or reviewer sign-off.
Every module sets `requiresSignoff: false`, and the programme descriptor
sets `features.requiresReviewerSignoff: false`. Because `module-view.js`'s
entire sign-off panel is wrapped in `requiresSignoff ? ... : ''`, and every
Digital Marketing module has `requiresSignoff: false`, no sign-off panel,
button, awaiting-sign-off status, storage record, or inter-module sign-off
gate appears anywhere in this programme — this required **zero** shared-code
changes, exactly as for Amazon and eBay. The shared engine's sign-off
capability is not removed (PH still uses it).

---

## 6. One final practical task — displayed, completable, non-gating

A single final practical task (`digital-marketing-final-practical-v1`) is
defined in the programme's `content.PRACTICAL_TASK` and rendered by a new,
dedicated view (`views/practical-task-view.js`) at route `/practical-task`.
It asks the learner to prepare a fictional, non-live campaign planning pack
covering feed readiness, the Performance-Max-vs-Shopping choice, campaign
creation sequence, asset-group/audience-signal/bidding/budget
considerations, and audit/checklist preparation — each checklist item citing
an exact source already taught in the module content, using only fictional
example data, and explicitly excluding the disputed NCA ceiling.

**Completion boundary (important):** the practical task is displayed and its
checklist items are completable (checked/unchecked in the browser), but it
is **not** an additional completion gate. Its checked-item state lives in a
small in-memory `Set` local to `practical-task-view.js` — the same pattern
`state.js` already uses for other transient, non-persisted UI state — and is
never written to `storage.js`, never read by
`rules/module-access.js#isProgrammeComplete`, and resets on a full page
refresh. This was verified directly: an automated run completed every lesson
and passed every one of the 10 Skill Checks *without ever opening the
practical-task screen*, and `isProgrammeComplete()` still returned `true`
immediately afterward (see `digital-marketing-team-programme-check.md`).
The programme's completion rule is exactly "all required lessons complete +
all module Skill Checks passed" (§7) — unchanged if the user later decides
to make the practical task a gate.

---

## 7. Completion rule

The Digital Marketing programme is complete when **every required lesson is
completed and every one of the 10 required module Skill Checks is passed**
(no reviewer sign-off, no practical-task approval required). This is exactly
the shared engine's `isProgrammeComplete` over the active programme's
modules — no new completion logic was written. The completion screen
(shared, unmodified) states the summary is generated in this browser,
`PROTOTYPE_ONLY`, and is not an official employment, campaign-management, or
competency certificate — this applies to Digital Marketing exactly as it
already does to PH, Amazon, and eBay.

---

## 8. No-Tamil rule

`features.enableTamilTranslation: false` for Digital Marketing. The single
`renderTranslationControl` choke point (`components/translation-control.js`)
returns an empty string when the flag is off, so **no** "Translate to
Tamil", "Show English", or "Read Tamil" control renders anywhere in this
programme, and the translation service is never called. English Read Aloud
(`renderSpeakerControl`/`wireSpeakerControl`, unrelated to the Tamil flag)
remains fully available on every Digital Marketing screen, including the new
practical-task screen. The Digital Marketing navigation descriptor
(`ui.navItems`) does not include a Translation Review item at all. PH Tamil
functionality is unchanged and remains available within PH Team; Amazon and
eBay remain unaffected.

---

## 9. Storage key

Digital Marketing progress is stored under
**`tosp.digital-marketing-team.prototype.v1`** (storageVersion 1), completely
separate from PH (`tosp.prototype.v2`), Amazon
(`tosp.amazon-team.prototype.v1`), eBay (`tosp.ebay-team.prototype.v1`), the
theme (`tosp.ui.theme.v1`), and the programme selector
(`tosp.active-programme.v1`). Resetting Digital Marketing progress removes
only the Digital Marketing key (`storage.js`'s `resetProgress()` only ever
touches `STORAGE_KEY`, which resolves to the active programme's own key).
Verified directly via an automated check: writing Digital Marketing progress
and then resetting it left pre-seeded fake PH/Amazon/eBay/theme values in
`localStorage` completely untouched.

---

## 10. Programme isolation summary

| Concern | PH | Amazon | eBay | Digital Marketing |
|---|---|---|---|---|
| Storage key | `tosp.prototype.v2` | `tosp.amazon-team.prototype.v1` | `tosp.ebay-team.prototype.v1` | `tosp.digital-marketing-team.prototype.v1` |
| Sign-off | required for its 11 steps | not required | not required | not required |
| Tamil | enabled | disabled | disabled | disabled |
| Content file(s) | `ph-team-content.js` | `amazon-team-modules.js` + `amazon-team-question-bank.js` | `ebay-team-modules.js` + `ebay-team-question-bank.js` | `digital-marketing-team-modules.js` + `digital-marketing-team-question-bank.js` |
| Nav items | PH-specific | Amazon-specific | eBay-specific | Digital-Marketing-specific (adds one item: Practical Task) |
| Final practical task | none | none | none | one, non-gating |

Each programme's `content`/`config`/`features`/`ui` bundle is self-contained;
switching the active programme (a page reload) is the only integration
point, and it never reads or writes another programme's storage key.

---

## 11. Known limits

- Switching programmes reloads the page — unchanged behaviour, inherited
  from the existing boundary.
- The practical task's checked-item state is transient (in-memory only) and
  resets on a full page refresh; it was never intended to persist, since it
  is explicitly non-gating and PROTOTYPE_ONLY. If the user later wants this
  state to survive a refresh, that would require a small, additive change to
  `storage.js`'s progress shape (out of scope for this task, which
  restricted shared-storage changes to confirmed isolation-bug fixes only).
- No pass-percentage, attempt-limit, or sign-off rule is stated in the
  Digital Marketing sources; the shared platform default (80% / 3 attempts /
  no sign-off) is reused per the confirmed decision, not derived from the
  Digital Marketing documents.
- No browser-based (Playwright/manual) visual verification was possible in
  this sandboxed environment (no network access to install a browser driver,
  no jsdom available). Verification instead exercised the actual production
  view/component/service modules directly under Node with minimal
  `window`/`document`/`localStorage` stubs — see
  `digital-marketing-team-programme-check.md` for what was and was not
  covered by this approach.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step was
  supplied as part of this task.
