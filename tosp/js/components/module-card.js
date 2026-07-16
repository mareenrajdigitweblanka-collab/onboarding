// components/module-card.js — card summarising one module's state and action.

import { statusBadge } from './status-badge.js';
import { progressBar } from './progress-bar.js';

/**
 * status: 'locked' | 'available' | 'in-progress' | 'passed'
 * action: { label, route } | null — rendered as a nav button when present.
 */
export function moduleCard({ module, status, progressPct, lockReason, action }) {
  const isLocked = status === 'locked';
  const lockNote = isLocked && lockReason
    ? `<p class="module-card__lock-reason">🔒 ${lockReason}</p>`
    : '';

  const actionHtml = action
    ? `<button type="button" class="btn btn--primary" data-nav="${action.route}" ${isLocked ? 'disabled' : ''}>${action.label}</button>`
    : '';

  return `
    <article class="module-card module-card--${status}" aria-label="Module ${module.orderIndex}: ${module.title}">
      <div class="module-card__top">
        <span class="module-card__number">Module ${module.orderIndex}</span>
        ${statusBadge(status)}
      </div>
      <h3 class="module-card__title">${module.title}</h3>
      <p class="module-card__summary">${module.summary}</p>
      <p class="module-card__meta">⏱ ${module.estimatedMinutes} min</p>
      ${progressBar(progressPct)}
      ${lockNote}
      <div class="module-card__actions">${actionHtml}</div>
    </article>
  `;
}
