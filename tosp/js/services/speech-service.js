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
  if (options.voiceName) {
    const voice = getAvailableVoices().find((v) => v.name === options.voiceName);
    if (voice) utterance.voice = voice;
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
