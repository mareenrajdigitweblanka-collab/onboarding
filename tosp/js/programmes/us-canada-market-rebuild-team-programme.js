// programmes/us-canada-market-rebuild-team-programme.js — the US and Canada
// Market Rebuild Team programme DESCRIPTOR.
//
// Assembles the US/Canada content (modules/lessons + question bank) with the
// programme-level metadata, configuration, feature flags, UI descriptor, and
// final practical task the shared TOSP engine reads through the registry.
// The shared engine, scoring, progress, storage-safety, speech, theme, and
// completion logic are REUSED unchanged — nothing here duplicates the engine.
//
// DISCOVERY RESULT ENCODED HERE (see docs/us-canada-market-rebuild-team-
// source-map.md, docs/us-canada-market-rebuild-team-exclusions.md, and
// docs/us-canada-market-rebuild-team-programme-architecture.md for full
// detail):
//   - The entire US_Or_Canada_Market_Rebuild_Team/ source folder contains
//     exactly two DOCX files (both under one subfolder), both describing one
//     operational framework: "BGCT" — a US-only marketplace operations
//     standard for Amazon, eBay and Wayfair, covering warehouse operations,
//     listing accuracy, refund/replacement control, shipment SLA, account
//     health, and escalation/governance.
//   - Neither source document contains the word "rebuild" or any Canada- or
//     CAD-specific content anywhere (confirmed by full-text search). This
//     programme's title retains "Market Rebuild" per explicit instruction —
//     that is the approved project requirement label, not a claim that the
//     sources define a formal market-rebuild methodology. Learner-facing
//     content never states that the sources define "market rebuild"; it
//     states plainly that they do not, and that this programme applies the
//     approved US marketplace operational guidance (BGCT) the sources
//     actually contain. Canada scope is stated plainly, everywhere it
//     matters, as NOT SUPPORTED BY SOURCE — no Canada rule is ever taught as
//     fact, and a source-accuracy reconciliation pass (2026-07-29) added an
//     explicit "CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY"
//     notice visible on the programme card, dashboard, programme
//     introduction, practical-task introduction, and completion screen.
//     That same reconciliation pass also removed the two conflicting Late
//     Shipment Rate numeric values (previously taught as "2% operative")
//     from every learner-facing surface — neither disputed figure is taught
//     anywhere now; see docs/us-canada-market-rebuild-team-exclusions.md.
//   - requiresSignoff / requiresReviewerSignoff: false (no learner sign-off,
//     no reviewer sign-off, anywhere in this programme — an explicit TOSP
//     prototype configuration decision, since the source states no sign-off
//     rule of its own).
//   - enableTamilTranslation: false (no Tamil UI, no translation calls;
//     English Read Aloud stays available through the shared, unmodified
//     speaker-control component).
//   - Own versioned storage key — never mixes with any other programme's
//     progress, the active-programme selector, or the theme key.
//   - Quiz passing score / attempts REUSE the exact existing prototype
//     configuration (80% / 3 attempts) — one Skill Check per module, six
//     questions per Skill Check, 36 questions total across 6 modules.
//   - The personal name found in the confidential source subfolder path is
//     never displayed anywhere in this programme.
//   - Two documented, unresolved SOURCE_CONFLICTs are never silently
//     resolved: (1) Walmart is named in some source text but not in the
//     explicit "Platforms Covered" field — excluded from confirmed scope;
//     (2) the Late Shipment Rate target is stated as both "under 4%" and
//     "under 2%" across the two documents — this programme always teaches
//     the stricter 2% figure and states the conflict exists.
//   - The final practical task is DISPLAYED and COMPLETABLE but is NOT an
//     additional completion gate — completion remains "all 24 required
//     lessons complete + all 6 Skill Checks passed" (rules/module-access.js,
//     unchanged). The practical task's own checked-item state is transient,
//     in-memory UI state local to its view (views/practical-task-view.js) —
//     it is never written to progress/storage, never scored numerically, and
//     never read by isProgrammeComplete.

