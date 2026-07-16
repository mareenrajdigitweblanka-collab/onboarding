// views/sources-view.js — full programme source-reference: the two
// authoritative documents, key progression rules, and the source
// documents' own scoring tables, each with a citation.

import {
  SOURCE_DOCUMENTS,
  PROGRESSION_RULES,
  EVALUATION_SCORE_BANDS,
  EVALUATION_SCORE_BANDS_SOURCE,
  PROBATION_SCORE_GATES,
  PROBATION_SCORE_GATES_SOURCE,
} from '../data.js';

export function render(container) {
  container.innerHTML = `
    <div class="breadcrumb">
      <button type="button" class="breadcrumb__link" data-nav="/dashboard">Dashboard</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <span class="breadcrumb__current">Programme Sources</span>
    </div>

    <section class="panel">
      <h1>Programme &amp; Source Reference</h1>
      <p class="muted">
        All programme content — modules, lessons, and Skill Check questions — is sourced directly
        from the two documents below and is status <strong>FINAL_TRUTH</strong>. Progress, quiz
        results, and Team Leader Sign-offs recorded in this browser remain
        <strong>PROTOTYPE_ONLY</strong> and are not official onboarding evidence.
      </p>
    </section>

    <section class="panel">
      <h2>Source Documents</h2>
      <ul class="reference-list">
        ${SOURCE_DOCUMENTS.map((d) => `
          <li>
            <strong>${d.title}</strong> — ${d.version}, effective ${d.effectiveDate}.
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
  `;
}
