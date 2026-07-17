// components/translation-control.js — reusable "Translate to Tamil" control
// for one meaningful content block (a module/lesson/quiz title, a
// paragraph, or a quiz question together with its answer options). All
// translation data access goes through services/translation-service.js;
// this component only paints text into DOM nodes the caller supplies and
// never touches scoring, option ids, or quiz state.
//
// STATIC LOCAL TRANSLATION ONLY: lookup is synchronous and immediate — no
// network request, no loading state, no automatic-translation provider is
// involved. See docs/tamil-static-translation-map.md.
//
// One control instance can cover multiple "targets" (e.g. a question prompt
// + 4 option labels) that translate and display together as a single block,
// per the "one button per meaningful content block" requirement.

import { getStaticTranslation, getTranslationStatus } from '../services/translation-service.js';
import { TRANSLATION_STATUS, TRANSLATION_UNAVAILABLE_MESSAGE } from '../translations/translation-status.js';
import { speakTamil, stopSpeech, isSpeechSupported, getTamilVoice } from '../services/speech-service.js';

/**
 * Renders the control shell. Never paints or looks anything up — purely
 * markup, mirroring speaker-control.js's render/wire split.
 */
export function renderTranslationControl(idPrefix, label = 'Tamil translation for this content') {
  return `
    <div class="translation-control" id="${idPrefix}" aria-label="${label}">
      <div class="translation-control__row">
        <button type="button" class="btn btn--ghost btn--small translation-control__btn" data-t-action="translate">
          Translate to Tamil
        </button>
        <button type="button" class="btn btn--ghost btn--small translation-control__btn" data-t-action="show-english" hidden>
          Show English
        </button>
        <button
          type="button"
          class="btn btn--ghost btn--small translation-control__btn"
          data-t-action="read-tamil"
          hidden
          ${isSpeechSupported() ? '' : 'disabled'}
        >
          🔊 Read Tamil
        </button>
      </div>
      <p class="translation-control__message muted small" data-t-message role="status" aria-live="polite"></p>
    </div>
  `;
}

/**
 * Wires the control rendered above.
 *
 * targets: Array<{ contentId: string, sourceText: string, setText: (text: string, lang: 'en'|'ta') => void }>
 *   setText is called with the English text (on mount / Show English) or
 *   the resolved Tamil text (once translated), plus which language that is
 *   — the caller owns the DOM shape, this component never assumes one, but
 *   callers should set `lang` on the painted element for accessibility and
 *   Tamil typography (see css/styles.css [lang="ta"]).
 * options.onLanguageChange?: (language: 'en' | 'ta') => void — called
 *   whenever this block's displayed language changes, so a host view can
 *   stop/gate its own English "Read Aloud" control (which must never read
 *   stale English while this block visibly shows Tamil).
 *
 * Returns a no-op cleanup function (kept for a consistent contract with
 * other wire*Control functions used by the same views, e.g.
 * wireSpeakerControl) — there is nothing async left to invalidate now that
 * lookup is synchronous.
 */
export function wireTranslationControl(container, idPrefix, targets, options = {}) {
  const root = container.querySelector(`#${idPrefix}`);
  if (!root || !targets || targets.length === 0) return () => {};

  const translateBtn = root.querySelector('[data-t-action="translate"]');
  const showEnglishBtn = root.querySelector('[data-t-action="show-english"]');
  const readTamilBtn = root.querySelector('[data-t-action="read-tamil"]');
  const messageEl = root.querySelector('[data-t-message]');
  const onLanguageChange = typeof options.onLanguageChange === 'function' ? options.onLanguageChange : () => {};

  let displayLanguage = 'en';
  let resolvedTamil = null; // Array<{ contentId, text }> aligned with targets, once resolved

  function paintEnglish() {
    targets.forEach((t) => t.setText(t.sourceText, 'en'));
  }

  function paintTamil() {
    targets.forEach((t, i) => t.setText(resolvedTamil[i].text, 'ta'));
  }

  function refreshButtons() {
    translateBtn.hidden = displayLanguage === 'ta';
    showEnglishBtn.hidden = displayLanguage !== 'ta';
    readTamilBtn.hidden = displayLanguage !== 'ta';
    readTamilBtn.disabled = !isSpeechSupported() || displayLanguage !== 'ta' || !resolvedTamil;
  }

  function showEnglish() {
    stopSpeech();
    displayLanguage = 'en';
    resolvedTamil = null;
    paintEnglish();
    refreshButtons();
    messageEl.textContent = '';
    onLanguageChange('en');
  }

  function showTamil() {
    const results = targets.map((t) => ({
      contentId: t.contentId,
      status: getTranslationStatus(t.contentId, t.sourceText),
      record: getStaticTranslation(t.contentId, t.sourceText),
    }));

    const missing = results.find((r) => r.status === TRANSLATION_STATUS.TRANSLATION_UNAVAILABLE);
    if (missing) {
      messageEl.innerHTML = '';
      const taLine = document.createElement('span');
      taLine.lang = 'ta';
      taLine.textContent = TRANSLATION_UNAVAILABLE_MESSAGE.ta;
      const enLine = document.createElement('span');
      enLine.lang = 'en';
      enLine.className = 'translation-control__message-en muted small';
      enLine.textContent = TRANSLATION_UNAVAILABLE_MESSAGE.en;
      messageEl.appendChild(taLine);
      messageEl.appendChild(document.createElement('br'));
      messageEl.appendChild(enLine);
      return;
    }

    resolvedTamil = results.map((r, i) => ({ contentId: targets[i].contentId, text: r.record.tamilText }));
    displayLanguage = 'ta';
    paintTamil();
    refreshButtons();
    messageEl.textContent = '';
    onLanguageChange('ta');
  }

  translateBtn.addEventListener('click', showTamil);
  showEnglishBtn.addEventListener('click', showEnglish);
  readTamilBtn.addEventListener('click', () => {
    if (!resolvedTamil) return;
    const text = resolvedTamil.map((r) => r.text).join('. ');
    const spoke = speakTamil(text);
    if (!spoke) {
      messageEl.textContent = getTamilVoice()
        ? 'Tamil speech could not be started. The Tamil text is still shown above.'
        : 'No Tamil voice is installed in this browser. The Tamil text is still shown above.';
    }
  });

  refreshButtons();

  return () => {};
}
