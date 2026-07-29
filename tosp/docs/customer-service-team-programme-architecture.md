# Customer Service Team — Programme Architecture

Internal documentation. Not learner-facing. Records how the Customer Service
Team onboarding programme is structured and how it plugs into the existing,
unmodified TOSP engine.

## Structure

- **Programme ID:** `prog-customer-service-onboarding`
- **Code:** `TOSP-CS-01`
- **8 modules**, each with exactly **4 lessons** (32 lessons total) and
  exactly **1 Skill Check** (8 quizzes total), each Skill Check with exactly
  **6 questions** (48 questions total).
- Module structure and order:
  1. Customer Service Foundation and Governance (`cs-m1`)
  2. Communication and Message Handling (`cs-m2`)
  3. Delivery and Courier Management (`cs-m3`)
  4. Customer Returns, Refunds and Warranty (`cs-m4`)
  5. Product Issues and Technical Support (`cs-m5`)
  6. Marketplace Protection and Risk (`cs-m6`)
  7. Evidence, Audit and Internal Operations (`cs-m7`)
  8. Canonical References and Golden Principles (`cs-m8`)
- Modules unlock strictly in sequence via `prerequisiteModuleIds` /
  `unlockedModuleIds`, exactly like every other TOSP programme — this is the
  shared, unmodified `rules/module-access.js` logic, not a Customer-Service-
  specific gate.
- **ID scheme:** `cs-m1` … `cs-m8` (modules), `cs-m1-l1` … `cs-m8-l4`
  (lessons), `cs-m1-quiz` … `cs-m8-quiz` (quizzes), `cs-m1-q1` … `cs-m8-q6`
  (questions). No collision with any existing programme's prefixes (`ph-`,
  `az-`, `eb-`, `dm-`, `pur-`, `cppc-`).

## Source-authoring method

Every module, lesson, question, supported template, and practical-task item
carries an exact source citation to the Ledsone Customer Support Handbook
(chapter and, where applicable, rule ID or template ID). Content is
original, learner-friendly prose that explains the source's rules — no
complete source table or long source paragraph is copied verbatim into any
lesson; only the eight complete, source-verbatim message templates (Module 8
Lesson 3) and short rule/phrase quotations that the source itself requires be
preserved exactly (e.g. the nine pre-send checklist items, the explicitly
prohibited phrases, the ten Golden Principles) are reproduced closely to
their source wording, because the source itself states these must be applied
exactly.

Every lesson's `content` field weaves together, in flowing prose: a
learner-friendly explanation, why the process matters, required checks,
required evidence, the permitted action, the approval boundary, the
prohibited action, the escalation condition, and — where relevant — a known
limitation. The exact source citation is carried separately in each lesson's
own `source` field, exactly like every other TOSP programme, so citations
remain consistent and are never duplicated inline within the lesson prose
itself.

## Quiz rules (reused, not reinvented)

