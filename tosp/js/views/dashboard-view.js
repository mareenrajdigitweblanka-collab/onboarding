// views/dashboard-view.js — landing screen: welcome, progress at a glance,
// per-track progress, (programme-defined) readiness statuses, recommended next
// action, and a condensed source panel.
//
// Programme-agnostic: the per-track stat cards, readiness rows, and source
// blurb all come from the ACTIVE programme's UI descriptor, so PH-specific
// items (7-Day Evaluation, PH Competency Path, ASIN readiness) never appear on
// the Amazon programme, which supplies its own tracks and an empty readiness
// list instead.

import { PROGRAMME, MODULES, LESSONS, QUIZZES } from '../data.js';
import { PROTOTYPE_WARNING, DEMO_LEARNER } from '../config.js';
import { getActiveProgramme } from '../programmes/registry.js';
import {
  getProgress,
  getOverallProgress,
  getModuleStatus,
  getPreviousModule,
  getMostRecentlyCompletedModule,
  getActivitySummary,
  isSignedOff,
} from '../services/progress-service.js';
import { determineNextModule } from '../rules/module-access.js';
import { calculateOverallProgress, calculateModuleProgress } from '../rules/progression.js';
import { getAttempts } from '../services/quiz-service.js';
import { moduleCard } from '../components/module-card.js';
import { statusBadge } from '../components/status-badge.js';
import { featureChipsRow } from '../components/feature-chips.js';

function readinessRow(label, ready, note) {
  return `
    <div class="readiness-row">
      <span class="readiness-row__icon" aria-hidden="true">${ready ? '✓' : '○'}</span>
      <div>
        <p class="readiness-row__label">${label}</p>
        <p class="readiness-row__note muted small">${note}</p>
      </div>
      ${statusBadge(ready ? 'passed' : 'locked')}
    </div>
  `;
}

export function render(container) {
  const activeProgramme = getActiveProgramme();
  const ui = activeProgramme.ui;
  const progress = getProgress();
  const overall = getOverallProgress();
  const nextModule = determineNextModule(MODULES, progress);
  const recentModule = getMostRecentlyCompletedModule();
  const activity = getActivitySummary();

  // One stat card per programme-defined track, computed from its module filter.
  const trackStatsHtml = ui.tracks.map((track) => {
    const trackModules = MODULES.filter(track.filter);
    const tp = calculateOverallProgress(trackModules, LESSONS, QUIZZES, progress);
    return `
      <div class="panel stat-card">
        <h2>${track.statLabel}</h2>
        <p class="stat-card__value">${tp.overallPct}%</p>
        <p class="muted small">${tp.completedModuleCount} of ${tp.totalModules} ${track.unitNoun} complete</p>
      </div>
    `;
  }).join('');

  // Readiness section only renders when the programme defines readiness rows.
  const readinessHtml = ui.readiness.length > 0
    ? `<div class="panel">
        <h2>Readiness Status</h2>
        ${ui.readiness.map((r) => readinessRow(r.label, r.evaluate(MODULES, progress), r.note)).join('')}
      </div>`
    : '';

  const moduleCardsHtml = MODULES.map((module) => {
    const status = getModuleStatus(module.id);
    const previous = getPreviousModule(module.id);
    const attempts = getAttempts(`${module.id}-quiz`);
    const lastAttempt = attempts[attempts.length - 1] || null;
    const mp = calculateModuleProgress(module.id, LESSONS, { id: `${module.id}-quiz` }, progress, !!module.requiresSignoff);
    return moduleCard({
      module,
      status,
      progressPct: mp.progressPct,
      lockReason: status === 'locked' && previous
        ? `Pass the "${previous.title}" Skill Check${previous.requiresSignoff ? ' and complete its Team Leader Sign-off' : ''} to unlock this module.`
        : null,
      quizResult: lastAttempt ? { scorePct: lastAttempt.scorePct, passed: lastAttempt.passed, attemptNumber: lastAttempt.attemptNumber } : null,
      signoffInfo: module.requiresSignoff ? { required: true, signedOff: isSignedOff(module.id) } : null,
      action: { label: status === 'locked' ? 'Locked' : 'Open Module', route: `/module/${module.id}` },
    });
  }).join('');

  container.innerHTML = `
    <section class="panel prototype-banner" role="note">
      <p><span aria-hidden="true">⚠</span> ${PROTOTYPE_WARNING}</p>
    </section>

    <section class="panel dashboard-welcome">
      <h1>Welcome back, ${DEMO_LEARNER.displayName}</h1>
      <p class="muted">${PROGRAMME.title} <span class="muted small">· v${PROGRAMME.version}</span></p>
      <p class="muted">${PROGRAMME.description}</p>
      ${featureChipsRow(activeProgramme)}
    </section>

    <section class="panel-grid">
      <div class="panel stat-card">
        <h2>Overall Progress</h2>
        <p class="stat-card__value">${overall.overallPct}%</p>
        <p class="muted small">${overall.completedModuleCount} of ${overall.totalModules} modules complete</p>
      </div>
      ${trackStatsHtml}
    </section>

    <section class="panel recommended-action">
      <h2>Recommended Next Action</h2>
      ${nextModule
        ? `<p>Continue with <strong>Module ${nextModule.orderIndex}: ${nextModule.title}</strong>.</p>
           <button type="button" class="btn btn--primary" data-nav="/module/${nextModule.id}">Continue: ${nextModule.title}</button>`
        : `<p>You have completed every module in the programme.</p>
           <button type="button" class="btn btn--primary" data-nav="/completion">View Completion Summary</button>`}
    </section>

    <section class="panel-grid">
      ${readinessHtml}
      <div class="panel">
        <h2>Activity Summary</h2>
        <dl class="summary-grid">
          <div><dt>Recently completed module</dt><dd>${recentModule ? recentModule.title : 'None yet'}</dd></div>
          <div><dt>Lessons completed</dt><dd>${activity.lessonsCompleted}</dd></div>
          <div><dt>Skill Check attempts</dt><dd>${activity.totalAttempts}</dd></div>
          <div><dt>Most recent activity</dt><dd>${activity.mostRecentActivity ? new Date(activity.mostRecentActivity).toLocaleString() : '—'}</dd></div>
        </dl>
      </div>
    </section>

    <section class="panel">
      <div class="panel__header-row">
        <h2>Programme Overview — ${MODULES.length} Modules</h2>
        <button type="button" class="btn btn--ghost" data-nav="/programme">View Full Journey</button>
      </div>
      <div class="module-grid">${moduleCardsHtml}</div>
    </section>

    ${ui.practicalTask ? `
    <section class="panel">
      <div class="panel__header-row">
        <h2>Final Practical Task</h2>
        <button type="button" class="btn btn--ghost" data-nav="${ui.practicalTask.route}">${ui.practicalTask.label}</button>
      </div>
      <p class="muted small">${ui.practicalTask.availabilityNote}</p>
    </section>
    ` : ''}

    <section class="panel source-summary">
      <div class="panel__header-row">
        <h2>Programme Source Reference</h2>
        <button type="button" class="btn btn--ghost" data-nav="/sources">View Full Source Reference</button>
      </div>
      <p class="muted small">${ui.dashboardSourceBlurb}</p>
    </section>
  `;
}
