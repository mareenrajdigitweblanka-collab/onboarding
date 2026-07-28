// programmes/ebay-team-programme.js — the eBay Team programme DESCRIPTOR.
//
// Assembles the eBay content (modules/lessons + question bank) with the
// programme-level metadata, configuration, feature flags and UI descriptor the
// shared TOSP engine reads through the registry. The shared engine, scoring,
// progress, storage-safety, speech, theme, and completion logic are REUSED
// unchanged — nothing here duplicates the engine.
//
// eBay-specific rules encoded here (all user-confirmed):
//   - requiresSignoff / requiresReviewerSignoff: false (no team-leader sign-off)
//   - enableTamilTranslation: false (no Tamil UI, no translation calls)
//   - own versioned storage key (never mixes with PH or Amazon progress)
//   - quiz passing score / attempts REUSE the exact existing config (80% / 3)

import { MODULES, LESSONS } from './ebay-team-modules.js';
import { QUIZZES, QUESTIONS } from './ebay-team-question-bank.js';

const PROGRAMME = {
  id: 'prog-ebay-onboarding',
  code: 'TOSP-EBAY-01',
  title: 'eBay Team — Onboarding & Skill Progression Programme',
  team: 'eBay Team',
  description:
    "A source-backed onboarding path across the eBay Team's explicit 7-day training sequence, plus a dedicated " +
    'Listing Optimization Deep-Dive, built entirely from the FINAL eBay Team source documents (status ' +
    'FINAL_TRUTH). Learner progress, quiz results and completion recorded in this browser remain ' +
    'PROTOTYPE_ONLY and are not official onboarding evidence.',
  version: '1.0',
  status: 'FINAL_TRUTH',
  totalModules: MODULES.length,
};

// The eBay source documents actually used to build this programme. The
// Markdown export is a secondary, lossy duplicate of the PDF (see
// docs/ebay-team-source-map.md) — the PDF is the structural source of truth.
// Confidential values inside the listing deck (internal seller-account
// names, live listing counts, internal policy/profile IDs) are never
// reproduced, and its Amazon-A+-Content slide (source contamination) is
// excluded entirely.
const SOURCE_DOCUMENTS = [
  { id: 'ebay-7day-pdf', title: '7-Day eBay Training Program (PDF slide deck) — primary structural source', version: '—', effectiveDate: '—', confidentiality: 'Internal Training Material' },
  { id: 'ebay-7day-md', title: '7-Day eBay BGCT Training Program (Markdown export) — secondary, lossy duplicate of the PDF', version: '—', effectiveDate: '—', confidentiality: 'Internal Training Material' },
  { id: 'ebay-bgct-deck', title: 'EBAY BGCT — Create the Perfect Listing (listing-optimization deck)', version: '—', effectiveDate: '—', confidentiality: 'Internal Training Material — confidential account data and an unrelated Amazon slide excluded' },
];

// Cross-cutting, source-cited rules not tied to a single lesson, shown on the
// Sources screen for traceability. No invented rules; each carries a citation.
const PROGRESSION_RULES = [
  { id: 'eb-rule-account-health', rule: 'Four account-health metrics must stay within limit: Transaction Defect Rate below 2%, Late Shipment Rate below 10%, Cancellation Rate below 2%, and Cases Closed Without Resolution below 0.3%.', source: '7-Day eBay Training Program PDF — Day 5, Key Performance Metrics' },
  { id: 'eb-rule-title-limit', rule: 'A listing title has an 80-character hard limit, with the first 40 characters treated as the priority zone for mobile buyers; the characters ! ? { > ^ % / must not be used.', source: 'EBAY BGCT PDF — Title Optimization section' },
  { id: 'eb-rule-variation', rule: 'Each variation listing may use only one variation type — Colour or Size — never a second axis such as style, type, or pack quantity stacked onto the same listing.', source: 'EBAY BGCT PDF — Common Rules For eBay section' },
  { id: 'eb-rule-no-multi-account-reuse', rule: 'The same main image and the same item description must not be reused across more than one seller account.', source: 'EBAY BGCT PDF — Main Image section; Description section' },
  { id: 'eb-rule-returns', rule: "The return window referenced is 30 days; the buyer pays return postage unless an eBay-provided return label is used, in which case the postage is deducted from the refund. This is separate from the buyer's 14-day cancellation right under the Consumer Contract Regulations 2013.", source: 'EBAY BGCT PDF — Postage & Return Policy section' },
];

// eBay has no source-defined whole-programme score-band or probation-gate
// tables (unlike PH). These are intentionally empty; the Sources screen hides
// empty sections. This keeps the content interface consistent across programmes.
const EVALUATION_SCORE_BANDS = [];
const EVALUATION_SCORE_BANDS_SOURCE = '';
const PROBATION_SCORE_GATES = [];
const PROBATION_SCORE_GATES_SOURCE = '';

export const ebayTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'eBay Team',
  team: PROGRAMME.team,
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — eBay's OWN versioned storage key. Never shares a key
  // with PH (tosp.prototype.v2), Amazon (tosp.amazon-team.prototype.v1), the
  // theme (tosp.ui.theme.v1), or the active-programme selector
  // (tosp.active-programme.v1). Reset clears only this key.
  storageKey: 'tosp.ebay-team.prototype.v1',
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
    journeyLabel: 'eBay Team Journey',

    // No Tamil "Translation Review" item; no PH/Amazon evaluation/competency
    // items; no sign-off UI.
    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme', label: 'eBay Journey', icon: '➤', route: '/programme' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
    ],

    // Two tracks: the 7-day sequence, and the Listing Optimization Deep-Dive.
    // Both route to the full journey (no PH-style tier routes for eBay).
    tracks: [
      { key: 'sevenday', title: '7-Day Onboarding', statLabel: '7-Day Onboarding', unitNoun: 'modules', subtitle: 'Modules 1–7 · eCommerce basics through advanced optimization and final evaluation.', route: '/programme', filter: (m) => m.orderIndex <= 7 },
      { key: 'listingopt', title: 'Listing Optimization Deep-Dive', statLabel: 'Listing Deep-Dive', unitNoun: 'modules', subtitle: 'Module 8 · Exact title, image, item-specifics, description, postage and variation rules.', route: '/programme', filter: (m) => m.orderIndex === 8 },
    ],

    // No PH-style readiness gates (ASIN allocation / independent ownership) —
    // the eBay sources state no equivalent readiness rule.
    readiness: [],

    dashboardSourceBlurb:
      'Content is sourced directly from the FINAL eBay Team documents — the 7-Day eBay Training Program and the ' +
      'EBAY BGCT listing-optimization deck (status FINAL_TRUTH). Progress recorded here remains PROTOTYPE_ONLY.',

    sourcesIntro:
      'All eBay Team programme content — modules, lessons, and Skill Check questions — is sourced directly from the ' +
      'FINAL eBay Team documents below and is status <strong>FINAL_TRUTH</strong>. The 7-Day PDF is the primary ' +
      'structural source; the Markdown export is a secondary, lossy duplicate of it. Confidential internal ' +
      'seller-account names, listing counts and policy/profile IDs, and an unrelated Amazon-specific slide found in ' +
      'the listing deck, are deliberately not reproduced. Progress and quiz results recorded in this browser remain ' +
      '<strong>PROTOTYPE_ONLY</strong> and are not official onboarding evidence.',

    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track ? { route: track.route, label: this.journeyLabel } : { route: '/programme', label: this.journeyLabel };
    },
  },
};
