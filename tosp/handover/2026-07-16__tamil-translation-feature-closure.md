# Handover — English → Tamil Translation Feature

Date: 2026-07-16 (implemented/validated 2026-07-17)
Scope: `tosp/` only.

## Requirement

Add an English → Tamil translation feature to the existing TOSP prototype
for: (1) lesson paragraphs, (2) quiz questions, (3) quiz answer options,
plus (4) Tamil text-to-speech — without rebuilding the app, and without
changing the existing 18 modules, lessons, quizzes, question/answer-option
IDs, scoring, progression, sign-off, source citations, light/dark theme,
accessibility, speech controls, `localStorage` progress, or responsive
behaviour.

## Confirmed user decisions (as given)

1. English → Tamil only.
2. Scope: lesson paragraphs, quiz questions, quiz answer options.
3. Approved manual Tamil first; automatic translation only as fallback.
4. Automatic translation may use the internet (but no provider was
   pre-approved — see Provider status below).
5. A Translate button beside each translatable paragraph/content block.
6. Tamil TTS via the existing browser speech architecture.
7. The user is the final approver of Tamil content.
8. Language preference persists at `tosp.ui.language.v1`.
9. Tamil quiz content reuses the same question/option/quiz IDs, scoring,
   attempts, and progression rules.
10. Final business acceptance rule: **not supplied** — not invented here.

## Files created

- `tosp/js/translations/translation-status.js` — the 4 statuses + display-label helper.
- `tosp/js/translations/tamil-approved.js` — canonical approved-Tamil registry (ships empty).
- `tosp/js/translations/tamil-runtime-cache.js` — `tosp.translation.cache.ta.v1` read/write boundary.
- `tosp/js/translations/prototype-approvals.js` — `tosp.translation.prototypeApprovals.v1` read/write boundary.
- `tosp/js/services/translation-provider.js` — provider adapter interface + not-configured stub (no real provider, no network call, no API key).
- `tosp/js/services/translation-service.js` — central translation API (content IDs, resolution order, language preference).
- `tosp/js/components/translate-control.js` — reusable "Translate to Tamil / Show English / Read Tamil / status" control.
- `tosp/js/components/language-toggle.js` — header language-preference toggle.
- `tosp/js/views/translation-review-view.js` — `PROTOTYPE_APPROVAL_ONLY` review panel at `#/translation-review`.
- `tosp/docs/tamil-translation-architecture.md`
- `tosp/docs/tamil-translation-review-workflow.md`
- `tosp/validation/tamil-translation-check.md`
- `tosp/handover/2026-07-16__tamil-translation-feature-closure.md` (this file)

## Files modified

- `tosp/js/services/speech-service.js` — added `getTamilVoice()` / `speakTamil()`; extended `speakText()` with optional `lang`/`voice` options. English speech paths (`speakText`, `pauseSpeech`, `resumeSpeech`, `stopSpeech`) unchanged in behaviour.
- `tosp/js/views/lesson-view.js` — added a translate control beside the lesson paragraph; gated the existing English "Read Aloud" control while Tamil is displayed.
- `tosp/js/views/quiz-view.js` — added a translate control per question (prompt + all options as one block); gated the existing English "Read Aloud" control while any question shows Tamil. Radio `name`/`value` attributes, scoring, and submission flow untouched.
- `tosp/js/components/header.js` — added the language toggle (mobile + desktop) and a "Translation Review" nav item.
- `tosp/js/app.js` — registered the `/translation-review` route; added `clearTranslationPreferenceListeners()` to the existing per-navigation cleanup alongside `clearSpeechListeners()`/`clearThemeListeners()`.
- `tosp/css/styles.css` — added `.translate-control*`, `.language-toggle*`, `.translation-review-*`, `.btn--small`, a system-only Tamil font stack (`[lang="ta"]`), responsive rules for the above. Also fixed a pre-existing gap this feature exposed: `.btn[hidden]` wasn't actually hidden because `.btn { display: inline-flex }` (an author rule) overrode the browser's default `[hidden]` styling — added `.btn[hidden] { display: none; }`.

