// translations/prototype-approvals.js — the ONLY module allowed to touch
// the tosp.translation.prototypeApprovals.v1 localStorage key.
//
// Automatic (Google) Tamil translations already display to learners
// immediately with no approval gate — this file has nothing to do with
// that. It exists only so the Translation Review panel can flag a
// browser-generated automatic translation as a good candidate for
// promotion to a curated LOCAL_TRANSLATION. Marking a contentId here never
// edits tamil-approved.js and never changes what any learner sees — see
// docs/tamil-translation-review-workflow.md. Durable promotion only ever
// happens by adding a record to translations/tamil-approved.js through a
// controlled code change and commit.

const PROTOTYPE_APPROVAL_KEY = 'tosp.translation.prototypeApprovals.v1';

function readList() {
  try {
    const raw = window.localStorage.getItem(PROTOTYPE_APPROVAL_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
  } catch (err) {
    return [];
  }
}

function writeList(list) {
  try {
    window.localStorage.setItem(PROTOTYPE_APPROVAL_KEY, JSON.stringify(list));
    return true;
  } catch (err) {
    return false;
  }
}

export function isPrototypeApproved(contentId) {
  return readList().includes(contentId);
}

/** Records a browser-only "prototype approval" flag for one contentId. */
export function markPrototypeApproved(contentId) {
  const list = readList();
  if (!list.includes(contentId)) {
    list.push(contentId);
    writeList(list);
  }
}

export function unmarkPrototypeApproved(contentId) {
  writeList(readList().filter((id) => id !== contentId));
}

export function listPrototypeApprovals() {
  return readList();
}

/** Separate from clearTranslationCache() (translations/tamil-runtime-cache.js)
 * and resetAllProgress() — clears only this browser-only review flag. */
export function clearPrototypeApprovals() {
  try {
    window.localStorage.removeItem(PROTOTYPE_APPROVAL_KEY);
    return true;
  } catch (err) {
    return false;
  }
}
