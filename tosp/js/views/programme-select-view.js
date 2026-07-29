// views/programme-select-view.js — card-based programme selection/landing
// screen. Lets a learner see every registered programme at a glance (name,
// purpose, module count, available features) and switch to one, without
// mixing progress or storage between programmes (see registry.js's
// setActiveProgramme — a full reload so each programme's own storage key is
// read fresh). This view is entirely data-driven off PROGRAMMES/registry.js;
// it carries no hardcoded per-programme id branching.

import { PROGRAMMES, getActiveProgrammeId, setActiveProgramme, programmeShortPurpose } from '../programmes/registry.js';
import { featureChipsRow } from '../components/feature-chips.js';

function programmeCard(programme, activeId) {
  const isActive = programme.id === activeId;
  const purpose = programmeShortPurpose(programme);

  return `
    <article class="programme-select-card ${isActive ? 'programme-select-card--active' : ''}" aria-label="${programme.shortTitle}${isActive ? ', currently active' : ''}">
      <div class="programme-select-card__top">
        <span class="programme-select-card__team">${programme.team}</span>
        ${isActive ? '<span class="badge badge--passed">Currently Active</span>' : ''}
      </div>
      <h2 class="programme-select-card__title">${programme.shortTitle}</h2>
      <p class="programme-select-card__purpose">${purpose}</p>
      <p class="programme-select-card__meta muted small"><span aria-hidden="true">☰</span> ${programme.config.totalModules} modules · Status ${programme.status}</p>
      ${featureChipsRow(programme)}
      <div class="programme-select-card__actions">
        ${isActive
          ? `<button type="button" class="btn btn--primary" data-nav="/dashboard">Continue to Dashboard</button>`
          : `<button type="button" class="btn btn--primary" data-select-programme="${programme.id}">Switch to ${programme.shortTitle}</button>`}
      </div>
    </article>
  `;
}

export function render(container) {
  const activeId = getActiveProgrammeId();
  const cardsHtml = PROGRAMMES.map((p) => programmeCard(p, activeId)).join('');

  container.innerHTML = `
    <section class="panel prototype-banner" role="note">
      <p><span aria-hidden="true">⚠</span> This is a frontend-only prototype. Each programme keeps its own separate, browser-stored progress — switching programmes never mixes or deletes another programme's progress.</p>
    </section>

    <section class="panel">
      <h1>Choose Your Onboarding Programme</h1>
      <p class="muted">Select the team programme you are onboarding into. You can switch programmes at any time from the sidebar — your progress in each programme is kept separate and safe.</p>
    </section>

    <section class="programme-select-grid">
      ${cardsHtml}
    </section>
  `;

  container.querySelectorAll('[data-select-programme]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setActiveProgramme(btn.getAttribute('data-select-programme'));
    });
  });
}
