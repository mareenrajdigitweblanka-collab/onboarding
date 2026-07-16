// app.js — application entry point. Wires router, header chrome, and views.
// Contains no business rules or scoring logic of its own.

import { registerRoute, registerNotFound, startRouter, navigate } from './router.js';
import { renderHeader } from './components/header.js';

import * as dashboardView from './views/dashboard-view.js';
import * as programmeView from './views/programme-view.js';
import * as moduleView from './views/module-view.js';
import * as lessonView from './views/lesson-view.js';
import * as quizView from './views/quiz-view.js';
import * as completionView from './views/completion-view.js';

const headerEl = document.getElementById('app-header');
const mainEl = document.getElementById('app-main');
const appRoot = document.getElementById('app');

function mount(routeName, viewRenderFn, params) {
  headerEl.innerHTML = renderHeader(routeName);
  viewRenderFn(mainEl, params || {});
  mainEl.scrollTo?.(0, 0);
  window.scrollTo(0, 0);
}

registerRoute('/dashboard', () => mount('dashboard', dashboardView.render));
registerRoute('/programme', () => mount('programme', programmeView.render));
registerRoute('/module/:moduleId', (params) => mount('module', moduleView.render, params));
registerRoute('/lesson/:moduleId/:lessonId', (params) => mount('lesson', lessonView.render, params));
registerRoute('/quiz/:moduleId', (params) => mount('quiz', quizView.render, params));
registerRoute('/completion', () => mount('completion', completionView.render));
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

startRouter();
