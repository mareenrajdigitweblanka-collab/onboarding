// views/dashboard-view.js — landing screen: programme summary, overview, reset.

import {
  PROGRAMME, MODULES, LESSONS, SOURCE_DOCUMENTS,
  PROGRESSION_RULES, EVALUATION_SCORE_BANDS, EVALUATION_SCORE_BANDS_SOURCE,
  PROBATION_SCORE_GATES, PROBATION_SCORE_GATES_SOURCE,
} from '../data.js';
import { CONFIG, PROTOTYPE_WARNING } from '../config.js';
import {
  getProgress,
  getOverallProgress,
  resetAllProgress,
  getModuleStatus,
  getPreviousModule,
} from '../services/progress-service.js';
import { determineNextModule } from '../rules/module-access.js';
import { calculateModuleProgress } from '../rules/progression.js';
import { moduleCard } from '../components/module-card.js';
import { rerender } from '../router.js';

export function render(container) {
  const progress = getProgress();
  const overall = getOverallProgress();
  const nextModule = determineNextModule(MODULES, progress);

  const moduleCardsHtml = MODULES.map((module) => {
    const status = getModuleStatus(module.id);
    const mp = calculateModuleProgress(module.id, LESSONS, { id: `${module.id}-quiz` }, progress, !!module.requiresSignoff);
    const previous = getPreviousModule(module.id);
    return moduleCard({
      module,
      status,
      progressPct: mp.progressPct,
      lockReason: status === 'locked' && previous
        ? `Pass the "${previous.title}" Skill Check${previous.requiresSignoff ? ' and complete its Team Leader Sign-off' : ''} to unlock this module.`
        : null,
      action: { label: status === 'locked' ? 'Locked' : 'Open Module', route: `/module/${module.id}` },
    });
  }).join('');

  container.innerHTML = `
    <section class="panel prototype-banner">
      <p>⚠ ${PROTOTYPE_WARNING}</p>
    </section>

    <section class="panel">
      <h1>${PROGRAMME.title}</h1>
      <p class="muted">${PROGRAMME.description}</p>
      <dl class="summary-grid">
        <div><dt>Overall progress</dt><dd>${overall.overallPct}%</dd></div>
        <div><dt>Modules passed</dt><dd>${overall.completedModuleCount} / ${overall.totalModules}</dd></div>
        <div><dt>Current module</dt><dd>${nextModule ? nextModule.title : 'Programme complete'}</dd></div>
        <div><dt>Programme version</dt><dd>${PROGRAMME.version}</dd></div>
      </dl>
      ${nextModule
        ? `<button type="button" class="btn btn--primary" data-nav="/module/${nextModule.id}">Continue: ${nextModule.title}</button>`
        : `<button type="button" class="btn btn--primary" data-nav="/completion">View Completion Summary</button>`}
    </section>

    <section class="panel">
      <div class="panel__header-row">
        <h2>Programme Overview — ${MODULES.length} Modules</h2>
        <button type="button" class="btn btn--ghost" data-nav="/programme">View Full Journey</button>
      </div>
      <div class="module-grid">${moduleCardsHtml}</div>
    </section>

    <section class="panel">
      <h2>Programme &amp; Source Reference</h2>
      <p class="muted small">Programme content is sourced directly from the following documents. Progress, quiz results, and sign-offs recorded in this browser remain PROTOTYPE_ONLY and are not official onboarding evidence.</p>
      <ul class="reference-list">
        ${SOURCE_DOCUMENTS.map((d) => `<li><strong>${d.title}</strong> — ${d.version}, effective ${d.effectiveDate}. <span class="muted small">${d.confidentiality}</span></li>`).join('')}
      </ul>

      <h3>Key Progression Rules</h3>
      <ul class="reference-list">
        ${PROGRESSION_RULES.map((r) => `<li>${r.rule} <span class="muted small">— Source: ${r.source}</span></li>`).join('')}
      </ul>

      <h3>Day 7 Evaluation Score Interpretation</h3>
      <p class="muted small">Source: ${EVALUATION_SCORE_BANDS_SOURCE}</p>
      <table class="reference-table">
        <thead><tr><th>Score</th><th>Interpretation</th></tr></thead>
        <tbody>
          ${EVALUATION_SCORE_BANDS.map((b) => `<tr><td>${b.range}</td><td>${b.interpretation}</td></tr>`).join('')}
        </tbody>
      </table>

      <h3>Probation Progression Score Gates</h3>
      <p class="muted small">Source: ${PROBATION_SCORE_GATES_SOURCE}</p>
      <table class="reference-table">
        <thead><tr><th>Period</th><th>Minimum Score to Progress</th></tr></thead>
        <tbody>
          ${PROBATION_SCORE_GATES.map((g) => `<tr><td>${g.period}</td><td>${g.minimumScore} / 100</td></tr>`).join('')}
        </tbody>
      </table>
      <p class="muted small">These figures describe the source documents' whole-programme evaluation model; this prototype's per-module Skill Check passing percentage (below) is a separate, unsourced prototype default — see README.md.</p>
    </section>

    <section class="panel danger-zone">
      <h2>Demo Controls</h2>
      <p class="muted">Resetting removes only this prototype's local progress (storage key <code>tosp.prototype.v${CONFIG.storageVersion}</code>). This cannot be undone.</p>
      <button type="button" class="btn btn--danger" id="reset-progress-btn" ${CONFIG.allowResetDemoProgress ? '' : 'disabled'}>Reset Demo Progress</button>
    </section>
  `;

  const resetBtn = container.querySelector('#reset-progress-btn');
  resetBtn.addEventListener('click', () => {
    const confirmed = window.confirm(
      'Reset all demo progress? This clears completed lessons, quiz attempts, and unlocked modules stored in this browser.'
    );
    if (!confirmed) return;
    resetAllProgress();
    rerender();
  });
}
