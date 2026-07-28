// programmes/purchasing-team-programme.js — the Purchasing Team programme
// DESCRIPTOR.
//
// Assembles the Purchasing content (modules/lessons + question bank) with
// the programme-level metadata, configuration, feature flags, UI descriptor,
// and final practical task the shared TOSP engine reads through the
// registry. The shared engine, scoring, progress, storage-safety, speech,
// theme, and completion logic are REUSED unchanged — nothing here
// duplicates the engine.
//
// Purchasing-specific rules encoded here (all confirmed prototype defaults):
//   - requiresSignoff / requiresReviewerSignoff: false (no team-leader / reviewer sign-off)
//   - enableTamilTranslation: false (no Tamil UI, no translation calls; English Read Aloud stays available)
//   - own versioned storage key (never mixes with PH/Amazon/eBay/Digital Marketing progress)
//   - quiz passing score / attempts REUSE the exact existing config (80% / 3)
//   - the final practical task is DISPLAYED and COMPLETABLE but is NOT an
//     additional completion gate — completion remains "all required lessons
//     complete + all 10 Skill Checks passed", per rules/module-access.js,
//     unchanged. The practical task's own checked-item state is transient,
//     in-memory UI state local to its view (see views/practical-task-view.js)
//     — it is never written to progress/storage and never read by
//     isProgrammeComplete.
//   - EVERY disputed item found during discovery (container-fill CBM
//     threshold, Tier-A warehouse cutoff, Gate 2/5/6 definitions and their
//     activation status, the True Contribution formula, the
//     Container_Scoring_Model_V2.2.xlsx off-by-one and mislabeled-row
//     defects, the hardcoded Gate 5 "PASS" stub, and the ambiguous "MD"
//     role wording) is EXCLUDED from every module, lesson, and question —
//     never selected, averaged, merged, repaired, or reinterpreted. See
//     docs/purchasing-team-exclusions.md for the full register.

import { MODULES, LESSONS } from './purchasing-team-modules.js';
import { QUIZZES, QUESTIONS } from './purchasing-team-question-bank.js';

const PROGRAMME = {
  id: 'purchasing-team',
  code: 'TOSP-PUR',
  title: 'Purchasing Team Onboarding',
  team: 'Purchasing Team',
  description:
    'A source-backed onboarding path across 10 modules — Purchasing foundations, the end-to-end purchasing workflow, ' +
    'purchase requirement inputs, PO creation and updates, supplier follow-up, decision-support intelligence, ' +
    'container planning, and stock receipt — built entirely from the Purchasing_Team source documents. ' +
    'Implementation was authorised without resolving every conflict found in those sources; every disputed figure, ' +
    'formula, or rule is deliberately excluded from this programme rather than resolved, and is recorded in the ' +
    'programme exclusions register. Learner progress, quiz results, and the final practical exercise recorded in ' +
    'this browser remain PROTOTYPE_ONLY and are not official purchasing authorisation, PO approval authority, or ' +
    'competency evidence.',
  version: '1.0',
  status: 'FINAL_TRUTH',
  totalModules: MODULES.length,
};

