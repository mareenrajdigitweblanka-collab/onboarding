// services/theme-service.js — light/dark theme resolution and persistence.
// Storage key is deliberately separate from learner-progress storage
// (storage.js / STORAGE_KEY) so a theme change can never touch progress data.

const THEME_STORAGE_KEY = 'tosp.ui.theme.v1';
const listeners = new Set();

function readStoredTheme() {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch (err) {
    return null;
  }
}

function writeStoredTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    // Ignore — theme just won't persist this session.
  }
}

function systemTheme() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

/** Selection order: saved user preference -> OS preference -> light fallback. */
export function resolveInitialTheme() {
  return readStoredTheme() || systemTheme();
}

export function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') || resolveInitialTheme();
}

export function hasExplicitPreference() {
  return readStoredTheme() !== null;
}

function notify(theme) {
  listeners.forEach((fn) => fn(theme));
}

export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  notify(theme);
}

export function setTheme(theme) {
  writeStoredTheme(theme);
  applyTheme(theme);
}

export function toggleTheme() {
  const next = getCurrentTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

/** Subscribe to theme changes (toggle button state, etc.). Returns an unsubscribe fn. */
export function onThemeChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Removes every subscriber. Called once per shell render so a discarded
 * theme-toggle button (replaced by innerHTML re-render) can never leak a
 * stale subscription — mirrors speech-service's clearSpeechListeners. */
export function clearThemeListeners() {
  listeners.clear();
}

/**
 * Applies the resolved theme (idempotent with the inline head script in
 * index.html, which already set data-theme before first paint) and starts
 * following the OS theme live for as long as the learner has not explicitly
 * chosen one.
 */
export function initTheme() {
  applyTheme(getCurrentTheme());

  if (window.matchMedia) {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onSystemChange = () => {
      if (!hasExplicitPreference()) {
        applyTheme(systemTheme());
      }
    };
    media.addEventListener?.('change', onSystemChange);
  }
}
