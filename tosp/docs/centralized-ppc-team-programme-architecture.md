# Centralized PPC Team — Programme Architecture

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced). This document describes how the Centralized PPC Team programme
was added to the existing TOSP application **without duplicating the shared
engine**.

---

## 1. Purpose

Add a Centralized PPC Team onboarding programme that reuses the entire
existing TOSP engine (UI shell, themes, responsive layout, accessibility,
English text-to-speech, module journey, lesson/quiz workflow, scoring
engine, progress engine, localStorage safety, toasts/dialogs, source-
reference UI, completion screen, and the generic final-practical-task
mechanism first added for Digital Marketing and reused by Purchasing) while
carrying **none** of the PH/Amazon/eBay/Digital Marketing/Purchasing
curriculum, sign-off, Tamil, or track/readiness content.

---

## 2. The programme boundary (unchanged — a sixth programme added to it)

The programme-registry boundary already existed on `main`. No boundary code
was written for Centralized PPC — only a sixth descriptor was added to the
existing pattern:

```
programmes/
  registry.js                              active-programme selection + list — now [PH, Amazon, eBay, Digital Marketing, Purchasing, Centralized PPC]
  ph-team-content.js                       (unchanged)
  ph-team-programme.js                     (unchanged)
  amazon-team-modules.js                   (unchanged)
  amazon-team-question-bank.js             (unchanged)
  amazon-team-programme.js                 (unchanged)
  ebay-team-modules.js                     (unchanged)
  ebay-team-question-bank.js               (unchanged)
  ebay-team-programme.js                   (unchanged)
  digital-marketing-team-modules.js        (unchanged)
  digital-marketing-team-question-bank.js  (unchanged)
  digital-marketing-team-programme.js      (unchanged)
  purchasing-team-modules.js               (unchanged)
  purchasing-team-question-bank.js         (unchanged)
  purchasing-team-programme.js             (unchanged)
  centralized-ppc-team-modules.js          Centralized PPC MODULES + LESSONS               ← new
  centralized-ppc-team-question-bank.js    Centralized PPC QUIZZES + QUESTIONS              ← new
  centralized-ppc-team-programme.js        Centralized PPC descriptor (content+config+features+ui+practical task) ← new

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
  (`import { centralizedPpcTeamProgramme } from
  './centralized-ppc-team-programme.js'`; `PROGRAMMES = [phTeamProgramme,
  amazonTeamProgramme, ebayTeamProgramme, digitalMarketingTeamProgramme,
  purchasingTeamProgramme, centralizedPpcTeamProgramme]`) — the **only**
  shared-file edit this task made.
- `data.js`, `config.js`, `app.js`, and `views/dashboard-view.js` required
  **zero** further changes: the generic, guarded `PRACTICAL_TASK` /
  `ui.practicalTask` mechanism already used by Digital Marketing and
  Purchasing works unchanged for Centralized PPC.
- Switching programmes is still a page reload
  (`registry.setActiveProgramme`); the existing programme switcher in the
  header sidebar now lists six options.

---

## 3. Module structure — 14 modules, six tracks, one linear sequence

Fourteen modules, strictly sequential by `orderIndex` (module unlocking in
`rules/module-access.js#tryUnlockNextModule` advances by array position,
identical mechanism to every other programme — `ui.tracks` is a navigation
grouping layered on top, not a separate unlock graph), clustered from the 30
source files by operational topic rather than one module per file (see
`centralized-ppc-team-source-map.md` §3 for the exact source mapping):

| # | Track | Module | Why it exists |
|---|---|---|---|
| 1 | Foundation | Shared PPC Foundation | Cross-platform context (responsibility scope, recommendation vs. approval, evidence discipline, confidentiality) needed before any platform-specific content |
| 2 | Amazon | Amazon Campaign Foundations & Eligibility | Eligibility gates, campaign types, naming convention, negative-keyword/bidding baseline |
| 3 | Amazon | Amazon Bid & Placement Optimization Logic | The two-tier (30d/7d) bid evaluation shape, placement adjustments, roles/audit log |
| 4 | Amazon | Amazon Budget Optimization & Special Rules | Date-window ACOS selection, category-based budget response, hourly boost, order-volume overrides |
| 5 | Amazon | Amazon Product Activation & Pause Automation | Reactivation (short/long pause), spend/ROAS pause, stock-based pause, price-tiered thresholds |
| 6 | Amazon | Amazon TACOS Monitoring & Escalation | TACOS formula, lifecycle target bands, TACOS Gap, escalation to the (unconfirmed) "PH Dashboard" |
| 7 | Amazon | Amazon Multi-Market Operations & Scaling | UK-as-reference-template framing, DE/FR/IT draft/currency gaps, margin review and scaling |
| 8 | Google Ads | Google Ads Strategy, Kill Gates & Campaign Governance | Kill gates, protected-campaign/budget-ceiling rules, handover requirement |
| 9 | Google Ads | Google Ads Campaign Setup & Optimization | PMax build sequence, feed-quality gate, negative-keyword rules, staged budget review |
| 10 | Meta | Meta Campaign Proposal Discipline | Audience segmentation/exclusions, budget allocation, the pre-launch manager-approval gate |
| 11 | eBay | eBay Campaign Setup & Listing Readiness | Setup paths, minimum-price gate, listing-quality inputs, keyword review cadence |
| 12 | eBay | eBay Monitoring, Optimization & Escalation | Daily/weekly review, ACoS approval ceiling, no-sales pause concept, weekly report |
| 13 | Reporting | Cross-Platform Reporting & Evidence Standards | Reporting-pattern synthesis, shared evidence discipline, recommendation-vs-approval restated |
| 14 | Reporting | Roles, Approval Gates & Programme Closure | Generic cross-platform role model, approval-boundary synthesis, exclusions recap, practical-task lead-in |

