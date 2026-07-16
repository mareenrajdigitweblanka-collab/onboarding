// components/theme-toggle.js — accessible light/dark toggle button.
// Label and aria-label always describe the action (what pressing it does),
// never just an unexplained icon.

import { getCurrentTheme, toggleTheme, onThemeChange } from '../services/theme-service.js';

export function renderThemeToggle(idPrefix = 'theme-toggle') {
  const isDark = getCurrentTheme() === 'dark';
  return `
    <button
      type="button"
      id="${idPrefix}"
      class="theme-toggle"
      aria-pressed="${isDark}"
      aria-label="${isDark ? 'Switch to light theme' : 'Switch to dark theme'}"
      title="Toggle light and dark theme"
    >
      <span class="theme-toggle__icon" aria-hidden="true">${isDark ? '☀' : '☾'}</span>
      <span class="theme-toggle__label">${isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  `;
}

/** Wires the toggle button rendered above. Returns an unsubscribe function. */
export function wireThemeToggle(container, idPrefix = 'theme-toggle') {
  const btn = container.querySelector(`#${idPrefix}`);
  if (!btn) return () => {};

  function updateButton(theme) {
    const isDark = theme === 'dark';
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    btn.querySelector('.theme-toggle__icon').textContent = isDark ? '☀' : '☾';
    btn.querySelector('.theme-toggle__label').textContent = isDark ? 'Light mode' : 'Dark mode';
  }

  btn.addEventListener('click', () => toggleTheme());
  return onThemeChange(updateButton);
}
