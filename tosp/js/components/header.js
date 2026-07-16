// components/header.js — persistent app header: brand, demo learner, nav, overall progress.

import { PROJECT, DEMO_LEARNER } from '../config.js';
import { progressBar } from './progress-bar.js';
import { getOverallProgress } from '../services/progress-service.js';

export function renderHeader(activeRoute) {
  const { overallPct, completedModuleCount, totalModules } = getOverallProgress();

  return `
    <div class="header__row">
      <div class="header__brand">
        <span class="header__project">${PROJECT.name}</span>
        <span class="header__code">${PROJECT.code}</span>
      </div>
      <nav class="header__nav" aria-label="Primary">
        <button type="button" class="nav-link ${activeRoute === 'dashboard' ? 'nav-link--active' : ''}" data-nav="/dashboard">Dashboard</button>
        <button type="button" class="nav-link ${activeRoute === 'programme' ? 'nav-link--active' : ''}" data-nav="/programme">Programme</button>
      </nav>
      <div class="header__learner">
        <span class="header__learner-name">${DEMO_LEARNER.displayName}</span>
        <span class="badge badge--demo">${DEMO_LEARNER.status}</span>
      </div>
    </div>
    <div class="header__progress">
      ${progressBar(overallPct, `Overall progress — ${completedModuleCount}/${totalModules} modules passed`)}
    </div>
  `;
}
