# Tamil Translation Architecture — Google Cloud Translation Proxy (Dormant)

Status: **NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW.**

**For how Tamil actually works in TOSP today, see
[tamil-static-translation-map.md](tamil-static-translation-map.md).**
Curriculum Tamil content (module/lesson/quiz text) is now served entirely
from a stored local file, `js/translations/tamil-approved.js` — a
synchronous, in-memory lookup with no network request, no provider, and no
approval gate. Google Cloud Translation is **not called during normal
application use**.

This document describes the Google Cloud Translation proxy built in an
earlier iteration of this feature. It is **retained, not deleted** —
`api/translate.js`, `js/services/translation-provider.js`,
`js/translations/tamil-runtime-cache.js`, `js/translations/prototype-approvals.js`,
and `js/views/translation-review-view.js` are all still present in the
repository and still syntactically valid, but nothing in
`translation-service.js` (the only module views are allowed to call for
translation) imports or invokes any of them anymore. They exist only in
case automatic translation is reintroduced later for new content that has
no stored Tamil yet.

## Why it's dormant, not deleted

Per the project's own instruction: "Do not delete root API or proxy files
automatically unless they are proven unused and deletion is explicitly
safe. Instead, document whether they are retained or retired." These files
are retained. Deployment artifacts (`vercel.json`, root `package.json`,
`.env.example`, `.gitignore`) are likewise retained and harmless to keep —
they impose no runtime cost on the static-translation flow and cost
nothing if never deployed.

## What still works if reconnected

The architecture below is unchanged from when it was active — a real
Google Cloud Translation call still works exactly as documented if
`translation-service.js` is later updated to call
`services/translation-provider.js` again for content that has no local
translation. Nothing about the proxy itself needed to change when the
static flow was introduced.

```text
Browser                          Vercel serverless function        Google Cloud
--------                         --------------------------        ------------
(currently not called by
 translation-service.js)
translation-provider.js
      POST /api/translate    -->  api/translate.js
      { contentId, text }         - validates input                 POST /language/translate/v2
                                   - reads GOOGLE_CLOUD_TRANSLATE_API_KEY
                                   - calls Google  ------------------->
                                   - reduces any failure to a
                                     generic safe error         <-----  translation / error
      <-- { translatedText,       - never returns the key or
           provider }               Google's raw error body
```

- `js/services/translation-provider.js` — the ONLY browser-side module
  that would call the translation network endpoint. POSTs
  `{ contentId, text }` to `/api/translate` (same-origin) and returns
  `{ translatedText, provider }` or throws a plain `Error` on any failure.
  It never sends or receives a credential.
- `api/translate.js` — a Vercel serverless function (Node.js runtime, no
  framework) and the only place that would read
  `GOOGLE_CLOUD_TRANSLATE_API_KEY`. POST-only, JSON-only, fixes
  source/target language to `en`/`ta` server-side regardless of client
  input, best-effort in-memory rate limit, calls Google with the key in
  the `x-goog-api-key` header (never a query parameter), reduces every
  failure to a fixed generic error body, never forwards Google's raw
  response or the key to the browser, `Cache-Control: no-store`.

See [google-translation-setup.md](google-translation-setup.md) for setup
steps, now marked as only relevant if this path is reconnected.

## API-key security (still true, dormant or not)

`GOOGLE_CLOUD_TRANSLATE_API_KEY` exists only as a Vercel-managed
server-side environment variable, read exclusively by `api/translate.js`.
It has never been present in `index.html`, any file under `tosp/js/`,
`localStorage`, a query parameter, or any committed file —
`.env.example` documents the variable name with an empty value only.

## Storage keys touched by the dormant path only

| Key | Owner module | Status |
| --- | --- | --- |
| `tosp.translation.cache.ta.v1` | `translations/tamil-runtime-cache.js` | Unused under normal operation — nothing calls `setCachedTranslation()` anymore. Still readable/clearable from the Translation Review panel. |
| `tosp.translation.prototypeApprovals.v1` | `translations/prototype-approvals.js` | Unused under normal operation for the same reason. |

`tosp.prototype.v2`, `tosp.ui.theme.v1`, and the now-deprecated
`tosp.ui.language.v1` are documented in
[tamil-static-translation-map.md](tamil-static-translation-map.md).

## If this path is ever reconnected

1. Have `translation-service.js` fall back to `translation-provider.js`
   for any `contentId` missing from `tamil-approved.js`, instead of going
   straight to `TRANSLATION_UNAVAILABLE`.
2. Provision a real `GOOGLE_CLOUD_TRANSLATE_API_KEY` per
   [google-translation-setup.md](google-translation-setup.md).
3. Replace the in-memory rate limiter in `api/translate.js` with a durable
   store before relying on it for real abuse protection.
4. Monitor Google Cloud Translation usage/billing/quotas — it is a paying
   API.
5. Re-run [validation/tamil-static-translation-check.md](../validation/tamil-static-translation-check.md)
   and the prior [validation/tamil-translation-check.md](../validation/tamil-translation-check.md)
   against the real, deployed proxy before enabling it for learners.
