# eBay Team — Programme Architecture

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced). This document describes how the eBay Team programme was added to
the existing TOSP application **without duplicating the shared engine**.

---

## 1. Purpose

Add an eBay Team onboarding programme that reuses the entire existing TOSP
engine (UI shell, themes, responsive layout, accessibility, English
text-to-speech, module journey, lesson/quiz workflow, scoring engine,
progress engine, localStorage safety, toasts/dialogs, source-reference UI,
completion screen) while carrying **none** of the PH/Sales or Amazon
curriculum, sign-off, Tamil, or track/readiness content.

---

## 2. The programme boundary (unchanged — a third programme added to it)

The programme-registry boundary already exists on `main` (added when the
Amazon Team programme was merged). No boundary code was written for eBay —
only a third descriptor was added to the existing pattern:

```
programmes/
  registry.js                  active-programme selection + list — now [PH, Amazon, eBay]
  ph-team-content.js            (unchanged)
  ph-team-programme.js          (unchanged)
  amazon-team-modules.js        (unchanged)
  amazon-team-question-bank.js  (unchanged)
  amazon-team-programme.js      (unchanged)
  ebay-team-modules.js          eBay MODULES + LESSONS               ← new
  ebay-team-question-bank.js    eBay QUIZZES + QUESTIONS             ← new
  ebay-team-programme.js        eBay descriptor (content+config+features+ui) ← new

data.js    → re-exports getActiveContent()  (MODULES/LESSONS/QUIZZES/QUESTIONS/…)
config.js  → CONFIG/FEATURES/STORAGE_KEY resolve from the active descriptor
```

- The **shared engine was not modified**: `rules/`, `services/`,
  `storage.js`, `state.js`, `router.js`, `components/`, and the generic
  lesson/quiz views still operate on "the active programme's data" without
  knowing which programme is loaded. No file outside `tosp/js/programmes/`
  and `.gitignore` was changed for this work.
- **Programme-flavoured views** (`header`, `dashboard`, `programme`,
  `sources`, `module`, `completion`) already read a per-programme **UI
  descriptor** (`descriptor.ui`) rather than hardcoding labels/tracks/
  readiness — confirmed by reading `header.js`, `dashboard-view.js`, and
  `sources-view.js` before writing any eBay code. eBay renders its own
  navigation, tracks, and source text purely by supplying `ebayTeamProgramme.ui`;
  no shared view needed a code change.
- `registry.js` gained one import and one array entry
  (`import { ebayTeamProgramme } from './ebay-team-programme.js'`; `PROGRAMMES
  = [phTeamProgramme, amazonTeamProgramme, ebayTeamProgramme]`) — the only edit
  to a previously-existing file.
- **Switching programmes** is a page reload (`registry.setActiveProgramme`),
  after which `data.js`/`config.js` re-resolve to the selected programme. The
  existing programme switcher in the header sidebar now lists three options.

---

## 3. Module sequence & why each module exists

Eight modules, strictly sequential (see `ebay-team-source-map.md` for the
exact source mapping). All modules are **required** for completion and none
require sign-off.

| # | Module | Why it exists | Source |
|---|--------|---------------|--------|
| 1 | Introduction to eCommerce | The eCommerce/marketplace foundation Day 2 onward is built on | 7-Day PDF, Day 1 |
| 2 | eBay Account Basics & Seller Hub Navigation | Where every later skill (listings, orders, messages, performance) is physically found | 7-Day PDF, Day 2 |
| 3 | Product Research & Listing Fundamentals | Research before building; listing basics at an introductory level | 7-Day PDF, Day 3 |
| 4 | Practical Listing Creation | The fixed 8-step publish workflow + variation basics | 7-Day PDF, Day 4 |
| 5 | Account Health & Customer Service | The four hard thresholds that protect the account, plus service standard | 7-Day PDF, Day 5 |
| 6 | Order Management & Daily Operations | The daily order lifecycle and issue-handling routine | 7-Day PDF, Day 6 |
| 7 | Advanced Optimization & Final Evaluation | Post-launch habits, named mistakes, and the 7-day close-out checklist | 7-Day PDF, Day 7 |
| 8 | Listing Optimization Deep-Dive | The exact title/image/item-specifics/description/postage/variation rules only introduced at overview level in Modules 3–4 | EBAY BGCT PDF |

Grouped for the dashboard/journey as two **tracks**: 7-Day Onboarding
(Modules 1–7), Listing Optimization Deep-Dive (Module 8).

Module 8 was deliberately kept separate rather than folded into Modules 3–4,
per the confirmed decision: the listing-optimization deck carries seven
distinct rule sets dense with exact numbers (80-char title limit, 2000×2000px
images, 1500–2000 character description, 30-day returns, single-variation
rule) that would overload Modules 3–4 if merged, and none of it duplicates
content already taught earlier — Modules 3–4 stay at the source's own
"fundamentals/workflow" level and forward-reference Module 8 by name.

---

## 4. Quiz configuration reuse

