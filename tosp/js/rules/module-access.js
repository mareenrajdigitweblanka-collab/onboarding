// rules/module-access.js — pure business rules for module locking/unlocking.
// No DOM access. No localStorage access. No rendering. Inputs in, values out.

/**
 * A module is accessible when it has been explicitly unlocked (Module 1 is
 * unlocked from the start; every later module is unlocked only once the
 * previous module's Skill Check has been passed).
 */
export function canAccessModule(module, progress, modules) {
  if (!module) return false;
  return progress.unlockedModuleIds.includes(module.id);
}

/**
 * True when every required lesson belonging to a module has been completed.
 */
export function areRequiredLessonsComplete(moduleId, lessons, progress) {
  const required = lessons.filter((l) => l.moduleId === moduleId && l.required);
  if (required.length === 0) return true;
  return required.every((l) => progress.completedLessonIds.includes(l.id));
}

/**
 * A module is fully complete once its Skill Check has been passed, and —
 * for modules that require it (module.requiresSignoff) — once the simulated
 * team-leader sign-off has also been confirmed. Progression to the next
 * module only happens once a module is fully complete, not merely quiz-passed.
 */
export function isModuleFullyComplete(module, progress) {
  if (!module) return false;
  const quizPassed = progress.passedQuizIds.includes(`${module.id}-quiz`);
  if (!quizPassed) return false;
  if (module.requiresSignoff) {
    return progress.signedOffModuleIds.includes(module.id);
  }
  return true;
}

/**
 * The first module, in order, that is accessible but not yet fully complete.
 * Returns null once every module is fully complete.
 */
export function determineNextModule(modules, progress) {
  const ordered = [...modules].sort((a, b) => a.orderIndex - b.orderIndex);
  for (const module of ordered) {
    if (canAccessModule(module, progress, modules) && !isModuleFullyComplete(module, progress)) {
      return module;
    }
  }
  return null;
}

/**
 * The whole programme is complete once every module is fully complete
 * (quiz passed, and signed off where required).
 */
export function isProgrammeComplete(modules, progress) {
  return modules.every((m) => isModuleFullyComplete(m, progress));
}
