// storage.js — the ONLY module allowed to touch window.localStorage.
// PROTOTYPE_ONLY: everything here lives in the learner's browser and can be
// edited or cleared by that same learner at any time.

import { STORAGE_KEY, CONFIG } from './config.js';
import { PROGRAMME, MODULES } from './data.js';

function initialProgress() {
  return {
    programmeId: PROGRAMME.id,
    completedLessonIds: [],
    quizAttempts: {}, // quizId -> Array<{ attemptNumber, scorePct, passed, answeredAt }>
    passedQuizIds: [],
    // PROTOTYPE_ONLY — simulated team-leader sign-off confirmations. The PH
    // Handbook requires real sign-off for its 11 steps; this browser-only
    // confirmation is not that sign-off, only a stand-in for the prototype.
    signedOffModuleIds: [],
    unlockedModuleIds: [MODULES[0].id], // Module 1 is available from the start.
    currentModuleId: MODULES[0].id,
    completedAt: null,
    storageVersion: CONFIG.storageVersion,
  };
}

function isValidProgressShape(value) {
  return (
    value &&
    typeof value === 'object' &&
    Array.isArray(value.completedLessonIds) &&
    typeof value.quizAttempts === 'object' &&
    value.quizAttempts !== null &&
    Array.isArray(value.passedQuizIds) &&
    Array.isArray(value.signedOffModuleIds) &&
    Array.isArray(value.unlockedModuleIds)
  );
}

/**
 * Reads learner progress from localStorage, falling back to a fresh initial
 * state whenever the key is missing, unreadable, corrupted, or from an
 * incompatible storage version. Never throws.
 */
export function loadProgress() {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    return initialProgress();
  }

  if (!raw) return initialProgress();

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (err) {
    return initialProgress();
  }

  if (!isValidProgressShape(parsed) || parsed.storageVersion !== CONFIG.storageVersion) {
    return initialProgress();
  }

  // Module 1 must always be reachable even if stored data predates a rule change.
  if (!parsed.unlockedModuleIds.includes(MODULES[0].id)) {
    parsed.unlockedModuleIds = [MODULES[0].id, ...parsed.unlockedModuleIds];
  }

  return parsed;
}

/**
 * Persists learner progress. Fails silently (does not crash the UI) if
 * localStorage is unavailable (e.g. private browsing quota errors).
 */
export function saveProgress(progress) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    return true;
  } catch (err) {
    return false;
  }
}

/** Removes only the TOSP prototype storage key. No other keys are touched. */
export function resetProgress() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    // Ignore — nothing more we can safely do in a prototype.
  }
  return initialProgress();
}
