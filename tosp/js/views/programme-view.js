// views/programme-view.js — full eight-module journey with lock reasons.

import { PROGRAMME, MODULES, LESSONS } from '../data.js';
import { getProgress, getModuleStatus, getPreviousModule } from '../services/progress-service.js';
import { calculateModuleProgress } from '../rules/progression.js';
import { moduleCard } from '../components/module-card.js';

export function render(container) {
  const progress = getProgress();

  const cardsHtml = MODULES.map((module) => {
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
    <section class="panel">
      <div class="panel__header-row">
        <h1>Programme Journey</h1>
        <button type="button" class="btn btn--ghost" data-nav="/dashboard">Back to Dashboard</button>
      </div>
      <p class="muted">${PROGRAMME.title} — ${PROGRAMME.description}</p>
    </section>

    <section class="panel">
      <div class="module-grid">${cardsHtml}</div>
    </section>
  `;
}
