# Purchasing Team — Programme Architecture

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced). This document describes how the Purchasing Team programme was
added to the existing TOSP application **without duplicating the shared
engine**.

---

## 1. Purpose

Add a Purchasing Team onboarding programme that reuses the entire existing
TOSP engine (UI shell, themes, responsive layout, accessibility, English
text-to-speech, module journey, lesson/quiz workflow, scoring engine,
progress engine, localStorage safety, toasts/dialogs, source-reference UI,
completion screen, and the generic final-practical-task mechanism added for
Digital Marketing) while carrying **none** of the PH/Amazon/eBay/Digital
Marketing curriculum, sign-off, Tamil, or track/readiness content.

---

## 2. The programme boundary (unchanged — a fifth programme added to it)

The programme-registry boundary already existed on `main`. No boundary code
was written for Purchasing — only a fifth descriptor was added to the
existing pattern:

```
programmes/
  registry.js                         active-programme selection + list — now [PH, Amazon, eBay, Digital Marketing, Purchasing]
  ph-team-content.js                   (unchanged)
  ph-team-programme.js                 (unchanged)
  amazon-team-modules.js               (unchanged)
  amazon-team-question-bank.js         (unchanged)
  amazon-team-programme.js             (unchanged)
  ebay-team-modules.js                 (unchanged)
  ebay-team-question-bank.js           (unchanged)
  ebay-team-programme.js               (unchanged)
  digital-marketing-team-modules.js        (unchanged)
  digital-marketing-team-question-bank.js  (unchanged)
  digital-marketing-team-programme.js      (unchanged)
  purchasing-team-modules.js               Purchasing MODULES + LESSONS               ← new
  purchasing-team-question-bank.js         Purchasing QUIZZES + QUESTIONS             ← new
  purchasing-team-programme.js             Purchasing descriptor (content+config+features+ui+practical task) ← new

data.js    → re-exports getActiveContent()  (MODULES/LESSONS/QUIZZES/QUESTIONS/PRACTICAL_TASK/…) — UNCHANGED
config.js  → CONFIG/FEATURES/STORAGE_KEY resolve from the active descriptor — UNCHANGED
app.js     → /practical-task route, generically guarded on PRACTICAL_TASK presence — UNCHANGED
views/dashboard-view.js → practical-task panel, generically guarded on ui.practicalTask presence — UNCHANGED
```

- **The shared engine was not modified**: `rules/`, `services/`,
  `storage.js`, `state.js`, `router.js`, and the generic lesson/quiz/module
  views still operate on "the active programme's data" without knowing
  which programme is loaded.
- `registry.js` gained **one import and one array entry**
  (`import { purchasingTeamProgramme } from
  './purchasing-team-programme.js'`; `PROGRAMMES = [phTeamProgramme,
  amazonTeamProgramme, ebayTeamProgramme, digitalMarketingTeamProgramme,
  purchasingTeamProgramme]`) — the **only** shared-file edit this task made.
- `data.js`, `config.js`, `app.js`, and `views/dashboard-view.js` required
  **zero** further changes: the generic, guarded `PRACTICAL_TASK` /
  `ui.practicalTask` mechanism already added for Digital Marketing works for
  any programme that defines those fields, and Purchasing does — confirmed
  by direct inspection of all four files before writing any Purchasing code
  (see §4).
- Switching programmes is still a page reload
  (`registry.setActiveProgramme`); the existing programme switcher in the
  header sidebar now lists five options.

---

## 3. Module structure — 10 modules, single track

Ten modules, strictly sequential, following the shared, non-conflicting
process sequence found across the SOP sources (see
`purchasing-team-source-map.md` §3 for the exact source mapping):

