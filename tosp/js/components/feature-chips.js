// components/feature-chips.js — compact row of chips communicating which
// optional learner-facing features a programme exposes (Tamil translation,
// Team Leader Sign-off, a final Practical Task). Driven entirely by
// programmeFeatureSummary() (programmes/registry.js) — no hardcoded
// programme ids here, so this renders correctly for any current or future
// programme without changes.

import { programmeFeatureSummary } from '../programmes/registry.js';

const CHIP_DEFS = [
  { key: 'tamil', label: 'Tamil Translation', icon: 'அ' },
  { key: 'signoff', label: 'Team Leader Sign-off', icon: '◔' },
  { key: 'practicalTask', label: 'Final Practical Task', icon: '✎' },
];

/** Returns an HTML string: one chip per feature the programme actually has, plus a muted "no extra features" line when none apply. */
export function featureChipsRow(programme) {
  const summary = programmeFeatureSummary(programme);
  const activeChips = CHIP_DEFS.filter((def) => summary[def.key]);

  if (activeChips.length === 0) {
    return '<p class="feature-chip-row__empty muted small">Standard modules, lessons, and Skill Checks — no Tamil translation, sign-off, or practical task for this programme.</p>';
  }

  return `
    <ul class="feature-chip-row" aria-label="Programme features">
      ${activeChips.map((def) => `
        <li class="feature-chip">
          <span aria-hidden="true">${def.icon}</span> ${def.label}
        </li>
      `).join('')}
    </ul>
  `;
}
