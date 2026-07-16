// components/speaker-control.js — reusable Read Aloud / Pause / Resume /
// Stop control. Views supply the exact text to read via a `getText()`
// callback (a clean text-extraction boundary) — this component never reads
// document.body/innerText, so it can never accidentally speak navigation,
// buttons, or unrelated page chrome.

import {
  isSpeechSupported,
  speakText,
  pauseSpeech,
  resumeSpeech,
  stopSpeech,
  getSpeechState,
  onSpeechStateChange,
} from '../services/speech-service.js';

/** Renders the control shell. Never auto-speaks — purely markup. */
export function renderSpeakerControl(idPrefix, label = 'Listen to this content') {
  if (!isSpeechSupported()) {
    return `
      <div class="speaker-control speaker-control--unsupported" id="${idPrefix}">
        <p class="speaker-control__status muted small" role="status">🔇 Speech is not supported in this browser.</p>
      </div>
    `;
  }

  return `
    <div class="speaker-control" id="${idPrefix}" aria-label="${label}">
      <div class="speaker-control__buttons">
        <button type="button" class="btn btn--ghost speaker-control__btn" data-speech-action="read" aria-label="Read this content aloud">🔊 Read Aloud</button>
        <button type="button" class="btn btn--ghost speaker-control__btn" data-speech-action="pause" aria-label="Pause reading" disabled>⏸ Pause</button>
        <button type="button" class="btn btn--ghost speaker-control__btn" data-speech-action="resume" aria-label="Resume reading" disabled>▶ Resume</button>
        <button type="button" class="btn btn--ghost speaker-control__btn" data-speech-action="stop" aria-label="Stop reading" disabled>⏹ Stop</button>
        <label class="speaker-control__rate">
          <span>Speed</span>
          <select data-speech-rate aria-label="Reading speed">
            <option value="0.75">0.75×</option>
            <option value="1" selected>1×</option>
            <option value="1.25">1.25×</option>
            <option value="1.5">1.5×</option>
          </select>
        </label>
      </div>
      <p class="speaker-control__status muted small" role="status" aria-live="polite">Ready to read.</p>
    </div>
  `;
}

const STATUS_TEXT = { idle: 'Ready to read.', reading: 'Reading…', paused: 'Paused.' };

/**
 * Wires the control rendered above. `getText` is called only when Read
 * Aloud is pressed (never on mount), so nothing is spoken automatically.
 * Returns an unsubscribe function.
 */
export function wireSpeakerControl(container, idPrefix, getText) {
  const root = container.querySelector(`#${idPrefix}`);
  if (!root || !isSpeechSupported()) return () => {};

  const readBtn = root.querySelector('[data-speech-action="read"]');
  const pauseBtn = root.querySelector('[data-speech-action="pause"]');
  const resumeBtn = root.querySelector('[data-speech-action="resume"]');
  const stopBtn = root.querySelector('[data-speech-action="stop"]');
  const rateSelect = root.querySelector('[data-speech-rate]');
  const statusEl = root.querySelector('.speaker-control__status');

  function updateState(state) {
    statusEl.textContent = STATUS_TEXT[state] || STATUS_TEXT.idle;
    readBtn.disabled = state === 'reading' || state === 'paused';
    pauseBtn.disabled = state !== 'reading';
    resumeBtn.disabled = state !== 'paused';
    stopBtn.disabled = state === 'idle';
  }

  readBtn.addEventListener('click', () => {
    const rate = parseFloat(rateSelect.value) || 1;
    speakText(getText(), { rate });
  });
  pauseBtn.addEventListener('click', () => pauseSpeech());
  resumeBtn.addEventListener('click', () => resumeSpeech());
  stopBtn.addEventListener('click', () => stopSpeech());

  updateState(getSpeechState());
  return onSpeechStateChange(updateState);
}