// The Purchasing source documents actually used to build this programme.
// Authority classification follows the confirmed source-authority model:
// (1) written policies/procedures/BGCT operational documents = primary;
// (2) PO Decision Engine written rules/specs = supplemental, non-conflicting
// parts only; (3) Excel workbooks = formula/reference sources, non-conflicting
// parts only; (4) the HTML UI prototype = interface/reference evidence only,
// never policy truth; (5) samples/worked examples = illustrations only.
// See docs/purchasing-team-source-map.md for the full inventory of all 14
// files, including the ones contributing no learner content because every
// passage that could be sourced from them was disputed or confidential.
const SOURCE_DOCUMENTS = [
  { id: 'pur-src-po-update', title: 'Purchase Order Update Procedure — Purchasing Dashboard (SOP)', version: '1.0', effectiveDate: '—', confidentiality: 'Internal Purchasing SOP' },
  { id: 'pur-src-container-arrival', title: 'Container Arrival, Stock Receipt & Inventory Update Policy (SOP)', version: '1.0', effectiveDate: '—', confidentiality: 'Internal Purchasing SOP' },
  { id: 'pur-src-ordering-policy', title: 'Purchase Order Creation & Ordering Policy (SOP)', version: '—', effectiveDate: '—', confidentiality: 'Internal Purchasing SOP — contains supplier-identifying commentary excluded from this programme' },
  { id: 'pur-src-followup', title: 'Order Follow-Up, Production Monitoring & Container Loading Policy (SOP)', version: '1.0', effectiveDate: '—', confidentiality: 'Internal Purchasing SOP' },
  { id: 'pur-src-rulebook', title: 'Purchasing Rule Book (BGCT_PURCHASING_SKILL)', version: '—', effectiveDate: '—', confidentiality: 'Internal Purchasing reference — self-claims "follow every rule exactly as written"; contains a disputed CBM figure excluded from this programme' },
  { id: 'pur-src-bgct-tutorial', title: 'Purchasing & Warehouse Best Practice Guideline — Tutorial (presentation)', version: 'rev. 1', effectiveDate: '—', confidentiality: 'Internal UI click-through tutorial — used only for context; contributes no direct lesson content because its content duplicates or conflicts with other sources' },
  { id: 'pur-src-po-rules', title: 'PO Decision Engine Rules v2.4 — Complete Rules, Logic & Threshold Reference', version: '2.4', effectiveDate: 'Feb 2026', confidentiality: 'Internal reference — self-claims "PRODUCTION" status; contains multiple items excluded from this programme, see exclusions register' },
  { id: 'pur-src-po-spec-update', title: 'PO Decision Engine Specification Update v2.4 — Gate 6 + Supplier Buffer Penalty + Burn-Down Forecast', version: '2.4 (addendum)', effectiveDate: '—', confidentiality: 'Internal reference — conflicts with PO Decision Engine Rules v2.4 on Gate numbering and activation status; excluded content, see exclusions register' },
  { id: 'pur-src-po-ui-html', title: 'PO Decision Engine UI V2.2 + Gate 5 — Enhanced UI (HTML prototype)', version: 'V2.2', effectiveDate: '—', confidentiality: 'Interface/reference evidence only, not policy truth — never used as a content source in this programme; contains sample data resembling live supplier/PO information' },
  { id: 'pur-src-po-intelligence-xlsx', title: 'PO Intelligence Engine (workbook)', version: '—', effectiveDate: '—', confidentiality: 'Formula/reference source — worked example / demo snapshot, not used as content beyond the non-conflicting Tier-band structure' },
  { id: 'pur-src-po-sample-xlsx', title: 'PO Decision Engine Sample workbook', version: '—', effectiveDate: '—', confidentiality: 'Explicit sample/test workbook — example only, never taught as universal policy' },
  { id: 'pur-src-container-scoring-xlsx', title: 'Container Scoring Model V2.2 (workbook)', version: 'V2.2', effectiveDate: '—', confidentiality: 'Formula/reference source — confirmed to contain an off-by-one calculation defect, mislabeled summary rows, and a hardcoded Gate 5 stub; none of its calculated content is used, see exclusions register' },
];