The user-approved six learning areas (Shared PPC Foundation; Amazon PPC;
Google Ads; Meta Ads; eBay Advertising; Reporting and Governance) map to six
`ui.tracks` entries, each an `orderIndex` filter over the one linear module
sequence above — the same mechanism Digital Marketing uses for its
Foundation/PMax/Shopping split. Verified: every one of the 14 modules
matches exactly one track filter (no gap, no overlap).

---

## 4. Quiz configuration reuse

The Centralized PPC programme **reuses the exact existing TOSP quiz
configuration** — no new scoring logic and no new thresholds, matching the
confirmed prototype default:

- `passingScorePct: 80`, `maxAttempts: 3` (identical to every other
  programme on this platform).
- `requireAllLessonsBeforeQuiz: true`.
- Scoring, attempt handling, pass/fail, progress calculation, and
  next-module unlocking all run through the **unchanged**
  `rules/scoring.js`, `rules/progression.js`, `rules/module-access.js`,
  `services/quiz-service.js`, and `services/progress-service.js`.
- A failed Skill Check never unlocks the next module; a passed one unlocks
  the next module immediately (no Centralized PPC module requires sign-off).
- 14 quizzes (one per module), 84 questions total (6 per quiz), every
  question source-cited. No question tests any of the nine `SOURCE_CONFLICT`
  exclusions in `centralized-ppc-team-exclusions.md`, any confidential/live
  data, or another programme's PPC rules.

---

## 5. No-sign-off rule

Centralized PPC Team requires **no** learner or reviewer sign-off. Every
module sets `requiresSignoff: false`, and the programme descriptor sets
`features.requiresReviewerSignoff: false`. Because `module-view.js`'s entire
sign-off panel is wrapped in `requiresSignoff ? ... : ''`, and every
Centralized PPC module has `requiresSignoff: false`, no sign-off panel,
button, awaiting-sign-off status, storage record, or inter-module sign-off
gate appears anywhere in this programme — this required **zero** shared-code
changes, exactly as for Amazon, eBay, Digital Marketing, and Purchasing.
The shared engine's sign-off capability is not removed (PH still uses it).

---

## 6. One final practical task — displayed, completable, non-gating

A single final practical task (`centralized-ppc-final-practical-v1`) is
defined in the programme's `content.PRACTICAL_TASK` and rendered by the
existing, unmodified `views/practical-task-view.js` at route
`/practical-task` — the same generic mechanism built for Digital Marketing
and reused by Purchasing, reused here with zero code changes. It asks the
learner to prepare a fictional cross-platform PPC planning and review pack
covering platform selection, campaign-setup evidence, metric selection,
reviewing a fictional campaign summary, recording a pause/escalation
recommendation, preparing a reporting summary, documenting source
limitations, and a confidentiality check — 12 checklist items across 8
sections, each citing an exact source already taught in the module content,
using only fictional example data, with no platform connection, live
campaign action, or budget spend of any kind.

**Completion boundary (identical to Digital Marketing's and Purchasing's
design):** the practical task is displayed and its checklist items are
completable (checked/unchecked in the browser), but it is **not** an
additional completion gate. Its checked-item state lives in the same small
in-memory `Set` local to `practical-task-view.js` that every other
programme's practical task already uses — never written to `storage.js`,
never read by `rules/module-access.js#isProgrammeComplete`, and resets on a
full page refresh. The programme's completion rule is exactly "all required
lessons complete + all module Skill Checks passed" (§7) — unchanged.

---

## 7. Completion rule

The Centralized PPC programme is complete when **every required lesson is
completed and every one of the 14 required module Skill Checks is passed**
(no reviewer sign-off, no practical-task completion required). This is
exactly the shared engine's `isProgrammeComplete` over the active
programme's modules — no new completion logic was written. The completion
screen (shared, unmodified) states the summary is generated in this
browser, `PROTOTYPE_ONLY`, and does not claim official advertising
authorisation, permission to launch or change real campaigns, competency
certification, or authority to override management decisions — this applies
to Centralized PPC exactly as it already does to every other programme.