The eBay programme **reuses the exact existing TOSP quiz configuration** — no
new scoring logic and no new thresholds, matching the confirmed decision:

- `passingScorePct: 80`, `maxAttempts: 3` (identical to PH and Amazon).
- `requireAllLessonsBeforeQuiz: true`.
- Scoring, attempt handling, pass/fail, progress calculation, and next-module
  unlocking all run through the **unchanged** `rules/scoring.js`,
  `rules/progression.js`, `rules/module-access.js`, `services/quiz-service.js`,
  and `services/progress-service.js`.
- A failed Skill Check never unlocks the next module; a passed one unlocks the
  next module immediately (eBay modules require no sign-off).
- 8 quizzes (one per module), 35 questions total (details in the validation
  report), every question source-cited.

---

## 5. No-sign-off rule

eBay Team requires **no** team-leader sign-off. Every eBay module sets
`requiresSignoff: false`, and the programme descriptor sets
`features.requiresReviewerSignoff: false`. The shared engine's sign-off
capability is **not removed** (PH still uses it); it is simply never
triggered for eBay, so no sign-off panel, button, awaiting-signoff state,
storage record, or inter-module sign-off gate appears anywhere in the eBay
programme. This absence is also directly tested in the eBay question bank
(`eb-m2-quiz-q3`, `eb-m7-quiz-q4`), so a learner cannot mistakenly believe
sign-off or certification is required.

---

## 6. Completion rule

The eBay programme is complete when **every required lesson is completed and
every required module Skill Check is passed** for **all 8 required modules**
(no reviewer sign-off). This is exactly the shared engine's
`isProgrammeComplete` over the active programme's modules — no new completion
logic was written.

The Day 7 source outcomes (optimized listing created, customer reply
drafted, workflow summary completed, Seller Hub usage demonstrated, account
health understood, customer communication understood, order processing
understood) are represented as **learning/checklist content inside Module 7's
lessons and Skill Check** (`eb-m7-l2`, `eb-m7-quiz-q3`), consistent with this
being a frontend prototype: they are taught and checked for understanding,
not independently verified as real operational events. The completion screen
(shared, unmodified) states the summary is generated in this browser,
`PROTOTYPE_ONLY`, and is not an official employment, onboarding, or
competency certificate — this applies to eBay exactly as it already does to
PH and Amazon.

---

## 7. Storage key

eBay progress is stored under **`tosp.ebay-team.prototype.v1`**
(storageVersion 1), completely separate from PH (`tosp.prototype.v2`), Amazon
(`tosp.amazon-team.prototype.v1`), the theme (`tosp.ui.theme.v1`), and the
programme selector (`tosp.active-programme.v1`). Resetting eBay progress
removes only the eBay key (`storage.js`'s `resetProgress()` only ever touches
`STORAGE_KEY`, which resolves to the active programme's own key). PH
progress, Amazon progress, theme, and any Tamil cache are never touched by
an eBay reset, and vice versa.

---

## 8. No-Tamil rule

`features.enableTamilTranslation: false` for eBay. The single
`renderTranslationControl` choke point (`components/translation-control.js`)
returns an empty string when the flag is off, so **no** "Translate to
Tamil", "Show English", or "Read Tamil" control renders anywhere in the eBay
programme, the translation service is never called (no Google Translation
request), and the eBay navigation descriptor (`ebayTeamProgramme.ui.navItems`)
does not include a Translation Review item at all. PH Tamil functionality is
unchanged and remains available within PH Team; Amazon remains unaffected.

---

## 9. Programme isolation summary

| Concern | PH | Amazon | eBay |
|---|---|---|---|
| Storage key | `tosp.prototype.v2` | `tosp.amazon-team.prototype.v1` | `tosp.ebay-team.prototype.v1` |
| Sign-off | required for its 11 steps | not required | not required |
| Tamil | enabled | disabled | disabled |
| Content file(s) | `ph-team-content.js` | `amazon-team-modules.js` + `amazon-team-question-bank.js` | `ebay-team-modules.js` + `ebay-team-question-bank.js` |
| Nav items | PH-specific (7-Day Evaluation, Competency Path, Translation Review) | Amazon-specific (no Tamil/PH items) | eBay-specific (no Tamil/PH/Amazon items) |

Each programme's `content`/`config`/`features`/`ui` bundle is self-contained;
switching the active programme (a page reload) is the only integration point,
and it never reads or writes another programme's storage key.

---

## 10. Known limits

- Switching programmes reloads the page (deliberate: the static ES-module
  engine reads the active programme once per load) — unchanged behaviour,
  inherited from the existing boundary.
- The Markdown 7-day export is a lossy duplicate of the PDF (see the source
  map, §2); it was used only to cross-check, never as a standalone source.
- No pass-percentage, attempt-limit, or sign-off rule is stated in the eBay
  sources; the shared platform default (80% / 3 attempts / no sign-off) is
  reused per the confirmed decision, not derived from the eBay documents.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step was
  supplied as part of this task.
