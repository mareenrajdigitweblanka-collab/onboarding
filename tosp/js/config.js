// config.js — active-programme configuration dispatcher.
//
// CONFIG, FEATURES and STORAGE_KEY now resolve from whichever programme is
// ACTIVE (see programmes/registry.js). Views/components/services keep importing
// `CONFIG` and `STORAGE_KEY` from here exactly as before; they are simply the
// active programme's values now. PROJECT/DEMO_LEARNER/PROTOTYPE_WARNING are
// shared across programmes and stay static.
//
// Every value under CONFIG remains CONFIGURATION_REQUIRED (a tunable prototype
// value not stated in a source document): passingScorePct, maxAttempts,
// requireAllLessonsBeforeQuiz, allowResetDemoProgress, storageVersion, and the
// totalModules UI label. Both programmes reuse the same passingScorePct (80)
// and maxAttempts (3) — the quiz configuration is shared, not re-invented.

import { getActiveProgramme } from './programmes/registry.js';

const ACTIVE = getActiveProgramme();

export const CONFIG = {
  // CONFIGURATION_REQUIRED — number of modules the active programme exposes
  // (the module count is source-derived per programme; this is the UI label).
  totalModules: ACTIVE.config.totalModules,

  // CONFIGURATION_REQUIRED — minimum percentage score to pass a Skill Check.
  // Not stated in any source document; a shared prototype default (80).
  passingScorePct: ACTIVE.config.passingScorePct,

  // CONFIGURATION_REQUIRED — maximum Skill Check attempts per module (3).
  maxAttempts: ACTIVE.config.maxAttempts,

  // CONFIGURATION_REQUIRED — whether all required lessons must be completed
  // before the quiz unlocks.
  requireAllLessonsBeforeQuiz: ACTIVE.config.requireAllLessonsBeforeQuiz,

  // CONFIGURATION_REQUIRED — whether the "reset demo progress" action shows.
  allowResetDemoProgress: ACTIVE.config.allowResetDemoProgress,

  // CONFIGURATION_REQUIRED — per-programme storage version; bumping it
  // migrates/invalidates that programme's previously stored prototype progress.
  storageVersion: ACTIVE.storageVersion,
};

// Programme-specific feature flags read by the shared engine/UI.
//   enableTamilTranslation   — gates ALL Tamil translation controls
//   requiresReviewerSignoff  — reserved reviewer-workflow flag (both false)
export const FEATURES = { ...ACTIVE.features };

// CONFIGURATION_REQUIRED — project identity shown in the UI (shared shell).
export const PROJECT = {
  name: 'Team Onboarding & Skill Progression Platform',
  code: 'TOSP',
};

// CONFIGURATION_REQUIRED — single demo learner identity. No real personal data.
export const DEMO_LEARNER = {
  displayName: 'Demo Learner',
  status: 'DEMO_DATA',
};

// PROTOTYPE_ONLY — the active programme's storage key namespace, versioned per
// its own storageVersion. Each programme has its OWN key (PH:
// tosp.prototype.v2, Amazon: tosp.amazon-team.prototype.v1), so their progress
// never mixes and resetting one never touches the other.
export const STORAGE_KEY = ACTIVE.storageKey;

export const PROTOTYPE_WARNING =
  'This is a frontend-only prototype. Progress is stored in this browser and is not official onboarding evidence.';