`js/data.js`, `js/storage.js`, `js/state.js`, `js/rules/*.js`,
`js/services/quiz-service.js`, `js/services/progress-service.js`, and
`js/services/theme-service.js` were **not modified**.

## Translation architecture

English (`data.js`, unchanged, `FINAL_TRUTH`) → stable content ID
(`lesson.paragraph.<lessonId>`, `quiz.question.<questionId>`,
`quiz.option.<questionId>.<optionId>`, built only in
`translation-service.js`) → resolution order **approved →
cached-automatic → fresh-automatic-request → English fallback**, exposed to
views only through `translation-service.js`. Full detail in
[docs/tamil-translation-architecture.md](../docs/tamil-translation-architecture.md).

## Provider status

**I: Provider configured: NO.**
**J: Provider name: none — no provider has been approved.**

Per the task's explicit scope boundary ("Do not choose an automatic
translation provider without user approval" / "Do not implement a real
provider unless an existing approved provider configuration is already
present"), `translation-provider.js` ships with a `NullTranslationProvider`
that always reports not-configured and never makes a network call. Every
"Translate to Tamil" action currently resolves to a clear "Automatic
translation is not configured" message unless an approved translation
already exists.

## Approved / automatic / review-required counts

- **F: Approved translation count: 0** — `tamil-approved.js` ships empty. No
  Tamil text was fabricated and attributed to the user as "approved"; the
  user has not reviewed any Tamil text yet.
- **G: Automatic translation count: 0** — no provider is configured, so
  none has been generated. `tosp.translation.cache.ta.v1` was empty
  throughout validation.
- **H: Review-required count: 0** — follows from G (nothing has been
  auto-translated yet to require review).

This is the honest, intended state for this prototype delivery: the
architecture, UI, and workflow are fully built and exercised, but no Tamil
content exists yet because that requires either (a) the user approving a
specific automatic-translation provider, or (b) the user (as final
approver) supplying/approving actual Tamil text to add to
`tamil-approved.js`.

## Speech result

`speech-service.js` extended (not replaced): `getTamilVoice()` prefers
`ta-LK`, then `ta-IN`, then any `ta*` voice, returns `null` (no throw) if
none installed; `speakTamil()` reuses the existing `speakText()`/
`stopSpeech()` machinery. `translate-control.js`'s "Read Tamil" button only
ever speaks the resolved Tamil text for its own block and has no access to
English text or quiz correctness. English "Read Aloud" controls are
gated to a no-op + toast while their block shows Tamil, so hidden English
is never read. Verified live: English Read Aloud controls render and wire
identically to before; no Tamil voice was available in the headless test
environment to exercise `speakTamil()` end-to-end, so that path is verified
by code inspection (see validation doc, check 18/21).

## Validation result

29 of 30 implementation checks verified (live smoke test + code
inspection); 1 partial (mobile viewport not captured, though the same
responsive CSS conventions as the rest of the app were used). One real
defect was found and fixed during validation (a `.btn[hidden]` CSS
specificity bug that made "Show English"/"Read Tamil" render even when
hidden) — re-verified after the fix. Full detail:
[validation/tamil-translation-check.md](../validation/tamil-translation-check.md).

## Known limits

- No automatic translation provider configured (by design, pending user approval).
- No approved Tamil content yet (pending user review/approval).
- Tamil voice availability is entirely OS/browser-dependent; untested against a real Tamil TTS voice.
- The Translation Review panel's approval is `PROTOTYPE_APPROVAL_ONLY` and does not write to `tamil-approved.js`.
- Mobile viewport not captured in this validation pass.

## Production blockers

- **PRODUCTION_BLOCKER**: any automatic-translation provider that requires
  a private API key cannot be called directly from this frontend-only
  app without exposing the key to every visitor. A server-side proxy
  holding the key is required before wiring up a real provider — see
  "API-key security" in the architecture doc.
