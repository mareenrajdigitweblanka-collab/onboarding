// programmes/customer-service-team-programme.js — the Customer Service Team
// programme DESCRIPTOR.
//
// Assembles the Customer Service content (modules/lessons + question bank)
// with the programme-level metadata, configuration, feature flags, UI
// descriptor, and final practical task the shared TOSP engine reads through
// the registry. The shared engine, scoring, progress, storage-safety,
// speech, theme, and completion logic are REUSED unchanged — nothing here
// duplicates the engine.
//
// USER-CONFIRMED DECISIONS encoded here:
//   - Source authority: Customer_Service_Team/CST - BGCT/
//     Ledsone_CS_Handbook_v1.6_Complete.docx (learner-safe title "Ledsone
//     Customer Support Handbook") is treated as FINAL PROTOTYPE TRUTH. Its
//     filename says "v1.6"; its own document body says "Edition 1.0 /
//     Version 1.0". This conflict is documented (see PROGRESSION_RULES below
//     and docs/customer-service-team-source-map.md /
//     docs/customer-service-team-exclusions.md) and is never silently
//     corrected, never claimed resolved, and never shown in learner-facing
//     version text — PROGRAMME.version below is this TOSP programme's own
//     version number, independent of the source's disputed label.
//   - "BGCT" (the confidential source-folder label) is never displayed,
//     defined, or given an invented meaning anywhere in this programme.
//   - No numeric eBay Transaction Defect Rate threshold is stated anywhere
//     (neither the value in this handbook nor the different value in the
//     existing eBay Team programme) — the cross-programme discrepancy is
//     documented, not resolved, and this programme never chooses between
//     the two disputed figures.
//   - The disputed 7-day-domestic / 14-day-international lost-parcel timing
//     is excluded completely; the lost-parcel workflow is taught using the
//     courier's own investigation outcome as the trigger, with no
//     replacement timing invented.
//   - requiresSignoff / requiresReviewerSignoff: false (no learner sign-off,
//     no reviewer sign-off, anywhere in this programme).
//   - enableTamilTranslation: false (no Tamil UI, no translation calls;
//     English Read Aloud stays available through the shared, unmodified
//     speaker-control component).
//   - Own versioned storage key — never mixes with any other programme's
//     progress, the active-programme selector, or the theme key.
//   - Quiz passing score / attempts REUSE the exact existing prototype
//     configuration (80% / 3 attempts) — one Skill Check per module, six
//     questions per Skill Check, 48 questions total.
//   - Real employee names found in the source (governance-table names,
//     channel-assignment names, escalation/approval examples) are replaced
//     throughout with generic role titles; this descriptor's own copy never
//     reproduces a real name.
//   - The final practical task is DISPLAYED and COMPLETABLE but is NOT an
//     additional completion gate — completion remains "all 32 required
//     lessons complete + all 8 Skill Checks passed" (rules/module-access.js,
//     unchanged). The practical task's own checked-item state is transient,
//     in-memory UI state local to its view (views/practical-task-view.js) —
//     it is never written to progress/storage, never scored numerically, and
//     never read by isProgrammeComplete.

import { MODULES, LESSONS } from './customer-service-team-modules.js';
import { QUIZZES, QUESTIONS } from './customer-service-team-question-bank.js';

const PROGRAMME = {
  id: 'prog-customer-service-onboarding',
  code: 'TOSP-CS-01',
  title: 'Customer Service Team Onboarding',
  team: 'Customer Service Team',
  description:
    'A source-backed onboarding path across eight modules — foundation and governance, communication and message ' +
    'handling, delivery and courier management, customer returns/refunds/warranty, product issues and technical ' +
    'support, marketplace protection and risk, evidence/audit/internal operations, and canonical references and ' +
    'golden principles — built entirely from the Ledsone Customer Support Handbook (treated as FINAL PROTOTYPE ' +
    'TRUTH; an internal version-label question about this source is recorded in internal source-governance ' +
    'documentation only, and does not affect any rule taught here). This programme is PROTOTYPE_ONLY: it is an ' +
    'internal training representation only and does not itself authorise sending a live customer message, ' +
    'processing a live refund or return, taking a live account action, or granting any policy exception. Several ' +
    'items found during discovery are deliberately excluded rather than resolved — including a numeric eBay ' +
    'account-health figure that conflicts with the existing eBay Team programme, and a disputed lost-parcel timing ' +
    'figure — and are recorded in the programme exclusions register.',
  version: '1.0',
  status: 'FINAL_TRUTH',
  totalModules: MODULES.length,
};

