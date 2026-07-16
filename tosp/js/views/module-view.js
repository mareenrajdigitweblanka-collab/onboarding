// views/module-view.js — module detail: lessons list, Skill Check status,
// and (for modules that require it) the simulated Team Leader Sign-off step.

import { MODULES, LESSONS, QUIZZES } from '../data.js';
import { CONFIG } from '../config.js';
import {
  getProgress,
  canOpenModule,
  lessonsReadyForQuiz,
  isSignedOff,
  canConfirmSignoff,
  confirmSignoff,
} from '../services/progress-service.js';
import { calculateModuleProgress } from '../rules/progression.js';
import { getAttempts, isQuizPassed, canAttemptQuiz } from '../services/quiz-service.js';
import { statusBadge } from '../components/status-badge.js';
import { progressBar } from '../components/progress-bar.js';
import { rerender } from '../router.js';

function renderLocked(container) {
  container.innerHTML = `
    <section class="panel">
      <h1>Module Locked</h1>
      <p class="muted">This module is not yet available. Complete and pass earlier modules first.</p>
      <button type="button" class="btn btn--primary" data-nav="/programme">View Programme Journey</button>
    </section>
  `;
}

export function render(container, params) {
  const module = MODULES.find((m) => m.id === params.moduleId);
  if (!module) {
    container.innerHTML = `<section class="panel"><h1>Module Not Found</h1><button type="button" class="btn btn--primary" data-nav="/dashboard">Back to Dashboard</button></section>`;
    return;
  }

  if (!canOpenModule(module.id)) {
    renderLocked(container);
    return;
  }

  const progress = getProgress();
  const lessons = LESSONS.filter((l) => l.moduleId === module.id).sort((a, b) => a.orderIndex - b.orderIndex);
  const quiz = QUIZZES.find((q) => q.moduleId === module.id);
  const mp = calculateModuleProgress(module.id, LESSONS, quiz, progress, !!module.requiresSignoff);
  const readyForQuiz = lessonsReadyForQuiz(module.id);
  const passed = isQuizPassed(quiz.id);
  const attempts = getAttempts(quiz.id);
  const canAttempt = canAttemptQuiz(quiz);
  const requiresSignoff = !!module.requiresSignoff;
  const signedOff = requiresSignoff && isSignedOff(module.id);
  const canSignoff = requiresSignoff && canConfirmSignoff(module.id);
  const fullyComplete = passed && (!requiresSignoff || signedOff);

  const lessonsHtml = lessons.map((lesson) => {
    const complete = progress.completedLessonIds.includes(lesson.id);
    return `
      <li class="lesson-row">
        <div class="lesson-row__info">
          <span class="lesson-row__title">${lesson.title}</span>
          <span class="lesson-row__meta">⏱ ${lesson.estimatedMinutes} min ${lesson.required ? '· Required' : ''}</span>
        </div>
        ${statusBadge(complete ? 'complete' : 'available')}
        <button type="button" class="btn btn--ghost" data-nav="/lesson/${module.id}/${lesson.id}">${complete ? 'Review' : 'Start'} Lesson</button>
      </li>
    `;
  }).join('');

  let quizStatusHtml;
  if (passed) {
    quizStatusHtml = `${statusBadge('passed')} <p class="muted">You passed this Skill Check.</p>`;
  } else if (!readyForQuiz && CONFIG.requireAllLessonsBeforeQuiz) {
    quizStatusHtml = `${statusBadge('locked')} <p class="muted">Complete all required lessons above to unlock the Skill Check.</p>`;
  } else if (!canAttempt) {
    quizStatusHtml = `${statusBadge('failed')} <p class="muted">No attempts remain (max ${CONFIG.maxAttempts}).</p>`;
  } else {
    quizStatusHtml = `${statusBadge('available')} <p class="muted">Attempts used: ${attempts.length} / ${CONFIG.maxAttempts}</p>`;
  }

  const signoffSectionHtml = requiresSignoff ? `
    <section class="panel">
      <h2>Team Leader Sign-off <span class="badge badge--demo">SIMULATED · PROTOTYPE_ONLY</span></h2>
      <p class="muted small">The PH/Sales BGCT Handbook requires each learning step to be verified by team leader sign-off before progression (Source: PH/Sales BGCT Handbook v1.0 — Section 1, Checklist). This prototype simulates that confirmation in this browser; it is not a real reviewer action or official evidence.</p>
      ${signedOff
        ? `${statusBadge('passed')} <p class="muted">Signed off (simulated).</p>`
        : passed
          ? `<button type="button" class="btn btn--primary" id="confirm-signoff-btn">Confirm Team Leader Sign-off (Simulated)</button>`
          : `${statusBadge('locked')} <p class="muted">Available once the Skill Check above is passed.</p>`}
    </section>
  ` : '';

  container.innerHTML = `
    <section class="panel">
      <div class="panel__header-row">
        <h1>${module.title}</h1>
        <button type="button" class="btn btn--ghost" data-nav="/programme">Back to Programme</button>
      </div>
      <p class="muted">${module.summary}</p>
      <p class="muted small">Source: ${module.source}${module.realWorldPace ? ` · Real-world pace: ${module.realWorldPace}` : ''}</p>
      ${progressBar(mp.progressPct, 'Module progress')}
    </section>

    <section class="panel">
      <h2>Lessons</h2>
      <ul class="lesson-list">${lessonsHtml}</ul>
    </section>

    <section class="panel">
      <h2>Skill Check</h2>
      <p class="module-view__quiz-title">${quiz.title}</p>
      <div class="module-view__quiz-status">${quizStatusHtml}</div>
      ${!passed && canAttempt
        ? `<button type="button" class="btn btn--primary" data-nav="/quiz/${module.id}">${attempts.length > 0 ? 'Retry Skill Check' : 'Start Skill Check'}</button>`
        : ''}
      ${fullyComplete ? `<button type="button" class="btn btn--primary" data-nav="/programme">Continue to Programme</button>` : ''}
    </section>

    ${signoffSectionHtml}
  `;

  if (canSignoff) {
    const signoffBtn = container.querySelector('#confirm-signoff-btn');
    signoffBtn.addEventListener('click', () => {
      const confirmed = window.confirm(
        'Confirm simulated Team Leader Sign-off for this module? This is a prototype action recorded only in this browser — it is not a real approval.'
      );
      if (!confirmed) return;
      confirmSignoff(module.id);
      rerender();
    });
  }
}
