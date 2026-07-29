// components/status-badge.js — small reusable status pill. Always carries a
// text label and a symbol (never color alone) so status is distinguishable
// without relying on color perception.

const LABELS = {
  locked: { text: 'Locked', icon: '🔒' },
  available: { text: 'Available', icon: '●' },
  ready: { text: 'Ready for Skill Check', icon: '◎' },
  'in-progress': { text: 'In Progress', icon: '◐' },
  'attempts-exhausted': { text: 'Attempts Exhausted', icon: '⚠' },
  'awaiting-signoff': { text: 'Awaiting Sign-off', icon: '◔' },
  passed: { text: 'Passed', icon: '✓' },
  failed: { text: 'Failed', icon: '✗' },
  complete: { text: 'Complete', icon: '✓' },
  demo: { text: 'DEMO_DATA', icon: '' },
};

/** Returns an HTML string for a status badge. `status` must be a known key. */
export function statusBadge(status) {
  const entry = LABELS[status] || { text: status, icon: '' };
  return `<span class="badge badge--${status}">${entry.icon ? `<span aria-hidden="true">${entry.icon}</span> ` : ''}${entry.text}</span>`;
}
