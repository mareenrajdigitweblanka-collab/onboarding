// services/quiz-service.js — coordinates Skill Check attempts.
// The quiz UI must call this service rather than scoring answers itself;
// this service delegates the authoritative scoring to rules/scoring.js.
//
// PRODUCTION_BLOCKER: scoring happens client-side against locally loaded
// correct answers. A real implementation must score on a trusted server.

import { loadProgress, saveProgress } from '../storage.js';
import { CONFIG } from '../config.js';
import { QUESTIONS, LESSONS } from '../data.js';
import { calculateQuizScore, determineQuizPass } from '../rules/scoring.js';
import { areRequiredLessonsComplete } from '../rules/module-access.js';
import { tryUnlockNextModule } from './progress-service.js';

export function getAttempts(quizId) {
  const progress = loadProgress();
  return progress.quizAttempts[quizId] || [];
}

export function getAttemptsRemaining(quizId) {
  const attempts = getAttempts(quizId);
  return Math.max(0, CONFIG.maxAttempts - attempts.length);
}

export function isQuizPassed(quizId) {
  const progress = loadProgress();
  return progress.passedQuizIds.includes(quizId);
}

/**
 * Whether the Skill Check can currently be started: required lessons must be
 * complete (when configured), attempts must remain, and it must not already
 * be passed.
 */
export function canAttemptQuiz(quiz) {
  const progress = loadProgress();
  if (progress.passedQuizIds.includes(quiz.id)) return false;
  if (CONFIG.requireAllLessonsBeforeQuiz && !areRequiredLessonsComplete(quiz.moduleId, LESSONS, progress)) {
    return false;
  }
  return getAttemptsRemaining(quiz.id) > 0;
}

/**
 * Submits one Skill Check attempt: scores it authoritatively, records the
 * attempt, unlocks the next module on a pass, and persists everything in a
 * single write. Rejects if no attempts remain or the quiz was already passed,
 * preventing accidental duplicate/late submissions from counting twice.
 */
export function submitQuizAttempt(quiz, selectedAnswers) {
  const progress = loadProgress();

  if (progress.passedQuizIds.includes(quiz.id)) {
    throw new Error('This Skill Check has already been passed.');
  }

  const existingAttempts = progress.quizAttempts[quiz.id] || [];
  if (existingAttempts.length >= CONFIG.maxAttempts) {
    throw new Error('No Skill Check attempts remain for this module.');
  }

  const { scorePct, earnedPoints, totalPoints } = calculateQuizScore(quiz, QUESTIONS, selectedAnswers);
  const passed = determineQuizPass(scorePct, quiz.passingScorePct);
  const attemptNumber = existingAttempts.length + 1;

  const attempt = {
    attemptNumber,
    scorePct,
    earnedPoints,
    totalPoints,
    passed,
    answeredAt: new Date().toISOString(),
  };

  progress.quizAttempts = {
    ...progress.quizAttempts,
    [quiz.id]: [...existingAttempts, attempt],
  };

  if (passed) {
    if (!progress.passedQuizIds.includes(quiz.id)) {
      progress.passedQuizIds = [...progress.passedQuizIds, quiz.id];
    }
    // Only unlocks the next module immediately if this module doesn't also
    // require a simulated sign-off — otherwise progress-service.confirmSignoff
    // performs the unlock once sign-off is confirmed.
    tryUnlockNextModule(progress, quiz.moduleId);
  }

  saveProgress(progress);

  return {
    scorePct,
    earnedPoints,
    totalPoints,
    passed,
    attemptNumber,
    attemptsRemaining: Math.max(0, CONFIG.maxAttempts - (existingAttempts.length + 1)),
    progress,
  };
}
