// programmes/digital-marketing-team-programme.js — the Digital Marketing
// Team programme DESCRIPTOR.
//
// Assembles the Digital Marketing content (modules/lessons + question bank)
// with the programme-level metadata, configuration, feature flags, UI
// descriptor, and final practical task the shared TOSP engine reads through
// the registry. The shared engine, scoring, progress, storage-safety,
// speech, theme, and completion logic are REUSED unchanged — nothing here
// duplicates the engine.
//
// Digital Marketing-specific rules encoded here (all user-confirmed):
//   - requiresSignoff / requiresReviewerSignoff: false (no team-leader / reviewer sign-off)
//   - enableTamilTranslation: false (no Tamil UI, no translation calls; English Read Aloud stays available)
//   - own versioned storage key (never mixes with PH/Amazon/eBay progress)
//   - quiz passing score / attempts REUSE the exact existing config (80% / 3)
//   - PMAX-005 (Budget Bleed Control) is EXCLUDED — no module/lesson/quiz exists for it
//   - the final practical task is DISPLAYED and COMPLETABLE but is NOT an
//     additional completion gate — completion remains "all required lessons
//     complete + all 10 Skill Checks passed", per rules/module-access.js,
//     unchanged. The practical task's own checked-item state is transient,
//     in-memory UI state local to its view (see views/practical-task-view.js)
//     — it is never written to progress/storage and never read by
//     isProgrammeComplete.

import { MODULES, LESSONS } from './digital-marketing-team-modules.js';
import { QUIZZES, QUESTIONS } from './digital-marketing-team-question-bank.js';

const PROGRAMME = {
  id: 'digital-marketing-team',
  code: 'TOSP-DM',
  title: 'Digital Marketing Team Onboarding',
  team: 'Digital Marketing Team',
  description:
    'A source-backed onboarding path across a Foundation module and two specialist tracks — Performance Max ' +
    '(7 modules) and Google Shopping (2 modules) — built entirely from the FINAL_TRUTH Digital Marketing narrative ' +
    'source handbooks (user-confirmed). Learner progress, quiz results, and the final practical exercise recorded ' +
    'in this browser remain PROTOTYPE_ONLY and are not official onboarding, campaign-management, or competency evidence.',
  version: '1.0',
  status: 'FINAL_TRUTH',
  totalModules: MODULES.length,
};