// The Customer Service source actually used to build this programme. A
// single source file; its confidentiality marking is preserved and its full
// text is never reproduced or displayed within this programme.
//
// NOTE ON THE VERSION-LABEL CONFLICT: the source's filename states "v1.6"
// while its own document body states "Edition 1.0 / Version 1.0". Per
// explicit user instruction, this conflict must be documented in INTERNAL
// source-governance documentation only (see docs/customer-service-team-
// source-map.md and docs/customer-service-team-exclusions.md, item 1) and
// must never be shown as confusing learner-facing version text — so the
// `version` field below deliberately states neither disputed label, and
// no PROGRESSION_RULES entry below reproduces the source filename.
const SOURCE_DOCUMENTS = [
  {
    id: 'cs-src-handbook',
    title: 'Ledsone Customer Support Handbook',
    version: '—',
    effectiveDate: 'May 2026',
    confidentiality: 'Confidential — Internal Use Only.',
  },
];

// Cross-cutting, source-cited rules not tied to a single lesson, shown on the
// Sources screen for traceability. No invented rules; each carries a
// citation. Includes this programme's own documented exclusions.
const PROGRESSION_RULES = [
  { id: 'cs-rule-three-goals', rule: 'Every customer interaction has three goals in priority order: protect the marketplace account, resolve the customer\'s issue correctly, then protect the company financially.', source: 'Ledsone Customer Support Handbook, Chapter 7 ("The Three Goals of Every Customer Interaction")' },
  { id: 'cs-rule-blos-thresholds', rule: 'An agent may act up to £50 without approval; £50-£100 requires Team Head approval; above £100 requires Operations Manager approval; the maximum discount without Operations Manager approval is 35%.', source: 'Ledsone Customer Support Handbook, Chapter 15 ("BLOS Governance System — Current BLOS Thresholds")' },
  { id: 'cs-rule-claim-window-start', rule: 'RULE CS-051 — every claim window starts from the confirmed delivery date, never the order, dispatch, or invoice date.', source: 'Ledsone Customer Support Handbook, Chapter 51 ("Claim Window Definitions — Rule CS-051")' },
  { id: 'cs-rule-resolution-priority', rule: 'For a confirmed seller-side issue, resolutions are offered in order: replacement/exchange first, partial refund/discount second, full refund with return third, full refund without return last.', source: 'Ledsone Customer Support Handbook, Chapter 28 ("Refund Decision Engine — Resolution Priority Order")' },
  { id: 'cs-rule-safety-override', rule: 'A safety complaint overrides every other process: stop-use instruction first, no discount ever, same-session Team Head notification, and the customer\'s choice of full replacement or full refund.', source: 'Ledsone Customer Support Handbook, Chapter 37 ("Safety, Compliance & Recall Handling — Safety Complaint Protocol")' },
  { id: 'cs-rule-fraud-3-signal', rule: 'RULE CS-047 — three or more fraud signals in a single case trigger a mandatory stop on all financial action and a full escalation to Team Head; no financial action is taken until Team Head decides.', source: 'Ledsone Customer Support Handbook, Chapter 53 ("Fraud Signal Register — CS-047")' },
  { id: 'cs-rule-ebay-tdr-excluded', rule: 'SOURCE_CONFLICT (cross-programme) — this handbook states an eBay Transaction Defect Rate threshold that differs from the value already taught in the existing eBay Team onboarding programme. Neither numeric value is stated anywhere in this programme; marketplace account-health protection is taught as a case-response workflow, not as a restated metric definition. The existing eBay Team programme is not modified by this work.', source: 'Ledsone Customer Support Handbook, Chapter 10 / Chapter 38 (eBay account-health metrics) vs. the existing eBay Team programme content — cross-programme conflict, unresolved' },
  { id: 'cs-rule-lost-parcel-timing-excluded', rule: 'The handbook\'s own day-count figures for when a parcel is treated as lost (a domestic figure and a longer international figure) are disputed between internal sources and are excluded completely from this programme. The lost-parcel investigation, evidence, escalation, and customer-update workflow is taught using the courier\'s own confirmed investigation outcome as the trigger, never a day count, and no replacement figure is invented.', source: 'Ledsone Customer Support Handbook, Chapter 23 ("Delivery Query Handling — Scenario D12") and Chapter 26 ("Courier Escalation & Appeals") — internal timing figures disputed, excluded by user instruction' },
  { id: 'cs-rule-names-genericised', rule: 'Every real employee name found in the source (governance-table names, channel-assignment names, escalation and approval examples) is replaced throughout this programme with a generic role title — Content Owner, System Owner, Operations Manager, Visibility Owner, Team Head, Accounts/Admin Role, Marketplace Agent, Delivery Support Agent, Warehouse Contact, Postage Team Contact — with the underlying rule\'s meaning fully preserved.', source: 'Ledsone Customer Support Handbook, Chapter 1 ("Handbook Governance Framework"), Chapter 6 ("Sales Channels and Agent Assignments") — confidentiality treatment applied programme-wide' },
  { id: 'cs-rule-incomplete-templates-excluded', rule: 'The Chapter 56 canonical template register names approximately 30 template IDs; this programme reproduces only the subset whose complete wording was actually found in the source, and never assembles, guesses, or invents wording for the remainder. See the template-support register in docs/customer-service-team-source-map.md.', source: 'Ledsone Customer Support Handbook, Chapter 56 ("Canonical Template Register — CS-070")' },
  { id: 'cs-rule-unsupported-topics-excluded', rule: 'Payment procedures, detailed invoice procedures, data/privacy-request workflows, chargeback handling, and unsupported Wayfair/B&Q/Avasam marketplace-case workflows are excluded from this programme; where the handbook itself does not document a workflow in the depth it gives eBay and Amazon, this programme teaches the no-match escalation rule instead of inventing a procedure.', source: 'Ledsone Customer Support Handbook, Chapter 3 ("Handbook Scope & Exclusion Matrix") and Chapter 14 ("Exception & No-Match Handling")' },
];