---

## 8. No-Tamil rule

`features.enableTamilTranslation: false` for Centralized PPC. The single
`renderTranslationControl` choke point (`components/translation-control.js`)
returns an empty string when the flag is off, so **no** "Translate to
Tamil", "Show English", "Tamil Read Aloud", or "Translation Review" control
renders anywhere in this programme, and the translation service (including
any Google Translation call) is never invoked. English Read Aloud
(`renderSpeakerControl`/`wireSpeakerControl`, unrelated to the Tamil flag)
remains fully available on every Centralized PPC screen, including the
practical-task screen. The Centralized PPC navigation descriptor
(`ui.navItems`) does not include a Translation Review item at all. PH's
Tamil functionality is unchanged and remains available within PH Team; every
other programme remains unaffected.

---

## 9. Storage key

Centralized PPC progress is stored under
**`tosp.centralized-ppc-team.prototype.v1`** (storageVersion 1), completely
separate from PH (`tosp.prototype.v2`), Amazon
(`tosp.amazon-team.prototype.v1`), eBay (`tosp.ebay-team.prototype.v1`),
Digital Marketing (`tosp.digital-marketing-team.prototype.v1`), Purchasing
(`tosp.purchasing-team.prototype.v1`), the theme (`tosp.ui.theme.v1`), and
the programme selector (`tosp.active-programme.v1`). Resetting Centralized
PPC progress removes only the Centralized PPC key (`storage.js`'s
`resetProgress()` only ever touches `STORAGE_KEY`, which resolves to the
active programme's own key).

---

## 10. Programme isolation summary

| Concern | PH | Amazon | eBay | Digital Marketing | Purchasing | Centralized PPC |
|---|---|---|---|---|---|---|
| Storage key | `tosp.prototype.v2` | `tosp.amazon-team.prototype.v1` | `tosp.ebay-team.prototype.v1` | `tosp.digital-marketing-team.prototype.v1` | `tosp.purchasing-team.prototype.v1` | `tosp.centralized-ppc-team.prototype.v1` |
| Sign-off | required for its 11 steps | not required | not required | not required | not required | not required |
| Tamil | enabled | disabled | disabled | disabled | disabled | disabled |
| Content file(s) | `ph-team-content.js` | `amazon-team-*.js` | `ebay-team-*.js` | `digital-marketing-team-*.js` | `purchasing-team-*.js` | `centralized-ppc-team-*.js` |
| Nav items | PH-specific | Amazon-specific | eBay-specific | DM-specific (adds Practical Task) | Purchasing-specific (adds Practical Task) | CPPC-specific (adds Practical Task) |
| Final practical task | none | none | none | one, non-gating | one, non-gating | one, non-gating |
| Module ID prefix | ph-specific | `amz-` | `eb-` | `dm-` | `pur-` | `cppc-` |

Each programme's `content`/`config`/`features`/`ui` bundle is self-contained;
switching the active programme (a page reload) is the only integration
point, and it never reads or writes another programme's storage key. No
Centralized PPC module, lesson, quiz, or question ID collides with any
existing programme's IDs (all use the `cppc-` prefix, distinct from
`ph-`/`amz-`/`eb-`/`dm-`/`pur-`).

---

## 11. Source-authority model applied

See `centralized-ppc-team-source-map.md` §1 and §5 for the full authority
model (nine mandatory conflict exclusions; confidentiality restrictions;
worked examples never taught as universal policy; no outside PPC knowledge
introduced) and priority order (explicit final/approved designation → newest
confirmed version → effective date → named owner → completeness → explicit
supersession statement). Applied throughout module authoring: every disputed
item was excluded rather than resolved by preference, and every duplicate/
version group was recorded rather than one version being silently selected
where no clear canonical source existed.

---

## 12. Known limits

- Switching programmes reloads the page — unchanged behaviour, inherited
  from the existing boundary.
- The practical task's checked-item state is transient (in-memory only) and
  resets on a full page refresh — intentional, since it is explicitly
  non-gating and PROTOTYPE_ONLY, identical to every other programme's
  practical task on this platform.
- No pass-percentage, attempt-limit, or sign-off rule is stated in the
  Centralized PPC sources; the shared platform default (80% / 3 attempts /
  no sign-off) is reused per the confirmed prototype default, not derived
  from these source documents.
- Nine `SOURCE_CONFLICT` items plus a confidentiality register are
  deliberately excluded from this programme — see
  `centralized-ppc-team-exclusions.md` for the full register and future
  resolution paths.
- The relationship (if any) between the Amazon TACOS escalation flow's
  "PH Dashboard" and the pre-existing PH Team onboarding programme is never
  confirmed by any source; this programme does not assume one (Module 6).
- The DE, FR & IT Amazon rule material is treated throughout as a draft,
  not a finished multi-market policy, given the dual-authorship and
  localisation evidence found during discovery (Module 7).
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step
  was supplied as part of this task.
