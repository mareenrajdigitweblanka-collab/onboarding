// programmes/ph-team-programme.js — the PH / Sales Team programme DESCRIPTOR.
//
// This wraps the (unchanged) PH content in ph-team-content.js with the
// programme-level configuration and UI descriptor the shared application
// reads through the registry. Moving these values here — rather than leaving
// them hardcoded in config.js and the views — is what lets a second
// programme (Amazon Team) reuse the exact same engine without inheriting any
// PH-specific curriculum, navigation, sign-off, Tamil, or dashboard content.
//
// Nothing about PH behaviour changes: the config values, storage key, module
// tiers, readiness rows, and navigation below reproduce exactly what the
// application did before the programme boundary was introduced.

import {
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
} from './ph-team-content.js';
import { isAsinAllocationReady, isIndependentOwnershipReady } from '../rules/module-access.js';

export const phTeamProgramme = {
  id: PROGRAMME.id,
  code: PROGRAMME.code,
  title: PROGRAMME.title,
  shortTitle: 'PH / Sales Team',
  team: 'PH / Sales Team',
  description: PROGRAMME.description,
  version: PROGRAMME.version,
  status: PROGRAMME.status,

  // PROTOTYPE_ONLY — existing PH storage key/version, unchanged so previously
  // recorded PH progress keeps loading exactly as before.
  storageKey: 'tosp.prototype.v2',
  storageVersion: 2,

  // CONFIGURATION_REQUIRED — the shared, unsourced prototype quiz/config
  // defaults (see ph-team-content.js and the old config.js comments).
  config: {
    totalModules: 18,
    passingScorePct: 80,
    maxAttempts: 3,
    requireAllLessonsBeforeQuiz: true,
    allowResetDemoProgress: true,
  },

  // Programme-specific feature flags read by the shared engine/UI.
  features: {
    enableTamilTranslation: true,
    requiresReviewerSignoff: false,
  },

  // The content the shared engine operates on.
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

  // Programme-specific UI descriptor consumed by header/dashboard/programme/
  // sources/module views so those shared views carry no hardcoded PH content.
  ui: {
    journeyLabel: 'Programme Journey',

    navItems: [
      { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
      { key: 'programme-evaluation', label: '7-Day Evaluation', icon: '①', route: '/programme/evaluation' },
      { key: 'programme-ph', label: 'PH Competency Path', icon: '➤', route: '/programme/ph' },
      { key: 'current-module', label: 'Current Module', icon: '▶', route: null },
      { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
      { key: 'translation-review', label: 'Translation Review', icon: 'அ', route: '/translation-review' },
    ],

    // Tracks group modules on the dashboard and programme journey. `route` is
    // where a track's "back to programme" links point.
    tracks: [
      {
        key: 'evaluation',
        title: '7-Day Evaluation Track',
        statLabel: '7-Day Evaluation',
        unitNoun: 'days',
        subtitle: 'Modules 1–7 · Company-wide BGCT foundation.',
        route: '/programme/evaluation',
        filter: (m) => m.orderIndex <= 7,
      },
      {
        key: 'ph',
        title: 'PH Competency Path',
        statLabel: 'PH Competency Path',
        unitNoun: 'steps',
        subtitle: 'Modules 8–18 · Department-specific sales competency, each requiring Team Leader Sign-off.',
        route: '/programme/ph',
        filter: (m) => m.orderIndex > 7,
      },
    ],

    readiness: [
      {
        label: 'ASIN Allocation Readiness',
        note: 'PH Learning Path Steps 1–6 fully complete — the minimum before ASIN ownership can be assigned (Source: PH/Sales BGCT Handbook v1.0 — Section 1).',
        evaluate: (modules, progress) => isAsinAllocationReady(modules, progress),
      },
      {
        label: 'Independent Ownership Readiness',
        note: 'All 11 PH Learning Path steps fully complete, in order (Source: PH/Sales BGCT Handbook v1.0 — Section 1, Best Practice).',
        evaluate: (modules, progress) => isIndependentOwnershipReady(modules, progress),
      },
    ],

    dashboardSourceBlurb:
      'Content is sourced from the Digitweb Lanka New Employee Onboarding Guide v1.0 and the ' +
      'PH/Sales BGCT Handbook v1.0 (status FINAL_TRUTH). Progress and sign-offs recorded here ' +
      'remain PROTOTYPE_ONLY.',

    // Programme-specific sign-off copy, read generically by module-view.js and
    // quiz-view.js (which carry no hardcoded programme text themselves — see
    // ui.dashboardSourceBlurb/ui.sourcesIntro for the same pattern). Only PH
    // sets module.requiresSignoff on any module today, so these are the only
    // strings ever shown; any future programme that also requires sign-off
    // would supply its own text here instead of inheriting PH's citation.
    signoffExplanationText:
      'The PH/Sales BGCT Handbook requires each learning step to be verified by team leader ' +
      'sign-off before progression (Source: PH/Sales BGCT Handbook v1.0 — Section 1, Checklist). ' +
      'Confirming below is a simulated, self-service prototype action — it is not performed or ' +
      'verified by an actual team leader, and it is not official evidence of readiness.',
    signoffNextStepText:
      'This module also requires a Team Leader Sign-off before the next module unlocks ' +
      '(Source: PH/Sales BGCT Handbook v1.0 — Section 1, Checklist).',

    sourcesIntro:
      'All programme content — modules, lessons, and Skill Check questions — is sourced directly ' +
      'from the two documents below and is status <strong>FINAL_TRUTH</strong>. Progress, quiz ' +
      'results, and Team Leader Sign-offs recorded in this browser remain ' +
      '<strong>PROTOTYPE_ONLY</strong> and are not official onboarding evidence.',

    // Resolves the "back to programme" link shown in a module's breadcrumb.
    moduleBackLink(module) {
      const track = this.tracks.find((t) => t.filter(module));
      return track
        ? { route: track.route, label: track.statLabel }
        : { route: '/programme', label: this.journeyLabel };
    },
  },
};