// Cross-cutting, source-cited rules not tied to a single lesson, shown on the
// Sources screen for traceability. No invented rules; each carries a
// citation. Includes the programme's own documented exclusions.
const PROGRESSION_RULES = [
  { id: 'pur-rule-evidence', rule: 'Verbal instructions alone are not sufficient — anything a Supplier or Agent must remember, follow, verify, or monitor must be documented in the Purchasing Dashboard for traceability and accountability.', source: 'Purchase Order Update Procedure — Purchasing Dashboard SOP, Purchase Order Remarks Requirements section' },
  { id: 'pur-rule-warehouse-approval', rule: 'A completed Purchase Order can only be added to the system after Warehouse Team approval.', source: 'Purchase Order Ordering Policy SOP, Warehouse & Operational Requirements section' },
  { id: 'pur-rule-acknowledgement', rule: 'Supplier acknowledgement of a Purchase Order must be verified within 7 days of PO creation; if not acknowledged, the order is identified as an "Unacknowledged Order" and followed up immediately.', source: 'Order Follow-Up, Production Monitoring & Container Loading Policy SOP, Order Acknowledgement Verification section' },
  { id: 'pur-rule-carton-multiple', rule: 'Order quantity must always be entered as a full multiple of the product\'s Carton Pack Quantity (CTN PCS); partial carton quantities must be avoided unless specifically approved.', source: 'Purchase Order Ordering Policy SOP, Order Quantity Rules section (11.1)' },
  { id: 'pur-rule-no-rework-ship', rule: 'Products requiring rework must not be shipped; a reworked item is reassigned to "Unassigned" container status and reloaded only after rework approval.', source: 'Order Follow-Up, Production Monitoring & Container Loading Policy SOP, Rework Management section' },
  { id: 'pur-rule-report-immediately', rule: 'Any shortage, damage, or missing carton found on container receipt must be reported immediately, not batched for later.', source: 'Container Arrival, Stock Receipt & Inventory Update Policy SOP, Container Receipt Procedure section' },
  { id: 'pur-rule-cbm-conflict-excluded', rule: 'SOURCE_CONFLICT — three different numeric container-fill CBM threshold values (64 / 67 / 68) appear across the Purchasing Rule Book, the Purchasing tutorial, and the Ordering/Follow-Up SOPs. No single CBM threshold is taught or quizzed anywhere in this programme; only the general planning concept is described where the workflow requires it.', source: 'Purchasing Rule Book; Purchasing & Warehouse Best Practice Guideline tutorial; Purchase Order Ordering Policy SOP; Order Follow-Up, Production Monitoring & Container Loading Policy SOP — internal conflict, unresolved' },
  { id: 'pur-rule-wh-cutoff-excluded', rule: 'SOURCE_CONFLICT — the Tier-A-only warehouse-capacity cutoff is stated as 85% in the PO Decision Engine Rules and two workbooks, and as 90% in the Container Scoring Model workbook. No cutoff value is taught or quizzed anywhere in this programme.', source: 'PO Decision Engine Rules v2.4; PO Intelligence Engine workbook; PO Decision Engine Sample workbook; Container Scoring Model V2.2 workbook — internal conflict, unresolved' },
  { id: 'pur-rule-gates-excluded', rule: 'SOURCE_CONFLICT — Gate 2, Gate 5, and Gate 6 of the PO Decision Engine are defined differently (and given conflicting activation status) across the Rules document, the Specification Update, and the HTML UI prototype. None of these gate definitions, their numbering, or their activation status is taught or quizzed anywhere in this programme.', source: 'PO Decision Engine Rules v2.4; PO Decision Engine Specification Update v2.4; PO Decision Engine UI V2.2 HTML — internal conflict, unresolved' },
  { id: 'pur-rule-true-contribution-excluded', rule: 'SOURCE_CONFLICT — the "True Contribution" profitability formula includes a labour-cost term in the PO Decision Engine Rules and two workbooks, but excludes labour cost entirely in the Container Scoring Model workbook. Neither version of this formula is taught, quizzed, or used anywhere in this programme.', source: 'PO Decision Engine Rules v2.4; PO Intelligence Engine workbook; PO Decision Engine Sample workbook vs. Container Scoring Model V2.2 workbook — internal conflict, unresolved' },
  { id: 'pur-rule-defective-formulas-excluded', rule: 'Container_Scoring_Model_V2.2.xlsx contains confirmed internal defects (an off-by-one CBM-subtraction formula, mislabeled summary rows, and a hardcoded Gate 5 "PASS" stub excluded from its own pass/fail logic). None of this workbook\'s calculated output is taught, quizzed, or used anywhere in this programme.', source: 'Container Scoring Model V2.2 workbook — confirmed source defect, see docs/purchasing-team-exclusions.md' },
  { id: 'pur-rule-md-ambiguous-excluded', rule: 'Some source passages use "MD" without making clear whether it means an individual Managing Director role or a general "management" approval step. Where this ambiguity could not be resolved from context, this programme uses a generic "management approval" description instead of asserting a specific role, and never presents the ambiguity as resolved.', source: 'Purchasing Rule Book; Purchasing & Warehouse Best Practice Guideline tutorial — ambiguous role wording, see docs/purchasing-team-exclusions.md' },
];

