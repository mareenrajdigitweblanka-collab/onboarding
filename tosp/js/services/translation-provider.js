// services/translation-provider.js — the ONLY module allowed to call the
// translation network endpoint from the browser. It talks exclusively to
// this app's own same-origin proxy (api/translate.js) — never to Google
// directly, and it never sees or sends a Google API key. The key lives
// only in the proxy's server-side environment (GOOGLE_CLOUD_TRANSLATE_API_KEY).
//
// Source/target language are always English -> Tamil; this module doesn't
// accept or forward any other language pair, matching the proxy's own
// fixed en->ta contract.

const ENDPOINT = '/api/translate';
const REQUEST_TIMEOUT_MS = 10000;

export function getProviderName() {
  return 'google-cloud-translation';
}

/**
 * Requests a Tamil translation for one piece of content from the
 * same-origin proxy. Always throws a plain Error (never a raw
 * network/HTTP object) on any failure — timeout, network error, proxy
 * error response, malformed JSON, or an empty translated result — so
 * callers can treat every failure mode uniformly. Never resolves with an
 * empty string and calls that success.
 */
export async function translateText(contentId, text) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;
  try {
    response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contentId, text }),
      signal: controller.signal,
    });
  } catch (err) {
    // Covers "proxy unreachable" (dev server with no /api support, offline
    // browser, DNS/network failure) and an aborted (timed-out) request.
    const isTimeout = err && err.name === 'AbortError';
    throw new Error(isTimeout ? 'translation_timeout' : 'translation_proxy_unreachable');
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    // The proxy already reduced this to a safe, generic error shape — see
    // api/translate.js. We don't need (and must not surface) any more
    // detail than that to the rest of the app.
    throw new Error('translation_failed');
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error('translation_malformed_response');
  }

  if (!data || typeof data.translatedText !== 'string' || !data.translatedText.trim()) {
    throw new Error('translation_empty_result');
  }

  return { translatedText: data.translatedText, provider: data.provider || getProviderName() };
}
