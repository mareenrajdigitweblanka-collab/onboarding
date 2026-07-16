// views/quiz-view.js — Skill Check: questions, validation, scoring, result.
// This view never scores answers itself — it delegates to quiz-service.js.

import { MODULES, QUESTIONS, QUIZZES } from '../data.js';
import { CONFIG } from '../config.js';
import { canOpenModule, lessonsReadyForQuiz, moduleRequiresSignoff } from '../services/progress-service.js';
import {
  getAttempts,
  isQuizPassed,
  canAttemptQuiz,
  submitQuizAttempt,
} from '../services/quiz-service.js';
import {
  getDraftAnswers,
  setDraftAnswer,
  clearDraftAnswers,
  isSubmitting,
  beginSubmit,
  endSubmit,
  setLastResult,
  takeLastResult,
} from '../state.js';
import { statusBadge } from '../components/status-badge.js';
import { renderSpeakerControl, wireSpeakerControl } from '../components/speaker-control.js';
import { confirmDialog } from '../components/confirm-dialog.js';
import { rerender, navigate } from '../router.js';

function renderBlocked(container, module, message) {
  container.innerHTML = `
    <section class="panel">
      <h1>Skill Check Unavailable</h1>
      <p class="muted" role="status">${message}</p>
      <button type="button" class="btn btn--primary" data-nav="/module/${module.id}">Back to Module</button>
    </section>
  `;
}

function renderResult(container, module, result, quiz) {
  const nextModule = MODULES[module.orderIndex]; // orderIndex is 1-based, array is 0-based -> next module.
  const requiresSignoff = moduleRequiresSignoff(module.id);

  let passedNextStepHtml;
  if (requiresSignoff) {
    passedNextStepHtml = `
      <p>This module also requires a Team Leader Sign-off before the next module unlocks (Source: PH/Sales BGCT Handbook v1.0 — Section 1, Checklist).</p>
      ${statusBadge('awaiting-signoff')}
      <button type="button" class="btn btn--primary" data-nav="/module/${module.id}">Continue to Sign-off</button>
    `;
  } else if (nextModule) {
    passedNextStepHtml = `
      <p>Module ${nextModule.orderIndex}, "${nextModule.title}", is now unlocked.</p>
      <button type="button" class="btn btn--primary" data-nav="/module/${nextModule.id}">Go to Next Module</button>
    `;
  } else {
    passedNextStepHtml = `
      <p>You have completed the final module.</p>
      <button type="button" class="btn btn--primary" data-nav="/completion">View Completion Summary</button>
    `;
  }

  const questions = QUESTIONS.filter((q) => q.quizId === quiz.id);
  const correctCount = questions.filter((q) => result.selectedAnswers?.[q.id] === q.correctOptionId).length;

  const reviewHtml = result.selectedAnswers ? questions.map((q, i) => {
    const selectedId = result.selectedAnswers[q.id];
    const wasCorrect = selectedId === q.correctOptionId;
    const selectedText = q.options.find((o) => o.id === selectedId)?.text || '(unanswered)';
    const correctText = q.options.find((o) => o.id === q.correctOptionId)?.text;
    return `
      <li class="quiz-review-row quiz-review-row--${wasCorrect ? 'correct' : 'incorrect'}">
        <p class="quiz-review-row__prompt"><span aria-hidden="true">${wasCorrect ? '✓' : '✗'}</span> ${i + 1}. ${q.prompt}</p>
        <p class="muted">Your answer: ${selectedText}</p>
        ${!wasCorrect ? `<p class="muted">Correct answer: ${correctText}</p>` : ''}
        <p class="muted small">Source: ${q.source}</p>
      </li>
    `;
  }).join('') : '';

  container.innerHTML = `
    <section class="panel quiz-result quiz-result--${result.passed ? 'pass' : 'fail'}" role="status" aria-live="polite">
      <h1>${result.passed ? 'Skill Check Passed' : 'Skill Check Not Passed'}</h1>
      ${statusBadge(result.passed ? 'passed' : 'failed')}
      <p class="quiz-result__score">${result.scorePct}% (${result.earnedPoints}/${result.totalPoints} points)</p>
      <p class="muted">Attempt ${result.attemptNumber} of ${CONFIG.maxAttempts} · Passing score ${quiz.passingScorePct}%</p>
      ${result.selectedAnswers ? `<p class="muted">Gap summary: ${correctCount} of ${questions.length} questions correct.</p>` : ''}

      ${result.passed
        ? passedNextStepHtml
        : (result.attemptsRemaining > 0
            ? `<p class="muted">${result.attemptsRemaining} attempt(s) remaining. Review the lessons and try again.</p>
               <button type="button" class="btn btn--primary" data-nav="/quiz/${module.id}">Retry Skill Check</button>`
            : `<p class="muted">No attempts remain for this module.</p>`)}

      <button type="button" class="btn btn--ghost" data-nav="/module/${module.id}">Back to Module</button>
    </section>

    ${reviewHtml ? `<section class="panel"><h2>Review Your Answers</h2><ul class="quiz-review-list">${reviewHtml}</ul></section>` : ''}
  `;
}

