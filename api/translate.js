// api/translate.js — Vercel serverless function (Node.js runtime).
//
// This is the ONLY place in this repository that ever reads
// GOOGLE_CLOUD_TRANSLATE_API_KEY. The browser never sees it: it POSTs
// { contentId, text } here and gets back { translatedText, ... } or a
// generic error — never Google's raw response, never the key.
//
// Plain (req, res) handler, no framework — per project instructions this
// must not introduce Next.js or any other frontend framework. Requires a
// Node.js runtime with global fetch/AbortController (Node 18+, which is
// Vercel's default for new Node.js Serverless Functions).

const GOOGLE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';
const SOURCE_LANGUAGE = 'en';
const TARGET_LANGUAGE = 'ta';
const MAX_TEXT_LENGTH = 5000; // characters — generous for one lesson paragraph or quiz option, well under Google's per-request limits.
const REQUEST_TIMEOUT_MS = 8000;

// PRODUCTION_BLOCKER: this in-memory limiter is per-instance and resets on
// every cold start — Vercel may run several instances concurrently, so this
// is only a best-effort guard against one browser tab hammering the
// endpoint, not a real distributed rate limit. A production deployment
// needs a durable store (Vercel KV / Upstash / Redis) for a real per-IP or
// per-key limit.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 30;
const requestLog = new Map(); // ip -> timestamps[]

function isRateLimited(ip) {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  // Bound the map itself so a very long-running instance can't leak memory
  // across many distinct IPs.
  if (requestLog.size > 5000) {
    const oldestKey = requestLog.keys().next().value;
    requestLog.delete(oldestKey);
  }
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

function sendError(res, status, error, message) {
  res.setHeader('Cache-Control', 'no-store');
  res.status(status).json({ error, message });
}

// Dev-only escape hatch — never used unless an operator explicitly sets
// TRANSLATE_MOCK_MODE=true in their own environment (e.g. local `vercel dev`
// without a real Google key). Must never be relied on as production
// behaviour; there is no default that turns this on.
function mockTranslate(text) {
  return `[ta-mock] ${text}`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendError(res, 405, 'method_not_allowed', 'Only POST is supported.');
  }

  const contentType = req.headers['content-type'] || '';
  if (!contentType.includes('application/json')) {
    return sendError(res, 400, 'invalid_content_type', 'Content-Type must be application/json.');
  }

  const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
  if (isRateLimited(ip)) {
    return sendError(res, 429, 'rate_limited', 'Too many translation requests. Please slow down and try again shortly.');
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (err) {
      return sendError(res, 400, 'invalid_request', 'Request body must be valid JSON.');
    }
  }
  body = body && typeof body === 'object' ? body : {};

  // Only contentId and text are ever read from the client. Language is
  // fixed server-side to en -> ta regardless of anything else the client
  // sends, and no client-supplied field can ever select a different
  // provider, target language, or credential.
  const { contentId, text } = body;

  if (typeof contentId !== 'string' || !contentId.trim()) {
    return sendError(res, 400, 'invalid_request', 'contentId is required and must be a non-empty string.');
  }
  if (typeof text !== 'string' || !text.trim()) {
    return sendError(res, 400, 'invalid_request', 'text is required and must be a non-empty string.');
  }
  if (text.length > MAX_TEXT_LENGTH) {
    return sendError(res, 400, 'invalid_request', `text exceeds the maximum length of ${MAX_TEXT_LENGTH} characters.`);
  }

  if (process.env.TRANSLATE_MOCK_MODE === 'true') {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      contentId,
      sourceLanguage: SOURCE_LANGUAGE,
      targetLanguage: TARGET_LANGUAGE,
      translatedText: mockTranslate(text),
      provider: 'mock',
    });
  }

  const apiKey = process.env.GOOGLE_CLOUD_TRANSLATE_API_KEY;
  if (!apiKey) {
    // Deliberately generic to the client — never states *why* it failed,
    // so a missing/misconfigured key is indistinguishable from a transient
    // provider outage from the browser's point of view.
    console.error('api/translate: GOOGLE_CLOUD_TRANSLATE_API_KEY is not set');
    return sendError(res, 500, 'translation_failed', 'Tamil translation is temporarily unavailable.');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const googleResponse = await fetch(GOOGLE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Header-based key, not a query parameter, per Google's own
        // guidance on avoiding key exposure in logs/URLs.
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        q: text,
        source: SOURCE_LANGUAGE,
        target: TARGET_LANGUAGE,
        format: 'text',
      }),
      signal: controller.signal,
    });

    if (!googleResponse.ok) {
      // Never forward Google's raw error body to the browser — it can
      // include account/billing detail. Log only the status for operator
      // diagnosis, never the request/response text.
      console.error(`api/translate: Google Cloud Translation returned HTTP ${googleResponse.status}`);
      return sendError(res, 502, 'translation_failed', 'Tamil translation is temporarily unavailable.');
    }

    let data;
    try {
      data = await googleResponse.json();
    } catch (err) {
      console.error('api/translate: Google Cloud Translation returned a non-JSON response');
      return sendError(res, 502, 'translation_failed', 'Tamil translation is temporarily unavailable.');
    }

    const translatedText = data?.data?.translations?.[0]?.translatedText;
    if (typeof translatedText !== 'string' || !translatedText.trim()) {
      console.error('api/translate: Google Cloud Translation returned an empty result');
      return sendError(res, 502, 'translation_failed', 'Tamil translation is temporarily unavailable.');
    }

    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json({
      contentId,
      sourceLanguage: SOURCE_LANGUAGE,
      targetLanguage: TARGET_LANGUAGE,
      translatedText,
      provider: 'google-cloud-translation',
    });
  } catch (err) {
    const isTimeout = err && err.name === 'AbortError';
    console.error(`api/translate: request failed (${isTimeout ? 'timeout' : (err && err.name) || 'unknown error'})`);
    return sendError(res, isTimeout ? 504 : 500, 'translation_failed', 'Tamil translation is temporarily unavailable.');
  } finally {
    clearTimeout(timeout);
  }
};
