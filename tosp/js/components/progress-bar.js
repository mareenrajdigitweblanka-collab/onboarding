// components/progress-bar.js — reusable labelled progress bar.

/**
 * Returns an HTML string for a progress bar. `pct` is clamped to [0, 100].
 */
export function progressBar(pct, label) {
  const safePct = Math.max(0, Math.min(100, Math.round(pct)));
  const labelHtml = label ? `<div class="progress-bar__label">${label}</div>` : '';
  return `
    <div class="progress-bar">
      ${labelHtml}
      <div class="progress-bar__track" role="progressbar" aria-valuenow="${safePct}" aria-valuemin="0" aria-valuemax="100">
        <div class="progress-bar__fill" style="width: ${safePct}%"></div>
      </div>
      <div class="progress-bar__value">${safePct}%</div>
    </div>
  `;
}
