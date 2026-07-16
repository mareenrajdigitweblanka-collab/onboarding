// services/progress-service.js — coordinates reading/updating learner progress.
// UI views call this service; they must never write to storage or recompute
// progress percentages themselves.

import { loadProgress, saveProgress, resetProgress as resetStoredProgress } from '../storage.js';
import { MODULES, LESSONS, QUIZZES } from '../data.js';
import { calculateModuleProgress, calculateOverallProgress } from '../rules/progression.js';
import {
  areRequiredLessonsComplete,
  canAccessModule,
  determineNextModule,
  isProgrammeComplete,
  isModuleFullyComplete,
  isAsinAllocationReady,
  isIndependentOwnershipReady,
} from '../rules/module-access.js';

export function getProgress() {
  return loadProgress();
}

export function resetAllProgress() {
  return resetStoredProgress();
}

/** Marks a lesson complete and persists the change. Idempotent. */
export function markLessonComplete(lessonId) {
  const progress = loadProgress();
  if (!progress.completedLessonIds.includes(lessonId)) {
    progress.completedLessonIds = [...progress.completedLessonIds, lessonId];
    saveProgress(progress);
  }
  return progress;
}

export function getModuleProgress(moduleId) {
  const quiz = QUIZZES.find((q) => q.moduleId === moduleId) || null;
  const progress = loadProgress();
  return calculateModuleProgress(moduleId, LESSONS, quiz, progress);
}

export function getOverallProgress() {
  const progress = loadProgress();
  return calculateOverallProgress(MODULES, LESSONS, QUIZZES, progress);
}

export function canOpenModule(moduleId) {
  const module = MODULES.find((m) => m.id === moduleId);
  const progress = loadProgress();
  return canAccessModule(module, progress, MODULES);
}

export function lessonsReadyForQuiz(moduleId) {
  const progress = loadProgress();
  return areRequiredLessonsComplete(moduleId, LESSONS, progress);
}

export function getCurrentModule() {
  const progress = loadProgress();
  return determineNextModule(MODULES, progress);
}

export function programmeIsComplete() {
  const progress = loadProgress();
  return isProgrammeComplete(MODULES, progress);
}

export function getAsinAllocationReadiness() {
  const progress = loadProgress();
  return isAsinAllocationReady(MODULES, progress);
}

export function getIndependentOwnershipReadiness() {
  const progress = loadProgress();
  return isIndependentOwnershipReady(MODULES, progress);
}

/**
 * The most recently fully-completed module, derived from each completed
 * module's last passing quiz attempt timestamp (the only completion
 * timestamp the data model records). Returns null if nothing is complete yet.
 */
export function getMostRecentlyCompletedModule() {
  const progress = loadProgress();
  let latest = null;
  let latestTime = -Infinity;

  for (const module of MODULES) {
    if (!isModuleFullyComplete(module, progress)) continue;
    const attempts = progress.quizAttempts[`${module.id}-quiz`] || [];
    const passedAttempt = [...attempts].reverse().find((a) => a.passed);
    const time = passedAttempt ? new Date(passedAttempt.answeredAt).getTime() : 0;
    if (time >= latestTime) {
      latestTime = time;
      latest = module;
    }
  }

  return latest;
}

/**
 * Honest activity summary derived only from data the app actually tracks
 * (no fabricated streaks — lesson completions and quiz attempts have no
 * per-item timestamp in this data model beyond quiz attempts).
 */
export function getActivitySummary() {
  const progress = loadProgress();
  const lessonsCompleted = progress.completedLessonIds.length;
  const totalAttempts = Object.values(progress.quizAttempts).reduce((sum, arr) => sum + arr.length, 0);

  let mostRecentActivity = null;
  for (const attempts of Object.values(progress.quizAttempts)) {
    for (const attempt of attempts) {
      const time = new Date(attempt.answeredAt).getTime();
      if (!mostRecentActivity || time > new Date(mostRecentActivity).getTime()) {
        mostRecentActivity = attempt.answeredAt;
      }
    }
  }

  return { lessonsCompleted, totalAttempts, mostRecentActivity };
}