import { MODULES, LESSONS } from './us-canada-market-rebuild-team-modules.js';
import { QUIZZES, QUESTIONS } from './us-canada-market-rebuild-team-question-bank.js';

const PROGRAMME = {
  id: 'prog-us-canada-market-rebuild-onboarding',
  code: 'TOSP-USCA-01',
  title: 'US and Canada Market Rebuild Team Onboarding',
  team: 'US and Canada Market Rebuild Team',
  description:
    'CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY. ' +
    'Canada-market training is not included in this version because no approved Canada source material was ' +
    'available. A source-backed onboarding path across six modules — BGCT foundation and confirmed US-only scope, ' +
    'account-health and pricing governance, warehouse picking and packing operations, listing accuracy readiness, ' +
    'refund/replacement and return-inspection control, and shipment processing/escalation/weekly governance — built ' +
    'entirely from the two US BGCT Operations Handbook documents found under the source folder. This programme ' +
    'applies the approved US marketplace operational guidance the source documents actually contain. "Market ' +
    'Rebuild" is the approved project requirement title label — neither source document uses the word "rebuild" or ' +
    'defines a formal market-rebuild methodology, and this programme never claims otherwise. Confirmed marketplaces: ' +
    'Amazon (US), eBay (US), and Wayfair (US); Walmart is excluded from confirmed scope due to a documented source ' +
    'disagreement. This programme is PROTOTYPE_ONLY: it is an internal training representation only and does not ' +
    'itself authorise a live listing change, a live refund, a live shipment action, or any live account decision. ' +
    'Two source-internal conflicts (a Walmart platform-scope disagreement and a Late Shipment Rate numeric ' +
    'disagreement) are documented and never silently resolved — neither disputed Late Shipment Rate figure is ' +
    'taught anywhere in this programme; see the programme exclusions register.',
  version: '1.0',
  status: 'FINAL_TRUTH',
  totalModules: MODULES.length,
};

// The two US BGCT source documents actually used to build this programme.
// Their confidentiality marking (and the personal name in the source
// subfolder path) is preserved and never reproduced or displayed within this
// programme.
const SOURCE_DOCUMENTS = [
  {
    id: 'usca-src-guidelines-criteria',
    title: 'US BGCT Operations Handbook — Guidelines & Criteria Edition',
    version: 'Version 1.0 (per document footer)',
    effectiveDate: '—',
    confidentiality: 'Confidential — Internal Use Only.',
  },
  {
    id: 'usca-src-best-practice-guidance',
    title: 'US BGCT Operations Handbook — Best Practice & Guidance Edition',
    version: 'v0.1 (per filename); "Version 1.0" (per its own internal Standard Identification table) — a documented, unresolved SOURCE_CONFLICT',
    effectiveDate: '—',
    confidentiality: 'Confidential — Internal Use Only.',
  },
];

