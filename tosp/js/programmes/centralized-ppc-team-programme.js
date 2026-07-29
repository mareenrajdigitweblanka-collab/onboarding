// programmes/centralized-ppc-team-programme.js — the Centralized PPC Team
// programme DESCRIPTOR.
//
// Assembles the Centralized PPC content (modules/lessons + question bank)
// with the programme-level metadata, configuration, feature flags, UI
// descriptor, and final practical task the shared TOSP engine reads through
// the registry. The shared engine, scoring, progress, storage-safety,
// speech, theme, and completion logic are REUSED unchanged — nothing here
// duplicates the engine.
//
// Centralized PPC-specific rules encoded here (all user-confirmed):
//   - requiresSignoff / requiresReviewerSignoff: false (no learner or reviewer sign-off)
//   - enableTamilTranslation: false (no Tamil UI, no translation calls; English Read Aloud stays available)
//   - own versioned storage key (never mixes with PH/Amazon/eBay/Digital Marketing/Purchasing progress)
//   - quiz passing score / attempts REUSE the exact existing config (80% / 3)
//   - all 30 Centralized PPC source files were read in full during discovery
//     and are treated as FINAL PROTOTYPE TRUTH, subject to the nine mandatory
//     conflict exclusions and the confidentiality exclusions below
//   - the final practical task is DISPLAYED and COMPLETABLE but is NOT an
//     additional completion gate — completion remains "all required lessons
//     complete + all 14 module Skill Checks passed", per rules/module-access.js,
//     unchanged. The practical task's own checked-item state is transient,
//     in-memory UI state local to its view (see views/practical-task-view.js)
//     — it is never written to progress/storage and never read by
//     isProgrammeComplete.

import { MODULES, LESSONS } from './centralized-ppc-team-modules.js';
import { QUIZZES, QUESTIONS } from './centralized-ppc-team-question-bank.js';

const PROGRAMME = {
  id: 'centralized-ppc-team',
  code: 'TOSP-CPPC',
  title: 'Centralized PPC Team Onboarding',
  team: 'Centralized PPC Team',
  description:
    'A source-backed onboarding path across a Shared PPC Foundation and four platform tracks — Amazon PPC (6 modules), ' +
    'Google Ads (2 modules), Meta Ads (1 module), and eBay Advertising (2 modules) — closing with Reporting and ' +
    'Governance (2 modules), built entirely from the 30 Centralized PPC source documents (user-confirmed FINAL ' +
    'PROTOTYPE TRUTH). Implementation was authorised without resolving nine conflicts found between those sources; ' +
    'every one of the nine is deliberately excluded from this programme rather than resolved, and is recorded in the ' +
    'programme exclusions register. Learner progress, quiz results, and the final practical exercise recorded in ' +
    'this browser remain PROTOTYPE_ONLY and are not official advertising authorisation, campaign-management ' +
    'authority, or competency evidence.',
  version: '1.0',
  status: 'FINAL_TRUTH',
  totalModules: MODULES.length,
};

