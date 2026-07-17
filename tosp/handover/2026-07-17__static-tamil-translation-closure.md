# Handover — Static Local Tamil Translation

Date: 2026-07-17
Scope: `tosp/` only (root `api/`/`vercel.json`/`package.json`/`.env.example`
from the prior Google iteration were not modified, only referenced/documented).

## Requirement

Replace the runtime Google Cloud Translation / fallback flow with Tamil
translations authored and stored locally during this development task,
covering module introductions/summaries, lesson titles/paragraphs, quiz
instructions/questions/answer options; keep a Translate/Show English
control per content block; remove the global sidebar language button;
keep Tamil speech.

## Files created

- `tosp/js/components/translation-control.js` — rebuilt as a fully
  synchronous control (no loading state, no retry-for-local, no status
  badge) replacing the async Google-era version.
- `tosp/docs/tamil-static-translation-map.md` — the primary reference doc
  for how Tamil works now.
- `tosp/validation/tamil-static-translation-check.md` — the 40-item
  checklist for this iteration.
- `tosp/handover/2026-07-17__static-tamil-translation-closure.md` (this file).

## Files modified

- `tosp/js/translations/tamil-approved.js` — **rewritten from an empty
  array to a fully populated object of 451 records** (all `APPROVED_LOCAL`),
  covering every module title/summary/real-world-pace, the shared sign-off
  explanation, every lesson title/paragraph, every quiz title, the shared
  quiz instructions template, every quiz question, and every answer
  option. Every `englishText` field was extracted programmatically from
  `js/data.js` (never retyped by hand) to guarantee exact matches.
- `tosp/js/translations/translation-status.js` — reduced to 2 states
  (`APPROVED_LOCAL`, `TRANSLATION_UNAVAILABLE`); added the required
  concise bilingual unavailable message.
- `tosp/js/services/translation-service.js` — rewritten as a synchronous,
  local-only resolver (`getStaticTranslation()`/`getTranslationStatus()`);
  added content-ID helpers for module title, real-world pace, sign-off
  explanation, quiz title, and quiz instructions template (new surfaces);
  removed all Google/cache/provider/language-preference code.
- `tosp/js/views/lesson-view.js` — added a lesson-title translate control
  alongside the existing paragraph control.
- `tosp/js/views/module-view.js` — added module-title, real-world-pace,
  and sign-off-explanation translate controls alongside the existing
  summary control.
- `tosp/js/views/quiz-view.js` — added a quiz-title translate control and
  a new **visible** instructions paragraph (mirroring text that
  previously existed only in the spoken `speechText`) with its own
  translate control, template-substituted for the question count.
- `tosp/js/components/header.js` — removed the language toggle
  import/render/wire calls (mobile + desktop).
- `tosp/js/app.js` — removed the now-nonexistent
  `clearTranslationPreferenceListeners` import/call.
- `tosp/js/views/translation-review-view.js` — rewritten to describe
  itself as `NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW` (it will
  normally show zero entries now); retained, not deleted, as a diagnostic
  panel.