// Cross-cutting, source-cited rules not tied to a single lesson, shown on the
// Sources screen for traceability. No invented rules; each carries a
// citation. Includes this programme's own documented exclusions and scope
// findings.
const PROGRESSION_RULES = [
  { id: 'usca-rule-market-rebuild-meaning', rule: '"Market Rebuild" is the approved project requirement title label only. Neither source document uses the word "rebuild" anywhere, and neither source document defines a formal market-rebuild methodology (no market-entry analysis, market selection, catalogue rebuild, pricing rebuild, or launch/relaunch process is described). This programme applies the approved US marketplace operational guidance the source documents actually contain — the BGCT standard — and never claims the sources define a rebuild process.', source: 'Discovery finding — full-text search of both source documents found zero matches for "rebuild"; US BGCT Operations Handbook — Best Practice & Guidance Edition, Section B.2 ("Reason This Standard Was Chosen") describes the standard\'s adoption reason, not a rebuild methodology' },
  { id: 'usca-rule-scope-notice', rule: 'CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY. Canada-market training is not included in this version because no approved Canada source material was available. This notice is shown on the programme-selection card, dashboard, programme introduction, practical-task introduction, and completion screen.', source: 'Discovery finding — no Canada-market source material exists under US_Or_Canada_Market_Rebuild_Team/' },
  { id: 'usca-rule-canada-not-supported', rule: 'CANADA SCOPE IS NOT SUPPORTED BY SOURCE. A full-text search of both source documents found zero matches for "Canada," "Canadian," or "CAD." No lesson, question, or practical-task item in this programme teaches a Canada-specific rule as fact, and Canada is never presented as an available learning track.', source: 'Discovery finding — full-text search of both source documents; see docs/us-canada-market-rebuild-team-source-map.md' },
  { id: 'usca-rule-confirmed-platforms', rule: 'Confirmed marketplace scope is Amazon (US), eBay (US), and Wayfair (US), per the explicit "Platforms Covered" field. Walmart appears in some cover/body text in both documents but not in that explicit field — this is a documented SOURCE_CONFLICT, and Walmart is excluded from confirmed scope rather than asserted either way.', source: 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section B.1 ("Standard Identification — Platforms Covered") vs. cover/body Walmart mentions in both editions — SOURCE_CONFLICT, unresolved' },
  { id: 'usca-rule-late-shipment-conflict', rule: 'SOURCE_CONFLICT — the Late Shipment Rate target is stated differently in different sections across the two source documents (one occurrence states a different figure from the other four occurrences). This is not resolved by this programme: neither disputed figure is taught anywhere as the approved target, in any module, lesson, KPI table, question, answer option, or the practical task. Learners are taught only that Late Shipment Rate is monitored, that the conflicting thresholds require business-owner resolution, and that a learner must never select a threshold independently — always use the current approved operational source instead.', source: 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Sections A.5.1 vs. B.1.4/B.5; Best Practice & Guidance Edition, Section B.3 — SOURCE_CONFLICT, unresolved, both disputed figures excluded from learner-facing content' },
  { id: 'usca-rule-duplicate-source-completeness', rule: 'Two overlapping source documents exist describing the same BGCT framework. The Best Practice & Guidance Edition (filename "v0.1") is treated as the more complete of the two — it adds a Standard Identification governance block, worked examples, anti-examples, troubleshooting, and a binary Checklist/Final Compliance Gate section not present in the Guidelines & Criteria Edition (filename states "Version 1.0") — and is cited first wherever both documents cover the same rule; this is a completeness-based authoring decision, not a claim that the version-label conflict itself is resolved.', source: 'Both source editions — see docs/us-canada-market-rebuild-team-source-map.md, "Duplicate/version conflict" section' },
  { id: 'usca-rule-cppc-crossref', rule: 'General PPC campaign management, bid optimisation, and keyword targeting are owned by the existing Centralized PPC Team programme, not re-taught here. This programme teaches only the BGCT-specific accountability check the source documents themselves describe: reviewing CPPC spend against sales and stopping wasteful spend.', source: 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Sections A.4, A.6.3 — cross-programme boundary; existing Centralized PPC Team programme is not modified by this work' },
  { id: 'usca-rule-cst-crossref', rule: 'General customer-case communication, refund/replacement decision-making for customer-facing cases, and marketplace case handling are owned by the existing Customer Service Team programme, not re-taught here. This programme teaches only the warehouse-inspection-first refund control and the warehouse-to-CST return-inspection handoff BGCT itself documents.', source: 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Sections B.3.1-B.3.3 — cross-programme boundary; existing Customer Service Team programme is not modified by this work' },
  { id: 'usca-rule-no-invented-figures', rule: 'No currency conversion, exchange rate, tax rule, duty rule, compliance/certification requirement, product-assessment scoring formula, or advertising-spend threshold is stated anywhere in either source document. None of these is invented anywhere in this programme.', source: 'Discovery finding — neither source document contains this content; see docs/us-canada-market-rebuild-team-exclusions.md' },
  { id: 'usca-rule-personal-name-excluded', rule: 'The confidential source subfolder name includes a personal identifier. It is never displayed, referenced, or reproduced anywhere in this programme\'s learner-facing content, module/lesson/question text, or UI.', source: 'Confidentiality policy applied programme-wide; see docs/us-canada-market-rebuild-team-exclusions.md' },
];

// US/Canada has no source-defined whole-programme score-band or
// probation-gate tables (unlike PH). These are intentionally empty; the
// Sources screen hides empty sections. This keeps the content interface
// consistent across programmes.
const EVALUATION_SCORE_BANDS = [];
const EVALUATION_SCORE_BANDS_SOURCE = '';
const PROBATION_SCORE_GATES = [];
const PROBATION_SCORE_GATES_SOURCE = '';

// ---------------------------------------------------------------------------
// FINAL PRACTICAL TASK — PROTOTYPE_ONLY, non-gating, not numerically scored,
// no sign-off. Modelled directly on the source's own Section C "Checklist —
// Binary Control Gate" and "Final Compliance Gate," which is the closest
// thing either source document has to a rebuild-readiness pack. Every
// checklist item cites a source already taught in the module content above;
// no Canada rule, no invented pricing/compliance figure, and no confidential
// value appears anywhere in it. Uses entirely fictional example data.
// ---------------------------------------------------------------------------

const practicalItem = (id, text, source) => ({ id, text, source });

const PRACTICAL_TASK = {
  id: 'us-canada-market-rebuild-final-practical-v1',
  status: 'PROTOTYPE_ONLY',
  title: 'Final Practical Task — Fictional BGCT Operational Rebuild Readiness Pack',
  intro:
    'CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY — this task covers only Amazon US, eBay US, and ' +
    'Wayfair US; Canada-market training is not included because no approved Canada source material was available. ' +
    'Work through one fictional, non-live BGCT operational readiness review end to end, applying what you have ' +
    'learned across all six modules. Use only invented example data throughout — a fictional account, SKU, order ' +
    'number, and KPI figures — never a real account, product, order, or employee. This exercise does not connect ' +
    'to any marketplace, does not change a real listing or price, does not spend real advertising budget, does not ' +
    'send a real customer message, does not change real stock, does not issue a real refund, and does not grant ' +
    'any legal, financial, or marketplace authorisation.',
  closingNote: 'PROTOTYPE_ONLY. Completing this exercise does not authorise you to publish a live listing, approve a live refund, change live pricing, take a live shipment action, or make a live compliance determination.',
  sections: [
    {
      id: 'usca-pt-sec-scope',
      title: 'Confirm Market Scope for the Fictional Request',
      items: [
        practicalItem('usca-pt-001', 'Fictional request: "Our new office-chair line needs a rebuild plan for the US and Canada." Using only what the sources support, state which country/countries this programme\'s content actually covers, and explain what you would tell the requester about the Canada portion of their request.', 'Discovery finding — Canada is NOT SUPPORTED BY SOURCE; US BGCT Operations Handbook — Best Practice & Guidance Edition, Section B.1 ("Platforms Covered")'),
        practicalItem('usca-pt-002', 'State the three confirmed marketplaces this fictional account\'s rebuild plan may reference, and explain why Walmart is deliberately left out of your confirmed-scope statement.', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section B.1; documented Walmart SOURCE_CONFLICT'),
      ],
    },
    {
      id: 'usca-pt-sec-kpi',
      title: 'Validate Fictional Account-Health Inputs Against BGCT Targets',
      items: [
        practicalItem('usca-pt-003', 'Fictional account snapshot: ODR = 1.4%, Listing Accuracy Rate = 97.8%. Compare each figure against its BGCT target and state which ones fail. The snapshot also shows a Late Shipment Rate figure — state why you cannot compare it against a single "BGCT target" and what you should do instead.', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Sections A.5.1, B.5 ("Master KPI Reference Table"); Late Shipment Rate target is a documented, unresolved SOURCE_CONFLICT — see Programme Sources'),
        practicalItem('usca-pt-004', 'For each KPI that fails in Item 3, state the escalation severity it would trigger under the escalation guidance, and who it should be assigned to.', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section G.6 ("Escalation Guidance — Severity Table")'),
      ],
    },
    {
      id: 'usca-pt-sec-listing',
      title: 'Identify Fictional Listing/Catalogue Gaps',
      items: [
        practicalItem('usca-pt-005', 'Fictional SKU DW-CHR-BLU-M (Office Chair, Blue, Medium) has a listing image showing a grey chair. Using the listing-accuracy checklist, state what must happen before this listing may go live.', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.2.1; Best Practice & Guidance Edition, Section G.3.1'),
      ],
    },
    {
      id: 'usca-pt-sec-pricing',
      title: 'Prepare a Fictional Pricing-Input Checklist',
      items: [
        practicalItem('usca-pt-006', 'Fictional item cost and fees produce a 14% margin on SKU DW-CHR-BLU-M. State whether this passes BGCT\'s profitability rule, and what the next action is.', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section A.6.3 ("Profitability Rules")'),
      ],
    },
    {
      id: 'usca-pt-sec-fulfilment',
      title: 'Assess Fictional Inventory/Fulfilment and Refund Readiness',
      items: [
        practicalItem('usca-pt-007', 'A fictional order for DW-CHR-BLU-M is placed at 11:40 AM Sri Lanka Time. State which processing slot it falls into and by when the label must be created.', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Section B.4 ("Label Creation Priority Rules")'),
        practicalItem('usca-pt-008', 'A fictional customer requests a refund for DW-CHR-BLU-M before returning it. State the two mandatory checks that must happen before any refund is approved.', 'US BGCT Operations Handbook — Guidelines & Criteria Edition, Sections B.3.1-B.3.2'),
      ],
    },
    {
      id: 'usca-pt-sec-handover',
      title: 'Record Unresolved Conflicts, Approvals and Handover Evidence',
      items: [
        practicalItem('usca-pt-009', 'List the two documented SOURCE_CONFLICTs you would flag in your rebuild-readiness handover for this fictional account, and confirm you have not resolved either one yourself.', 'Programme-wide exclusions register — Walmart platform-scope conflict; Late Shipment Rate numeric disagreement'),
        practicalItem('usca-pt-010', 'State which generic role must formally approve the listing before publish, and which four elements a weekly-review handover summary must document.', 'US BGCT Operations Handbook — Best Practice & Guidance Edition, Section G.3.1 (Step 07); Guidelines & Criteria Edition, Section C.6 ("Weekly Review Output")'),
        practicalItem('usca-pt-011', 'Record one known limitation of this fictional exercise (for example, that completing it does not authorise a live listing publish), and state the single next action for this fictional readiness review.', 'Programme-wide PROTOTYPE_ONLY boundary; US BGCT Operations Handbook — Best Practice & Guidance Edition, Section C.8 ("Final Compliance Gate")'),
      ],
    },
  ],
};

export const usCanadaMarketRebuildTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'US/Canada Rebuild',
  team: PROGRAMME.team,
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — this programme's OWN versioned storage key. Never
  // shares a key with PH (tosp.prototype.v2), Amazon
  // (tosp.amazon-team.prototype.v1), eBay (tosp.ebay-team.prototype.v1),
  // Digital Marketing (tosp.digital-marketing-team.prototype.v1), Purchasing
  // (tosp.purchasing-team.prototype.v1), Centralized PPC
  // (tosp.centralized-ppc-team.prototype.v1), Customer Service
  // (tosp.customer-service-team.prototype.v1), the theme
  // (tosp.ui.theme.v1), or the active-programme selector
  // (tosp.active-programme.v1). Reset clears only this key.
  storageKey: 'tosp.us-canada-market-rebuild-team.prototype.v1',
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
    journeyLabel: 'US/Canada Market Rebuild Team Journey',

    // No Tamil "Translation Review" item; no other programme's
    // programme-specific navigation. Adds one US/Canada-specific item: the
    // final practical task, reusing the generic mechanism already used by
    // Digital Marketing, Purchasing, Centralized PPC, and Customer Service.
    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme', label: 'US/Canada Rebuild Journey', icon: '➤', route: '/programme' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'practical-task', label: 'Practical Task', icon: '✎', route: '/practical-task' },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
    ],

    // Single track across all 6 modules — the source's own structure is one
    // BGCT framework applied across functional areas (foundation, account
    // health, warehouse, listing, refund, shipment/governance), not separate
    // US-track/Canada-track content, since no Canada-specific content exists
    // to form a second track from.
    tracks: [
      { key: 'us-canada-rebuild', title: 'US/Canada Market Rebuild Team Journey', statLabel: 'Modules', unitNoun: 'modules', subtitle: 'Modules 1-6 · BGCT foundation through shipment, escalation and weekly governance.', route: '/programme', filter: (m) => m.orderIndex >= 1 },
    ],

    // No PH-style readiness gates — the source states no equivalent
    // readiness rule.
    readiness: [],

    // Guarded, additive UI descriptor for the final practical task. Consumed
    // by dashboard-view.js and app.js; the exact same generic mechanism
    // already used by Digital Marketing, Purchasing, Centralized PPC, and
    // Customer Service — undefined (and therefore inert) for PH/Amazon/eBay.
    practicalTask: {
      route: '/practical-task',
      label: 'Final Practical Task',
      availabilityNote: 'Available once you feel ready — completing it is optional and does not gate programme completion. PROTOTYPE_ONLY: it does not authorise a live listing publish, refund, price change, or shipment action.',
    },

    // Guarded, additive UI descriptor for the country-scope notice. Consumed
    // generically by views/completion-view.js (one line, guarded by an
    // existence check) — the exact same additive pattern already used for
    // `practicalTask` above. Undefined (and therefore inert, zero rendering
    // change) for every other programme, since none of them define this
    // field. Added 2026-07-29 during a source-accuracy reconciliation pass so
    // the US-only scope notice is visible on the completion screen, which has
    // no other slot for programme-specific free text.
    scopeNote: 'CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY. Canada-market training is not included because no approved Canada source material was available.',

    dashboardSourceBlurb:
      'CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY. Content is sourced directly from the two US BGCT ' +
      'Operations Handbook documents across all 6 modules. Discovery found no Canada-specific content in either ' +
      'document — Canada scope is stated as NOT SUPPORTED BY SOURCE rather than invented, and Canada is never shown ' +
      'as an available learning track. Two internal source conflicts (a Walmart platform-scope disagreement and a ' +
      'Late Shipment Rate numeric disagreement) are documented rather than resolved — neither disputed Late Shipment ' +
      'Rate figure is taught anywhere in this programme; see Programme Sources for the full exclusions register. ' +
      'Progress recorded here remains PROTOTYPE_ONLY.',

    sourcesIntro:
      'All US/Canada Market Rebuild Team programme content — modules, lessons, and Skill Check questions — is sourced ' +
      'directly from the two documents below. Both are treated as source material describing one operational framework ' +
      '("BGCT"); the Best Practice & Guidance Edition is cited first where both documents cover the same rule, on ' +
      'completeness grounds — see the Progression Rules below and ' +
      '<code>tosp/docs/us-canada-market-rebuild-team-source-map.md</code> for the full duplicate-source reasoning. ' +
      'Discovery found <strong>no Canada-specific content anywhere</strong> in either document, and neither document ' +
      'uses the word "rebuild" or defines a formal market-rebuild methodology — both findings are stated explicitly ' +
      'rather than assumed away. "Market Rebuild" is this programme\'s approved project title label only; this ' +
      'programme applies the approved US marketplace operational guidance the sources actually contain, recorded ' +
      'above. Two source-internal conflicts (a Walmart platform-scope disagreement and a Late Shipment Rate numeric ' +
      'disagreement) are documented, not resolved — neither disputed Late Shipment Rate figure is taught anywhere in ' +
      'this programme — see <code>tosp/docs/us-canada-market-rebuild-team-exclusions.md</code> for the full register. ' +
      'The personal name found in the confidential source subfolder path is never displayed. Progress, quiz results, ' +
      'and the final practical exercise recorded in this browser remain <strong>PROTOTYPE_ONLY</strong> and do not ' +
      'authorise a live listing publish, a live refund, a live price change, or any other live account action.',

    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track ? { route: track.route, label: this.journeyLabel } : { route: '/programme', label: this.journeyLabel };
    },
  },
};