- Passing score: **80%** (`CONFIG.passingScorePct`, from the active
  programme's `config.passingScorePct`).
- Maximum attempts: **3** (`CONFIG.maxAttempts`).
- One Skill Check per module; all required lessons must be completed before
  a module's Skill Check unlocks (`CONFIG.requireAllLessonsBeforeQuiz: true`).
- The shared quiz engine (`services/quiz-service.js`, `rules/scoring.js`,
  `views/quiz-view.js`) is **reused completely unmodified** — no new scoring
  logic, no new quiz-state logic, and no schema field was added beyond what
  every other programme's question bank already uses. The correct answer is
  never shown before submission (radio-button form, no pre-marking); after
  submission, the existing review screen shows the correct answer and its
  source citation for any incorrect question, giving constructive feedback
  through the same mechanism every other programme already uses.
- A failed Skill Check keeps the next module locked; a passed Skill Check
  unlocks it — this is the shared `rules/module-access.js` logic
  (`isModuleFullyComplete` / `determineNextModule`), unmodified.

## Sign-off — off

`requiresSignoff: false` on every one of the 8 modules, and
`requiresReviewerSignoff: false` at the programme level. Because the shared
module/quiz views (`module-view.js`, `quiz-view.js`) branch their sign-off UI
entirely on `module.requiresSignoff`, no "awaiting sign-off," "learner
sign-off," "reviewer approval," "manager sign-off," or "sign-off queue" UI
ever renders for this programme — this is a natural consequence of the flag,
not a special case added to the shared views. PH's own sign-off
functionality (`requiresSignoff: true` on its own modules) is untouched.

## English-only — Tamil off

`enableTamilTranslation: false`. Because `components/translation-control.js`
returns an empty string whenever the active programme's
`FEATURES.enableTamilTranslation` is false, no "Translate to Tamil," "Show
English," "Tamil Read Aloud," or "Translation Review" control is ever
rendered anywhere in this programme, and `services/translation-service.js`
(which only performs synchronous, static local lookups — no network request,
no Google Translate call, ever, for any programme) is never invoked for
Customer Service content. English Read Aloud (`components/speaker-control.js`
/ `services/speech-service.js`) is unaffected by the Tamil flag and remains
available throughout, exactly like Amazon, eBay, Digital Marketing,
Purchasing, and Centralized PPC. PH's own Tamil functionality is untouched.

## Practical task design

- **ID:** `customer-service-final-case-practical-v1`.
- **Status:** `PROTOTYPE_ONLY` throughout, including on its own screen and in
  its closing note.
- Reuses the exact generic practical-task mechanism already built for
  Digital Marketing, Purchasing, and Centralized PPC
  (`views/practical-task-view.js`, `ui.practicalTask` descriptor,
  `programmeFeatureSummary()`'s `practicalTask` flag) — **no new UI code was
  written**; only the content (`PRACTICAL_TASK` object in
  `customer-service-team-programme.js`) is Customer-Service-specific.
- One fictional, end-to-end customer case (a fictional customer, order
  number, tracking number, product, message, and order value) walked through
  12 checklist items across 8 sections: classify the message and determine
  priority; perform required verification; identify evidence and apply the
  safety gate; select the resolution path and approval level; prepare a
  source-supported response (using the one complete Safety Issue template);
  record case status, audit evidence, and escalation; complete the pre-send
  checklist; record known limitations and state the next action.
- Checklist items are plain checkboxes with **no numeric score of any kind**
  — the existing practical-task view only ever shows "N of M items marked as
  considered," never a percentage or pass/fail result, for any programme.
- **Non-gating by construction:** the checked/unchecked state lives in an
  in-memory `Set` local to `practical-task-view.js`, is never written to
  `storage.js`, and is never read by `rules/module-access.js`'s
  `isProgrammeComplete`. It resets on a full page refresh, by the same
  design already used for Digital Marketing/Purchasing/Centralized PPC.
- No live connection of any kind: no marketplace, email, live chat,
  database, ticketing system, WhatsApp, courier, or refund system is
  referenced or called anywhere in the practical task's content or in the
  shared view that renders it.

## Completion rule

Reuses `rules/module-access.js`'s `isProgrammeComplete` unmodified:
programme completion = every module's Skill Check passed (and, since no
Customer Service module sets `requiresSignoff: true`, no sign-off gate ever
applies). Because `CONFIG.requireAllLessonsBeforeQuiz` is `true`, a module's
Skill Check cannot even be attempted until all 4 of that module's lessons are
marked complete — so "all 32 lessons complete + all 8 Skill Checks passed"
is enforced transitively by the existing engine, not by any new check. The
practical task is never read by this logic, so it can never block
completion. `views/completion-view.js`'s existing `CERTIFICATION_DISCLAIMER`
(unmodified, shared across every programme) already states the completion
summary "is not an official employment, onboarding, certification,
competency, ... approval of any kind" and "does not represent management
authorisation" — this generic, catch-all disclaimer, combined with this
programme's own PROTOTYPE_ONLY description and source blurb (which explicitly
name "sending a live customer message, processing a live refund or return,
taking a live account action, or granting any policy exception"), together
satisfy the "no certification / no marketplace authorisation / no financial
approval authority / no customer-contact authorisation / no policy-owner
status" requirement without any shared file needing a Customer-Service-
specific edit.

## Storage key

`tosp.customer-service-team.prototype.v1` — unique among all seven
programmes (`tosp.prototype.v2` for PH; `tosp.amazon-team.prototype.v1`;
`tosp.ebay-team.prototype.v1`; `tosp.digital-marketing-team.prototype.v1`;
`tosp.purchasing-team.prototype.v1`;
`tosp.centralized-ppc-team.prototype.v1`), and distinct from
`tosp.active-programme.v1` (the registry's own programme-selector key) and
`tosp.ui.theme.v1` (the theme key). `storage.js`'s `resetAllProgress()` only
ever removes the *active* programme's own `STORAGE_KEY` — reset isolation is
a property of the existing, unmodified storage service, not something added
for this programme.

## Shared-UI integration

No new UI system was created. The programme integrates entirely through the
existing, unmodified shared views and components by supplying data through
its own descriptor:

- `views/programme-select-view.js` + `components/feature-chips.js` — the
  programme-selection card, purpose text, module count, and feature chips
  (practical task shown; Tamil and sign-off chips correctly absent) all
  render from `customerServiceTeamProgramme`'s own fields with zero
  programme-specific branching in either file.
- `views/dashboard-view.js` — programme identity, progress, next action,
  module overview, the practical-task card, and the source-reference summary
  all come from the same generic mechanism every other programme uses.
- `views/module-view.js`, `views/lesson-view.js`, `views/quiz-view.js`,
  `views/sources-view.js`, `views/completion-view.js`,
  `views/practical-task-view.js` — all unmodified, all driven by
  `customer-service-team-modules.js` / `customer-service-team-question-
  bank.js` / `customer-service-team-programme.js` content through
  `data.js` → `programmes/registry.js`'s `getActiveContent()`.
- Light/dark mode, responsive layout, and accessibility components
  (`components/theme-toggle.js`, the shared CSS, `components/speaker-
  control.js`, `components/translation-control.js`) are all reused
  unmodified.

## Programme isolation

Customer Service reuses only the generic TOSP architecture (module/lesson/
quiz schema, storage-key pattern, practical-task mechanism, feature-flag
gating). It does not reuse, reference, or duplicate any PH, Amazon, eBay,
Digital Marketing, Purchasing, or Centralized PPC lesson content, question,
ID, storage key, sign-off configuration, Tamil configuration, practical-task
data, or business rule. `registry.js` was the only existing file modified,
and only to add two lines (one import, one array entry) — no other existing
programme's file was touched.

## PROTOTYPE_ONLY boundary

Stated at every learner-facing surface that could otherwise be mistaken for
a live-action tool: the programme description (dashboard welcome panel), the
dashboard source blurb, the Programme Sources page intro, the practical
task's own status badge and closing note, and the shared completion
disclaimer. No module, lesson, question, or practical-task item authorises,
simulates as authorising, or implies authorisation to send a real customer
message, process a real refund or return, issue a real return label, change
a real order, close a real marketplace case, or make a legal/regulatory
determination.
