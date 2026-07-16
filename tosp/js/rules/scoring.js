// rules/scoring.js — pure scoring rules for a Skill Check submission.
// No DOM access. No localStorage access. No rendering.

/**
 * Calculates the percentage score for a set of selected answers against a
 * quiz's questions. selectedAnswers is a map of questionId -> optionId.
 * Unanswered questions score zero points.
 */
export function calculateQuizScore(quiz, questions, selectedAnswers) {
  const quizQuestions = questions.filter((q) => q.quizId === quiz.id);
  const totalPoints = quizQuestions.reduce((sum, q) => sum + q.points, 0);

  if (totalPoints === 0) {
    return { scorePct: 0, earnedPoints: 0, totalPoints: 0 };
  }

  const earnedPoints = quizQuestions.reduce((sum, q) => {
    const selected = selectedAnswers[q.id];
    return selected != null && selected === q.correctOptionId ? sum + q.points : sum;
  }, 0);

  const scorePct = Math.round((earnedPoints / totalPoints) * 100);

  return { scorePct, earnedPoints, totalPoints };
}

/** A Skill Check passes when the score meets or exceeds the passing threshold. */
export function determineQuizPass(scorePct, passingScorePct) {
  return scorePct >= passingScorePct;
}
