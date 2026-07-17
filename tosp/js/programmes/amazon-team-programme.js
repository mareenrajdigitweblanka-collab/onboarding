// programmes/amazon-team-programme.js — the Amazon Team programme DESCRIPTOR.
//
// Assembles the Amazon content (modules/lessons + question bank) with the
// programme-level metadata, configuration, feature flags and UI descriptor the
// shared TOSP engine reads through the registry. The shared engine, scoring,
// progress, storage-safety, speech, theme, and completion logic are REUSED
// unchanged — nothing here duplicates the engine.
//
// Amazon-specific rules encoded here (all user-confirmed):
//   - requiresSignoff / requiresReviewerSignoff: false (no team-leader sign-off)
//   - enableTamilTranslation: false (no Tamil UI, no translation calls)
//   - own versioned storage key (never mixes with PH progress)
//   - quiz passing score / attempts REUSE the exact existing config (80% / 3)

import { MODULES, LESSONS } from './amazon-team-modules.js';
import { QUIZZES, QUESTIONS } from './amazon-team-question-bank.js';

const PROGRAMME = {
  id: 'prog-amazon-onboarding',
  code: 'TOSP-AMZ-01',
  title: 'Amazon Team — Onboarding & Skill Progression Programme',
  team: 'Amazon Team',
  description:
    'A source-backed onboarding path across three Amazon operating tracks — FBM storefront ' +
    'foundations, FBA operations, and Vendor Central (1P) — built entirely from the FINAL ' +
    'Amazon Team source documents (status FINAL_TRUTH). Learner progress, quiz results and ' +
    'completion recorded in this browser remain PROTOTYPE_ONLY and are not official evidence.',
  version: '1.0',
  status: 'FINAL_TRUTH',
  totalModules: MODULES.length,
};

