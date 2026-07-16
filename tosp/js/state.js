// state.js — transient, in-memory UI state that must NOT be persisted.
// Persisted learner progress lives in storage.js; this module only holds
// short-lived interaction state such as unsubmitted quiz answers, so a
// learner cannot "pass" a quiz just by refreshing mid-attempt.

const quizDrafts = new Map(); // quizId -> { questionId: optionId }
const submitLocks = new Set(); // quizId currently mid-submit, to block double-clicks
const lastResults = new Map(); // quizId -> most recent submitQuizAttempt() result, shown once

export function getDraftAnswers(quizId) {
  return quizDrafts.get(quizId) || {};
}

export function setDraftAnswer(quizId, questionId, optionId) {
  const current = quizDrafts.get(quizId) || {};
  quizDrafts.set(quizId, { ...current, [questionId]: optionId });
}

export function clearDraftAnswers(quizId) {
  quizDrafts.delete(quizId);
}

export function isSubmitting(quizId) {
  return submitLocks.has(quizId);
}

export function beginSubmit(quizId) {
  submitLocks.add(quizId);
}

export function endSubmit(quizId) {
  submitLocks.delete(quizId);
}

/**
 * Holds the most recent Skill Check submission result for one screen render
 * so the quiz view can show it immediately after a full chrome refresh
 * (header progress included) without re-deriving it from persisted state.
 */
export function setLastResult(quizId, result) {
  lastResults.set(quizId, result);
}

export function takeLastResult(quizId) {
  const result = lastResults.get(quizId);
  lastResults.delete(quizId);
  return result || null;
}
