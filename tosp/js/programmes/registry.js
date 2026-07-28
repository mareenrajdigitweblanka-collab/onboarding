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

// Order here is the order programmes appear in the switcher.
export const PROGRAMMES = [phTeamProgramme, amazonTeamProgramme];

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
