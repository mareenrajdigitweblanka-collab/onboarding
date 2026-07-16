// views/programme-view.js — the module journey, filterable by tier:
// 'evaluation' (Modules 1-7, the 7-Day BGCT plan), 'ph' (Modules 8-18, the
// PH Competency Path), or 'all' (both, in clearly separated sections).

import { PROGRAMME, MODULES, LESSONS } from '../data.js';
import { getProgress, getModuleStatus, getPreviousModule, isSignedOff } from '../services/progress-service.js';
import { calculateModuleProgress } from '../rules/progression.js';
import { getAttempts } from '../services/quiz-service.js';
import { moduleCard } from '../components/module-card.js';
import { statusBadge } from '../components/status-badge.js';

const EVALUATION_TIER = { key: 'evaluation', title: '7-Day Evaluation Track', filter: (m) => m.orderIndex <= 7 };
const PH_TIER = { key: 'ph', title: 'PH Competency Path', filter: (m) => m.orderIndex > 7 };

const STATE_LEGEND = [
  { status: 'locked', note: 'Not yet available' },
  { status: 'available', note: 'Ready to start' },
  { status: 'in-progress', note: 'Lessons underway' },
  { status: 'awaiting-signoff', note: 'Quiz passed, sign-off pending' },
  { status: 'passed', note: 'Fully complete' },
];

function renderCards(modules, progress) {
  return modules.map((module) => {
    const status = getModuleStatus(module.id);
    const mp = calculateModuleProgress(module.id, LESSONS, { id: `${module.id}-quiz` }, progress, !!module.requiresSignoff);
    const previous = getPreviousModule(module.id);
    const attempts = getAttempts(`${module.id}-quiz`);
    const lastAttempt = attempts[attempts.length - 1] || null;

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
}

function legendHtml() {
  return `
    <div class="state-legend" aria-hidden="false">
      ${STATE_LEGEND.map((item) => `
        <span class="state-legend__item">
          ${statusBadge(item.status)}
          <span class="muted small">${item.note}</span>
        </span>
      `).join('')}
    </div>
  `;
}

export function render(container, params = {}) {
  const progress = getProgress();
  const tier = params.tier || 'all';

  const breadcrumbLabel = tier === 'evaluation' ? '7-Day Evaluation' : tier === 'ph' ? 'PH Competency Path' : 'Programme Journey';

  let sectionsHtml;
  if (tier === 'evaluation') {
    sectionsHtml = `<section class="panel"><div class="module-grid">${renderCards(MODULES.filter(EVALUATION_TIER.filter), progress)}</div></section>`;
  } else if (tier === 'ph') {
    sectionsHtml = `<section class="panel"><div class="module-grid">${renderCards(MODULES.filter(PH_TIER.filter), progress)}</div></section>`;
  } else {
    sectionsHtml = `
      <section class="panel">
        <h2>${EVALUATION_TIER.title}</h2>
        <p class="muted small">Modules 1–7 · Company-wide BGCT foundation.</p>
        <div class="module-grid">${renderCards(MODULES.filter(EVALUATION_TIER.filter), progress)}</div>
      </section>
      <section class="panel">
        <h2>${PH_TIER.title}</h2>
        <p class="muted small">Modules 8–18 · Department-specific sales competency, each requiring Team Leader Sign-off.</p>
        <div class="module-grid">${renderCards(MODULES.filter(PH_TIER.filter), progress)}</div>
      </section>
    `;
  }

  container.innerHTML = `
    <div class="breadcrumb">
      <button type="button" class="breadcrumb__link" data-nav="/dashboard">Dashboard</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <span class="breadcrumb__current">${breadcrumbLabel}</span>
    </div>

    <section class="panel">
      <div class="panel__header-row">
        <h1>${breadcrumbLabel}</h1>
        ${tier !== 'all' ? `<button type="button" class="btn btn--ghost" data-nav="/programme">View Full Journey</button>` : ''}
      </div>
      <p class="muted">${PROGRAMME.title} — ${PROGRAMME.description}</p>
      ${legendHtml()}
    </section>

    ${sectionsHtml}
  `;
}
