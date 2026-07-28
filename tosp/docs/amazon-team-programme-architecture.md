# Amazon Team — Programme Architecture

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced). This document describes how the Amazon Team programme was added to
the existing TOSP application **without duplicating the shared engine**.

---

## 1. Purpose

Add an Amazon Team onboarding programme that reuses the entire existing TOSP
engine (UI, themes, responsive layout, accessibility, English text-to-speech,
module journey, lesson/quiz workflow, scoring engine, progress engine,
localStorage safety, toasts/dialogs, source-reference UI, completion screen)
while carrying **none** of the PH/Sales curriculum, sign-off, Tamil, or
readiness content.

---

## 2. The programme boundary (how one engine serves two programmes)

Before this change the app hardcoded a single programme: every view/service
imported PH content from `data.js` and config from `config.js`. A **programme
registry** was introduced so those two modules now resolve to whichever
programme is *active*:

```
programmes/
  registry.js            active-programme selection (own localStorage key) + list
  ph-team-content.js     the PH content, byte-for-byte unchanged (was data.js)
  ph-team-programme.js   PH descriptor (config, features, UI) wrapping the content
  amazon-team-modules.js       Amazon MODULES + LESSONS
  amazon-team-question-bank.js Amazon QUIZZES + QUESTIONS
  amazon-team-programme.js     Amazon descriptor (content + config + features + UI)

data.js    → re-exports getActiveContent()  (MODULES/LESSONS/QUIZZES/QUESTIONS/…)
config.js  → CONFIG/FEATURES/STORAGE_KEY resolve from the active descriptor
```

- The **shared engine is untouched in spirit**: `rules/`, `services/`,
  `storage.js`, `state.js`, `router.js`, `components/`, and the generic
  lesson/quiz views operate on "the active programme's data" exactly as before —
  they still import from `data.js`/`config.js` and do not know which programme
  is loaded. There is **no second copy of the engine**.
- **Programme-flavoured views** (`header`, `dashboard`, `programme`, `sources`,
  `module`) now read a per-programme **UI descriptor** (`descriptor.ui`) instead
  of hardcoding PH labels/tiers/readiness — so PH renders exactly as before and
  Amazon renders its own navigation, tracks, and source text.
- **Switching programmes** is a page reload (`registry.setActiveProgramme`),
  after which `data.js`/`config.js` re-resolve to the selected programme. A
  programme switcher lives in the header sidebar.

Selection is stored in its own key `tosp.active-programme.v1`, separate from
every programme's progress key and the theme key.

---

## 3. Module sequence & why each module exists

Sixteen modules across three source tracks (see `amazon-team-source-map.md` for
the exact source mapping). All modules are **required** for completion and none
require sign-off.

| # | Module | Why it exists | Canonical source |
|---|--------|---------------|------------------|
| 1 | Account Health & Compliance | The compliance floor every listing must respect | Account Health Guide 2026 |
| 2 | Listing SEO & Content | How listings are written to rank/convert | Listing SEO Guideline |
| 3 | Keyword Research | Finding & scoring the keywords listings target | Keyword Research Guide 2026 |
| 4 | Competitor Analysis | Benchmarking and finding gaps | Competitor Analysis Guidelines |
| 5 | Pricing Strategy & Buy Box | Break-even, fees, Buy Box, launch pricing | Dynamic Pricing Guide (2025) |
| 6 | FBA Product Selection & Rules | Which products may go to FBA, and how | FBA Guidelines 2026 |
| 7 | FBA Unfulfillable Inventory Settings | Stop used-return storage cost | Unfulfillable Settings Guide |
| 8 | SIPP — Ships in Product Packaging | Optional fee-saving programme | SIPP Webinar Summary |
| 9 | Vendor Central Introduction | 1P vs 3P, the three models, PO basics | Vendor Intro + Platforms 2026 |
| 10 | Vendor Product Selection & Migration | What migrates to Vendor and what must not | Migration Guide 2026 |
| 11 | Vendor Listing Creation | Mandatory image rules + new-ASIN flow | Vendor Listings Guide 2026 |
| 12 | Vendor PO Fulfilment & Label Booking | Confirm/pack/ASN/label/POD execution | Label Booking Guide 2026 |
| 13 | Vendor Invoicing | Invoice prerequisites, VAT, payment terms | Invoice Guide 2026 |
| 14 | Receive Variance & Shortage Disputes | Daily variance check + dispute escalation | RVD Guide + Shortage Handbook 2026 |
| 15 | Vendor Chargebacks | The 21 metrics and how to prevent/handle | Chargeback Guideline 2026 |
| 16 | Vendor Product Returns Management | Return triage, Priority ASINs, disputes | Returns Management Guide 2026 |

Grouped for the dashboard/journey as three **tracks**: FBM Foundations (1–5),
FBA Operations (6–8), Vendor Central (9–16).

---

## 4. Quiz configuration reuse

The Amazon programme **reuses the exact existing TOSP quiz configuration** — no
new scoring logic and no new thresholds:

- `passingScorePct: 80`, `maxAttempts: 3` (identical to PH).
- `requireAllLessonsBeforeQuiz: true`.
- Scoring, attempt handling, pass/fail, progress calculation, and next-module
  unlocking all run through the **unchanged** `rules/scoring.js`,
  `rules/progression.js`, `rules/module-access.js`, `services/quiz-service.js`,
  and `services/progress-service.js`.
- A failed Skill Check never unlocks the next module; a passed one unlocks the
  next module immediately (Amazon modules require no sign-off).

---

## 5. No-sign-off rule

Amazon Team requires **no** team-leader sign-off. Every Amazon module sets
`requiresSignoff: false`, and the programme descriptor sets
`features.requiresReviewerSignoff: false`. The shared engine's sign-off
capability is **not removed** (PH still uses it); it is simply never triggered
for Amazon, so no sign-off panel, button, awaiting-signoff state, storage
record, or inter-module sign-off gate appears in the Amazon programme.

---

## 6. Completion rule

The Amazon programme is complete when **every required lesson is completed and
every required module Skill Check is passed** for **all 16 required modules**
(no reviewer sign-off). This is exactly the shared engine's
`isProgrammeComplete` over the active programme's modules. The completion screen
identifies the Amazon Team, the completed module count, the programme version,
the completion date, and a `PROTOTYPE_ONLY` status, and explicitly states it is
not an official certificate.

---

## 7. Storage key

Amazon progress is stored under **`tosp.amazon-team.prototype.v1`**
(storageVersion 1), completely separate from PH (`tosp.prototype.v2`), the theme
(`tosp.ui.theme.v1`), and the programme selector (`tosp.active-programme.v1`).
Resetting Amazon progress removes only the Amazon key. PH progress, theme, and
any Tamil cache are never touched.

---

## 8. No-Tamil rule

`features.enableTamilTranslation: false` for Amazon. The single
`renderTranslationControl` choke point returns nothing when the flag is off, so
**no** "Translate to Tamil", "Show English", or "Read Tamil" control renders
anywhere in the Amazon programme, the translation service is never called (no
Google Translation request), and the Tamil "Translation Review" screen is
removed from Amazon navigation and redirected away if reached directly. PH Tamil
functionality is unchanged and remains available within PH Team.

---

## 9. Known limits

- Switching programmes reloads the page (deliberate: the static ES-module engine
  reads the active programme once per load).
- Two source PDFs were not machine-readable; see the source map.
- Two SEO source conflicts (backend byte limit, description length) are recorded
  as `SOURCE_CONFLICT` and intentionally omitted from content until reconciled.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance rule was
  supplied.
