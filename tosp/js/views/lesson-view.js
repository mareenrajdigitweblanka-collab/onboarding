// views/lesson-view.js — single lesson content with completion and navigation.

import { MODULES, LESSONS } from '../data.js';
import { getProgress, canOpenModule, markLessonComplete } from '../services/progress-service.js';
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

  container.innerHTML = `
    <section class="panel">
      <div class="panel__header-row">
        <h1>${lesson.title}</h1>
        <button type="button" class="btn btn--ghost" data-nav="/module/${module.id}">Back to Module</button>
      </div>
      <p class="muted">${module.title} · Lesson ${index + 1} of ${moduleLessons.length} · ⏱ ${lesson.estimatedMinutes} min</p>
    </section>

    <section class="panel lesson-content">
      <p>${lesson.content}</p>
      <p class="muted small">Source: ${lesson.source}</p>
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

  const markBtn = container.querySelector('#mark-complete-btn');
  markBtn.addEventListener('click', () => {
    markLessonComplete(lesson.id);
    if (nextLesson) {
      navigate(`/lesson/${module.id}/${nextLesson.id}`);
    } else {
      rerender();
    }
  });
}
