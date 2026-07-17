# Handover — Google Cloud Translation for Tamil (Corrected Architecture)

Date: 2026-07-17
Scope: repo root (`api/`, `vercel.json`, `package.json`, `.env.example`,
`.gitignore`) + `tosp/`.

Supersedes [2026-07-16__tamil-translation-feature-closure.md](2026-07-16__tamil-translation-feature-closure.md)
(the prior iteration shipped with no automatic-translation provider
configured and a mandatory approval gate before displaying automatic
output). Both requirements were explicitly corrected by the user for this
pass.

## A. Starting repository state

The prior iteration's architecture: `translation-provider.js` shipped a
`NullTranslationProvider` (always "not configured", never called any
network endpoint); `translation-service.js`/`translate-control.js` treated
`AUTO_TRANSLATED` as requiring a `REVIEW REQUIRED` review step before a
learner would see it; no server-side code existed anywhere in the repo (no
`api/`, no `vercel.json`, no root `package.json`); no `.env`/`.env.example`
existed.

## B. Root cause of prior failure

The prior implementation was deliberately built with **no** automatic
provider and **required** approval before displaying Tamil, per that
session's explicit scope boundary ("do not choose a provider without
approval"). Once the user corrected the requirement — Google Cloud
Translation specifically approved, no approval gate needed — that
architecture needed to change in three ways: (1) a real, but
credential-safe, translation backend had to be added (impossible from a
pure static frontend without exposing a key, hence the new server-side
proxy), (2) the status model had to drop the mandatory review/approval
blocking state, and (3) every place that displayed a "provider not
configured" message needed to instead attempt a real request and only
report unavailability on actual failure.

## C. Files created

- `api/translate.js` — Vercel serverless function; the only file that
  reads `GOOGLE_CLOUD_TRANSLATE_API_KEY`.
- `vercel.json` — minimal config (`outputDirectory: "tosp"`) so Vercel
  serves the static site from `tosp/` while `api/` at the repo root is
  recognized as serverless functions.
- `package.json` (repo root) — documents the Node ≥18 requirement (global
  `fetch`/`AbortController`) and a `vercel dev` script; no dependencies.
- `.env.example` (repo root) — `GOOGLE_CLOUD_TRANSLATE_API_KEY=` (empty)
  and an optional `TRANSLATE_MOCK_MODE=` for local testing.
- `.gitignore` (repo root) — did not exist before; added to guarantee
  `.env`/`.vercel`/`node_modules` are never committed.
- `tosp/docs/google-translation-setup.md` — new Google Cloud + Vercel
  setup + local-dev doc.
- `tosp/js/components/translation-control.js` — renamed/rebuilt from the
  prior `translate-control.js` (deleted) for the new status model and a
  retry state.

## D. Files modified

- `tosp/js/translations/translation-status.js` — new 3-state enum
  (`LOCAL_TRANSLATION` / `AUTO_TRANSLATED` / `TRANSLATION_UNAVAILABLE`,
  replacing `APPROVED`/`REVIEW_REQUIRED`/`MISSING`), plus the required
  bilingual unavailable-message constant.
- `tosp/js/translations/tamil-approved.js` — reframed as an optional
  maintainer-curated `LOCAL_TRANSLATION` source (still ships empty), no
  longer a required gate.
- `tosp/js/services/translation-provider.js` — replaced the
  `NullTranslationProvider` with a real adapter that POSTs
  `{ contentId, text }` to same-origin `/api/translate` and never touches a
  credential.
- `tosp/js/services/translation-service.js` — new resolution order (local
  → cached → proxy request → English fallback), `AUTO_TRANSLATED` no
  longer gated, `isAutomaticTranslationConfigured()` removed (the browser
  always attempts the proxy; unavailability is only ever reported per
  actual failed request).
- `tosp/js/views/translation-review-view.js` — reframed from a blocking
  "approve before display" panel to a non-blocking curation panel.
- `tosp/js/views/lesson-view.js`, `quiz-view.js`, `module-view.js` —
  updated to the renamed `translation-control.js` import.
- `tosp/js/translations/prototype-approvals.js` — comment updated to
  reflect it's a curation flag, not an approval gate.
- `tosp/js/components/language-toggle.js`, `tosp/js/services/speech-service.js`
  — one stale comment each updated to the new filename (no functional change).
- `tosp/css/styles.css` — `.translate-control*` classes renamed to
  `.translation-control*`; badge modifiers renamed to
  `--local-translation`/`--auto-translated` (removed `--approved`/`--missing`);
  added `.translation-control__message-en` for the bilingual message.

`tosp/js/data.js`, `tosp/js/storage.js`, `tosp/js/rules/*.js`,
`tosp/js/services/quiz-service.js`, `tosp/js/services/progress-service.js`,
and `tosp/js/services/theme-service.js` were **not modified**.

## E. Google endpoint implementation

`api/translate.js` (Vercel Node.js serverless function, plain
`(req, res)` handler, no framework):

- `POST` only (405 otherwise); requires `Content-Type: application/json`
  (400 otherwise).
- Validates `contentId` (non-empty string) and `text` (non-empty string,
  ≤5000 chars) — 400 on violation.
- Fixes source/target language to `en`/`ta` server-side regardless of
  anything the client sends.
- Best-effort in-memory rate limit: 30 requests/minute per IP (documented
  `PRODUCTION_BLOCKER` — not durable across serverless instances).
- Calls `POST https://translation.googleapis.com/language/translate/v2`
  with the key in the `x-goog-api-key` header (never a query parameter),
  an 8-second timeout via `AbortController`.
