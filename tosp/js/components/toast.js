// components/toast.js — non-blocking success/error/info notifications.
// Replaces window.alert() for passive feedback. Uses a single live region
// so screen readers announce new toasts without moving focus.

const REGION_ID = 'toast-region';
const MAX_VISIBLE_TOASTS = 4;

function getRegion() {
  let region = document.getElementById(REGION_ID);
  if (!region) {
    region = document.createElement('div');
    region.id = REGION_ID;
    region.className = 'toast-region';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'false');
    document.body.appendChild(region);
  }
  return region;
}

/**
 * Shows a dismissible toast. type: 'success' | 'error' | 'warning' | 'info'.
 * Returns a function that removes the toast immediately (also called
 * automatically after `duration` ms unless duration is 0).
 */
export function showToast(message, options = {}) {
  const { type = 'info', duration = 5000 } = options;
  const region = getRegion();

  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.setAttribute('role', type === 'error' ? 'alert' : 'status');

  const text = document.createElement('span');
  text.className = 'toast__message';
  text.textContent = message;

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'toast__close';
  closeBtn.setAttribute('aria-label', 'Dismiss notification');
  closeBtn.textContent = '×';

  toast.appendChild(text);
  toast.appendChild(closeBtn);
  region.appendChild(toast);

  // Cap how many toasts can pile up at once (e.g. several lessons marked
  // complete in quick succession) — drop the oldest rather than let the
  // stack grow without bound.
  const existing = region.querySelectorAll('.toast');
  if (existing.length > MAX_VISIBLE_TOASTS) {
    existing[0].remove();
  }

  let timeoutId;
  function remove() {
    clearTimeout(timeoutId);
    toast.classList.add('toast--leaving');
    setTimeout(() => toast.remove(), 200);
  }

  closeBtn.addEventListener('click', remove);
  if (duration > 0) {
    timeoutId = setTimeout(remove, duration);
  }

  return remove;
}
