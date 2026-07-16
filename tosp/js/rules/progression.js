// rules/progression.js — pure progress-calculation rules.
// No DOM access. No localStorage access. No rendering.
//
// Progress percentages are always DERIVED from completedLessonIds and
// passedQuizIds at read time — they are never stored as authoritative state.

/**
 * Progress within a single module, derived from lesson completion, quiz
 * pass state, and — for modules that require it — simulated team-leader
 * sign-off state. A module's total "units" are its required lessons plus
 * its Skill Check, plus one more unit for sign-off when required, all
 * weighted equally.
 */
export function calculateModuleProgress(moduleId, lessons, quiz, progress, requiresSignoff = false) {
  const moduleLessons = lessons.filter((l) => l.moduleId === moduleId);
  const completedLessons = moduleLessons.filter((l) =>
    progress.completedLessonIds.includes(l.id)
  ).length;
  const quizPassed = quiz ? progress.passedQuizIds.includes(quiz.id) : false;
  const signedOff = requiresSignoff ? progress.signedOffModuleIds.includes(moduleId) : false;

  const totalUnits = moduleLessons.length + 1 + (requiresSignoff ? 1 : 0); // + Skill Check, + sign-off.
  const completedUnits = completedLessons + (quizPassed ? 1 : 0) + (signedOff ? 1 : 0);
  const progressPct = totalUnits === 0 ? 0 : Math.round((completedUnits / totalUnits) * 100);

  return {
    totalLessons: moduleLessons.length,
    completedLessons,
    quizPassed,
    requiresSignoff,
    signedOff,
    isFullyComplete: quizPassed && (!requiresSignoff || signedOff),
    progressPct,
  };
}

/**
 * Overall programme progress, derived as the average of every module's
 * derived progress. completedModuleCount counts modules that are fully
 * complete (quiz passed, and signed off where required).
 */
export function calculateOverallProgress(modules, lessons, quizzes, progress) {
  if (modules.length === 0) {
    return { overallPct: 0, completedModuleCount: 0, totalModules: 0 };
  }

  const perModule = modules.map((m) => {
    const quiz = quizzes.find((q) => q.moduleId === m.id) || null;
    return calculateModuleProgress(m.id, lessons, quiz, progress, !!m.requiresSignoff);
  });

  const overallPct = Math.round(
    perModule.reduce((sum, mp) => sum + mp.progressPct, 0) / modules.length
  );
  const completedModuleCount = perModule.filter((mp) => mp.isFullyComplete).length;

  return { overallPct, completedModuleCount, totalModules: modules.length };
}
