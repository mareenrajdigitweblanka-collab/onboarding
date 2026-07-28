// data.js — active-programme content dispatcher.
//
// Historically this file WAS the (PH/Sales) programme content. That content
// now lives in programmes/ph-team-content.js, and a second programme (Amazon
// Team) lives under programmes/. This file re-exports whichever programme is
// currently ACTIVE (see programmes/registry.js), so the entire shared engine —
// services, rules, and views — keeps importing `MODULES`, `LESSONS`,
// `QUIZZES`, `QUESTIONS`, etc. from here without knowing which programme is
// loaded. Switching programmes is a page reload; this module is evaluated once
// per load and resolves to the selected programme's content.
//
// SOURCE-OF-TRUTH STATUS is defined per programme in its content files; both
// programmes are status FINAL_TRUTH. Learner progress remains PROTOTYPE_ONLY.

import { getActiveContent } from './programmes/registry.js';

const C = getActiveContent();

export const SOURCE_DOCUMENTS = C.SOURCE_DOCUMENTS;
export const PROGRAMME = C.PROGRAMME;
export const PROGRESSION_RULES = C.PROGRESSION_RULES;
export const EVALUATION_SCORE_BANDS = C.EVALUATION_SCORE_BANDS;
export const EVALUATION_SCORE_BANDS_SOURCE = C.EVALUATION_SCORE_BANDS_SOURCE;
export const PROBATION_SCORE_GATES = C.PROBATION_SCORE_GATES;
export const PROBATION_SCORE_GATES_SOURCE = C.PROBATION_SCORE_GATES_SOURCE;
export const MODULES = C.MODULES;
export const LESSONS = C.LESSONS;
export const QUIZZES = C.QUIZZES;
export const QUESTIONS = C.QUESTIONS;
// Optional, programme-specific: only the Digital Marketing Team programme
// currently defines this (a non-gating final practical task). Undefined for
// every other programme's content bundle — consumers must guard on presence.
export const PRACTICAL_TASK = C.PRACTICAL_TASK;
