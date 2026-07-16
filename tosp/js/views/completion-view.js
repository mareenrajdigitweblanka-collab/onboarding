// views/completion-view.js — programme completion summary.

import { PROGRAMME } from '../data.js';
import { CONFIG, PROTOTYPE_WARNING, DEMO_LEARNER } from '../config.js';
import { getProgress, getOverallProgress, programmeIsComplete, resetAllProgress } from '../services/progress-service.js';
import { confirmDialog } from '../components/confirm-dialog.js';
import { showToast } from '../components/toast.js';
import { navigate } from '../router.js';

export function render(container) {
  if (!programmeIsComplete()) {
    container.innerHTML = `
      <section class="panel">
        <h1>Programme Not Yet Complete</h1>
        <p class="muted">Pass every module's Skill Check (and complete Team Leader Sign-off where required) to reach the completion summary.</p>
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
    <section class="panel prototype-banner" role="note">
      <p><span aria-hidden="true">⚠</span> ${PROTOTYPE_WARNING}</p>
    </section>

    <section class="panel completion-panel">
      <h1><span aria-hidden="true">🎉</span> Congratulations, ${DEMO_LEARNER.displayName}!</h1>
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
  resetBtn.addEventListener('click', async () => {
    const confirmed = await confirmDialog({
      title: 'Reset demo progress?',
      message: 'This clears completed lessons, quiz attempts, sign-offs, and unlocked modules stored in this browser. This cannot be undone.',
      confirmLabel: 'Reset progress',
      cancelLabel: 'Cancel',
      danger: true,
    });
    if (!confirmed) return;
    resetAllProgress();
    showToast('Demo progress has been reset.', { type: 'success' });
    navigate('/dashboard');
  });
}