// Customer Service has no source-defined whole-programme score-band or
// probation-gate tables (unlike PH). These are intentionally empty; the
// Sources screen hides empty sections. This keeps the content interface
// consistent across programmes.
const EVALUATION_SCORE_BANDS = [];
const EVALUATION_SCORE_BANDS_SOURCE = '';
const PROBATION_SCORE_GATES = [];
const PROBATION_SCORE_GATES_SOURCE = '';

// ---------------------------------------------------------------------------
// FINAL PRACTICAL TASK — PROTOTYPE_ONLY, non-gating, not numerically scored,
// no sign-off (see header note above). Every checklist item cites a source
// already taught in the module content above; no numeric eBay TDR, no
// lost-parcel 7/14-day timing, no incomplete template, and no unsupported
// topic appears anywhere in it. Uses entirely fictional example data — a
// fictional customer, order number, tracking number, product, message, and
// order value — and creates no real customer message, refund, return label,
// order change, case closure, or legal/regulatory determination.
// ---------------------------------------------------------------------------

const practicalItem = (id, text, source) => ({ id, text, source });

const PRACTICAL_TASK = {
  id: 'customer-service-final-case-practical-v1',
  status: 'PROTOTYPE_ONLY',
  title: 'Final Practical Task — Fictional Customer Case Resolution Pack',
  intro:
    'Work through one fictional, non-live customer case end to end, applying what you have learned across all ' +
    'eight modules. Use only invented example data throughout — a fictional customer name, order number, tracking ' +
    'number, product, message, and order value — never a real customer, order, or employee. This exercise does not ' +
    'send a real customer message, does not process a real refund or return, does not create a real return label, ' +
    'does not change a real order, does not close a real marketplace case, does not connect to any marketplace, ' +
    'email, live chat, database, ticketing system, WhatsApp, courier, or refund system, and does not require Team ' +
    'Head or reviewer sign-off.',
  closingNote: 'PROTOTYPE_ONLY. Completing this exercise does not authorise you to send live customer messages, process live refunds, issue live return labels, change live orders, or take any other live financial or account action.',
  sections: [
    {
      id: 'cs-pt-sec-classify',
      title: 'Classify the Fictional Message and Determine Priority',
      items: [
        practicalItem('cs-pt-001', 'Fictional case: customer "A. Fenwick," Order #FIC-58291, message: "Hi, my IP67 waterproof LED driver arrived yesterday and it is making a buzzing noise and feels warm to the touch — I am worried it is not safe to use." Assign one of the 11 message categories to this first message and explain your choice.', 'Ledsone Customer Support Handbook, Chapter 16 ("Complete Message Categorisation System") and Chapter 54 ("Message Category Register — CS-061")'),
        practicalItem('cs-pt-002', 'State the priority level this fictional message receives, and identify which trigger (issue type, tone, or both) applies.', 'Ledsone Customer Support Handbook, Chapter 16 ("Complete Message Categorisation System — Priority Classification")'),
      ],
    },
    {
      id: 'cs-pt-sec-verify',
      title: 'Perform the Required Verification',
      items: [
        practicalItem('cs-pt-003', 'List the seven order-verification checks you would complete for fictional Order #FIC-58291 before writing any reply.', 'Ledsone Customer Support Handbook, Chapter 18 ("Order Verification Process — The Order Verification Sequence")'),
      ],
    },
    {
      id: 'cs-pt-sec-evidence',
      title: 'Identify the Evidence Needed and Apply the Safety Gate',
      items: [
        practicalItem('cs-pt-004', 'State which pre-reply gate this fictional case triggers first, given the description of a buzzing noise and warmth, and what that gate requires before any other step continues.', 'Ledsone Customer Support Handbook, Chapter 12 ("Decision Tree & Gate Logic System — The Universal Pre-Reply Gates") and Chapter 37 ("Safety, Compliance & Recall Handling — Safety Complaint Protocol")'),
        practicalItem('cs-pt-005', 'List the evidence you would request for this fictional case (photos, description of what happened, any injury or property damage) and state whether a discount may ever be offered here.', 'Ledsone Customer Support Handbook, Chapter 37 ("Safety, Compliance & Recall Handling — Safety Complaint Protocol") and Chapter 55 ("Evidence Requirement Matrix — CS-045")'),
      ],
    },
    {
      id: 'cs-pt-sec-resolution',
      title: 'Select the Permitted Resolution Path and Approval Level',
      items: [
        practicalItem('cs-pt-006', 'State the two resolution options you may offer the fictional customer, and confirm this choice does not depend on the fictional order value of £42.', 'Ledsone Customer Support Handbook, Chapter 37 ("Safety, Compliance & Recall Handling — Safety Complaint Protocol")'),
        practicalItem('cs-pt-007', 'State which generic role must be notified, and when, for this fictional case.', 'Ledsone Customer Support Handbook, Chapter 37 ("Safety, Compliance & Recall Handling — Safety Complaint Protocol") and Chapter 8 ("Customer Support Team Structure")'),
      ],
    },
    {
      id: 'cs-pt-sec-response',
      title: 'Prepare a Source-Supported Customer Response',
      items: [
        practicalItem('cs-pt-008', 'Using the complete Safety Issue Response template as your starting point, draft a personalised reply to the fictional customer using only the fictional details above — never real data.', 'Ledsone Customer Support Handbook, Chapter 37 ("Safety, Compliance & Recall Handling," Template SF1)'),
      ],
    },
    {
      id: 'cs-pt-sec-audit',
      title: 'Record Case Status, Audit Evidence and Escalation',
      items: [
        practicalItem('cs-pt-009', 'List what this fictional case record should capture (category, priority, verification results, evidence received, decision made, approval obtained, action taken, message timestamps, case status, and closure outcome).', 'Ledsone Customer Support Handbook, Chapter 44 ("Audit Trail & Logging Standards") and Chapter 46 ("Documentation & Record Keeping")'),
        practicalItem('cs-pt-010', 'State the escalation condition for this fictional case and the four elements your escalation summary must include.', 'Ledsone Customer Support Handbook, Chapter 50 ("Internal Escalation Framework — How to Escalate Correctly")'),
      ],
    },
    {
      id: 'cs-pt-sec-checklist',
      title: 'Complete the Pre-Send Checklist',
      items: [
        practicalItem('cs-pt-011', 'Run your fictional reply from Item 8 through all nine pre-send checks, and confirm the safety check specifically has been satisfied before the message is considered ready.', 'Ledsone Customer Support Handbook, Chapter 52 ("Pre-Send Message Checklist — CS-042")'),
      ],
    },
    {
      id: 'cs-pt-sec-closeout',
      title: 'Record Known Limitations and State the Next Action',
      items: [
        practicalItem('cs-pt-012', 'Record one known limitation of this fictional exercise (for example, that completing it does not authorise a live safety escalation), and state the single next action for this fictional case.', 'Programme-wide PROTOTYPE_ONLY boundary; Ledsone Customer Support Handbook, Chapter 57 ("The Ten Golden Principles")'),
      ],
    },
  ],
};