// The full 30-file Centralized PPC source inventory actually used to build
// this programme. Learner-safe titles only — no confidential filesystem
// paths. See docs/centralized-ppc-team-source-map.md for the complete
// per-file authority, duplicate/version, and confidentiality classification.
const SOURCE_DOCUMENTS = [
  // Amazon — foundation/BGCT (3)
  { id: 'cppc-src-amz-bgct-handbook', title: 'Amazon PPC Campaign Management — BGCT Standard Handbook', version: 'v2.1', effectiveDate: 'June 2026', confidentiality: 'Internal CPPC Handbook — Confidential, Internal Use Only' },
  { id: 'cppc-src-amz-ads-bgct', title: 'Amazon Ads BGCT — Best Practices, Guidelines, Checklist & Tutorial', version: '—', effectiveDate: 'Last update May 2026', confidentiality: 'Internal CPPC reference — Confidential & Internal Use Only; overlaps the Handbook above, see duplicate/version group' },
  { id: 'cppc-src-amz-guidebook', title: 'What is the Amazon Campaign? — Guidebook', version: '—', effectiveDate: '—', confidentiality: 'Internal reference — no confidentiality label in-source; no confirmed CPPC ownership statement' },
  // Amazon — rule configurators (5)
  { id: 'cppc-src-amz-bid-config', title: 'Bid Optimization Rule Configurator — Developer Specification', version: 'v2.0', effectiveDate: '—', confidentiality: 'Internal developer specification — UK reference template' },
  { id: 'cppc-src-amz-budget-config', title: 'Budget Optimization Rule Configurator — Developer Specification', version: '—', effectiveDate: '—', confidentiality: 'Internal developer specification — self-describes its rules as immutable; UK reference template' },
  { id: 'cppc-src-amz-hourly-config', title: 'Hour-Basic Budget Optimization Rule Configurator — Developer Specification', version: '—', effectiveDate: '—', confidentiality: 'Internal developer specification — contains a seller-account reference table excluded from this programme' },
  { id: 'cppc-src-amz-activation-config', title: 'Product Re-Activation Rule Configurator — Developer Specification', version: 'v1.0', effectiveDate: '—', confidentiality: 'Internal developer specification, marked Confidential — Internal Developer Use Only' },
  { id: 'cppc-src-amz-pause-config', title: 'Spend-Basic Product Pause Rule Configurator — Developer Specification', version: '—', effectiveDate: '—', confidentiality: 'Internal developer specification — visibly unfinished; non-UK marketplace threshold columns are unpopulated placeholders' },
  // Amazon — UK user-level workflows (11)
  { id: 'cppc-src-amz-uk-bid', title: 'User-Level Bid Optimization Workflow (SP) — Amazon UK', version: '2025', effectiveDate: '—', confidentiality: 'Internal operational workflow' },
  { id: 'cppc-src-amz-uk-budget-sbsd-v1', title: 'User-Level Daily Budget Optimization Workflow (SB & SD) — Amazon UK, prior version', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow — superseded by the 2026-labelled sibling document; see duplicate/version group' },
  { id: 'cppc-src-amz-uk-budget-sbsd-v2', title: 'User-Level Daily Budget Optimization Workflow (SB & SD) — Amazon UK, 2026 revision', version: '2026', effectiveDate: '—', confidentiality: 'Internal operational workflow — treated as the current version of the sibling pair above' },
  { id: 'cppc-src-amz-uk-budget-sp', title: 'User-Level Daily Budget Optimization Workflow (SP) — Amazon UK', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow — structurally distinct from the SB & SD sibling; see budget-tier-structure exclusion' },
  { id: 'cppc-src-amz-uk-tacos-sbsd', title: 'User-Level TACOS Workflow (SB/SD) — Amazon UK', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow — content-identical to the SP-labelled sibling document; see duplicate/version group' },
  { id: 'cppc-src-amz-uk-tacos-sp', title: 'User-Level TACOS Workflow (SP) — Amazon UK', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow — content-identical to the SB/SD-labelled sibling document; see duplicate/version group' },
  { id: 'cppc-src-amz-uk-activation', title: 'User-Level Product Re-Activation Workflow (Spend-Based) — Amazon UK', version: 'Active Rule 2026', effectiveDate: '—', confidentiality: 'Internal operational workflow' },
  { id: 'cppc-src-amz-uk-pause-spend-sbsd', title: 'User-Level Product Pause Workflow (Spend-Based, SB & SD) — Amazon UK', version: '2025 + 2026 sections', effectiveDate: '—', confidentiality: 'Internal operational workflow — contains a 2025 legacy rule set alongside a 2026 current rule set' },
  { id: 'cppc-src-amz-uk-pause-spend-sp', title: 'User-Level Product Pause Workflow (Spend-Based, SP) — Amazon UK', version: 'Pause Rule 2026', effectiveDate: '—', confidentiality: 'Internal operational workflow' },
  { id: 'cppc-src-amz-uk-pause-stock-sbsd', title: 'User-Level Product Pause Workflow (Stock-Based, SB & SD) — Amazon UK', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow' },
  { id: 'cppc-src-amz-uk-pause-stock-sp', title: 'User-Level Product Pause Workflow (Stock-Based, SP) — Amazon UK', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow — fast-moving-product definition differs from its SB & SD sibling; see fast-mover exclusion' },
  // Amazon — DE, FR & IT user-level workflows (4)
  { id: 'cppc-src-amz-defrit-budget', title: 'User-Level Daily Budget Optimization Workflow — Amazon DE, FR & IT', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow — contains two unreconciled named-author rule variants; draft status' },
  { id: 'cppc-src-amz-defrit-hourly', title: 'User-Level Hour-Basic Optimization Workflow — Amazon DE, FR & IT', version: '—', effectiveDate: '—', confidentiality: 'Internal operational workflow — contains two unreconciled named-author rule variants; draft status' },
  { id: 'cppc-src-amz-defrit-pause', title: 'User-Level Product Pause Workflow — Amazon DE, FR & IT', version: '2025 + 2026 sections', effectiveDate: '—', confidentiality: 'Internal operational workflow — 2026 section heading still reads "Amazon UK", strong evidence of an incomplete localisation clone' },
  { id: 'cppc-src-amz-defrit-activation', title: 'User-Level Product Re-Activation Workflow (Spend-Based, SP) — Amazon DE, FR & IT', version: 'Active Rule 2026', effectiveDate: '—', confidentiality: 'Internal operational workflow — materially simpler rule structure than its UK counterpart; coverage gap, not a numeric conflict' },
  // Google Ads (3)
  { id: 'cppc-src-google-17months', title: 'Google PPC Strategy — 17 Months of Live Data', version: '—', effectiveDate: '21 May 2026', confidentiality: 'Internal strategist analysis, Internal Use Only — contains real historical account/operator performance figures, excluded from this programme' },
  { id: 'cppc-src-google-lostwhy', title: 'What We Lost and Why — Google Ads Incident Review & Rules', version: '—', effectiveDate: '22 May 2026', confidentiality: 'Internal director memo, Internal Use Only — contains real historical account/operator performance figures, excluded from this programme' },
  { id: 'cppc-src-google-pmax-setup', title: 'Google Ads Performance Max — Campaign Setup & Optimization Strategy', version: 'Marked "Modified Document"', effectiveDate: '24 Feb 2026 – 27 Mar 2026 (review sections)', confidentiality: 'Internal setup guide + account review — contains real account performance figures, excluded from this programme' },
  // Meta (1)
  { id: 'cppc-src-meta-fbads', title: 'FB Ads New Campaign Proposal — Cold Prospecting & Mid-Funnel', version: '—', effectiveDate: '21 April 2026', confidentiality: 'Internal campaign proposal, pre-approval — contains real account performance figures, excluded from this programme' },
  // eBay (3)
  { id: 'cppc-src-ebay-bgct', title: 'eBay Ads BGCT — Best Practices, Guidelines, Checklist & Tutorial', version: '—', effectiveDate: 'Last update May 2026', confidentiality: 'Internal CPPC reference, Confidential & Internal Use Only' },
  { id: 'cppc-src-ebay-accelerator', title: 'Rules of Successful Ad Strategy — The Accelerator Method', version: '—', effectiveDate: '—', confidentiality: 'Individual strategy notes, no confidentiality marking — conflicts with the eBay Team Guides on advertising rate; see rate exclusion' },
  { id: 'cppc-src-ebay-teamguides', title: 'eBay Team Guides', version: '—', effectiveDate: '13 May 2026 (informal note)', confidentiality: 'Internal operational directive — defines the Leader/PPC-manager approval structure' },
];

// Cross-cutting, source-cited rules not tied to a single lesson, shown on the
// Sources screen for traceability. No invented rules; each carries a
// citation. Includes the programme's nine mandatory exclusions (full detail
// in docs/centralized-ppc-team-exclusions.md).
const PROGRESSION_RULES = [
  { id: 'cppc-rule-evidence', rule: 'A decision, instruction, or change that exists only in conversation or memory is treated as if it never happened — it must be recorded where the team can see it. This principle runs through every platform: Amazon\'s "No-Rule Point", the Google Ads handover requirement, and eBay\'s weekly PPC-manager report are three platform-specific expressions of the same rule.', source: 'Amazon PPC Campaign Management BGCT Standard Handbook, "No-Rule Point"; What We Lost and Why, Rule H-2; eBay Team Guides, weekly report requirement' },
  { id: 'cppc-rule-recommendation-not-approval', rule: 'A rule engine\'s output, a decision-support flag, or a proposal document is a starting recommendation only — it is never treated as an approved decision until an explicit human approval step, appropriate to that platform, has actually happened.', source: 'FB Ads New Campaign Proposal, header approval requirement; What We Lost and Why, Rules P-1 and H-4; eBay Team Guides, Priority PPC Targets section' },
  { id: 'cppc-rule-eligibility-gates', rule: 'Before paid-advertising work begins, both the product/listing itself and its supporting page or listing content must independently clear a readiness check — on Amazon, a Product Eligibility gate and a Listing Quality gate; on eBay, a minimum-price eligibility gate plus listing-quality inputs.', source: 'Amazon PPC Campaign Management BGCT Standard Handbook, Gate 1 and Gate 2; eBay Ads BGCT, pricing-rule and Listing Quality Score sections' },
  { id: 'cppc-rule-incremental-scaling', rule: 'Budget and bid increases for a proven, strong-performing campaign are made in modest, incremental steps built on a sustained track record — never as a single large jump triggered by one good result.', source: 'Amazon PPC Campaign Management BGCT Standard Handbook, scaling section; Google Ads Performance Max — Campaign Setup & Optimization Strategy, budget-review sequence' },
  { id: 'cppc-rule-star-rating-excluded', rule: 'SOURCE_CONFLICT — two Amazon BGCT sources state two different minimum star-rating figures for the same Sponsored Products eligibility rule. No specific star-rating figure is taught or quizzed anywhere in this programme.', source: 'Amazon PPC Campaign Management BGCT Standard Handbook vs. Amazon Ads BGCT — internal conflict, unresolved' },
  { id: 'cppc-rule-budget-cadence-excluded', rule: 'SOURCE_CONFLICT — the same two Amazon BGCT sources state two different budget-review cadences (a daily review versus a twice-weekly review) for what should be the same rule. No specific cadence is taught or quizzed as a universal Amazon rule anywhere in this programme.', source: 'Amazon PPC Campaign Management BGCT Standard Handbook vs. Amazon Ads BGCT — internal conflict, unresolved' },
  { id: 'cppc-rule-asin-adgroup-excluded', rule: 'SOURCE_CONFLICT — the Amazon PPC Campaign Management BGCT Standard Handbook contradicts itself on how many ASINs may share one Sponsored Products ad group. No specific ASIN-per-ad-group figure or rule is taught or quizzed anywhere in this programme.', source: 'Amazon PPC Campaign Management BGCT Standard Handbook — internal self-contradiction, unresolved' },
  { id: 'cppc-rule-acos-market-excluded', rule: 'SOURCE_CONFLICT — the Amazon UK and Amazon DE/FR/IT product-pause workflows state two different high-ACOS pause thresholds for what should be the same rule, and the DE/FR/IT document\'s own 2026 section heading still reads "Amazon UK" — strong evidence of an incomplete localisation clone. No specific ACOS threshold is taught or quizzed as a confirmed DE/FR/IT figure anywhere in this programme.', source: 'User-Level Product Pause Workflow (Spend-Based, SB & SD) — Amazon UK vs. User-Level Product Pause Workflow — Amazon DE, FR & IT — internal conflict, unresolved' },
  { id: 'cppc-rule-currency-excluded', rule: 'SOURCE_CONFLICT — several Amazon DE, FR & IT rule documents price every threshold in the UK\'s currency rather than a currency appropriate to those markets. This programme does not convert, correct, or otherwise repair this localisation gap; it is reported as unresolved.', source: 'User-Level Daily Budget and Hour-Basic Optimization Workflows — Amazon DE, FR & IT — source defect, unresolved' },
  { id: 'cppc-rule-month-boundary-excluded', rule: 'SOURCE_CONFLICT — sibling Amazon UK product-pause workflows use two different day-of-month cut-off dates for switching between a 30-day ACOS figure and a month-to-date figure. No specific cut-off date is taught or quizzed anywhere in this programme.', source: 'User-Level Product Pause Workflow (Spend-Based, SB & SD) — Amazon UK vs. User-Level Product Pause Workflow (Spend-Based, SP) — Amazon UK — internal conflict, unresolved' },
  { id: 'cppc-rule-fastmover-excluded', rule: 'SOURCE_CONFLICT — sibling Amazon UK stock-based pause workflows define "fast-moving product" using two different sets of qualifying conditions (one includes a sales-multiple clause the other omits). No specific fast-mover definition is taught or quizzed anywhere in this programme.', source: 'User-Level Product Pause Workflow (Stock-Based, SB & SD) — Amazon UK vs. User-Level Product Pause Workflow (Stock-Based, SP) — Amazon UK — internal conflict, unresolved' },
  { id: 'cppc-rule-ebay-rate-excluded', rule: 'SOURCE_CONFLICT — two individually authored eBay sources give directly contradictory advertising-rate guidance (one recommends a low starting rate and calls a higher range a "loss trap"; the other mandates that higher range "at all times"). No specific advertising-rate percentage or range is taught or quizzed anywhere in this programme.', source: 'Rules of Successful Ad Strategy — The Accelerator Method vs. eBay Team Guides — internal conflict, unresolved' },
  { id: 'cppc-rule-budgettier-excluded', rule: 'SOURCE_CONFLICT — sibling Amazon UK daily-budget workflows use a structurally different number of performance tiers for what should be the same rule family (a simpler two-category structure in one document, a more granular five-category structure in the other). No specific tier count or boundary is taught or quizzed anywhere in this programme.', source: 'User-Level Daily Budget Optimization Workflow (SB & SD) — Amazon UK vs. User-Level Daily Budget Optimization Workflow (SP) — Amazon UK — internal conflict, unresolved' },
  { id: 'cppc-rule-ph-dashboard-unconfirmed', rule: 'The Amazon TACOS escalation flow hands flagged products to a decision layer referred to only as the "PH Dashboard" in the source material. No source confirms any relationship between this escalation layer and the separate, pre-existing PH Team onboarding programme on this platform. This programme does not assume one.', source: 'User-Level TACOS Workflow — Amazon UK, Phase 4 (Auto-Flagging & Escalation) — relationship unconfirmed' },
];

// Centralized PPC has no source-defined whole-programme score-band or
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
// above; no disputed threshold, no real account, and no platform connection
// of any kind is referenced anywhere. Uses fictional, neutral example data
// only; does not create or launch a real campaign on any platform, does not
// spend real budget, and requires no sign-off.
// ---------------------------------------------------------------------------

const practicalItem = (id, text, source) => ({ id, text, source });

const PRACTICAL_TASK = {
  id: 'centralized-ppc-final-practical-v1',
  status: 'PROTOTYPE_ONLY',
  title: 'Final Practical Task — Cross-Platform PPC Planning & Review Pack',
  intro:
    'Prepare a short, fictional, non-live PPC planning and review pack that applies what you have learned across the ' +
    'Foundation and all four platform tracks. Use invented, neutral example data throughout (for example, a ' +
    'fictional product and fictional performance figures) — never a real account, client, or live campaign. This ' +
    'exercise does not connect to any advertising platform, does not launch or change a real campaign, does not ' +
    'spend real budget, and does not require Team Leader, Manager, Leader, or reviewer sign-off.',
  closingNote: 'Prototype planning exercise — not an official campaign approval or advertising authorisation.',
  sections: [
    {
      id: 'cppc-pt-sec-request',
      title: 'Validating a Fictional Campaign Request',
      items: [
        practicalItem('cppc-pt-001', 'State which platform (Amazon, Google Ads, Meta, or eBay) you would choose for your fictional product and why, referencing the source-backed reason each platform track exists.', 'Shared PPC Foundation, Lesson 1; see Module 1'),
        practicalItem('cppc-pt-002', 'List the eligibility checks your fictional product and its listing would need to pass before advertising work begins on your chosen platform.', 'Amazon PPC Campaign Management BGCT Standard Handbook, Gate 1/Gate 2; eBay Ads BGCT, pricing-rule section'),
      ],
    },
    {
      id: 'cppc-pt-sec-setup',
      title: 'Campaign Setup Evidence',
      items: [
        practicalItem('cppc-pt-003', 'Name your fictional campaign following the correct naming convention for your chosen platform, and state which campaign type and targeting method you selected.', 'Amazon PPC Campaign Management BGCT Standard Handbook, naming convention section; What is the Amazon Campaign? Guidebook'),
        practicalItem('cppc-pt-004', 'List the required setup evidence (for example, feed quality, listing quality, or audience definitions) your chosen platform requires before this fictional campaign can launch.', 'Google Ads Performance Max — Campaign Setup & Optimization Strategy, feed-requirements section; FB Ads New Campaign Proposal, audience-definition sections'),
      ],
    },
    {
      id: 'cppc-pt-sec-metrics',
      title: 'Selecting Metrics to Monitor',
      items: [
        practicalItem('cppc-pt-005', 'List the metrics you would monitor for your fictional campaign (for example, ACOS, TACOS, ROAS, CTR, or conversion rate) and state, in your own words, what each one tells you.', 'Amazon PPC Campaign Management BGCT Standard Handbook, formula sections; User-Level TACOS Workflow — Amazon UK'),
      ],
    },
    {
      id: 'cppc-pt-sec-review',
      title: 'Reviewing a Fictional Campaign Summary',
      items: [
        practicalItem('cppc-pt-006', 'Given a fictional set of performance figures you invent yourself, describe whether your campaign looks healthy, and identify one optimisation action a source-backed rule would support — without stating any of the nine excluded conflict figures.', 'Programme-wide synthesis; see Modules 3, 4, 6, and 9'),
      ],
    },
    {
      id: 'cppc-pt-sec-escalation',
      title: 'Recording a Pause or Escalation Recommendation',
      items: [
        practicalItem('cppc-pt-007', 'Identify a fictional condition (for example, sustained spend with no sales) that would justify a pause or escalation recommendation on your chosen platform, and state which role would need to approve it.', 'Spend-Basic Product Pause Rule Configurator; eBay Team Guides, Priority PPC Targets section'),
      ],
    },
    {
      id: 'cppc-pt-sec-reporting',
      title: 'Preparing a Reporting Summary',
      items: [
        practicalItem('cppc-pt-008', 'Draft a short fictional weekly report entry covering what was spending, what action was taken, and what result is expected — following the evidence pattern taught across this programme.', 'eBay Team Guides, weekly PPC manager reporting requirement; What We Lost and Why, Rule H-2'),
      ],
    },
    {
      id: 'cppc-pt-sec-limitations',
      title: 'Documenting Source Limitations',
      items: [
        practicalItem('cppc-pt-009', 'Name one of the nine excluded conflicts relevant to your chosen platform, and explain in one sentence why this programme does not state a specific value for it.', 'Full exclusions register — see docs/centralized-ppc-team-exclusions.md'),
        practicalItem('cppc-pt-010', 'Identify one disputed rule from a different platform than the one you chose, and confirm your planning pack has not applied it anywhere.', 'Full exclusions register — see docs/centralized-ppc-team-exclusions.md'),
      ],
    },
    {
      id: 'cppc-pt-sec-confidentiality',
      title: 'Confidentiality Check',
      items: [
        practicalItem('cppc-pt-011', 'Confirm that every figure, account name, and example in your planning pack is fictional, and that no real client, account, campaign ID, or named individual staff member appears anywhere in it.', 'Programme-wide confidentiality and source-traceability rule — see Programme Sources'),
        practicalItem('cppc-pt-012', 'Confirm that every decision in your planning pack is backed by a specific source citation from this programme, following the recommendation-versus-approval principle taught throughout.', 'Programme-wide synthesis — see Module 14'),
      ],
    },
  ],
};

export const centralizedPpcTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'Centralized PPC Team',
  team: PROGRAMME.team,
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — Centralized PPC's OWN versioned storage key. Never
  // shares a key with PH (tosp.prototype.v2), Amazon
  // (tosp.amazon-team.prototype.v1), eBay (tosp.ebay-team.prototype.v1),
  // Digital Marketing (tosp.digital-marketing-team.prototype.v1), Purchasing
  // (tosp.purchasing-team.prototype.v1), the theme (tosp.ui.theme.v1), or the
  // active-programme selector (tosp.active-programme.v1). Reset clears only
  // this key.
  storageKey: 'tosp.centralized-ppc-team.prototype.v1',
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
    journeyLabel: 'Centralized PPC Team Journey',

    // No Tamil "Translation Review" item; no PH/Amazon/eBay/Digital
    // Marketing/Purchasing programme-specific navigation. Adds one
    // Centralized-PPC-specific item: the final practical task, reusing the
    // generic mechanism first added for Digital Marketing.
    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme', label: 'Centralized PPC Journey', icon: '➤', route: '/programme' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'practical-task', label: 'Practical Task', icon: '✎', route: '/practical-task' },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
    ],

    // Six tracks matching the user-approved six learning areas. Module
    // unlocking itself remains one strict linear sequence across all 14
    // modules (see rules/module-access.js) — these tracks are a UI grouping
    // only, identical in mechanism to Digital Marketing's Foundation/PMax/
    // Shopping split.
    tracks: [
      { key: 'foundation', title: 'Shared PPC Foundation', statLabel: 'Foundation', unitNoun: 'modules', subtitle: 'Module 1 · Cross-platform purpose, recommendation vs. approval, evidence discipline, and confidentiality.', route: '/programme', filter: (m) => m.orderIndex === 1 },
      { key: 'amazon', title: 'Amazon PPC Track', statLabel: 'Amazon', unitNoun: 'modules', subtitle: 'Modules 2-7 · Campaign foundations through bid, budget, activation/pause, TACOS, and multi-market operations.', route: '/programme', filter: (m) => m.orderIndex >= 2 && m.orderIndex <= 7 },
      { key: 'google', title: 'Google Ads Track', statLabel: 'Google Ads', unitNoun: 'modules', subtitle: 'Modules 8-9 · Strategy, kill gates, and campaign governance through setup and optimization.', route: '/programme', filter: (m) => m.orderIndex >= 8 && m.orderIndex <= 9 },
      { key: 'meta', title: 'Meta Ads Track', statLabel: 'Meta Ads', unitNoun: 'modules', subtitle: 'Module 10 · Campaign proposal discipline and the pre-launch approval gate.', route: '/programme', filter: (m) => m.orderIndex === 10 },
      { key: 'ebay', title: 'eBay Advertising Track', statLabel: 'eBay', unitNoun: 'modules', subtitle: 'Modules 11-12 · Campaign setup and listing readiness through monitoring and escalation.', route: '/programme', filter: (m) => m.orderIndex >= 11 && m.orderIndex <= 12 },
      { key: 'reporting', title: 'Reporting and Governance', statLabel: 'Reporting', unitNoun: 'modules', subtitle: 'Modules 13-14 · Cross-platform reporting and evidence standards, roles, approval gates, and programme closure.', route: '/programme', filter: (m) => m.orderIndex >= 13 },
    ],

    // No PH-style readiness gates — the Centralized PPC sources state no
    // equivalent readiness rule.
    readiness: [],

    // Guarded, additive UI descriptor for the final practical task. Consumed
    // by dashboard-view.js and app.js; the exact same generic mechanism
    // added for Digital Marketing and reused by Purchasing — undefined (and
    // therefore inert) for PH/Amazon/eBay.
    practicalTask: {
      route: '/practical-task',
      label: 'Final Practical Task',
      availabilityNote: 'Available once you feel ready — completing it is optional and does not gate programme completion.',
    },

    dashboardSourceBlurb:
      'Content is sourced directly from the 30 Centralized PPC Team source documents across Amazon, Google Ads, ' +
      'Meta, and eBay. Nine unresolved source conflicts are deliberately excluded rather than resolved — see ' +
      'Programme Sources for the full exclusions register. Progress recorded here remains PROTOTYPE_ONLY.',

    sourcesIntro:
      'All Centralized PPC Team programme content — modules, lessons, and Skill Check questions — is sourced ' +
      'directly from the 30 Centralized PPC source documents below. Implementation was authorised without resolving ' +
      'nine conflicts found between these sources during discovery: the Amazon SP minimum star-rating figure, the ' +
      'Amazon budget-review cadence, the Amazon ASINs-per-ad-group rule, the Amazon UK-versus-DE/FR/IT high-ACOS ' +
      'pause threshold, un-localised DE/FR/IT currency figures, the Amazon month-boundary split date, the Amazon ' +
      '"fast-moving product" definition, the eBay advertising-rate range, and the Amazon budget-tier structure — all ' +
      'nine are deliberately <strong>excluded</strong> from this programme rather than resolved. See the Progression ' +
      'Rules below and <code>tosp/docs/centralized-ppc-team-exclusions.md</code> for the full register. Confidential ' +
      'account names, real campaign or client identifiers, live spend and performance figures, and named individual ' +
      'staff from those source documents are never reproduced — every example in this programme is fictional. ' +
      'Progress, quiz results, and the final practical exercise recorded in this browser remain ' +
      '<strong>PROTOTYPE_ONLY</strong> and are not official advertising authorisation, campaign-management ' +
      'authority, or competency evidence.',

    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track ? { route: track.route, label: this.journeyLabel } : { route: '/programme', label: this.journeyLabel };
    },
  },
};