// The Digital Marketing narrative SOURCE handbooks actually used to build
// this programme (user-confirmed FINAL_TRUTH content authority). PMAX-005
// (Budget Bleed Control) is deliberately absent from this list — it is
// EXCLUDED_PENDING_SOURCE_CORRECTION and contributes no content anywhere in
// this programme; see docs/digital-marketing-team-exclusions.md.
const SOURCE_DOCUMENTS = [
  { id: 'dm-pmax-007', title: 'Performance Max Campaigns — Campaign Creation & Setup Standard (BGCT Ads Handbook)', version: 'v2.0', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook' },
  { id: 'dm-pmax-008', title: 'Performance Max (P.Max) Feed Optimisation (BGCT Ads Handbook)', version: 'v1.1', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook' },
  { id: 'dm-pmax-001', title: 'Google Performance Max — Asset Group Setup (BGCT Ads Handbook)', version: 'v1.2', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook' },
  { id: 'dm-pmax-002', title: 'Performance Max Audience Signal Strategy & Optimisation (BGCT Ads Handbook)', version: 'v1.1', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook' },
  { id: 'dm-pmax-003', title: 'Performance Max Campaigns — Bidding Strategy & Optimisation (BGCT Ads Handbook)', version: 'v1.0', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook — contains an unresolved internal conflict on the NCA ceiling value; see docs/digital-marketing-team-exclusions.md' },
  { id: 'dm-pmax-004', title: 'Performance Max Campaigns — Budget Management & Allocation Rules (BGCT Ads Handbook)', version: 'v1.0', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook' },
  { id: 'dm-pmax-006', title: 'Performance Max (PMax) Campaign Management & Audit (BGCT Ads Handbook)', version: 'v1.1', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook' },
  { id: 'dm-shopping-001', title: 'Google Shopping Ads — Standard Campaign Creation, Setup and Management (BGCT Ads Handbook)', version: 'v1.1', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook — one worked naming example is defective and is not used; see docs/digital-marketing-team-exclusions.md' },
  { id: 'dm-shopping-002', title: 'Manual Google Shopping Campaign Creation (BGCT Ads Handbook)', version: 'v1.1', effectiveDate: '—', confidentiality: 'Internal Ads Operations Handbook' },
];

// Cross-cutting, source-cited rules not tied to a single lesson, shown on the
// Sources screen for traceability. No invented rules; each carries a
// citation. Includes the programme's own documented exclusions.
const PROGRESSION_RULES = [
  { id: 'dm-rule-paused-by-default', rule: 'Every new Performance Max or Shopping campaign must be built and kept in Paused status; it may only be switched to Active once a designated approver has given explicit, documented approval.', source: 'Performance Max Campaigns — Campaign Creation & Setup Standard (BGCT Ads Handbook); Google Shopping Ads — Standard Campaign Creation, Setup and Management (BGCT Ads Handbook); Manual Google Shopping Campaign Creation (BGCT Ads Handbook)' },
  { id: 'dm-rule-evidence', rule: 'A verification or optimisation step that is not documented (screenshot, log entry, or written record) is treated as if it never happened — undocumented changes are never permitted.', source: 'Performance Max (PMax) Campaign Management & Audit (BGCT Ads Handbook); Performance Max Campaigns — Budget Management & Allocation Rules (BGCT Ads Handbook)' },
  { id: 'dm-rule-sku-budget', rule: 'Starting daily budget is driven by SKU count: collections of 100+ SKUs may start at up to £25/day once approved; smaller collections require a proportionally scaled-down or individually assigned budget rather than the full figure.', source: 'Performance Max Campaigns — Budget Management & Allocation Rules (BGCT Ads Handbook); Google Shopping Ads — Standard Campaign Creation, Setup and Management (BGCT Ads Handbook); Manual Google Shopping Campaign Creation (BGCT Ads Handbook)' },
  { id: 'dm-rule-learning-window', rule: 'A Performance Max or Shopping campaign must not have its bid strategy, target, budget, or creative assets changed during its post-launch learning window (10-14 days for Performance Max asset groups/signals; the first 14 days of Target ROAS bidding on the automated Shopping route) — any such change resets the algorithm\'s learning and discards the data already collected.', source: 'Performance Max Campaigns — Bidding Strategy & Optimisation (BGCT Ads Handbook); Performance Max Audience Signal Strategy & Optimisation (BGCT Ads Handbook); Google Shopping Ads — Standard Campaign Creation, Setup and Management (BGCT Ads Handbook)' },
  { id: 'dm-rule-nca-excluded', rule: 'SOURCE_CONFLICT — the Bidding Strategy source handbook states three different numeric ceilings for the New Customer Acquisition (NCA) bidding safeguard across its own sections. No numeric NCA value is taught or quizzed anywhere in this programme; only the general concept (a safeguard exists and must be configured) is described where the workflow requires it.', source: 'Performance Max Campaigns — Bidding Strategy & Optimisation (BGCT Ads Handbook) — internal conflict, unresolved' },
  { id: 'dm-rule-pmax005-excluded', rule: 'EXCLUDED_PENDING_SOURCE_CORRECTION — the Budget Bleed Control topic (PMAX-005) is not part of this programme. Its metadata registry was found to belong to a different topic (Budget, PMAX-004) and remains unresolved, so no module, lesson, or quiz question exists for it.', source: 'Performance Max Budget Bleed Control (BGCT Ads Handbook) — excluded per user decision; see docs/digital-marketing-team-exclusions.md' },
  { id: 'dm-rule-shopping001-defect', rule: 'A specific worked naming-convention example in the automated Shopping source handbook uses the wrong ad-type token for a Shopping campaign (a copy-paste artifact from an unrelated template). It is excluded entirely from this programme — never taught, never silently corrected, never quizzed.', source: 'Google Shopping Ads — Standard Campaign Creation, Setup and Management (BGCT Ads Handbook) — source defect; see docs/digital-marketing-team-exclusions.md' },
];

// Digital Marketing has no source-defined whole-programme score-band or
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
// above; no new budget, ROAS target, approval role, pass score, deadline,
// campaign setting, or reviewer requirement is invented here. The disputed
// NCA ceiling is never referenced. Uses fictional, neutral example data only.
// ---------------------------------------------------------------------------

const practicalItem = (id, text, source) => ({ id, text, source });

const PRACTICAL_TASK = {
  id: 'digital-marketing-final-practical-v1',
  status: 'PROTOTYPE_ONLY',
  title: 'Final Practical Task — Digital Marketing Campaign Planning Pack',
  intro:
    'Prepare a short, fictional, non-live campaign planning pack that applies what you have learned across the ' +
    'Foundation, Performance Max, and Shopping modules. Use invented, neutral example data throughout (for example, ' +
    'a fictional product collection and SKU count) — never a real client, brand, or live account. This exercise ' +
    'does not create or launch a real Google Ads campaign, does not require access to any live account, and does ' +
    'not require Team Leader or reviewer sign-off.',
  closingNote: 'Prototype practical exercise — not an official campaign approval.',
  sections: [
    {
      id: 'dm-pt-sec-feed',
      title: 'Feed & Merchant Center Readiness',
      items: [
        practicalItem('dm-pt-001', 'State whether your fictional product feed currently meets the source-backed feed disapproval and eligibility targets, and name the one condition that would require you to stop and escalate before continuing.', 'Performance Max Feed Optimisation — BGCT Ads Handbook, Sections B.5, B.7, and G.6'),
        practicalItem('dm-pt-002', 'List which core feed attributes (title, description, category, images, price, availability, identifiers) your fictional planning pack confirms are correctly populated before campaign work begins.', 'Performance Max Feed Optimisation — BGCT Ads Handbook, Section G.2'),
      ],
    },
    {
      id: 'dm-pt-sec-choice',
      title: 'Choosing Between Performance Max and Shopping',
      items: [
        practicalItem('dm-pt-003', 'Explain, in your own words, why you would choose Performance Max, Automated Shopping, or Manual Shopping for your fictional product collection, referencing the reasons each route exists.', 'Manual Google Shopping Campaign Creation (BGCT Ads Handbook), B.3 — Reason This Standard Was Selected section'),
      ],
    },
    {
      id: 'dm-pt-sec-creation',
      title: 'Campaign Creation Sequence',
      items: [
        practicalItem('dm-pt-004', 'Write out the correct build order for your chosen campaign type (Performance Max, Automated Shopping, or Manual Shopping), starting from pre-requisite checks through to Paused status and approval submission.', 'Performance Max Campaigns — Campaign Creation & Setup Standard (BGCT Ads Handbook); Google Shopping Ads — Standard Campaign Creation, Setup and Management (BGCT Ads Handbook); Manual Google Shopping Campaign Creation (BGCT Ads Handbook)'),
        practicalItem('dm-pt-005', 'State your fictional SKU count for the collection and apply the correct SKU-based starting daily budget rule to it.', 'Performance Max Campaigns — Budget Management & Allocation Rules (BGCT Ads Handbook), Campaign Creation — Budget Allocation Rules table'),
      ],
    },
    {
      id: 'dm-pt-sec-assets',
      title: 'Asset Group Considerations (Performance Max only)',
      items: [
        practicalItem('dm-pt-006', 'List the headline, description, image, and video counts your fictional asset group would need to meet the source-backed minimums.', 'Google Performance Max — Asset Group Setup — BGCT Ads Handbook, Success Criteria'),
      ],
    },
    {
      id: 'dm-pt-sec-audience',
      title: 'Audience Signal Considerations (Performance Max only)',
      items: [
        practicalItem('dm-pt-007', 'State the minimum thresholds a fictional Customer Match list and a fictional GA4 audience segment would each need to clear before being attached, and explain why these two thresholds must not be confused with each other.', 'Performance Max Audience Signal Strategy & Optimisation BGCT Ads Handbook — Quality Standards; Anti-Example 2'),
      ],
    },
    {
      id: 'dm-pt-sec-bidding',
      title: 'Bidding Considerations',
      items: [
        practicalItem('dm-pt-008', 'Describe how you would check whether your fictional account has enough conversion data before setting a bidding target, and how you would calculate a conservative starting target rather than entering the real goal directly.', 'Performance Max Campaigns — Bidding Strategy & Optimisation (BGCT Ads Handbook), Quality Standards'),
        practicalItem('dm-pt-009', 'Confirm that your planning pack does not state a numeric value for the New Customer Acquisition safeguard, and explain in one sentence why this programme excludes that figure.', 'Performance Max Campaigns — Bidding Strategy & Optimisation (BGCT Ads Handbook) — internal conflict, unresolved; see Programme Sources'),
      ],
    },
    {
      id: 'dm-pt-sec-budget',
      title: 'Budget Considerations (Budget Management only — Budget Bleed Control is out of scope)',
      items: [
        practicalItem('dm-pt-010', 'Using the monthly review rules, decide whether your fictional campaign\'s ROAS and conversion figures would qualify it for an increase, a hold, a reduction, or a shutdown review.', 'Performance Max Campaigns — Budget Management & Allocation Rules (BGCT Ads Handbook), Budget Increase Rules and Budget Reduction & Hold Rules tables'),
      ],
    },
    {
      id: 'dm-pt-sec-audit',
      title: 'Audit & Checklist Preparation',
      items: [
        practicalItem('dm-pt-011', 'List the daily and weekly checks you would perform once your fictional campaign is live, and the one escalation condition among them that requires same-business-day action.', 'Performance Max (PMax) Campaign Management & Audit (BGCT Ads Handbook), Quality Standards; Guidance — G.9 Escalation Points'),
        practicalItem('dm-pt-012', 'Confirm that every decision in your planning pack is backed by a specific source citation, and that no real client name, live budget figure, or named individual appears anywhere in it.', 'Programme-wide confidentiality and source-traceability rule — see Programme Sources'),
      ],
    },
  ],
};

export const digitalMarketingTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'Digital Marketing Team',
  team: PROGRAMME.team,
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — Digital Marketing's OWN versioned storage key. Never
  // shares a key with PH (tosp.prototype.v2), Amazon
  // (tosp.amazon-team.prototype.v1), eBay (tosp.ebay-team.prototype.v1), the
  // theme (tosp.ui.theme.v1), or the active-programme selector
  // (tosp.active-programme.v1). Reset clears only this key.
  storageKey: 'tosp.digital-marketing-team.prototype.v1',
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
    journeyLabel: 'Digital Marketing Team Journey',

    // No Tamil "Translation Review" item; no PH/Amazon/eBay programme-specific
    // navigation. Adds one Digital-Marketing-specific item: the final
    // practical task, always present for this programme (guarded generically
    // by PRACTICAL_TASK's presence at the route level for other programmes).
    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme', label: 'Digital Marketing Journey', icon: '➤', route: '/programme' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'practical-task', label: 'Practical Task', icon: '✎', route: '/practical-task' },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
    ],

    // Three tracks: Foundation (Module 1), Performance Max (Modules 2-8),
    // Shopping (Modules 9-10). All route to the full journey.
    tracks: [
      { key: 'foundation', title: 'Foundation', statLabel: 'Foundation', unitNoun: 'modules', subtitle: 'Module 1 · Google Ads account/campaign context, Performance Max vs Shopping, and governance basics.', route: '/programme', filter: (m) => m.orderIndex === 1 },
      { key: 'pmax', title: 'Performance Max Track', statLabel: 'Performance Max', unitNoun: 'modules', subtitle: 'Modules 2-8 · Feed readiness through campaign creation, asset groups, audience signals, bidding, budget, and audit.', route: '/programme', filter: (m) => m.orderIndex >= 2 && m.orderIndex <= 8 },
      { key: 'shopping', title: 'Shopping Track', statLabel: 'Shopping', unitNoun: 'modules', subtitle: 'Modules 9-10 · Automated and Manual Shopping campaign creation.', route: '/programme', filter: (m) => m.orderIndex >= 9 },
    ],

    // No PH-style readiness gates — the Digital Marketing sources state no
    // equivalent readiness rule.
    readiness: [],

    // Guarded, additive UI descriptor for the final practical task. Consumed
    // by dashboard-view.js and app.js; absent (undefined) for PH/Amazon/eBay,
    // so nothing renders or routes there.
    practicalTask: {
      route: '/practical-task',
      label: 'Final Practical Task',
      availabilityNote: 'Available once you feel ready — completing it is optional and does not gate programme completion.',
    },

    dashboardSourceBlurb:
      'Content is sourced directly from the FINAL_TRUTH Digital Marketing narrative source handbooks across the ' +
      'Foundation, Performance Max, and Shopping tracks (user-confirmed). Progress recorded here remains PROTOTYPE_ONLY.',

    sourcesIntro:
      'All Digital Marketing Team programme content — modules, lessons, and Skill Check questions — is sourced ' +
      'directly from the narrative Digital Marketing source handbooks below, which the user has confirmed as ' +
      '<strong>FINAL_TRUTH</strong> for this prototype. The Budget Bleed Control topic (PMAX-005) is deliberately ' +
      'excluded pending source correction, no numeric New Customer Acquisition value is taught anywhere due to an ' +
      'unresolved source conflict, and one defective worked example in the Shopping source is never used. ' +
      'Confidential client names, live URLs, named individual staff, and internal file paths from those handbooks ' +
      'are never reproduced. Progress, quiz results, and the final practical exercise recorded in this browser ' +
      'remain <strong>PROTOTYPE_ONLY</strong> and are not official onboarding, campaign-management, or competency evidence.',

    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track ? { route: track.route, label: this.journeyLabel } : { route: '/programme', label: this.journeyLabel };
    },
  },
};
