// views/translation-review-view.js — diagnostic panel for the (currently
// dormant) automatic-translation path.
//
// STATUS: NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW. As of the static
// local-translation implementation, curriculum Tamil content (module/
// lesson/quiz text) is resolved entirely from translations/tamil-approved.js
// — see docs/tamil-static-translation-map.md. Nothing in the current app
// calls the Google Cloud Translation proxy (api/translate.js) or writes to
// tosp.translation.cache.ta.v1 during normal use, so this panel will
// normally show zero entries. It is retained, not deleted, in case
// automatic translation is reintroduced later for content that has no
// stored Tamil translation yet.

import { listCachedTranslations, clearTranslationCache } from '../translations/tamil-runtime-cache.js';
import { TAMIL_APPROVED_TRANSLATIONS } from '../translations/tamil-approved.js';
import {
  isPrototypeApproved,
  markPrototypeApproved,
  unmarkPrototypeApproved,
  clearPrototypeApprovals,
} from '../translations/prototype-approvals.js';
import { confirmDialog } from '../components/confirm-dialog.js';
import { showToast } from '../components/toast.js';
import { rerender } from '../router.js';

async function copyToClipboard(text, label) {
  try {
    await navigator.clipboard.writeText(text);
    showToast(`${label} copied.`, { type: 'success', duration: 2500 });
  } catch (err) {
    showToast('Could not copy to clipboard in this browser.', { type: 'warning', duration: 3000 });
  }
}

export function render(container) {
  const cached = listCachedTranslations();
  const localCount = Object.keys(TAMIL_APPROVED_TRANSLATIONS).length;

  const rowsHtml = cached.map((entry) => {
    const flagged = isPrototypeApproved(entry.contentId);
    return `
      <li class="translation-review-row ${flagged ? 'translation-review-row--approved' : ''}">
        <p class="translation-review-row__id small muted">${entry.contentId}</p>
        <div class="translation-review-row__pair">
          <div>
            <p class="translation-review-row__label small muted">English (source)</p>
            <p class="translation-review-row__text" data-en-text="${entry.contentId}">${entry.sourceText || '(source text not recorded with this cache entry)'}</p>
            <button type="button" class="btn btn--ghost btn--small" data-copy-en="${entry.contentId}">Copy English</button>
          </div>
          <div>
            <p class="translation-review-row__label small muted">Tamil (from the dormant automatic-translation path)</p>
            <p class="translation-review-row__text translation-review-row__text--ta" lang="ta" data-ta-text="${entry.contentId}">${entry.translatedText}</p>
            <button type="button" class="btn btn--ghost btn--small" data-copy-ta="${entry.contentId}">Copy Tamil</button>
          </div>
        </div>
        <p class="translation-review-row__meta small muted">Provider: ${entry.provider || 'unknown'} · Generated: ${entry.generatedAt || 'unknown'}</p>
        ${flagged
          ? `<p class="badge badge--demo">PROTOTYPE_APPROVAL_ONLY</p><button type="button" class="btn btn--ghost btn--small" data-unapprove="${entry.contentId}">Unflag</button>`
          : `<button type="button" class="btn btn--primary btn--small" data-approve="${entry.contentId}">Flag as candidate for tamil-approved.js</button>`}
      </li>
    `;
  }).join('');

  container.innerHTML = `
    <div class="breadcrumb">
      <button type="button" class="breadcrumb__link" data-nav="/dashboard">Dashboard</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <span class="breadcrumb__current">Translation Review</span>
    </div>

    <section class="panel prototype-banner" role="note">
      <p><span aria-hidden="true">ℹ</span> <strong>This panel is not used by the current app.</strong>
      Module, lesson, and quiz Tamil content is now served entirely from a stored local file
      (<code>translations/tamil-approved.js</code>, ${localCount} entries) — see
      <code>docs/tamil-static-translation-map.md</code>. Nothing in the app currently calls Google Cloud Translation, so
      the list below will normally be empty. This panel is retained only in case automatic translation is reintroduced
      later for content that has no stored Tamil yet.</p>
    </section>

    <section class="panel">
      <h1>Translation Review</h1>
      <p class="muted small">Stored local translations on file: ${localCount}</p>
    </section>

    <section class="panel">
      <h2>Generated via the dormant automatic-translation path (${cached.length})</h2>
      ${cached.length > 0
        ? `<ul class="translation-review-list">${rowsHtml}</ul>`
        : `<p class="muted">Empty, as expected — nothing in the current app calls the automatic-translation proxy.</p>`}
    </section>

    <section class="panel danger-zone">
      <h2>Cache Maintenance</h2>
      <p class="muted small">
        Clears only the (currently unused) automatic-translation cache (<code>tosp.translation.cache.ta.v1</code>) and
        this browser's curation flags. This is separate from "Reset Demo Progress" — it never touches learner
        progress, quiz attempts, sign-offs, or the theme preference.
      </p>
      <button type="button" class="btn btn--danger" id="clear-translation-cache-btn">Clear Translation Cache</button>
    </section>
  `;

  container.querySelectorAll('[data-copy-en]').forEach((btn) => {
    const id = btn.getAttribute('data-copy-en');
    const text = container.querySelector(`[data-en-text="${id}"]`)?.textContent || '';
    btn.addEventListener('click', () => copyToClipboard(text, 'English text'));
  });
  container.querySelectorAll('[data-copy-ta]').forEach((btn) => {
    const id = btn.getAttribute('data-copy-ta');
    const text = container.querySelector(`[data-ta-text="${id}"]`)?.textContent || '';
    btn.addEventListener('click', () => copyToClipboard(text, 'Tamil text'));
  });
  container.querySelectorAll('[data-approve]').forEach((btn) => {
    const id = btn.getAttribute('data-approve');
    btn.addEventListener('click', () => {
      markPrototypeApproved(id);
      showToast('Flagged in this browser as a promotion candidate.', { type: 'success', duration: 5000 });
      rerender();
    });
  });
  container.querySelectorAll('[data-unapprove]').forEach((btn) => {
    const id = btn.getAttribute('data-unapprove');
    btn.addEventListener('click', () => {
      unmarkPrototypeApproved(id);
      rerender();
    });
  });

  const clearBtn = container.querySelector('#clear-translation-cache-btn');
  clearBtn.addEventListener('click', async () => {
    const confirmed = await confirmDialog({
      title: 'Clear translation cache?',
      message: 'This removes any cached entries from the (currently unused) automatic-translation path and any curation flags. Learner progress is not affected. This cannot be undone.',
      confirmLabel: 'Clear cache',
      cancelLabel: 'Cancel',
      danger: true,
    });
    if (!confirmed) return;
    clearTranslationCache();
    clearPrototypeApprovals();
    showToast('Translation cache cleared.', { type: 'success' });
    rerender();
  });
}