/**
 * UI status for a module card:
 * 'locked' | 'available' | 'in-progress' | 'awaiting-signoff' | 'passed'.
 */
export function getModuleStatus(moduleId) {
  const module = MODULES.find((m) => m.id === moduleId);
  const progress = loadProgress();
  const quizId = `${moduleId}-quiz`;

  if (isModuleFullyComplete(module, progress)) return 'passed';
  if (!canAccessModule(module, progress, MODULES)) return 'locked';
  if (progress.passedQuizIds.includes(quizId)) return 'awaiting-signoff';

  const mp = calculateModuleProgress(moduleId, LESSONS, { id: quizId }, progress, !!module.requiresSignoff);
  return mp.completedLessons > 0 ? 'in-progress' : 'available';
}

/** The module immediately before this one in orderIndex, or null for Module 1. */
export function getPreviousModule(moduleId) {
  const module = MODULES.find((m) => m.id === moduleId);
  if (!module) return null;
  return MODULES.find((m) => m.orderIndex === module.orderIndex - 1) || null;
}

/**
 * Mutates `progress` in place: if the given module is now fully complete
 * (quiz passed, and signed off if required), unlocks the next module and,
 * if that was the final module, stamps completedAt. Does not persist —
 * callers (quiz-service, confirmSignoff below) save after calling this.
 */
export function tryUnlockNextModule(progress, moduleId) {
  const module = MODULES.find((m) => m.id === moduleId);
  if (!module || !isModuleFullyComplete(module, progress)) return progress;

  const nextModule = MODULES[module.orderIndex]; // orderIndex is 1-based; array is 0-based.
  if (nextModule && !progress.unlockedModuleIds.includes(nextModule.id)) {
    progress.unlockedModuleIds = [...progress.unlockedModuleIds, nextModule.id];
    progress.currentModuleId = nextModule.id;
  }

  if (isProgrammeComplete(MODULES, progress) && !progress.completedAt) {
    progress.completedAt = new Date().toISOString();
  }

  return progress;
}

export function moduleRequiresSignoff(moduleId) {
  const module = MODULES.find((m) => m.id === moduleId);
  return !!(module && module.requiresSignoff);
}

export function isSignedOff(moduleId) {
  const progress = loadProgress();
  return progress.signedOffModuleIds.includes(moduleId);
}

/**
 * Whether the simulated team-leader sign-off can be confirmed right now:
 * the module must require sign-off, its Skill Check must already be
 * passed, and it must not already be signed off.
 */
export function canConfirmSignoff(moduleId) {
  const module = MODULES.find((m) => m.id === moduleId);
  if (!module || !module.requiresSignoff) return false;
  const progress = loadProgress();
  if (progress.signedOffModuleIds.includes(moduleId)) return false;
  return progress.passedQuizIds.includes(`${moduleId}-quiz`);
}

/**
 * PROTOTYPE_ONLY — records a simulated team-leader sign-off confirmation
 * for a module (the PH Handbook requires a real sign-off before
 * progression; this is a browser-only stand-in for that step) and unlocks
 * the next module if the module is now fully complete.
 */
export function confirmSignoff(moduleId) {
  const progress = loadProgress();
  const module = MODULES.find((m) => m.id === moduleId);
  if (!module || !module.requiresSignoff) return progress;
  if (!progress.passedQuizIds.includes(`${moduleId}-quiz`)) {
    throw new Error('The Skill Check must be passed before sign-off can be confirmed.');
  }

  if (!progress.signedOffModuleIds.includes(moduleId)) {
    progress.signedOffModuleIds = [...progress.signedOffModuleIds, moduleId];
  }

  tryUnlockNextModule(progress, moduleId);
  saveProgress(progress);
  return progress;
}