export const customerServiceTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'Customer Service',
  team: PROGRAMME.team,
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — Customer Service's OWN versioned storage key. Never
  // shares a key with PH (tosp.prototype.v2), Amazon
  // (tosp.amazon-team.prototype.v1), eBay (tosp.ebay-team.prototype.v1),
  // Digital Marketing (tosp.digital-marketing-team.prototype.v1), Purchasing
  // (tosp.purchasing-team.prototype.v1), Centralized PPC
  // (tosp.centralized-ppc-team.prototype.v1), the theme
  // (tosp.ui.theme.v1), or the active-programme selector
  // (tosp.active-programme.v1). Reset clears only this key.
  storageKey: 'tosp.customer-service-team.prototype.v1',
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
    journeyLabel: 'Customer Service Team Journey',

    // No Tamil "Translation Review" item; no PH/Amazon/eBay/Digital
    // Marketing/Purchasing/Centralized PPC programme-specific navigation.
    // Adds one Customer Service-specific item: the final practical task,
    // reusing the generic mechanism already used by Digital Marketing,
    // Purchasing, and Centralized PPC.
    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme', label: 'Customer Service Journey', icon: '➤', route: '/programme' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'practical-task', label: 'Practical Task', icon: '✎', route: '/practical-task' },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
    ],

    // Single track across all 8 modules — the handbook's own structure is a
    // set of functional sections (foundation, communication, delivery,
    // returns, product issues, marketplace protection, evidence, canonical
    // references), not separate marketplace-specific tracks, so all modules
    // route through one journey.
    tracks: [
      { key: 'customer-service', title: 'Customer Service Team Journey', statLabel: 'Modules', unitNoun: 'modules', subtitle: 'Modules 1-8 · Foundation through canonical references and golden principles.', route: '/programme', filter: (m) => m.orderIndex >= 1 },
    ],

    // No PH-style readiness gates — the Customer Service source states no
    // equivalent readiness rule.
    readiness: [],

    // Guarded, additive UI descriptor for the final practical task. Consumed
    // by dashboard-view.js and app.js; the exact same generic mechanism
    // already used by Digital Marketing, Purchasing, and Centralized PPC —
    // undefined (and therefore inert) for PH/Amazon/eBay.
    practicalTask: {
      route: '/practical-task',
      label: 'Final Practical Task',
      availabilityNote: 'Available once you feel ready — completing it is optional and does not gate programme completion. PROTOTYPE_ONLY: it does not authorise live customer messages, refunds, returns, or account actions.',
    },

    dashboardSourceBlurb:
      'Content is sourced directly from the Ledsone Customer Support Handbook across all 8 modules. A small number ' +
      'of disputed or unsupported items (a numeric eBay account-health figure, a disputed lost-parcel timing ' +
      'figure, and several unsupported topics) are excluded rather than resolved — see Programme Sources for the ' +
      'full exclusions register. Progress recorded here remains PROTOTYPE_ONLY.',

    sourcesIntro:
      'All Customer Service Team programme content — modules, lessons, and Skill Check questions — is sourced ' +
      'directly from the Ledsone Customer Support Handbook below. The source is treated as FINAL PROTOTYPE TRUTH ' +
      'by explicit user authorisation. A small number of items found during discovery are ' +
      'deliberately <strong>excluded</strong> from this programme rather than resolved: a numeric eBay account-' +
      'health figure that conflicts with the existing eBay Team programme, a disputed lost-parcel timing figure, ' +
      'payment procedures, detailed invoice procedures, data/privacy-request workflows, chargeback handling, and ' +
      'unsupported Wayfair/B&amp;Q/Avasam marketplace-case workflows — see the Progression Rules below and ' +
      '<code>tosp/docs/customer-service-team-exclusions.md</code> for the full register. Real employee names from ' +
      'the source are never displayed — only generic role titles are used. Only message templates whose complete ' +
      'wording was found in the source are reproduced; the remainder of the source\'s own template register is ' +
      'named as an index only, never as usable message content. Progress, quiz results, and the final practical ' +
      'exercise recorded in this browser remain <strong>PROTOTYPE_ONLY</strong> and do not authorise sending a ' +
      'live customer message, processing a live refund or return, taking a live account action, or granting any ' +
      'policy exception.',

    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track ? { route: track.route, label: this.journeyLabel } : { route: '/programme', label: this.journeyLabel };
    },
  },
};