export function render(container, params) {
  const module = MODULES.find((m) => m.id === params.moduleId);
  if (!module) {
    container.innerHTML = `<section class="panel"><h1>Module Not Found</h1><button type="button" class="btn btn--primary" data-nav="/dashboard">Back to Dashboard</button></section>`;
    return;
  }

  if (!canOpenModule(module.id)) {
    renderBlocked(container, module, 'This module is not yet available.');
    return;
  }

  const quiz = QUIZZES.find((q) => q.moduleId === module.id);

  // Shows the just-submitted result once, immediately after a full chrome
  // refresh (so the sidebar's overall progress reflects it too), instead of
  // re-deriving a generic "already passed"/form state.
  const pendingResult = takeLastResult(quiz.id);
  if (pendingResult) {
    renderResult(container, module, pendingResult, quiz);
    return;
  }

  if (isQuizPassed(quiz.id)) {
    container.innerHTML = `
      <section class="panel">
        <h1>${quiz.title}</h1>
        ${statusBadge('passed')}
        <p class="muted">This Skill Check has already been passed.</p>
        <button type="button" class="btn btn--primary" data-nav="/module/${module.id}">Back to Module</button>
      </section>
    `;
    return;
  }

  if (CONFIG.requireAllLessonsBeforeQuiz && !lessonsReadyForQuiz(module.id)) {
    renderBlocked(container, module, 'Complete all required lessons in this module before taking the Skill Check.');
    return;
  }

  if (!canAttemptQuiz(quiz)) {
    renderBlocked(container, module, `No Skill Check attempts remain (maximum ${CONFIG.maxAttempts}).`);
    return;
  }

  const attempts = getAttempts(quiz.id);
  const attemptNumber = attempts.length + 1;
  const questions = QUESTIONS.filter((q) => q.quizId === quiz.id);
  const draft = getDraftAnswers(quiz.id);

  const speechText = [
    `${quiz.title}. This Skill Check has ${questions.length} questions. Select one answer per question, then submit.`,
    ...questions.map((q, i) => {
      const optionsText = q.options.map((opt, idx) => `Option ${String.fromCharCode(65 + idx)}: ${opt.text}.`).join(' ');
      return `Question ${i + 1}: ${q.prompt} ${optionsText}`;
    }),
  ].join(' ');

  const questionsHtml = questions.map((q, i) => {
    const optionsHtml = q.options.map((opt) => `
      <label class="quiz-option">
        <input type="radio" name="${q.id}" value="${opt.id}" ${draft[q.id] === opt.id ? 'checked' : ''} />
        <span>${opt.text}</span>
      </label>
    `).join('');

    return `
      <fieldset class="quiz-question" data-question-id="${q.id}">
        <legend>${i + 1}. ${q.prompt}</legend>
        <div class="quiz-options">${optionsHtml}</div>
      </fieldset>
    `;
  }).join('');

  container.innerHTML = `
    <div class="breadcrumb">
      <button type="button" class="breadcrumb__link" data-nav="/dashboard">Dashboard</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <button type="button" class="breadcrumb__link" data-nav="/module/${module.id}">${module.title}</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <span class="breadcrumb__current">Skill Check</span>
    </div>

    <section class="panel">
      <div class="panel__header-row">
        <h1>${quiz.title}</h1>
        <button type="button" class="btn btn--ghost" data-nav="/module/${module.id}">Back to Module</button>
      </div>
      <p class="muted">Attempt ${attemptNumber} of ${CONFIG.maxAttempts} · Passing score ${quiz.passingScorePct}%</p>
      <p class="muted" id="quiz-progress-indicator" role="status" aria-live="polite">0 of ${questions.length} questions answered</p>
      ${renderSpeakerControl('quiz-speaker', 'Listen to the questions and options')}
    </section>

    <section class="panel">
      <form id="quiz-form" novalidate>
        ${questionsHtml}
        <p class="form-error" id="quiz-validation-error" role="alert" hidden></p>
        <button type="submit" class="btn btn--primary" id="quiz-submit-btn">Submit Skill Check</button>
      </form>
    </section>
  `;

  wireSpeakerControl(container, 'quiz-speaker', () => speechText);

  const form = container.querySelector('#quiz-form');
  const errorEl = container.querySelector('#quiz-validation-error');
  const submitBtn = container.querySelector('#quiz-submit-btn');
  const progressIndicator = container.querySelector('#quiz-progress-indicator');

  function updateProgressIndicator() {
    const answeredCount = questions.filter((q) => !!getDraftAnswers(quiz.id)[q.id]).length;
    progressIndicator.textContent = `${answeredCount} of ${questions.length} questions answered`;
  }
  updateProgressIndicator();

  form.addEventListener('change', (e) => {
    if (e.target.matches('input[type="radio"]')) {
      setDraftAnswer(quiz.id, e.target.name, e.target.value);
      updateProgressIndicator();
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (isSubmitting(quiz.id)) return; // Blocks duplicate accidental submissions.

    const currentAnswers = getDraftAnswers(quiz.id);
    const unanswered = questions.filter((q) => !currentAnswers[q.id]);

    if (unanswered.length > 0) {
      errorEl.textContent = `Please answer all questions before submitting (${unanswered.length} unanswered).`;
      errorEl.hidden = false;
      return;
    }

    errorEl.hidden = true;

    const confirmed = await confirmDialog({
      title: 'Submit Skill Check?',
      message: 'You cannot change your answers after submitting.',
      confirmLabel: 'Submit',
      cancelLabel: 'Keep reviewing',
    });
    if (!confirmed) return;

    beginSubmit(quiz.id);
    submitBtn.disabled = true;
    try {
      const result = submitQuizAttempt(quiz, currentAnswers);
      clearDraftAnswers(quiz.id);
      setLastResult(quiz.id, { ...result, selectedAnswers: currentAnswers });
      // Goes through the router so the sidebar (overall progress) refreshes
      // along with the main content, instead of only updating this container.
      rerender();
    } finally {
      endSubmit(quiz.id);
    }
  });
}