- `tosp/js/translations/tamil-runtime-cache.js`, `prototype-approvals.js`
  — comments updated to note dormant status; `tamil-runtime-cache.js` no
  longer imports the now-reduced `TRANSLATION_STATUS` enum (uses a literal
  string instead, since it's an independent dormant-path record shape).
- `tosp/css/styles.css` — removed `.translation-control__badge*` and
  `.language-toggle*` rules (no longer rendered by anything).
- `tosp/docs/tamil-translation-architecture.md` — rewritten to describe
  the Google proxy as `NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW`,
  pointing to the new map doc as primary.
- `tosp/docs/google-translation-setup.md` — status banner added noting it
  no longer applies to normal use.
- `tosp/docs/tamil-translation-review-workflow.md` — rewritten: the old
  "flag an automatic translation" workflow is now a dormant appendix;
  a new primary section describes how a static translation is actually
  added/updated today.

## Files deleted, with reason

- `tosp/js/components/language-toggle.js` — explicitly required removal
  ("Do not retain the sidebar global language button"). Provably unused
  everywhere else once its only caller (`header.js`) was updated; deleting
  it (rather than leaving it orphaned) matches the explicit instruction,
  unlike the Google proxy files (which the task explicitly said not to
  auto-delete).

No other files were deleted. `api/translate.js`, `vercel.json`, root
`package.json`, `.env.example`, `services/translation-provider.js`,
`translations/tamil-runtime-cache.js`, `translations/prototype-approvals.js`,
and `views/translation-review-view.js` are all **retained**, documented as
dormant/unused by the current flow.

## Local translation architecture

`translation-control.js` → `translation-service.js` (`getStaticTranslation()`,
synchronous, in-memory `Object` lookup by `contentId`) →
`translations/tamil-approved.js`. No network layer, no provider, no cache,
no approval gate. Resolution: stored local translation, or English shown
with a concise "Tamil translation is not available for this content."
message if a `contentId` has no entry (currently: none don't). Full detail
in `docs/tamil-static-translation-map.md`.

## Total translations

**451 / 451** curriculum content records, all status `APPROVED_LOCAL`.
Breakdown: 18 module titles, 18 module summaries, 18 real-world-pace
strings, 1 shared sign-off explanation, 41 lesson titles, 41 lesson
paragraphs, 18 quiz titles, 1 shared quiz-instructions template, 59 quiz
questions, 236 quiz answer options.

## Missing translations

**0.** Verified programmatically: every `contentId` extracted fresh from
`data.js` has a corresponding `tamil-approved.js` entry with a
byte-identical `englishText` and a non-empty `tamilText`.

## Global language button removal

**Done.** `components/language-toggle.js` deleted; `header.js` no longer
renders or wires it in either the mobile top bar or the desktop sidebar
footer. Verified live: zero matching elements found on the dashboard.
Paragraph-level Translate/Show English controls remain on every content
block — removing the global control does not force a page-wide mode.

## Google runtime usage status

**Not used during normal application use.** `translation-service.js` has
no import of `translation-provider.js`, `api/translate.js`, or the
runtime cache. Verified live by serving the app from a plain static file
server with **no `/api/*` route mounted at all** and confirming every
Translate-to-Tamil interaction across module/lesson/quiz screens worked
with zero network requests.

## Tamil speech result

Unchanged (already correct): `getTamilVoice()` prefers `ta-LK` → `ta-IN` →
any `ta*` voice → clear "no voice installed" message. "Read Tamil" reads
only the resolved Tamil text for its own block. Verified live: no crash on
click; audio itself not confirmed (no Tamil voice installed in this
headless test environment).

## Quiz scoring parity

Verified live: translated Module 1's question 1 to Tamil, answered all 3
questions by their (unchanged) option IDs, submitted — scored 100% (3/3),
identical to the English-only baseline, via the untouched
`quiz-service.js`/`rules/scoring.js`. Option `value` attributes were
confirmed identical before/after translation.

## Regressions

**None found.** Theme toggle, progress tracking, module unlock/lock,
sign-off gating (tested via a simulated-progress pass reaching an
unlocked, sign-off-gated module), mobile layout, and dark mode were all
re-verified working after this change.

## Known limits

- If `data.js` English text is edited later without a matching
  `tamil-approved.js` update, that entry's `englishText` comparison will
  fail and the block will correctly fall back to English + the
  unavailable message, rather than showing a stale translation — but a
  fresh Tamil translation still needs to be authored and added by hand.
- The dormant Google Cloud Translation path (`api/translate.js` etc.)
  remains in the repository but untested in this pass beyond confirming
  it's not imported by the active code path.
- Translated (Tamil) display state per block is not persisted across a
  full page navigation/reload — matches the existing English "Read Aloud"
  control's lifecycle and the "no whole-page automatic switching"
  requirement.

## Validation result

40/40 checks passed. Full detail, including which were live-browser-
verified vs. programmatic-content-integrity-verified, in
[validation/tamil-static-translation-check.md](../validation/tamil-static-translation-check.md).

`STATIC_TAMIL_TRANSLATION_READY: YES`

## Next action

1. Have a native Tamil speaker (or the user, as final approver) spot-check
   a sample of the 451 authored translations for tone/accuracy before this
   is considered final business-ready content — this pass produced
   faithful, source-verified translations but was not reviewed by a human
   Tamil speaker.
2. If/when new curriculum content is added to `data.js`, follow the
   "How a static translation actually gets added or updated today"
   section of `docs/tamil-translation-review-workflow.md`.
3. Decide whether the dormant Google proxy files should eventually be
   removed entirely, or kept as a fallback path for future content that
   doesn't yet have a stored translation — no action needed either way
   right now.

## PASS/FAIL

**PASS** (implementation-level). `FINAL_USER_ACCEPTANCE: PENDING` — no
final business acceptance rule has been supplied.

Do not commit or push — no commits or pushes were made in this session.