- On any failure (missing key, Google non-2xx, malformed/empty response,
  timeout), returns the fixed generic body `{"error":"translation_failed","message":"Tamil translation is temporarily unavailable."}` —
  never Google's raw error, never the key. Logs status codes only,
  server-side.
- `Cache-Control: no-store` on every response.
- An explicit, opt-in `TRANSLATE_MOCK_MODE=true` env var (never default)
  bypasses Google for local testing only.

## F. Environment variable name

`GOOGLE_CLOUD_TRANSLATE_API_KEY` (documented, empty, in `.env.example`;
never committed with a real value).

## G. API key exposed to browser: NO

Verified: no key literal anywhere under `tosp/` or in the git diff; the
key is read only via `process.env` inside `api/translate.js`, a
Node.js-runtime-only file that is never bundled into any browser asset.

## H. Lesson translation result

Working, verified live end-to-end (via a mock-mode harness — see
Validation doc): Translate to Tamil → loading state → Tamil text + Google
badge → Show English restores the original → Read Tamil available →
result cached and reused with zero extra network requests on repeat.

## I. Quiz translation result

Working, verified live: question prompt and all 4 option labels translate
together as one block; `<input value>` (option IDs) and `name` (question
ID) attributes are provably unchanged before/after translation.

## J. Quiz-scoring parity result

Verified live: after translating question 1 to Tamil, answering all 3
questions of Module 1's quiz by their (untouched) option IDs and
submitting scored 100% (3/3) via the unmodified `quiz-service.js`/
`rules/scoring.js` — identical to the English-only baseline.

## K. Tamil speech result

`getTamilVoice()`/`speakTamil()` unchanged from the prior (already
correct) implementation: `ta-LK` → `ta-IN` → any `ta*` voice → clear
"no Tamil voice installed" message, never a crash. "Read Tamil" only ever
speaks the resolved Tamil text for its own block. Not exercised against a
real installed Tamil voice in this headless environment (verified by code
inspection instead).

## L. Cache result

`tosp.translation.cache.ta.v1` verified live: survives reload, serves
repeat requests with zero network calls, and safely ignores a manually
corrupted value (invalid JSON) without crashing — the app just re-treats
that content as never having been cached.

## M. Error-handling result

Verified live: forcing the proxy to return HTTP 500 left English fully
intact, showed the exact required bilingual message
(`தமிழ் மொழிபெயர்ப்பு தற்போது கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்.` +
English equivalent), changed the button to "Retry Translation", and
cleared the loading state correctly. Duplicate rapid clicks produced
exactly one network request. A real bug (translate button stuck disabled
after a *successful* translation, blocking a later retranslate) was found
and fixed during this pass — see the validation doc.

## N. Validation result

29 practical checks + both defects-found in this pass: **30/30 items
recorded, IMPLEMENTATION_CHECKS_PASS: YES**. Full detail, including exactly
which checks were live-browser-verified vs. code-inspection-only, in
[validation/tamil-translation-check.md](../validation/tamil-translation-check.md).

## O. Existing regression result

None found beyond the one new-code bug already found and fixed (translate
button stuck disabled). Theme, progress, module unlock, and mobile layout
all verified unaffected.

## P. English source changed: NO

## Q. Business logic changed: NO

Scoring (`rules/scoring.js`), progression (`rules/module-access.js`,
`rules/progression.js`), and sign-off (`progress-service.js`) are all
untouched.

## R. GOOGLE_TRANSLATION_READY: NO

The integration is code-complete and verified end-to-end against a mock
provider standing in for Google (no real API key is available in this
session, and none was fabricated). See "Remaining setup required" below
for what turns this to YES.

## S. Remaining setup required

1. Provision a Google Cloud project, enable Cloud Translation API, create
   and restrict an API key (see
   [google-translation-setup.md](../docs/google-translation-setup.md)).
2. Set `GOOGLE_CLOUD_TRANSLATE_API_KEY` in Vercel Project Settings and
   redeploy (or `vercel dev` locally with a `.env`).
3. Set a Google Cloud budget/quota alert — automatic translation is a
   paying API with no cost control in this prototype beyond the best-effort
   proxy rate limit.
4. Replace the in-memory rate limiter with a durable store before relying
   on it for real abuse protection (`PRODUCTION_BLOCKER`, documented in
   `api/translate.js` and the architecture doc).
5. Re-run the validation checklist's checks 4–9 and 18–22 against a real
   `vercel dev` session or deployment with a real key, since this session
   could only verify the handler's own logic + a mock provider (no
   interactive Vercel account auth available here).

## Production blockers (carried forward + new)

- Confidential curriculum remains browser-readable in the static frontend
  (unchanged, pre-existing).
- Quiz answers remain client-readable in the current prototype (unchanged,
  pre-existing).
- Learner progress remains localStorage-based (unchanged, pre-existing).
- **New**: Google Cloud Translation usage may incur real cost; quotas and
  billing must be actively monitored once a real key is provisioned.
- **New**: the server-side proxy (`api/translate.js`) must actually be
  deployed (Vercel or equivalent) — it does not run under a plain static
  file server.
- **New**: the API key must be restricted (Cloud Translation API only) per
  Google's own guidance, and never committed.
- **New**: the in-memory rate limiter is not production-grade.

This application, including this translation feature, remains a
frontend-mostly PROTOTYPE. **It should not be described as production-secure.**

## T. Do not commit or push

No commits or pushes were made in this session, per instructions.
