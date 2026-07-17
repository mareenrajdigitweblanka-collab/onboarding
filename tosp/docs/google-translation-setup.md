# Google Cloud Translation Setup (Vercel)

Status: **NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW.** Curriculum Tamil
content is served from a stored local file
(`js/translations/tamil-approved.js`) and needs none of the setup below —
see [tamil-static-translation-map.md](tamil-static-translation-map.md).
This document is retained for the dormant Google Cloud Translation proxy
described in [tamil-translation-architecture.md](tamil-translation-architecture.md),
in case automatic translation is reintroduced later for new content.

## 1. Google Cloud steps

1. In the Google Cloud Console, enable the **Cloud Translation API** for
   your project.
2. Create an **API key** (APIs & Services -> Credentials -> Create
   Credentials -> API key).
3. **Restrict the key** to the Cloud Translation API only (API restrictions
   -> Restrict key -> select "Cloud Translation API"). Do not leave it
   unrestricted.
4. Restrict usage further where possible (e.g. an application restriction
   appropriate to a server-side key — this key is only ever called from
   `api/translate.js`, never from a browser, so an IP/HTTP-referrer
   restriction is not applicable the way it would be for a client-side key;
   rely on the API restriction plus your own quota/budget alerts).
5. Set a budget alert / quota limit in Google Cloud on this API — automatic
   translation is a paying API (see PRODUCTION_BLOCKER notes in the
   handover doc). Google's own guidance is to restrict API keys and avoid
   exposing them through public client code; this project follows that by
   never letting the key leave the server (see architecture doc).

## 2. Vercel steps

1. In your Vercel Project Settings -> Environment Variables, add:
   - **Name**: `GOOGLE_CLOUD_TRANSLATE_API_KEY`
   - **Value**: the key from step 1.2 above
   - **Never** prefix it with `NEXT_PUBLIC_` or any other client-exposed
     prefix — this project doesn't use Next.js, but the same rule applies
     generally: any env var prefix a framework treats as "expose to the
     browser" must never be used here.
2. Redeploy (environment variable changes require a new deployment to take
   effect).
3. **Never commit the real value.** Only `.env.example` (with an empty
   value) is tracked in git — see the repo root `.gitignore`, which ignores
   `.env`/`.env.local`.

## 3. Local development

The static frontend (`tosp/index.html` and friends) can be opened directly
or served by any static file server. **A plain static server (e.g.
`python -m http.server`) cannot execute `/api/translate`** — that endpoint
only exists as a Vercel serverless function (`api/translate.js`), and a
static server has no way to run Node.js request handlers. Opening the app
against a plain static server means every "Translate to Tamil" click will
correctly show `TRANSLATION_UNAVAILABLE` (a network 404 for `/api/translate`) —
that's expected, not a bug.

To run frontend + proxy together locally, use the **Vercel CLI**:

```sh
npm install --global vercel   # one-time, or use npx vercel dev
cp .env.example .env          # then fill in GOOGLE_CLOUD_TRANSLATE_API_KEY
vercel dev
```

`vercel dev` serves the static site from `tosp/` (per `vercel.json`'s
`outputDirectory`) and runs `api/translate.js` as a real serverless
function on the same origin, so `fetch('/api/translate')` from the browser
works exactly as it will in production.

**If the Vercel CLI is unavailable** in your environment (e.g. no network
access to install/authenticate it), you cannot exercise `/api/translate`
locally at all — there is no plain-Node/static-server substitute that
faithfully reproduces Vercel's request/response handling. In that
situation, either:

- request access to run `vercel dev`/`vercel link` (requires a Vercel
  account), or
- run a minimal local harness that imports `api/translate.js`'s exported
  handler directly and calls it with mock `(req, res)` objects — this
  verifies the handler's own logic (validation, error shapes, rate
  limiting) but does not prove real Vercel routing/hosting behaviour. This
  is how this feature's request-validation checks were verified in this
  sandboxed environment — see
  [validation/tamil-translation-check.md](../validation/tamil-translation-check.md).

### Mock mode (local testing only, never production)

Setting `TRANSLATE_MOCK_MODE=true` (in `.env`, or the shell running
`vercel dev`) makes `api/translate.js` return a deterministic fake Tamil
string (`[ta-mock] <original text>`) instead of calling Google, so the full
browser -> proxy -> cache -> display -> speech path can be exercised
without a real API key or any Google Cloud cost. This is how the
end-to-end UI flow described in the validation doc was actually verified
in this sandboxed environment (no real Google credentials were available).

**Never set `TRANSLATE_MOCK_MODE=true` in a production environment** — it
takes priority over a real key if both happen to be set, so a stray mock
flag in production would silently serve fake translations to learners. Do
not add it to any deployed environment's variables; leave it unset (the
default) everywhere except your own local `.env`.

## 4. Verifying it's working

Once deployed with a real key (or running `vercel dev` locally with one):

1. Open a lesson page and click "Translate to Tamil" on the paragraph.
2. It should show a "Translating…" message, then real Tamil text with an
   "AUTO-TRANSLATED (GOOGLE)" badge — not `[ta-mock] ...`.
3. Reload the page and click Translate again on the same paragraph — it
   should resolve instantly from `tosp.translation.cache.ta.v1` with no
   new network request (open DevTools -> Network and confirm no second
   `/api/translate` call for that content ID).
4. In Google Cloud Console -> APIs & Services -> Cloud Translation API ->
   Metrics, confirm request volume is showing up as expected.