- **PRODUCTION_BLOCKER** (inherited, unchanged): as already documented
  elsewhere in this prototype, all learner progress/scoring/sign-off is
  client-side and browser-only, not official evidence. This feature does
  not change that status.

## Final user acceptance status

**PENDING.** The user has not yet supplied the final business acceptance
rule for this feature (requirement 10). This closure covers implementation
only.

## Next action

1. User: decide/approve a specific automatic-translation provider (or
   decide not to use one) — see "Provider status" above.
2. User: review and approve real Tamil text for priority content (starting
   wherever makes sense — e.g. Module 1's lessons/quiz) and have a
   maintainer commit those records into `translations/tamil-approved.js`
   per [docs/tamil-translation-review-workflow.md](../docs/tamil-translation-review-workflow.md).
3. User: supply the final business acceptance rule so
   `validation/tamil-translation-check.md` can be extended with an actual
   pass/fail verdict instead of implementation-checks-only.
4. If provider is approved: implement the server-side proxy called out as
   a PRODUCTION_BLOCKER before enabling automatic translation for real
   learners.

## Output report (per task instructions)

- **A. Starting repository state**: `tosp/` prototype at the commit
  "Enhance lesson and module views with speaker controls and improved
  navigation" (18 modules, English-only, no translation feature).
- **B. Files inspected**: `data.js`, `storage.js`, `state.js`, `config.js`,
  `app.js`, `router.js`, all `views/*.js`, all `components/*.js`, all
  `services/*.js`, all `rules/*.js`, `index.html`, `css/styles.css`.
- **C. Translation architecture implemented**: see above / architecture doc.
- **D. Files created**: see "Files created" above (12 files).
- **E. Files modified**: see "Files modified" above (6 files).
- **F. Approved translation count**: 0.
- **G. Automatic translation count**: 0.
- **H. Review-required count**: 0.
- **I. Provider configured**: NO.
- **J. Provider name**: none.
- **K. Storage keys used**: `tosp.ui.language.v1` (new), `tosp.translation.cache.ta.v1` (new), `tosp.translation.prototypeApprovals.v1` (new). `tosp.prototype.v2` and `tosp.ui.theme.v1` untouched.
- **L. Lesson translation result**: working — translate control renders beside each lesson paragraph, resolves to a clear not-configured message (no approved/cached Tamil exists yet), English stays available, verified live.
- **M. Quiz translation result**: working — translate control renders per question (prompt + options as one block), same not-configured resolution, radio `name`/`value` verified unchanged before/after a translate attempt.
- **N. Quiz scoring parity result**: verified live in English (100%, 3/3, correct module unlock) via the unmodified scoring/progression code; Tamil-path parity follows by construction (translation never touches scoring-relevant attributes) and by code inspection, not yet exercised live (no Tamil text exists yet to answer against).
- **O. Tamil speech result**: implemented and wired (`getTamilVoice`/`speakTamil`, gated "Read Tamil" control, English-read gating while Tamil shown); not exercised against a real Tamil voice in this environment.
- **P. Accessibility result**: accessible names on all new controls, `aria-live` loading/error messaging, icon+text status badges (not color-only), keyboard-operable buttons, Tamil `lang` attribute set on translated text for correct typography/screen-reader pronunciation, verified in both themes.
- **Q. Existing regression result**: none found. English lesson/quiz flow, quiz scoring, module unlock, progress/theme storage, dark theme all verified live and unchanged. One new-code-only CSS bug was found and fixed during validation (see above) — not a regression of pre-existing behaviour.
- **R. English source changed**: NO.
- **S. Business logic changed**: NO (scoring, progression, sign-off, module access, and all `rules/*.js` are untouched).
- **T. IMPLEMENTATION_CHECKS_PASS**: YES.
- **U. FINAL_USER_ACCEPTANCE**: PENDING.
- **V. TAMIL_TRANSLATION_FEATURE_READY**: YES for the architecture/UI/speech scaffolding as a prototype; **NO** for learner-facing Tamil content (none approved yet) and **NO** for production use of automatic translation (no provider approved, no server-side key proxy built).
