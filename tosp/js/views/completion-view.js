// views/completion-view.js — programme completion summary.

import { PROGRAMME, MODULES } from '../data.js';
import { CONFIG, PROTOTYPE_WARNING, DEMO_LEARNER } from '../config.js';
import { getProgress, getOverallProgress, programmeIsComplete, resetAllProgress } from '../services/progress-service.js';
import { navigate } from '../router.js';

export function render(container) {
  if (!programmeIsComplete()) {
    container.innerHTML = `
      <section class="panel">
        <h1>Programme Not Yet Complete</h1>
        <p class="muted">Pass every module's Skill Check to reach the completion summary.</p>
        <button type="button" class="btn btn--primary" data-nav="/programme">View Programme Journey</button>
      </section>
    `;
    return;
  }

  const progress = getProgress();
  const overall = getOverallProgress();
  const completedDate = progress.completedAt
    ? new Date(progress.completedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
    : '—';

  container.innerHTML = `
    <section class="panel prototype-banner">
      <p>⚠ ${PROTOTYPE_WARNING}</p>
    </section>

    <section class="panel completion-panel">
      <h1>🎉 Congratulations, ${DEMO_LEARNER.displayName}!</h1>
      <p class="muted">You have completed the ${PROGRAMME.title}.</p>
      <dl class="summary-grid">
        <div><dt>Programme</dt><dd>${PROGRAMME.title}</dd></div>
        <div><dt>Version</dt><dd>${PROGRAMME.version}</dd></div>
        <div><dt>Completion date</dt><dd>${completedDate}</dd></div>
        <div><dt>Modules completed</dt><dd>${overall.completedModuleCount} / ${overall.totalModules}</dd></div>
      </dl>
      <p class="muted small">This completion summary, including all quiz results and Team Leader Sign-offs above, is generated and stored entirely in this browser (PROTOTYPE_ONLY) and is not official onboarding evidence.</p>
    </section>

    <section class="panel danger-zone">
      <h2>Demo Controls</h2>
      <button type="button" class="btn btn--danger" id="reset-progress-btn" ${CONFIG.allowResetDemoProgress ? '' : 'disabled'}>Reset Demo Progress</button>
    </section>
  `;

  const resetBtn = container.querySelector('#reset-progress-btn');
  resetBtn.addEventListener('click', () => {
    const confirmed = window.confirm('Reset all demo progress? This clears completed lessons, quiz attempts, and unlocked modules stored in this browser.');
    if (!confirmed) return;
    resetAllProgress();
    navigate('/dashboard');
  });
}
