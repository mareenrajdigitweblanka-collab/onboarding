// views/practical-task-view.js — final practical task screen.
//
// PROTOTYPE_ONLY. Currently only the Digital Marketing Team programme
// defines PRACTICAL_TASK (see data.js); every other programme's content
// bundle leaves it undefined, and app.js's route guard redirects to the
// dashboard in that case, so this view never renders for PH/Amazon/eBay.
//
// This screen is DISPLAYED and COMPLETABLE but is deliberately NOT a
// completion gate: the checked/unchecked state below is transient,
// in-memory-only UI state local to this module (matches the pattern used by
// state.js for other non-persisted UI state) — it is never written to
// storage.js, never read by rules/module-access.js's isProgrammeComplete,
// and resets on a full page refresh. Programme completion remains exactly
// "all required lessons complete + all module Skill Checks passed", per the
// user-confirmed completion rule.

import { PRACTICAL_TASK } from '../data.js';
import { renderSpeakerControl, wireSpeakerControl } from '../components/speaker-control.js';

// Transient, in-memory-only — resets on full page refresh, intentionally
// not persisted (see header note above).
const checkedItemIds = new Set();

function allItems() {
  return (PRACTICAL_TASK.sections || []).flatMap((s) => s.items);
}

function sectionHtml(section) {
  const itemsHtml = section.items.map((item) => `
    <li class="reference-list__item practical-task-item">
      <label class="practical-task-item__label">
        <input type="checkbox" data-pt-item="${item.id}" ${checkedItemIds.has(item.id) ? 'checked' : ''} />
        <span>${item.text}</span>
      </label>
      <p class="muted small">Source: ${item.source}</p>
    </li>
  `).join('');

  return `
    <section class="panel">
      <h2>${section.title}</h2>
      <ul class="reference-list">${itemsHtml}</ul>
    </section>
  `;
}

export function render(container) {
  if (!PRACTICAL_TASK) {
    container.innerHTML = `
      <section class="panel">
        <h1>Practical Task Not Available</h1>
        <button type="button" class="btn btn--primary" data-nav="/dashboard">Back to Dashboard</button>
      </section>
    `;
    return;
  }

  const total = allItems().length;
  const speechText = `${PRACTICAL_TASK.title}. ${PRACTICAL_TASK.intro}`;

  container.innerHTML = `
    <div class="breadcrumb">
      <button type="button" class="breadcrumb__link" data-nav="/dashboard">Dashboard</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <span class="breadcrumb__current">Final Practical Task</span>
    </div>

    <section class="panel prototype-banner" role="note">
      <p><span aria-hidden="true">⚠</span> <span class="badge badge--demo">${PRACTICAL_TASK.status}</span> ${PRACTICAL_TASK.closingNote}</p>
    </section>

    <section class="panel">
      <h1>${PRACTICAL_TASK.title}</h1>
      <p class="muted">${PRACTICAL_TASK.intro}</p>
      ${renderSpeakerControl('practical-task-speaker', 'Listen to the practical task introduction')}
      <p class="muted small" id="practical-task-progress-text">${checkedItemIds.size} of ${total} checklist items marked as considered.</p>
      <p class="muted small">Completing this task is optional — it does not gate programme completion. Programme completion is reached once every required lesson is complete and every module Skill Check is passed.</p>
    </section>

    ${(PRACTICAL_TASK.sections || []).map(sectionHtml).join('')}

    <section class="panel">
      <button type="button" class="btn btn--primary" data-nav="/dashboard">Back to Dashboard</button>
    </section>
  `;

  wireSpeakerControl(container, 'practical-task-speaker', () => speechText);

  const progressText = container.querySelector('#practical-task-progress-text');
  container.querySelectorAll('[data-pt-item]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const itemId = checkbox.getAttribute('data-pt-item');
      if (checkbox.checked) checkedItemIds.add(itemId);
      else checkedItemIds.delete(itemId);
      progressText.textContent = `${checkedItemIds.size} of ${total} checklist items marked as considered.`;
    });
  });
}
