// services/speech-service.js — thin wrapper around the browser Web Speech
// API (window.speechSynthesis / SpeechSynthesisUtterance). No external
// dependency, no network request, nothing spoken is ever persisted.
//
// Speech state is transient and process-local, same category as state.js —
// it must never be written to learner-progress storage.

let currentUtterance = null;
let state = 'idle'; // 'idle' | 'reading' | 'paused'
const listeners = new Set();

export function isSpeechSupported() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance === 'function';
}

function setState(next) {
  state = next;
  listeners.forEach((fn) => fn(state));
}

export function getSpeechState() {
  return state;
}

/** Subscribe to state changes ('idle' | 'reading' | 'paused'). Returns an unsubscribe fn. */
export function onSpeechStateChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Removes every subscriber. Called once per route render so a discarded
 * view's speaker control can never react to state changes after it's gone —
 * this app renders exactly one view at a time, so a full clear per
 * navigation is correct and prevents subscriber accumulation. */
export function clearSpeechListeners() {
  listeners.clear();
}

export function getAvailableVoices() {
  return isSpeechSupported() ? window.speechSynthesis.getVoices() : [];
}

/**
 * Speaks sanitized, caller-supplied plain text. Always stops any speech in
 * progress first. Returns false (and does nothing) if speech isn't
 * supported or the text is empty.
 */
export function speakText(text, options = {}) {
  if (!isSpeechSupported() || !text || !text.trim()) return false;

  stopSpeech();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || 1;
  if (options.lang) {
    utterance.lang = options.lang;
  }
  if (options.voiceName) {
    const voice = getAvailableVoices().find((v) => v.name === options.voiceName);
    if (voice) utterance.voice = voice;
  } else if (options.voice) {
    utterance.voice = options.voice;
  }
  utterance.onstart = () => setState('reading');
  utterance.onend = () => {
    currentUtterance = null;
    setState('idle');
  };
  utterance.onerror = () => {
    currentUtterance = null;
    setState('idle');
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
  return true;
}

// ---------------------------------------------------------------------------
// Tamil text-to-speech — built on the same speakText()/speechSynthesis
// primitives above, never a parallel speech mechanism. Voice preference:
// an installed ta-LK voice, then ta-IN, then the browser's default voice
// (still tagged with a ta-* lang so a Tamil-capable browser voice picks
// correct pronunciation even without an exact regional match).
// ---------------------------------------------------------------------------

const TAMIL_LANG_PREFERENCE = ['ta-LK', 'ta-IN'];

/**
 * Returns the best available installed Tamil voice, preferring ta-LK, then
 * ta-IN, then any voice whose lang starts with "ta". Returns null if no
 * Tamil voice is installed in this browser — callers must handle that
 * (see components/translation-control.js) rather than assume one exists.
 */
export function getTamilVoice() {
  if (!isSpeechSupported()) return null;
  const voices = getAvailableVoices();
  for (const lang of TAMIL_LANG_PREFERENCE) {
    const exact = voices.find((v) => v.lang === lang);
    if (exact) return exact;
  }
  return voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('ta')) || null;
}

/**
 * Speaks Tamil text using the best available Tamil voice, falling back to
 * the browser's default voice tagged with ta-LK (many engines can still
 * attempt correct pronunciation from the lang tag alone). Always stops any
 * speech in progress first (via speakText -> stopSpeech), so a Tamil
 * playback can never overlap a previous English (or Tamil) utterance.
 * Returns false if speech isn't supported or the text is empty — it never
 * throws and never silently speaks English text instead.
 */
export function speakTamil(text, options = {}) {
  if (!isSpeechSupported() || !text || !text.trim()) return false;
  const voice = getTamilVoice();
  return speakText(text, {
    rate: options.rate || 1,
    lang: voice ? voice.lang : TAMIL_LANG_PREFERENCE[0],
    voice: voice || undefined,
  });
}

export function pauseSpeech() {
  if (!isSpeechSupported()) return;
  if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
    window.speechSynthesis.pause();
    setState('paused');
  }
}

export function resumeSpeech() {
  if (!isSpeechSupported()) return;
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    setState('reading');
  }
}

export function stopSpeech() {
  if (isSpeechSupported()) {
    window.speechSynthesis.cancel();
  }
  currentUtterance = null;
  setState('idle');
}
