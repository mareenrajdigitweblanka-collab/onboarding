# Google Cloud Translation Feature — Implementation Validation

Supersedes the prior (no-provider) validation pass. Verified by:

1. A **unit-style harness** (`test-api-translate.mjs`, run in the session
   scratchpad, not committed to the repo) that imports `api/translate.js`'s
   handler directly and calls it with mock `(req, res)` objects — 20/20
   checks passed. This proves the proxy's request-validation contract
   without needing a real Google API key.
2. A **live end-to-end Playwright pass** driving a real Chromium browser
   against `tosp/index.html`, served together with a Node HTTP harness that
   mounts the *exact same* `api/translate.js` handler at `POST
   /api/translate` (an adapter, not `vercel dev` — see "Known gap" below),
   running with `TRANSLATE_MOCK_MODE=true` so the full browser → proxy →
   cache → display → speech path is exercised without a real Google API
   key or cost. Screenshots and console/network logs captured during that
   pass informed the results below.
3. A second Playwright pass at a 375×812 mobile viewport.

**No real Google Cloud Translation call was made in this environment** — no
`GOOGLE_CLOUD_TRANSLATE_API_KEY` is available here, and per the task's own
instructions a real key must never be fabricated or committed. Item 7 and
related "translates successfully" checks are therefore verified against
the mock provider (which exercises the identical request/response
contract) rather than real Google output.

| # | Check | Result | Notes |
| - | --- | :-: | --- |
| 1 | English content remains unchanged | **YES** | `js/data.js` was not edited. |
| 2 | Google API key absent from frontend source | **YES** | Verified: no `AIza...`-style literal or `GOOGLE_CLOUD_TRANSLATE_API_KEY` value anywhere under `tosp/`; the key is read only in `api/translate.js` via `process.env`, a Node.js-runtime-only file never bundled into a browser asset. |
| 3 | Google API key absent from Git diff | **YES** | `git status`/diff for this session contains no key value; `.env.example` ships with an empty value; `.gitignore` excludes `.env`/`.env.local`. |
| 4 | Translation endpoint rejects GET | **YES** | Verified via harness: GET → 405, `Allow: POST` header, `{error: "method_not_allowed"}`. |
| 5 | Translation endpoint rejects empty text | **YES** | Verified via harness: `text: ""` → 400 `{error: "invalid_request"}`. Also verified missing `contentId`, non-string `text`, and oversized (>5000 char) `text` are all rejected with 400. |
| 6 | Translation endpoint enforces English → Tamil only | **YES** | Verified live: a request with client-supplied `sourceLanguage: "de"`/`targetLanguage: "fr"` still returned `sourceLanguage: "en"`, `targetLanguage: "ta"` — the server ignores those fields entirely and hardcodes the pair. |
| 7 | Lesson paragraph translates successfully | **YES** (via mock provider; real Google not exercised — no key available) | Verified live: clicking "Translate to Tamil" on `m1-l1`'s paragraph replaced the English text with the (mock) Tamil result, set `lang="ta"` on the element, and showed the "AUTO-TRANSLATED (GOOGLE)" badge. |
| 8 | Cached translation loads without a second request | **YES** | Verified live: after an initial translate, navigating away and re-triggering translate on the same content ID made **zero** additional `/api/translate` requests (network-request counter confirmed). |
| 9 | Show English restores source text | **YES** | Verified live: clicking "Show English" restored the exact original paragraph text and hid the Tamil-only controls/badge. |
| 10 | Quiz question translates | **YES** (via mock provider) | Verified live on `m1-quiz-q1`. |
| 11 | Quiz option labels translate | **YES** (via mock provider) | Verified live: all 4 option `<span>` labels for `m1-quiz-q1` updated to Tamil text with `lang="ta"`. |
| 12 | Quiz option IDs remain unchanged | **YES** | Verified live: `input[value]` for options a/b/c/d were unchanged before and after translation; only the `<span>` label text was swapped. |
| 13 | English and Tamil quiz scoring results match | **YES** | Verified live: after translating question 1 to Tamil, answering all 3 questions by their (unchanged) option IDs and submitting scored 100% (3/3) — identical to the pre-translation English-only pass in the prior validation round, via the untouched `quiz-service.js`/`rules/scoring.js`. |
| 14 | Correct answers remain hidden before submission | **YES** | Unchanged from prior validation: `translateContent()`/`translation-control.js` only ever carry prompt/option display text, never `correctOptionId`. |
| 15 | Tamil speech reads Tamil | **YES** (code inspection; no Tamil voice installed in the headless test environment) | "Read Tamil" button became visible/enabled immediately after a successful translation and calls `speakTamil()` with only the resolved Tamil text — verified via code path, not audio output (no Tamil voice available here). |
| 16 | English speech still works | **YES** | The lesson/module/quiz "Read Aloud" controls render and wire identically when a block shows English; `speech-service.js`'s core functions are unmodified. |
| 17 | Navigation stops speech | **YES** | Unchanged: `app.js`'s `mount()` still calls `stopSpeech()`/`clearSpeechListeners()` on every route change. |
| 18 | Offline/error state preserves English | **YES** | Verified live: forcing `/api/translate` to return HTTP 500 and clicking Translate left the English paragraph fully intact, showed the required bilingual message (`தமிழ் மொழிபெயர்ப்பு தற்போது கிடைக்கவில்லை. மீண்டும் முயற்சிக்கவும்.` + English equivalent), and changed the button to "Retry Translation". |
| 19 | Duplicate clicks make one active request | **YES** | Verified live: two synchronous clicks on "Translate to Tamil" resulted in exactly 1 `/api/translate` request (`translateContent()`'s in-flight-request map + the button's own `disabled` state during the request). |
| 20 | Loading state clears after failure | **YES** | Verified live as part of check 18: after the forced failure, the "Translating…" message was replaced by the bilingual unavailable message and the button was re-enabled as "Retry Translation" — not left stuck loading. **A real bug was found and fixed here** — see below. |
| 21 | Translation cache survives refresh | **YES** | Verified live: `tosp.translation.cache.ta.v1` persisted across a full page reload and a translated block re-displayed Tamil from cache with no new network request when re-triggered. |
| 22 | Corrupt cache does not crash | **YES** | Verified live: manually setting `tosp.translation.cache.ta.v1` to invalid JSON (`{not valid json`) and reloading the lesson page produced no crash and no console error — the page rendered normally with the cache treated as empty. |
| 23 | Theme still works | **YES** | Verified live: dark-mode toggle still works with the renamed `.translation-control` CSS classes; no hardcoded colors were introduced. |
| 24 | Progress still works | **YES** | Verified live: `tosp.prototype.v2` correctly recorded 3 completed lessons + 1 passed quiz + module 2 unlock across this session. |
| 25 | All 18 modules still work | **YES** (module 1 → 2 unlock verified live; remaining 17 modules not separately re-exercised, as this feature makes no module-specific change and `rules/module-access.js`/`rules/progression.js` are untouched) | |
| 26 | Sign-off gate still works | **YES** (code inspection) | `progress-service.js`'s sign-off functions are unmodified; module 1 (no `requiresSignoff`) was the module exercised live in this pass. |
| 27 | Mobile layout works | **YES** | Verified live at a 375×812 viewport: lesson paragraph + translation controls wrap and reflow cleanly with no overlap/overflow; no page errors. |
| 28 | No console errors remain | **YES** | Only two console messages appeared across the full pass: the pre-existing missing-`favicon.ico` 404 (unrelated to this feature, present before it too) and the browser's own network-failure log for the *intentionally* forced 500 in check 18/20 — no unexpected JavaScript errors. |
| 29 | API failure does not reveal raw provider details | **YES** | Verified via harness: with no API key set, the endpoint returns exactly `{"error":"translation_failed","message":"Tamil translation is temporarily unavailable."}` — no stack trace, env var name, or Google error body in the response. Server-side `console.error` logs status codes only, never response bodies or the key (verified by reading `api/translate.js`). |
| 30 | API secret remains server-only | **YES** | `GOOGLE_CLOUD_TRANSLATE_API_KEY` is read only inside `api/translate.js` (`process.env`, Node.js serverless runtime). `translation-provider.js` (browser code) contains no key and only ever calls the same-origin `/api/translate` path. |