// The Amazon source documents actually used to build this programme. Confidential
// markings are preserved; confidential *values* inside them are never reproduced.
const SOURCE_DOCUMENTS = [
  { id: 'amz-account-health', title: 'Amazon Account Health & Performance Guide 2026', version: '2026', effectiveDate: 'March 2026', confidentiality: 'Internal Reference' },
  { id: 'amz-listing-seo', title: 'Amazon Listing SEO Guideline (UK Marketplace)', version: '2025–2026', effectiveDate: '2026', confidentiality: 'Internal SOP' },
  { id: 'amz-keyword-research', title: 'Complete Amazon Keyword Research Guide (2026)', version: '2026', effectiveDate: '2026', confidentiality: 'Internal Reference' },
  { id: 'amz-competitor', title: 'Amazon Competitor Analysis Guidelines', version: '—', effectiveDate: '—', confidentiality: 'Internal Reference' },
  { id: 'amz-pricing', title: 'Dynamic Pricing Strategy Guide (2025)', version: '2025', effectiveDate: '2025', confidentiality: 'Internal Reference' },
  { id: 'amz-fba-guidelines', title: 'Amazon FBA Guidelines 2026', version: '2026', effectiveDate: 'February 2026', confidentiality: 'For Internal Use Only' },
  { id: 'amz-fba-unfulfillable', title: 'Amazon FBA Unfulfillable Settings Guide', version: '2026', effectiveDate: 'January 2026', confidentiality: 'Internal Configuration Report' },
  { id: 'amz-sipp', title: 'SIPP – Ships in Product Packaging (Webinar Summary)', version: '—', effectiveDate: 'Feb 2025 fee update', confidentiality: 'Internal Reference' },
  { id: 'amz-vendor-intro', title: 'Amazon Vendor Central Introduction Guide 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Confidential — Internal Use Only' },
  { id: 'amz-platforms', title: 'Amazon Selling Platforms Guide 2026 (FBM/FBA/Vendor)', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Internal Use Only' },
  { id: 'amz-vendor-migration', title: 'Vendor Product Selection & Migration Guide 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Confidential — Internal Use Only' },
  { id: 'amz-vendor-listings', title: 'LEDSone Vendor Central Listings Guide 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Confidential — Internal Use Only' },
  { id: 'amz-label-booking', title: 'LEDSone Label Booking Guide 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Internal SOP' },
  { id: 'amz-vendor-invoice', title: 'Amazon Vendor Central Invoice Guide 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Internal Use Only' },
  { id: 'amz-receive-variance', title: 'Receive Variance Dashboard Daily Check Guide 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Internal SOP' },
  { id: 'amz-shortage-claims', title: 'Shortage Claims & Dispute Resolution Handbook 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Internal Use Only' },
  { id: 'amz-chargeback', title: 'Amazon Vendor Chargeback Guideline 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Internal Use Only' },
  { id: 'amz-returns', title: 'Amazon Vendor Product Returns Management Guide 2026', version: 'v1.0', effectiveDate: 'May 2026', confidentiality: 'Confidential — Internal Use Only' },
];

// Cross-cutting, source-cited rules not tied to a single lesson, shown on the
// Sources screen for traceability. No invented rules; each carries a citation.
const PROGRESSION_RULES = [
  { id: 'amz-rule-fba-eligibility', rule: 'A product may only be sent to FBA if it has a 4-star+ rating, at least 5 units sold in the last 30 days, a 45%+ net margin after FBA fees, and stock above 20 units.', source: 'Amazon FBA Guidelines 2026 — Product Selection Eligibility' },
  { id: 'amz-rule-no-direct-convert', rule: 'Never convert an existing FBM listing directly to FBA; use "Add Another Condition" and select the FBA option so the FBM offer is preserved.', source: 'Amazon FBA Guidelines 2026 — FBA Listing Conversion' },
  { id: 'amz-rule-odr', rule: 'The Order Defect Rate must stay below 1%, measured over 60 days.', source: 'Amazon Account Health & Performance Guide 2026 — Performance Metrics' },
  { id: 'amz-rule-po-confirm', rule: 'Vendor Purchase Orders must be confirmed within 24 hours, and only the 100%-shippable quantity may be confirmed.', source: 'LEDSone Label Booking Guide 2026 — PO Confirmation' },
  { id: 'amz-rule-asn-match', rule: 'The total ASN units must equal both the packed units and the PO-confirmed quantity; any mismatch causes a chargeback.', source: 'LEDSone Label Booking Guide 2026 — ASN & Labelling' },
  { id: 'amz-rule-dispute-window', rule: 'Shortage disputes must be raised within 30 days of the invoice date; after Day 30 the dispute tool is permanently locked.', source: 'Shortage Claims & Dispute Resolution Handbook 2026 — Dispute Window' },
  { id: 'amz-rule-pod', rule: 'Proof of Delivery (POD) is mandatory for every shipment.', source: 'LEDSone Label Booking Guide 2026 — POD' },
  { id: 'amz-rule-priority-asin', rule: 'Any ASIN with 3 or more returns in 30 days becomes a Priority ASIN, and its fix must be actioned within 7 days.', source: 'Amazon Vendor Product Returns Management Guide 2026 — Priority ASINs' },
];

// Amazon has no source-defined whole-programme score-band or probation-gate
// tables (unlike PH). These are intentionally empty; the Sources screen hides
// empty sections. This keeps the content interface consistent across programmes.
const EVALUATION_SCORE_BANDS = [];
const EVALUATION_SCORE_BANDS_SOURCE = '';
const PROBATION_SCORE_GATES = [];
const PROBATION_SCORE_GATES_SOURCE = '';

export const amazonTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'Amazon Team',
  team: PROGRAMME.team,
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — Amazon's OWN versioned storage key. Never shares a key
  // with PH (tosp.prototype.v2), the theme (tosp.ui.theme.v1), or the active-
  // programme selector (tosp.active-programme.v1). Reset clears only this key.
  storageKey: 'tosp.amazon-team.prototype.v1',
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
  },

  ui: {
    journeyLabel: 'Amazon Team Journey',

    // No Tamil "Translation Review" item; no PH evaluation/competency items.
    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme', label: 'Amazon Journey', icon: '➤', route: '/programme' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
    ],

    // Three source tracks. All route to the full journey (no PH-style tier
    // routes are registered for Amazon).
    tracks: [
      { key: 'fbm', title: 'FBM Foundations', statLabel: 'FBM Foundations', unitNoun: 'modules', subtitle: 'Modules 1–5 · Account health, listing SEO, keywords, competitors, pricing.', route: '/programme', filter: (m) => m.orderIndex <= 5 },
      { key: 'fba', title: 'FBA Operations', statLabel: 'FBA Operations', unitNoun: 'modules', subtitle: 'Modules 6–8 · Product selection, unfulfillable settings, SIPP.', route: '/programme', filter: (m) => m.orderIndex >= 6 && m.orderIndex <= 8 },
      { key: 'vendor', title: 'Vendor Central', statLabel: 'Vendor Central', unitNoun: 'modules', subtitle: 'Modules 9–16 · Vendor 1P workflow, from intro through returns.', route: '/programme', filter: (m) => m.orderIndex >= 9 },
    ],

    // No PH-style readiness gates (ASIN allocation / independent ownership).
    readiness: [],

    dashboardSourceBlurb:
      'Content is sourced directly from the FINAL Amazon Team documents across the FBM, FBA and ' +
      'Vendor Central tracks (status FINAL_TRUTH). Progress recorded here remains PROTOTYPE_ONLY.',

    sourcesIntro:
      'All Amazon Team programme content — modules, lessons, and Skill Check questions — is sourced ' +
      'directly from the FINAL Amazon Team documents below and is status <strong>FINAL_TRUTH</strong>. ' +
      'Confidential account identifiers and named contacts from those documents are deliberately not ' +
      'reproduced. Progress and quiz results recorded in this browser remain ' +
      '<strong>PROTOTYPE_ONLY</strong> and are not official onboarding evidence.',

    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track ? { route: track.route, label: this.journeyLabel } : { route: '/programme', label: this.journeyLabel };
    },
  },
};
