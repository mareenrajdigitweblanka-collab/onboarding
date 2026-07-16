// CONFIGURATION_REQUIRED — all tunable prototype values live here.
// Views/components must read these constants instead of hardcoding values.

export const CONFIG = {
  // CONFIGURATION_REQUIRED — number of modules the programme exposes: 7
  // company-wide BGCT evaluation days + 11 PH/Sales Learning Path steps.
  // (The module count itself is source-derived — see data.js MODULES — but
  // this constant, and the totalModules label, is the UI-facing tunable.)
  totalModules: 18,

  // CONFIGURATION_REQUIRED — minimum percentage score required to pass a
  // Skill Check. Neither source document states a per-module MCQ passing
  // percentage (only a whole-programme score-band table and separate
  // monthly probation gates — see data.js EVALUATION_SCORE_BANDS and
  // PROBATION_SCORE_GATES, shown for reference on the Dashboard). This
  // value is a prototype default, not a sourced figure.
  passingScorePct: 80,

  // CONFIGURATION_REQUIRED — maximum Skill Check attempts allowed per
  // module. Not stated in either source document.
  maxAttempts: 3,

  // CONFIGURATION_REQUIRED — whether all required lessons must be completed before the quiz unlocks.
  requireAllLessonsBeforeQuiz: true,

  // CONFIGURATION_REQUIRED — whether the "reset demo progress" action is available in the UI.
  allowResetDemoProgress: true,

  // CONFIGURATION_REQUIRED — bump this to invalidate/migrate previously stored
  // prototype progress. Bumped to 2 when the programme content was replaced
  // with the sourced PH/Sales 18-module curriculum, so any progress recorded
  // against the old generic 8-module demo content is safely discarded rather
  // than misread against different module content sharing the same ids.
  storageVersion: 2,
};

// CONFIGURATION_REQUIRED — project identity shown in the UI.
export const PROJECT = {
  name: 'Team Onboarding & Skill Progression Platform',
  code: 'TOSP',
};

// CONFIGURATION_REQUIRED — single demo learner identity. No real personal data permitted.
export const DEMO_LEARNER = {
  displayName: 'Demo Learner',
  status: 'DEMO_DATA',
};

// PROTOTYPE_ONLY — storage key namespace, versioned per storageVersion above.
export const STORAGE_KEY = `tosp.prototype.v${CONFIG.storageVersion}`;

export const PROTOTYPE_WARNING =
  'This is a frontend-only prototype. Progress is stored in this browser and is not official onboarding evidence.';