| # | Module | Why it exists |
|---|--------|-----------------|
| 1 | Purchasing Team Foundation | Shared context (team responsibilities, the Purchasing/Inventory Purchasing distinction the sources do and don't establish, records, confidentiality) needed before any process content |
| 2 | End-to-End Purchasing Workflow | The shared, non-conflicting spine of the whole process, from need to closure |
| 3 | Purchase Requirement and Inventory Inputs | The unambiguous inputs (sales tiers, MOQ, carton multiples, lead time, data quality) that feed a purchasing decision |
| 4 | Purchase Order Creation and Ordering Policy | Required PO fields, naming convention, compliance documentation, and errors to avoid |
| 5 | Purchase Order Updates and Change Control | When/why a PO changes, the exact status vocabulary, evidence and audit trail |
| 6 | Supplier Follow-Up and Production Control | Acknowledgement, overdue monitoring, production readiness, inspection and rework |
| 7 | Purchase Order Decision Intelligence | What the PO Decision Engine tools are for and their limits — the most conflict-heavy source cluster, handled by exclusion, not resolution |
| 8 | Container Planning and Scoring | Unambiguous container-planning inputs and priority rules, with the same review-before-acting caution as Module 7 |
| 9 | Container Arrival and Stock Receipt | Arrival, receiving, discrepancy handling, closure |
| 10 | Exceptions, Evidence and Final Operational Review | Consolidation of the escalation pattern that recurs throughout, plus practical-task lead-in |

Unlike Digital Marketing's Foundation/PMax/Shopping three-track split, the
Purchasing sources do not describe a clean equivalent split, so this
programme uses a single `ui.tracks` entry covering all 10 modules — this is
a UI/navigation choice only and does not change the underlying module
sequence, prerequisites, or completion rule.

---

## 4. Quiz configuration reuse

The Purchasing programme **reuses the exact existing TOSP quiz
configuration** — no new scoring logic and no new thresholds, matching the
confirmed prototype default:

- `passingScorePct: 80`, `maxAttempts: 3` (identical to PH, Amazon, eBay,
  Digital Marketing).
- `requireAllLessonsBeforeQuiz: true`.
- Scoring, attempt handling, pass/fail, progress calculation, and
  next-module unlocking all run through the **unchanged**
  `rules/scoring.js`, `rules/progression.js`, `rules/module-access.js`,
  `services/quiz-service.js`, and `services/progress-service.js`.
- A failed Skill Check never unlocks the next module; a passed one unlocks
  the next module immediately (Purchasing modules require no sign-off).
- 10 quizzes (one per module), 60 questions total (6 per quiz), every
  question source-cited. No question tests any of the 12 mandatory
  exclusion categories in `purchasing-team-exclusions.md` or any
  confidential/live data.

---

## 5. No-sign-off rule

Purchasing Team requires **no** team-leader or reviewer sign-off. Every
module sets `requiresSignoff: false`, and the programme descriptor sets
`features.requiresReviewerSignoff: false`. Because `module-view.js`'s entire
sign-off panel is wrapped in `requiresSignoff ? ... : ''`, and every
Purchasing module has `requiresSignoff: false`, no sign-off panel, button,
awaiting-sign-off status, storage record, or inter-module sign-off gate
appears anywhere in this programme — this required **zero** shared-code
changes, exactly as for Amazon, eBay, and Digital Marketing. The shared
engine's sign-off capability is not removed (PH still uses it).

---

## 6. One final practical task — displayed, completable, non-gating

A single final practical task (`purchasing-final-practical-v1`) is defined
in the programme's `content.PRACTICAL_TASK` and rendered by the existing,
unmodified `views/practical-task-view.js` at route `/practical-task` — the
exact same generic mechanism built for Digital Marketing, reused here with
zero code changes. It asks the learner to prepare a fictional purchasing
evidence pack covering purchase-requirement validation, required PO fields,
update/evidence actions, supplier follow-up evidence, production-delay
escalation, non-conflicting decision-engine review, container-planning
evidence (explicitly without any disputed threshold), a stock-receipt
discrepancy, and a handover summary — 12 checklist items across 9 sections,
each citing an exact source already taught in the module content, using only
fictional example data.

**Completion boundary (important, identical to Digital Marketing's design):**
the practical task is displayed and its checklist items are completable
(checked/unchecked in the browser), but it is **not** an additional
completion gate. Its checked-item state lives in the same small in-memory
`Set` local to `practical-task-view.js` that Digital Marketing already uses
— never written to `storage.js`, never read by
`rules/module-access.js#isProgrammeComplete`, and resets on a full page
refresh. The programme's completion rule is exactly "all required lessons
complete + all module Skill Checks passed" (§7) — unchanged.

---

## 7. Completion rule

The Purchasing programme is complete when **every required lesson is
completed and every one of the 10 required module Skill Checks is passed**
(no reviewer sign-off, no practical-task approval required). This is exactly
the shared engine's `isProgrammeComplete` over the active programme's
modules — no new completion logic was written. The completion screen
(shared, unmodified) states the summary is generated in this browser,
`PROTOTYPE_ONLY`, and does not claim official purchasing authorisation,
permission to approve or send POs, competency certification, or authority to
override management decisions — this applies to Purchasing exactly as it
already does to PH, Amazon, eBay, and Digital Marketing.

---

## 8. No-Tamil rule

`features.enableTamilTranslation: false` for Purchasing. The single
`renderTranslationControl` choke point (`components/translation-control.js`)
returns an empty string when the flag is off, so **no** "Translate to
Tamil", "Show English", "Tamil Read Aloud", or "Translation Review" control
renders anywhere in this programme, and the translation service (including
any Google Translation call) is never invoked. English Read Aloud
(`renderSpeakerControl`/`wireSpeakerControl`, unrelated to the Tamil flag)
remains fully available on every Purchasing screen, including the
practical-task screen. The Purchasing navigation descriptor (`ui.navItems`)
does not include a Translation Review item at all. PH's Tamil functionality
is unchanged and remains available within PH Team; Amazon, eBay, and Digital
Marketing remain unaffected.

---

## 9. Storage key

Purchasing progress is stored under
**`tosp.purchasing-team.prototype.v1`** (storageVersion 1), completely
separate from PH (`tosp.prototype.v2`), Amazon
(`tosp.amazon-team.prototype.v1`), eBay (`tosp.ebay-team.prototype.v1`),
Digital Marketing (`tosp.digital-marketing-team.prototype.v1`), the theme
(`tosp.ui.theme.v1`), and the programme selector
(`tosp.active-programme.v1`). Resetting Purchasing progress removes only the
Purchasing key (`storage.js`'s `resetProgress()` only ever touches
`STORAGE_KEY`, which resolves to the active programme's own key).

---

## 10. Programme isolation summary

| Concern | PH | Amazon | eBay | Digital Marketing | Purchasing |
|---|---|---|---|---|---|
| Storage key | `tosp.prototype.v2` | `tosp.amazon-team.prototype.v1` | `tosp.ebay-team.prototype.v1` | `tosp.digital-marketing-team.prototype.v1` | `tosp.purchasing-team.prototype.v1` |
| Sign-off | required for its 11 steps | not required | not required | not required | not required |
| Tamil | enabled | disabled | disabled | disabled | disabled |
| Content file(s) | `ph-team-content.js` | `amazon-team-*.js` | `ebay-team-*.js` | `digital-marketing-team-*.js` | `purchasing-team-*.js` |
| Nav items | PH-specific | Amazon-specific | eBay-specific | DM-specific (adds Practical Task) | Purchasing-specific (adds Practical Task) |
| Final practical task | none | none | none | one, non-gating | one, non-gating |
| Module ID prefix | ph-specific | `amz-` | `eb-` | `dm-` | `pur-` |

Each programme's `content`/`config`/`features`/`ui` bundle is self-contained;
switching the active programme (a page reload) is the only integration
point, and it never reads or writes another programme's storage key. No
Purchasing module, lesson, quiz, or question ID collides with any existing
programme's IDs (all use the `pur-` prefix, distinct from `ph-`/`amz-`/
`eb-`/`dm-`).

---

## 11. Source-authority model applied

See `purchasing-team-source-map.md` §1 for the full five-tier authority
model (written SOPs primary; PO Decision Engine written rules supplemental;
Excel workbooks formula/reference only; the HTML prototype interface
evidence only; samples/worked examples illustrative only). Applied
throughout module authoring: every disputed item across tiers was excluded
rather than resolved by tier-preference — the authority model determines
which source is consulted first, not which conflicting value wins.

---

## 12. Known limits

- Switching programmes reloads the page — unchanged behaviour, inherited
  from the existing boundary.
- The practical task's checked-item state is transient (in-memory only) and
  resets on a full page refresh — intentional, since it is explicitly
  non-gating and PROTOTYPE_ONLY, identical to Digital Marketing's design.
- No pass-percentage, attempt-limit, or sign-off rule is stated in the
  Purchasing sources; the shared platform default (80% / 3 attempts / no
  sign-off) is reused per the confirmed prototype default, not derived from
  the Purchasing documents.
- Thirteen categories of disputed or defective source content are
  deliberately excluded from this programme — see
  `purchasing-team-exclusions.md` for the full register and future
  correction paths.
- The sources do not establish an organisational boundary between
  "Purchasing" and "Inventory Purchasing"; this programme does not invent
  one (see Module 1, Lesson 2).
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step
  was supplied as part of this task.