// Purchasing has no source-defined whole-programme score-band or
// probation-gate tables (unlike PH). These are intentionally empty; the
// Sources screen hides empty sections. This keeps the content interface
// consistent across programmes.
const EVALUATION_SCORE_BANDS = [];
const EVALUATION_SCORE_BANDS_SOURCE = '';
const PROBATION_SCORE_GATES = [];
const PROBATION_SCORE_GATES_SOURCE = '';

// ---------------------------------------------------------------------------
// FINAL PRACTICAL TASK — PROTOTYPE_ONLY, non-gating (see header note above).
// Every checklist item cites a source already taught in the module content
// above; no CBM threshold, warehouse cutoff, gate definition, True
// Contribution formula, defective workbook calculation, hardcoded PASS
// logic, or ambiguous MD role is referenced anywhere. Uses fictional,
// neutral example data only; creates no real Purchase Order and contacts no
// real supplier.
// ---------------------------------------------------------------------------

const practicalItem = (id, text, source) => ({ id, text, source });

const PRACTICAL_TASK = {
  id: 'purchasing-final-practical-v1',
  status: 'PROTOTYPE_ONLY',
  title: 'Final Practical Task — Purchasing Fictional Evidence Pack',
  intro:
    'Prepare a short, fictional, non-live purchasing evidence pack that applies what you have learned across all 10 ' +
    'modules. Use invented, neutral example data throughout (for example, a fictional product and supplier code) — ' +
    'never a real supplier, product, or PO. This exercise does not create or send a real Purchase Order, does not ' +
    'contact a real supplier, does not require access to any live purchasing system, and does not require Team ' +
    'Leader or reviewer sign-off.',
  closingNote: 'Prototype practical exercise — not an official purchasing authorisation or PO approval.',
  sections: [
    {
      id: 'pur-pt-sec-requirement',
      title: 'Validating a Fictional Purchase Requirement',
      items: [
        practicalItem('pur-pt-001', 'State which sales-tier band (Core, Middle, or End-of-Line) your fictional product falls into, and what that band implies for its stock-coverage target.', 'Purchase Order Ordering Policy SOP, Sales-Based Ordering section (1.1–1.2)'),
        practicalItem('pur-pt-002', 'Given a fictional Carton Pack Quantity and a fictional required quantity, calculate a valid order quantity that follows the carton-multiple rule.', 'Purchase Order Ordering Policy SOP, Order Quantity Rules section (11.1)'),
      ],
    },
    {
      id: 'pur-pt-sec-po-fields',
      title: 'Identifying Required PO Fields',
      items: [
        practicalItem('pur-pt-003', 'List the fields that must be confirmed before your fictional Purchase Order is created (supplier information, product details, quantities, pricing, order value, delivery dates, container allocation).', 'Purchase Order Update Procedure — Purchasing Dashboard SOP, Purchase Order Creation section'),
        practicalItem('pur-pt-004', 'Build a fictional PO ID using the naming convention (supplier code, month, sequence, year, and marketplace code only where required).', 'Purchase Order Update Procedure — Purchasing Dashboard SOP, PO ID Naming Convention section'),
      ],
    },
    {
      id: 'pur-pt-sec-update-action',
      title: 'Choosing the Correct Update or Evidence Action',
      items: [
        practicalItem('pur-pt-005', 'A fictional compliance document for your product has just been revised. Describe the exact sequence required before the old version can no longer be used.', 'Purchase Order Update Procedure — Purchasing Dashboard SOP, Document Change Management section'),
        practicalItem('pur-pt-006', 'State the exact status your fictional order carries if it has not been acknowledged by the supplier within the required window.', 'Order Follow-Up, Production Monitoring & Container Loading Policy SOP, Order Acknowledgement Verification section'),
      ],
    },
    {
      id: 'pur-pt-sec-followup',
      title: 'Preparing Supplier Follow-Up Evidence',
      items: [
        practicalItem('pur-pt-007', 'Record a fictional Expected Completion Date for your order and explain what response is required if that date passes without the order being finished.', 'Order Follow-Up, Production Monitoring & Container Loading Policy SOP, Expected Completion Date Verification and Overdue Order Monitoring sections'),
      ],
    },
    {
      id: 'pur-pt-sec-production-delay',
      title: 'Identifying a Production-Delay Escalation Need',
      items: [
        practicalItem('pur-pt-008', 'Describe the escalation steps your fictional scenario would require if a supplier reports a production delay, referencing who must be informed.', 'Order Follow-Up, Production Monitoring & Container Loading Policy SOP, Overdue Order Monitoring and Finished Production Monitoring sections'),
      ],
    },
    {
      id: 'pur-pt-sec-decision-review',
      title: 'Reviewing Non-Conflicting Decision Inputs',
      items: [
        practicalItem('pur-pt-009', 'Explain, in your own words, why a decision-support tool\'s output for your fictional product should be treated as a suggestion rather than a final decision, and which approval step it would still need to pass.', 'PO Decision Engine Rules v2.4 — no manual override or approval workflow documented; see Module 7 and Programme Sources'),
      ],
    },
    {
      id: 'pur-pt-sec-container',
      title: 'Container-Planning Evidence Checklist (No Disputed Thresholds)',
      items: [
        practicalItem('pur-pt-010', 'List the container-planning inputs (readiness, carton quantity, weight, volume) you would confirm for your fictional shipment, without stating any specific CBM capacity figure.', 'Order Follow-Up, Production Monitoring & Container Loading Policy SOP, Finished Production Monitoring and Container Loading Order Rules sections; excludes disputed CBM figures per Programme Sources'),
      ],
    },
    {
      id: 'pur-pt-sec-receipt',
      title: 'Recording a Fictional Stock-Receipt Discrepancy',
      items: [
        practicalItem('pur-pt-011', 'Record a fictional receiving discrepancy (choose one: missing cartons, damaged product, quantity shortage, incorrect product, or incorrect label) and list the required response steps.', 'Container Arrival, Stock Receipt & Inventory Update Policy SOP, Receiving Discrepancy Management section'),
      ],
    },
    {
      id: 'pur-pt-sec-handover',
      title: 'Completing a Handover Summary',
      items: [
        practicalItem('pur-pt-012', 'Confirm that every entry in your evidence pack is backed by a specific source citation, and that no real supplier name, live PO number, or named individual appears anywhere in it.', 'Programme-wide confidentiality and source-traceability rule — see Programme Sources'),
      ],
    },
  ],
};

