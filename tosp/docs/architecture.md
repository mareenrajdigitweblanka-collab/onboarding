# TOSP Prototype Architecture

Status: PROTOTYPE_ONLY (system evidence) · programme content: FINAL_TRUTH (sourced)

## Layers

```
views/  ───calls───▶  services/  ───calls───▶  rules/  (pure functions)
  │                        │
  │                        └──calls───▶ storage.js  (localStorage only)
  └──renders with──▶ components/
```

- **`data.js`** — sourced programme content, status `FINAL_TRUTH`: the
  programme, its 18 modules (7 company-wide BGCT days + 11 PH/Sales Learning
  Path steps), their lessons, quizzes, and questions. Every Module, Lesson,
  and Question carries a `source` field citing the exact document/section it
  comes from (see `SOURCE_DOCUMENTS`). Also exports `PROGRESSION_RULES`,
  `EVALUATION_SCORE_BANDS`, and `PROBATION_SCORE_GATES` — sourced thresholds
  not tied to one specific lesson/question, shown on the Dashboard for
  traceability. Nothing here is invented; if a value isn't stated in either
  source document, it lives in `config.js` as `CONFIGURATION_REQUIRED`
  instead (see below).
- **`config.js`** — the handful of tunable values genuinely *not* stated in
  either source document (`passingScorePct`, `maxAttempts`,
  `requireAllLessonsBeforeQuiz`, `allowResetDemoProgress`, `storageVersion`,
  `totalModules` as a UI label), all marked `CONFIGURATION_REQUIRED`. Views
  and components read from here rather than hardcoding numbers.
- **`rules/`** — pure, synchronous, side-effect-free business logic:
  - `module-access.js` — `canAccessModule`, `areRequiredLessonsComplete`,
    `isModuleFullyComplete` (quiz passed, and signed off if
    `module.requiresSignoff`), `determineNextModule`, `isProgrammeComplete`.
  - `scoring.js` — `calculateQuizScore`, `determineQuizPass`.
  - `progression.js` — `calculateModuleProgress` (lessons + quiz + sign-off
    as equally-weighted units), `calculateOverallProgress`.

  These files never touch `window`, `document`, or `localStorage`. They can be
  unit tested by calling them with plain objects.
- **`services/`** — the coordination layer the UI actually talks to:
  - `progress-service.js` — reads/writes learner progress via `storage.js`,
    exposes derived views of it (`getModuleStatus`, `getOverallProgress`,
    `canOpenModule`, `lessonsReadyForQuiz`, `getCurrentModule`,
    `programmeIsComplete`), and owns the simulated sign-off workflow
    (`moduleRequiresSignoff`, `canConfirmSignoff`, `confirmSignoff`,
    `isSignedOff`) plus the shared `tryUnlockNextModule` helper used by both
    a quiz pass and a sign-off confirmation.
  - `quiz-service.js` — the single place a Skill Check attempt is scored and
    recorded. It calls `rules/scoring.js` for the authoritative score — the
    quiz view never computes a score itself — and calls
    `progress-service.tryUnlockNextModule` on a pass, which only actually
    unlocks the next module once the module is *fully* complete (immediately,
    for modules that don't require sign-off; otherwise once sign-off is
    separately confirmed).
- **`storage.js`** — the only module permitted to call
  `window.localStorage`. It owns safe parsing (missing key, corrupted JSON,
  wrong storage version all fall back to a fresh initial progress object
  instead of throwing).
- **`state.js`** — transient, in-memory-only UI state that must *not* survive
  a refresh: in-progress (unsubmitted) quiz answer drafts, a submit lock used
  to prevent duplicate submissions, and the most recent quiz result (shown
  once, immediately after a full chrome refresh, so the header's overall
  progress updates alongside the result). This is deliberately separate from
  `storage.js`, which only ever holds committed, persisted progress.
- **`router.js`** — a minimal hash router (`#/dashboard`, `#/programme`,
  `#/module/:moduleId`, `#/lesson/:moduleId/:lessonId`, `#/quiz/:moduleId`,
  `#/completion`). No history API, no framework.
- **`views/`** — one render function per screen. Each view reads data via
  `services/`, never computes scores/unlocks/sign-off state itself, and
  renders via `components/`. `module-view.js` additionally renders the
  simulated Team Leader Sign-off panel for modules where
  `module.requiresSignoff` is true.
- **`components/`** — small, stateless render helpers (`header`,
  `module-card`, `progress-bar`, `status-badge`) reused across views.
  `status-badge.js` supports an `awaiting-signoff` status alongside
  `locked`/`available`/`in-progress`/`passed`.
- **`app.js`** — entry point. Registers routes, mounts the header/view pair on
  every navigation, and delegates all `[data-nav]` clicks to the router.

## Data model

- **Programme** — `id, code, title, description, version, status`
- **Module** — `id, programmeId, orderIndex, title, summary, estimatedMinutes, realWorldPace, status, requiresSignoff, source`
- **Lesson** — `id, moduleId, orderIndex, title, content, estimatedMinutes, required, status, source`
- **Quiz** — `id, moduleId, title, passingScorePct, maxAttempts`
- **Question** — `id, quizId, prompt, options, correctOptionId, points, status, source`
- **LearnerProgress** (persisted) —
  `programmeId, completedLessonIds, quizAttempts, passedQuizIds, signedOffModuleIds, unlockedModuleIds, currentModuleId, completedAt`

`source` fields cite the exact document/section a Module/Lesson/Question is
derived from (e.g. `"PH/Sales BGCT Handbook v1.0 — Section 5.1"`). `status`
on content objects is `FINAL_TRUTH` (sourced) throughout — content-level
values are never marked `DEMO_DATA`/`CONFIGURATION_REQUIRED`/`VERIFY`.

Progress **percentages are always derived** from `completedLessonIds`,
`passedQuizIds`, and `signedOffModuleIds` at read time
(`rules/progression.js`) — they are never stored as a raw percentage, so they
can never drift out of sync with the underlying facts.

## Module unlock flow

1. Module 1's id is seeded into `unlockedModuleIds` on first load.
2. A module is only accessible (`canAccessModule`) if its id is present in
   `unlockedModuleIds`.
3. A module is *fully complete* (`isModuleFullyComplete`) once its quiz is
   passed and — for modules 8–18, where `module.requiresSignoff` is true —
   the simulated sign-off has also been confirmed.
4. `progress-service.tryUnlockNextModule` runs after both a quiz pass
   (`quiz-service.submitQuizAttempt`) and a sign-off confirmation
   (`progress-service.confirmSignoff`); it adds the next module's id to
   `unlockedModuleIds` only once the current module is fully complete. For
   Modules 1–7 (no sign-off required) this means the quiz pass unlocks the
   next module immediately, exactly as before. For Modules 8–18, passing the
   quiz alone leaves the module in an `awaiting-signoff` status; the next
   module unlocks only once sign-off is separately confirmed.
5. Failing a Skill Check never touches `unlockedModuleIds` — the next module
   stays locked.
6. `isProgrammeComplete` is true once every module is fully complete; the
   router then allows `#/completion`.
