// components/module-card.js — card summarising one module's state, quiz
// result, sign-off status, and source, with a primary action.

import { statusBadge } from './status-badge.js';
import { progressBar } from './progress-bar.js';

/**
 * status: 'locked' | 'available' | 'in-progress' | 'awaiting-signoff' | 'passed'
 * quizResult: { scorePct, passed, attemptNumber } | null — most recent attempt, if any.
 * signoffInfo: { required: boolean, signedOff: boolean } | null
 * action: { label, route } | null — rendered as a nav button when present.
 */
export function moduleCard({ module, status, progressPct, lockReason, quizResult, signoffInfo, action }) {
  const isLocked = status === 'locked';
  const lockNote = isLocked && lockReason
    ? `<p class="module-card__lock-reason"><span aria-hidden="true">🔒</span> ${lockReason}</p>`
    : '';

  const quizResultHtml = quizResult
    ? `<p class="module-card__quiz-result">
         <span aria-hidden="true">${quizResult.passed ? '✓' : '✗'}</span>
         Last attempt: ${quizResult.scorePct}% (attempt ${quizResult.attemptNumber}) — ${quizResult.passed ? 'Passed' : 'Not passed'}
       </p>`
    : '';

  const signoffHtml = signoffInfo && signoffInfo.required
    ? `<p class="module-card__signoff">
         <span aria-hidden="true">${signoffInfo.signedOff ? '✓' : '○'}</span>
         Team Leader Sign-off: ${signoffInfo.signedOff ? 'Confirmed (simulated)' : 'Required'}
       </p>`
    : '';

  const actionHtml = action
    ? `<button type="button" class="btn btn--primary" data-nav="${action.route}" ${isLocked ? 'disabled' : ''}>${action.label}</button>`
    : '';

  return `
    <article class="module-card module-card--${status}" aria-label="Module ${module.orderIndex}: ${module.title}, status ${status}">
      <div class="module-card__top">
        <span class="module-card__number">Module ${module.orderIndex}</span>
        ${statusBadge(status)}
      </div>
      <h3 class="module-card__title">${module.title}</h3>
      <p class="module-card__summary">${module.summary}</p>
      <p class="module-card__meta"><span aria-hidden="true">⏱</span> ${module.estimatedMinutes} min</p>
      ${progressBar(progressPct)}
      ${quizResultHtml}
      ${signoffHtml}
      ${lockNote}
      <p class="module-card__source muted small">Source: ${module.source}</p>
      <div class="module-card__actions">${actionHtml}</div>
    </article>
  `;
}
