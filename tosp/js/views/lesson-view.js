// views/lesson-view.js — single lesson content with completion, navigation,
// and a speaker control scoped to exactly this lesson's readable content.

import { MODULES, LESSONS } from '../data.js';
import { getProgress, canOpenModule, markLessonComplete } from '../services/progress-service.js';
import { renderSpeakerControl, wireSpeakerControl } from '../components/speaker-control.js';
import { showToast } from '../components/toast.js';
import { rerender, navigate } from '../router.js';

export function render(container, params) {
  const module = MODULES.find((m) => m.id === params.moduleId);
  const lesson = LESSONS.find((l) => l.id === params.lessonId && l.moduleId === params.moduleId);

  if (!module || !lesson) {
    container.innerHTML = `<section class="panel"><h1>Lesson Not Found</h1><button type="button" class="btn btn--primary" data-nav="/dashboard">Back to Dashboard</button></section>`;
    return;
  }

  if (!canOpenModule(module.id)) {
    container.innerHTML = `
      <section class="panel">
        <h1>Module Locked</h1>
        <p class="muted">This lesson belongs to a module that is not yet available.</p>
        <button type="button" class="btn btn--primary" data-nav="/programme">View Programme Journey</button>
      </section>
    `;
    return;
  }

  const progress = getProgress();
  const complete = progress.completedLessonIds.includes(lesson.id);
  const moduleLessons = LESSONS.filter((l) => l.moduleId === module.id).sort((a, b) => a.orderIndex - b.orderIndex);
  const index = moduleLessons.findIndex((l) => l.id === lesson.id);
  const prevLesson = moduleLessons[index - 1] || null;
  const nextLesson = moduleLessons[index + 1] || null;
  const speechText = `${lesson.title}. ${lesson.content}`;

  container.innerHTML = `
    <div class="breadcrumb">
      <button type="button" class="breadcrumb__link" data-nav="/dashboard">Dashboard</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <button type="button" class="breadcrumb__link" data-nav="/module/${module.id}">${module.title}</button>
      <span class="breadcrumb__sep" aria-hidden="true">/</span>
      <span class="breadcrumb__current">${lesson.title}</span>
    </div>

    <section class="panel">
      <div class="panel__header-row">
        <h1>${lesson.title}</h1>
        <button type="button" class="btn btn--ghost" data-nav="/module/${module.id}">Back to Module</button>
      </div>
      <p class="muted">${module.title} · Lesson ${index + 1} of ${moduleLessons.length} · <span aria-hidden="true">⏱</span> ${lesson.estimatedMinutes} min</p>
      ${renderSpeakerControl('lesson-speaker', 'Listen to this lesson')}
    </section>

    <section class="panel lesson-content">
      <div class="lesson-content__body">
        <p>${lesson.content}</p>
      </div>
      <p class="lesson-content__source muted small">Source: ${lesson.source}</p>
    </section>

    <section class="panel lesson-view__actions">
      <button type="button" class="btn btn--primary" id="mark-complete-btn" ${complete ? 'disabled' : ''}>
        ${complete ? '✓ Lesson Complete' : 'Mark Lesson Complete'}
      </button>
      <div class="lesson-view__nav">
        <button type="button" class="btn btn--ghost" data-nav="/lesson/${module.id}/${prevLesson ? prevLesson.id : ''}" ${prevLesson ? '' : 'disabled'}>← Previous Lesson</button>
        <button type="button" class="btn btn--ghost" data-nav="/lesson/${module.id}/${nextLesson ? nextLesson.id : ''}" ${nextLesson ? '' : 'disabled'}>Next Lesson →</button>
      </div>
    </section>
  `;

  wireSpeakerControl(container, 'lesson-speaker', () => speechText);

  const markBtn = container.querySelector('#mark-complete-btn');
  markBtn.addEventListener('click', () => {
    markLessonComplete(lesson.id);
    showToast(`"${lesson.title}" marked complete.`, { type: 'success', duration: 3000 });
    if (nextLesson) {
      navigate(`/lesson/${module.id}/${nextLesson.id}`);
    } else {
      rerender();
    }
  });
}
