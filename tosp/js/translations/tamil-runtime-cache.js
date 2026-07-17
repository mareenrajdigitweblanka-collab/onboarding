// translations/tamil-runtime-cache.js — the ONLY module allowed to touch
// the tosp.translation.cache.ta.v1 localStorage key. Mirrors storage.js's
// role for learner progress: a single, narrow read/write boundary, never
// throws, and treats corrupted or unexpected data as an empty cache rather
// than failing.
//
// STATUS: NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW. This cache exists
// only for the dormant Google Cloud Translation path (translation-provider.js
// / api/translate.js) — nothing in the current app calls it. Curriculum
// Tamil content is served from translations/tamil-approved.js instead; see
// docs/tamil-static-translation-map.md. Retained, not deleted, in case
// automatic translation is reintroduced later. Deliberately a separate key
// from tosp.prototype.v2 (progress) and tosp.ui.theme.v1 (theme) so
// clearing it can never affect either.

const CACHE_KEY = 'tosp.translation.cache.ta.v1';

function isValidEntry(entry) {
  return (
    entry &&
    typeof entry === 'object' &&
    typeof entry.contentId === 'string' &&
    typeof entry.translatedText === 'string' &&
    entry.translatedText.trim().length > 0
  );
}

/** Reads the whole cache, discarding any entries that don't match the
 * expected shape. Never throws — corrupted JSON or an unexpected shape is
 * treated as an empty cache. */
function readCache() {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return {};

    const clean = {};
    for (const [contentId, entry] of Object.entries(parsed)) {
      if (isValidEntry(entry)) clean[contentId] = entry;
    }
    return clean;
  } catch (err) {
    return {};
  }
}

function writeCache(cache) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    return true;
  } catch (err) {
    return false; // Fails silently, same policy as storage.js.saveProgress.
  }
}

/** Returns the cached record for a contentId, or null if absent/corrupted. */
export function getCachedTranslation(contentId) {
  const cache = readCache();
  return cache[contentId] || null;
}

/**
 * Records one automatic translation result. `sourceText` is stored
 * alongside the translation so callers can detect staleness later if the
 * English source content changes (see translation-service.getAutomaticTranslation).
 */
export function setCachedTranslation(contentId, { translatedText, sourceText, provider, generatedAt }) {
  const cache = readCache();
  cache[contentId] = {
    contentId,
    sourceText: sourceText || null,
    translatedText,
    status: 'AUTO_TRANSLATED', // dormant-path status literal, independent of the active TRANSLATION_STATUS enum
    provider: provider || null,
    generatedAt: generatedAt || null,
  };
  return writeCache(cache);
}

/** Clears every cached automatic translation. Does not touch approved
 * translations (tamil-approved.js), learner progress, or theme storage. */
export function clearTranslationCache() {
  try {
    window.localStorage.removeItem(CACHE_KEY);
    return true;
  } catch (err) {
    return false;
  }
}

/** All cached entries, for the Translation Review panel. */
export function listCachedTranslations() {
  return Object.values(readCache());
}
