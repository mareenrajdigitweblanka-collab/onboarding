// programmes/registry.js — the programme-loading boundary.
//
// The shared TOSP application (engine, services, views, components) is
// programme-agnostic: it operates on whichever programme is *active*. This
// registry owns the list of available programmes and the single selection of
// which one is active, persisted in its own localStorage key that is separate
// from every programme's progress key and from the theme key.
//
// Switching programmes is a full page reload (setActiveProgramme below): the
// engine reads the active programme's content/config/storage key once at
// module-load through data.js and config.js, so a reload is the clean way to
// swap the whole application over to the other programme.

import { phTeamProgramme } from './ph-team-programme.js';
import { amazonTeamProgramme } from './amazon-team-programme.js';
import { ebayTeamProgramme } from './ebay-team-programme.js';
import { digitalMarketingTeamProgramme } from './digital-marketing-team-programme.js';
import { purchasingTeamProgramme } from './purchasing-team-programme.js';
import { centralizedPpcTeamProgramme } from './centralized-ppc-team-programme.js';

// Order here is the order programmes appear in the switcher.
export const PROGRAMMES = [phTeamProgramme, amazonTeamProgramme, ebayTeamProgramme, digitalMarketingTeamProgramme, purchasingTeamProgramme, centralizedPpcTeamProgramme];

// PROTOTYPE_ONLY — its own key, never touched by any programme's progress
// reset (which only clears that programme's own storage key) or by the theme.
const ACTIVE_PROGRAMME_KEY = 'tosp.active-programme.v1';

// If no valid selection is stored, the PH programme remains the default so the
// existing experience is unchanged for anyone who has used the app before.
const DEFAULT_PROGRAMME_ID = phTeamProgramme.id;

export function getActiveProgrammeId() {
  let stored;
  try {
    stored = window.localStorage.getItem(ACTIVE_PROGRAMME_KEY);
  } catch (err) {
    return DEFAULT_PROGRAMME_ID;
  }
  if (stored && PROGRAMMES.some((p) => p.id === stored)) return stored;
  return DEFAULT_PROGRAMME_ID;
}

export function getActiveProgramme() {
  const id = getActiveProgrammeId();
  return PROGRAMMES.find((p) => p.id === id) || phTeamProgramme;
}

/** The active programme's content bundle (what data.js re-exports). */
export function getActiveContent() {
  return getActiveProgramme().content;
}

/**
 * Selects a programme and reloads so the whole application re-reads that
 * programme's content, config, and storage key. No-op if already active or
 * the id is unknown. Writing the selection never touches any progress key, so
 * switching programmes never disturbs stored progress for either programme.
 */
export function setActiveProgramme(id) {
  if (!PROGRAMMES.some((p) => p.id === id)) return false;
  if (id === getActiveProgrammeId()) return false;
  try {
    window.localStorage.setItem(ACTIVE_PROGRAMME_KEY, id);
  } catch (err) {
    return false;
  }
  window.location.reload();
  return true;
}

/**
 * Which optional learner-facing features a programme exposes, derived
 * generically from its descriptor (feature flags + content shape) rather
 * than any hardcoded programme id. Shared by the programme-selection cards
 * and the dashboard's feature summary so both stay in sync automatically as
 * programmes are added or their config changes.
 */
export function programmeFeatureSummary(programme) {
  return {
    tamil: !!programme.features.enableTamilTranslation,
    signoff: programme.content.MODULES.some((m) => m.requiresSignoff),
    practicalTask: !!programme.ui.practicalTask,
  };
}

/** First sentence (or a length-capped lead-in) of a programme's description, for compact card copy. Falls back to a truncated string if no sentence break is found within the cap. */
export function programmeShortPurpose(programme, maxLen = 170) {
  const text = programme.description || '';
  const periodIndex = text.indexOf('. ');
  if (periodIndex !== -1 && periodIndex <= maxLen) {
    return text.slice(0, periodIndex + 1);
  }
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : maxLen)}…`;
}