## Defects found and fixed during this validation pass

1. **Translate button stayed permanently disabled after a successful
   translation.** `refreshButtons()` never reset `translateBtn.disabled`
   after a success (only after a failure), so a `Translate → Show English →
   Translate` cycle silently did nothing on the second attempt. Fixed by
   unconditionally resetting `disabled = false` inside `refreshButtons()`
   (called only when a request has actually settled, never mid-flight) in
   `tosp/js/components/translation-control.js`. Re-verified live after the
   fix (check 20 above).

## Known gap: `vercel dev` was not run interactively

The Vercel CLI (`npx vercel`) is present in this environment, but running
`vercel dev` requires an authenticated Vercel account/project link, which
this non-interactive sandboxed session cannot complete. Instead, checks 4–9
and 18–22 were verified through a Node harness that mounts the *identical*
exported handler from `api/translate.js` behind real HTTP, driven by a real
Playwright browser — this proves the handler's own logic and the full
browser-side integration, but does not prove Vercel's own routing/hosting
behaviour (e.g. its automatic JSON body-parsing into `req.body`, which
`api/translate.js` relies on and which this harness reproduces manually).
Running `vercel dev` (or a real deployment) is recommended as a final check
before this ships — see [google-translation-setup.md](../docs/google-translation-setup.md).

## IMPLEMENTATION_CHECKS_PASS: YES

All 30 checks passed at the depth described above (live browser
verification for the large majority; code inspection only for a small
number explicitly marked). One real defect was found and fixed during this
pass.

## GOOGLE_TRANSLATION_READY: NO

The integration code (proxy, provider, service, UI) is complete and
verified end-to-end against a mock provider standing in for Google. It is
**not** ready for real learners yet because:

- No `GOOGLE_CLOUD_TRANSLATE_API_KEY` has been provisioned or set in any
  environment (this is expected — provisioning a real Google Cloud project
  and billing account is a user/ops action outside this session's scope).
- `vercel dev`/a real Vercel deployment has not been exercised (see "Known
  gap" above).
- No budget/quota alerts have been configured in Google Cloud.
- The in-memory rate limiter is a best-effort placeholder, not
  production-grade (see PRODUCTION BLOCKERS in the handover doc).

Once a real key is provisioned and set per
[google-translation-setup.md](../docs/google-translation-setup.md), and a
real deployment (or `vercel dev`) is used to re-run checks 4–9/18–22
against actual Google Cloud Translation output, this should be re-marked
YES.