export const purchasingTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'Purchasing Team',
  team: PROGRAMME.team,
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — Purchasing's OWN versioned storage key. Never shares a
  // key with PH (tosp.prototype.v2), Amazon (tosp.amazon-team.prototype.v1),
  // eBay (tosp.ebay-team.prototype.v1), Digital Marketing
  // (tosp.digital-marketing-team.prototype.v1), the theme
  // (tosp.ui.theme.v1), or the active-programme selector
  // (tosp.active-programme.v1). Reset clears only this key.
  storageKey: 'tosp.purchasing-team.prototype.v1',
  storageVersion: 1,

  // Reuse the exact existing prototype quiz configuration — no new thresholds.
  config: {
    totalModules: MODULES.length,
    passingScorePct: 80,
    maxAttempts: 3,
    requireAllLessonsBeforeQuiz: true,
    allowResetDemoProgress: true,
  },

  features: {
    enableTamilTranslation: false,
    requiresReviewerSignoff: false,
  },

  content: {
    SOURCE_DOCUMENTS,
    PROGRAMME,
    PROGRESSION_RULES,
    EVALUATION_SCORE_BANDS,
    EVALUATION_SCORE_BANDS_SOURCE,
    PROBATION_SCORE_GATES,
    PROBATION_SCORE_GATES_SOURCE,
    MODULES,
    LESSONS,
    QUIZZES,
    QUESTIONS,
    PRACTICAL_TASK,
  },

  ui: {
    journeyLabel: 'Purchasing Team Journey',

    // No Tamil "Translation Review" item; no PH/Amazon/eBay/Digital Marketing
    // programme-specific navigation. Adds one Purchasing-specific item: the
    // final practical task, reusing the generic mechanism added for Digital
    // Marketing.
    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme', label: 'Purchasing Team Journey', icon: '➤', route: '/programme' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'practical-task', label: 'Practical Task', icon: '✎', route: '/practical-task' },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
    ],

    // Single track across all 10 modules — the sources do not describe a
    // clean split into separately-named tracks the way Digital Marketing's
    // Foundation/PMax/Shopping split was explicitly specified; all modules
    // route through the same journey.
    tracks: [
      { key: 'purchasing', title: 'Purchasing Team Journey', statLabel: 'Modules', unitNoun: 'modules', subtitle: 'Modules 1-10 · Foundation through decision intelligence, container planning, and stock receipt.', route: '/programme', filter: (m) => m.orderIndex >= 1 },
    ],

    // No PH-style readiness gates — the Purchasing sources state no
    // equivalent readiness rule.
    readiness: [],

    // Guarded, additive UI descriptor for the final practical task. Consumed
    // by dashboard-view.js and app.js; the exact same generic mechanism
    // added for Digital Marketing — undefined (and therefore inert) for
    // PH/Amazon/eBay.
    practicalTask: {
      route: '/practical-task',
      label: 'Final Practical Task',
      availabilityNote: 'Available once you feel ready — completing it is optional and does not gate programme completion.',
    },

    dashboardSourceBlurb:
      'Content is sourced directly from the Purchasing_Team source documents across all 10 modules. Every disputed ' +
      'figure or rule found across those sources is excluded rather than resolved — see Programme Sources for the ' +
      'full exclusions register. Progress recorded here remains PROTOTYPE_ONLY.',

    sourcesIntro:
      'All Purchasing Team programme content — modules, lessons, and Skill Check questions — is sourced directly ' +
      'from the Purchasing_Team source documents below. Implementation was authorised without resolving the ' +
      'conflicts found between these sources during discovery: the container-fill CBM threshold, the Tier-A ' +
      'warehouse-capacity cutoff, the PO Decision Engine\'s Gate 2/5/6 definitions and activation status, the True ' +
      'Contribution profitability formula, two confirmed defects in the Container Scoring Model workbook, and ' +
      'ambiguous "MD" role wording are all deliberately <strong>excluded</strong> from this programme rather than ' +
      'resolved — see the Progression Rules below and ' +
      '<code>tosp/docs/purchasing-team-exclusions.md</code> for the full register. Confidential supplier names, ' +
      'real PO numbers, live pricing, and named individual staff from those source documents are never reproduced. ' +
      'Progress, quiz results, and the final practical exercise recorded in this browser remain ' +
      '<strong>PROTOTYPE_ONLY</strong> and are not official purchasing authorisation, PO approval authority, or ' +
      'competency evidence.',

    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track ? { route: track.route, label: this.journeyLabel } : { route: '/programme', label: this.journeyLabel };
    },
  },
};
