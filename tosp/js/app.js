// app.js — application entry point. Wires router, application shell, and
// views. Contains no business rules or scoring logic of its own.

import { registerRoute, registerNotFound, startRouter, navigate } from './router.js';
import { renderHeader, wireHeader } from './components/header.js';
import { initTheme } from './services/theme-service.js';
import { stopSpeech, clearSpeechListeners } from './services/speech-service.js';
import { clearThemeListeners } from './services/theme-service.js';
import { wasLastLoadCorrupted } from './storage.js';
import { getProgress } from './services/progress-service.js';
import { showToast } from './components/toast.js';
import { FEATURES } from './config.js';

import * as dashboardView from './views/dashboard-view.js';
import * as programmeView from './views/programme-view.js';
import * as sourcesView from './views/sources-view.js';
import * as moduleView from './views/module-view.js';
import * as lessonView from './views/lesson-view.js';
import * as quizView from './views/quiz-view.js';
import * as completionView from './views/completion-view.js';
import * as translationReviewView from './views/translation-review-view.js';

const shellNavEl = document.getElementById('app-shell-nav');
const mainEl = document.getElementById('app-main');
const appRoot = document.getElementById('app');

function mount(routeName, viewRenderFn, params) {
  // A route change (or same-route rerender) always means "the screen the
  // learner is looking at just changed" — stop any speech in progress and
  // drop stale subscriptions before rendering the next state.
  stopSpeech();
  clearSpeechListeners();
  clearThemeListeners();

  shellNavEl.innerHTML = renderHeader(routeName);
  wireHeader(shellNavEl);

  viewRenderFn(mainEl, params || {});
  mainEl.scrollTo?.(0, 0);
  window.scrollTo(0, 0);
}

registerRoute('/dashboard', () => mount('dashboard', dashboardView.render));
registerRoute('/programme', () => mount('programme', (c) => programmeView.render(c, { tier: 'all' })));
registerRoute('/programme/evaluation', () => mount('programme-evaluation', (c) => programmeView.render(c, { tier: 'evaluation' })));
registerRoute('/programme/ph', () => mount('programme-ph', (c) => programmeView.render(c, { tier: 'ph' })));
registerRoute('/sources', () => mount('sources', sourcesView.render));
registerRoute('/module/:moduleId', (params) => mount('module', moduleView.render, params));
registerRoute('/lesson/:moduleId/:lessonId', (params) => mount('lesson', lessonView.render, params));
registerRoute('/quiz/:moduleId', (params) => mount('quiz', quizView.render, params));
registerRoute('/completion', () => mount('completion', completionView.render));
// Tamil translation review is a PH-only screen. When the active programme has
// Tamil disabled (e.g. Amazon Team), this route redirects to the dashboard so
// the Tamil review screen is never shown for it.
registerRoute('/translation-review', () => {
  if (!FEATURES.enableTamilTranslation) {
    navigate('/dashboard');
    return;
  }
  mount('translation-review', translationReviewView.render);
});
registerNotFound(() => mount('dashboard', dashboardView.render));

// Single delegated handler for every [data-nav] button rendered by any
// header/component/view, so individual views don't need to rebind nav clicks.
appRoot.addEventListener('click', (event) => {
  const navButton = event.target.closest('[data-nav]');
  if (!navButton || navButton.disabled) return;
  const route = navButton.getAttribute('data-nav');
  if (route) {
    event.preventDefault();
    navigate(route);
  }
});

initTheme();
startRouter();

// One-time startup diagnostic: if a previous session's progress could not
// be read (corrupted JSON / wrong shape), storage.js already fell back to a
// fresh state — tell the learner, once, rather than failing silently.
getProgress();
if (wasLastLoadCorrupted()) {
  showToast(
    "We couldn't read your saved progress in this browser, so we started fresh.",
    { type: 'warning', duration: 8000 }
  );
}
