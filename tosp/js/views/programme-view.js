// views/programme-view.js — the module journey, grouped by the ACTIVE
// programme's tracks. `tier` (from a track-specific route like
// /programme/evaluation) filters to a single track when it matches a track
// key; otherwise the full journey renders every track as its own section.
//
// The tracks themselves come from the programme UI descriptor, so this view
// carries no hardcoded PH (or Amazon) grouping.

import { PROGRAMME, MODULES, LESSONS } from '../data.js';
import { getActiveProgramme } from '../programmes/registry.js';
import { getProgress, getModuleStatus, getPreviousModule, isSignedOff } from '../services/progress-service.js';
import { calculateModuleProgress } from '../rules/progression.js';
import { getAttempts } from '../services/quiz-service.js';
import { moduleCard } from '../components/module-card.js';
import { statusBadge } from '../components/status-badge.js';

const STATE_LEGEND = [
  { status: 'locked', note: 'Not yet available' },
  { status: 'available', note: 'Ready to start' },
  { status: 'in-progress', note: 'Lessons underway' },
  { status: 'ready', note: 'Lessons complete — Skill Check not yet attempted' },
  { status: 'attempts-exhausted', note: 'No Skill Check attempts remain' },
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
  const ui = getActiveProgramme().ui;
  const progress = getProgress();
  const tracks = ui.tracks;

  // A `tier` param only narrows the view if it names one of this programme's
  // tracks; anything else (including 'all') shows the whole journey.
  const singleTrack = tracks.find((t) => t.key === params.tier) || null;
  const breadcrumbLabel = singleTrack ? singleTrack.statLabel : ui.journeyLabel;

  let sectionsHtml;
  if (singleTrack) {
    sectionsHtml = `<section class="panel"><div class="module-grid">${renderCards(MODULES.filter(singleTrack.filter), progress)}</div></section>`;
  } else {
    sectionsHtml = tracks.map((track) => `
      <section class="panel">
        <h2>${track.title}</h2>
        <p class="muted small">${track.subtitle}</p>
        <div class="module-grid">${renderCards(MODULES.filter(track.filter), progress)}</div>
      </section>
    `).join('');
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
        ${singleTrack ? `<button type="button" class="btn btn--ghost" data-nav="/programme">View Full Journey</button>` : ''}
      </div>
      <p class="muted">${PROGRAMME.title} — ${PROGRAMME.description}</p>
      ${legendHtml()}
    </section>

    ${sectionsHtml}
  `;
}
