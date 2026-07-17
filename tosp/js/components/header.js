// components/header.js — the persistent application shell: desktop sidebar
// + mobile top app bar/slide-in menu, navigation, learner label, theme
// toggle, and the Reset Demo Progress action. Rendered into #app-shell-nav
// on every navigation; #app-main is a separate sibling element and is never
// touched here, so the cached reference to it in app.js never goes stale.

import { PROJECT, DEMO_LEARNER, CONFIG } from '../config.js';
import { MODULES } from '../data.js';
import { getOverallProgress, getCurrentModule, programmeIsComplete, resetAllProgress } from '../services/progress-service.js';
import { progressBar } from './progress-bar.js';
import { renderThemeToggle, wireThemeToggle } from './theme-toggle.js';
import { confirmDialog } from './confirm-dialog.js';
import { showToast } from './toast.js';
import { navigate } from '../router.js';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: '⌂', route: '/dashboard' },
  { key: 'programme-evaluation', label: '7-Day Evaluation', icon: '①', route: '/programme/evaluation' },
  { key: 'programme-ph', label: 'PH Competency Path', icon: '➤', route: '/programme/ph' },
  { key: 'current-module', label: 'Current Module', icon: '▶', route: null }, // resolved dynamically
  { key: 'sources', label: 'Programme Sources', icon: '☰', route: '/sources' },
  { key: 'translation-review', label: 'Translation Review', icon: 'அ', route: '/translation-review' },
];

function currentModuleRoute() {
  const next = getCurrentModule();
  if (next) return `/module/${next.id}`;
  return programmeIsComplete() ? '/completion' : '/dashboard';
}

export function renderHeader(activeRoute) {
  const { overallPct, completedModuleCount, totalModules } = getOverallProgress();
  const curModRoute = currentModuleRoute();

  const navHtml = (variant) => NAV_ITEMS.map((item) => {
    const route = item.route || curModRoute;
    const isActive = activeRoute === item.key;
    return `
      <button
        type="button"
        class="nav-link ${isActive ? 'nav-link--active' : ''}"
        data-nav="${route}"
        data-shell-nav-item
        aria-current="${isActive ? 'page' : 'false'}"
      >
        <span class="nav-link__icon" aria-hidden="true">${item.icon}</span>
        <span class="nav-link__label">${item.label}</span>
      </button>
    `;
  }).join('');

  return `
    <header class="app-topbar">
      <button type="button" id="mobile-menu-btn" class="app-topbar__menu-btn" aria-expanded="false" aria-controls="app-sidebar" aria-label="Open navigation menu">
        <span aria-hidden="true">☰</span>
      </button>
      <div class="app-topbar__brand">
        <span class="brand-mark" aria-hidden="true">TP</span>
        <span class="app-topbar__title">${PROJECT.code}</span>
      </div>
      <div class="app-topbar__actions">
        ${renderThemeToggle('theme-toggle-mobile')}
      </div>
    </header>

    <div class="app-shell__overlay" id="app-shell-overlay" hidden></div>

    <nav class="app-sidebar" id="app-sidebar" aria-label="Primary">
      <div class="app-sidebar__brand">
        <span class="brand-mark" aria-hidden="true">TP</span>
        <div class="app-sidebar__brand-text">
          <span class="app-sidebar__project">${PROJECT.name}</span>
          <span class="app-sidebar__code">${PROJECT.code}</span>
        </div>
        <button type="button" id="sidebar-close-btn" class="app-sidebar__close-btn" aria-label="Close navigation menu">✕</button>
      </div>

      <div class="app-sidebar__section">
        ${navHtml('sidebar')}
      </div>

      <div class="app-sidebar__section app-sidebar__section--danger">
        <button type="button" class="nav-link nav-link--danger" id="sidebar-reset-btn" ${CONFIG.allowResetDemoProgress ? '' : 'disabled'}>
          <span class="nav-link__icon" aria-hidden="true">↺</span>
          <span class="nav-link__label">Reset Demo Progress</span>
        </button>
      </div>

      <div class="app-sidebar__progress">
        ${progressBar(overallPct, `Overall progress — ${completedModuleCount}/${totalModules} modules`)}
      </div>

      <div class="app-sidebar__footer">
        <div class="app-sidebar__learner">
          <span class="app-sidebar__learner-name">${DEMO_LEARNER.displayName}</span>
          <span class="badge badge--demo">${DEMO_LEARNER.status}</span>
        </div>
        <span class="badge badge--demo app-sidebar__prototype-badge" title="This is a frontend-only prototype">PROTOTYPE_ONLY</span>
        ${renderThemeToggle('theme-toggle-desktop')}
      </div>
    </nav>
  `;
}

/** Wires the shell markup rendered above. Call once per render. */
export function wireHeader(shellRoot) {
  const unsubscribers = [];

  unsubscribers.push(wireThemeToggle(shellRoot, 'theme-toggle-mobile'));
  unsubscribers.push(wireThemeToggle(shellRoot, 'theme-toggle-desktop'));

  const sidebar = shellRoot.querySelector('#app-sidebar');
  const overlay = shellRoot.querySelector('#app-shell-overlay');
  const menuBtn = shellRoot.querySelector('#mobile-menu-btn');
  const closeBtn = shellRoot.querySelector('#sidebar-close-btn');

  function openMenu() {
    sidebar.classList.add('is-open');
    overlay.hidden = false;
    menuBtn.setAttribute('aria-expanded', 'true');
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }
  function closeMenu({ returnFocus = true } = {}) {
    sidebar.classList.remove('is-open');
    overlay.hidden = true;
    menuBtn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
    if (returnFocus) menuBtn.focus();
  }
  function onKeydown(event) {
    if (event.key === 'Escape') closeMenu();
  }

  menuBtn.addEventListener('click', () => {
    if (sidebar.classList.contains('is-open')) closeMenu();
    else openMenu();
  });
  closeBtn.addEventListener('click', () => closeMenu());
  overlay.addEventListener('click', () => closeMenu({ returnFocus: false }));

  // Close the mobile menu automatically whenever a nav item is used.
  shellRoot.querySelectorAll('[data-shell-nav-item]').forEach((btn) => {
    btn.addEventListener('click', () => closeMenu({ returnFocus: false }));
  });

  const resetBtn = shellRoot.querySelector('#sidebar-reset-btn');
  resetBtn?.addEventListener('click', async () => {
    closeMenu({ returnFocus: false });
    const confirmed = await confirmDialog({
      title: 'Reset demo progress?',
      message: 'This clears completed lessons, quiz attempts, sign-offs, and unlocked modules stored in this browser. This cannot be undone.',
      confirmLabel: 'Reset progress',
      cancelLabel: 'Cancel',
      danger: true,
    });
    if (!confirmed) return;
    resetAllProgress();
    showToast('Demo progress has been reset.', { type: 'success' });
    navigate('/dashboard'); // Handles both "already on dashboard" (sync rerender) and other pages (async hashchange).
  });

  return () => unsubscribers.forEach((fn) => fn && fn());
}
