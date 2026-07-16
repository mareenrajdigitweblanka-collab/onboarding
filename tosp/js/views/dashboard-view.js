// views/dashboard-view.js — landing screen: welcome, progress at a glance,
// readiness statuses, recommended next action, and a condensed source panel.

import { PROGRAMME, MODULES, LESSONS, QUIZZES } from '../data.js';
import { PROTOTYPE_WARNING, DEMO_LEARNER } from '../config.js';
import {
  getProgress,
  getOverallProgress,
  getModuleStatus,
  getPreviousModule,
  getAsinAllocationReadiness,
  getIndependentOwnershipReadiness,
  getMostRecentlyCompletedModule,
  getActivitySummary,
  isSignedOff,
} from '../services/progress-service.js';
import { determineNextModule } from '../rules/module-access.js';
import { calculateOverallProgress, calculateModuleProgress } from '../rules/progression.js';
import { getAttempts } from '../services/quiz-service.js';
import { moduleCard } from '../components/module-card.js';
import { statusBadge } from '../components/status-badge.js';

const EVALUATION_MODULES = MODULES.filter((m) => m.orderIndex <= 7);
const PH_MODULES = MODULES.filter((m) => m.orderIndex > 7);

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
  const progress = getProgress();
  const overall = getOverallProgress();
  const evaluationProgress = calculateOverallProgress(EVALUATION_MODULES, LESSONS, QUIZZES, progress);
  const phProgress = calculateOverallProgress(PH_MODULES, LESSONS, QUIZZES, progress);
  const nextModule = determineNextModule(MODULES, progress);
  const asinReady = getAsinAllocationReadiness();
  const ownershipReady = getIndependentOwnershipReadiness();
  const recentModule = getMostRecentlyCompletedModule();
  const activity = getActivitySummary();

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
    </section>

    <section class="panel-grid">
      <div class="panel stat-card">
        <h2>Overall Progress</h2>
        <p class="stat-card__value">${overall.overallPct}%</p>
        <p class="muted small">${overall.completedModuleCount} of ${overall.totalModules} modules complete</p>
      </div>
      <div class="panel stat-card">
        <h2>7-Day Evaluation</h2>
        <p class="stat-card__value">${evaluationProgress.overallPct}%</p>
        <p class="muted small">${evaluationProgress.completedModuleCount} of ${evaluationProgress.totalModules} days complete</p>
      </div>
      <div class="panel stat-card">
        <h2>PH Competency Path</h2>
        <p class="stat-card__value">${phProgress.overallPct}%</p>
        <p class="muted small">${phProgress.completedModuleCount} of ${phProgress.totalModules} steps complete</p>
      </div>
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
      <div class="panel">
        <h2>Readiness Status</h2>
        ${readinessRow('ASIN Allocation Readiness', asinReady, 'PH Learning Path Steps 1–6 fully complete — the minimum before ASIN ownership can be assigned (Source: PH/Sales BGCT Handbook v1.0 — Section 1).')}
        ${readinessRow('Independent Ownership Readiness', ownershipReady, 'All 11 PH Learning Path steps fully complete, in order (Source: PH/Sales BGCT Handbook v1.0 — Section 1, Best Practice).')}
      </div>
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

    <section class="panel source-summary">
      <div class="panel__header-row">
        <h2>Programme Source Reference</h2>
        <button type="button" class="btn btn--ghost" data-nav="/sources">View Full Source Reference</button>
      </div>
      <p class="muted small">
        Content is sourced from the Digitweb Lanka New Employee Onboarding Guide v1.0 and the
        PH/Sales BGCT Handbook v1.0 (status FINAL_TRUTH). Progress and sign-offs recorded here
        remain PROTOTYPE_ONLY.
      </p>
    </section>
  `;
}
