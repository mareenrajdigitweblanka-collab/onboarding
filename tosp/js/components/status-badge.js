// components/status-badge.js — small reusable status pill.

const LABELS = {
  locked: 'Locked',
  available: 'Available',
  'in-progress': 'In Progress',
  'awaiting-signoff': 'Awaiting Sign-off',
  passed: 'Passed',
  failed: 'Failed',
  complete: 'Complete',
  demo: 'DEMO_DATA',
};

/** Returns an HTML string for a status badge. `status` must be a known key. */
export function statusBadge(status) {
  const label = LABELS[status] || status;
  return `<span class="badge badge--${status}">${label}</span>`;
}
