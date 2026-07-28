// views/sources-view.js — full programme source-reference: the authoritative
// documents, key progression rules, and (where the programme defines them) the
// source documents' own scoring tables, each with a citation.
//
// The score-band / probation-gate tables are PH-specific: the Amazon programme
// supplies empty arrays for them, so those sections simply do not render. The
// intro text comes from the active programme's UI descriptor.

import {
  SOURCE_DOCUMENTS,
  PROGRESSION_RULES,
  EVALUATION_SCORE_BANDS,
  EVALUATION_SCORE_BANDS_SOURCE,
  PROBATION_SCORE_GATES,
  PROBATION_SCORE_GATES_SOURCE,
} from '../data.js';
import { getActiveProgramme } from '../programmes/registry.js';

export function render(container) {
  const ui = getActiveProgramme().ui;

  const scoreBandsHtml = EVALUATION_SCORE_BANDS.length > 0 ? `
    <section class="panel">
      <h2>Day 7 Evaluation Score Interpretation</h2>
      <p class="muted small">Source: ${EVALUATION_SCORE_BANDS_SOURCE}</p>
      <div class="table-scroll">
        <table class="reference-table">
          <thead><tr><th>Score</th><th>Interpretation</th></tr></thead>
          <tbody>
            ${EVALUATION_SCORE_BANDS.map((b) => `<tr><td>${b.range}</td><td>${b.interpretation}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </section>
  ` : '';

  const probationGatesHtml = PROBATION_SCORE_GATES.length > 0 ? `
    <section class="panel">
      <h2>Probation Progression Score Gates</h2>
      <p class="muted small">Source: ${PROBATION_SCORE_GATES_SOURCE}</p>
      <div class="table-scroll">
        <table class="reference-table">
          <thead><tr><th>Period</th><th>Minimum Score to Progress</th></tr></thead>
          <tbody>
            ${PROBATION_SCORE_GATES.map((g) => `<tr><td>${g.period}</td><td>${g.minimumScore} / 100</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="muted small">
        These figures describe the source documents' whole-programme evaluation model.
        This prototype's per-module Skill Check passing percentage is a separate,
        unsourced prototype default (see README.md) — it does not come from this table.
      </p>
    </section>
  ` : '';

  container.innerHTML = `
    <div class="breadcrumb">
      <button type="button" class="breadcrumb__link" data-nav="/dashboard">Dashboard</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <span class="breadcrumb__current">Programme Sources</span>
    </div>

    <section class="panel">
      <h1>Programme &amp; Source Reference</h1>
      <p class="muted">${ui.sourcesIntro}</p>
    </section>

    <section class="panel">
      <h2>Source Documents</h2>
      <ul class="reference-list">
        ${SOURCE_DOCUMENTS.map((d) => `
          <li>
            <strong>${d.title}</strong>${d.version && d.version !== '—' ? ` — ${d.version}` : ''}${d.effectiveDate && d.effectiveDate !== '—' ? `, effective ${d.effectiveDate}` : ''}.
            <span class="muted small">${d.confidentiality}</span>
          </li>
        `).join('')}
      </ul>
    </section>

    <section class="panel">
      <h2>Key Progression Rules</h2>
      <ul class="reference-list">
        ${PROGRESSION_RULES.map((r) => `<li>${r.rule} <span class="muted small">— Source: ${r.source}</span></li>`).join('')}
      </ul>
    </section>

    ${scoreBandsHtml}
    ${probationGatesHtml}
  `;
}
