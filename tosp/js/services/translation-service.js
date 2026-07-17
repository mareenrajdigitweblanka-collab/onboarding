// services/translation-service.js — the single entry point views/components
// use for all Tamil translation concerns: content IDs and resolving which
// Tamil text (if any) to show for a piece of curriculum content. Mirrors
// quiz-service.js's role: views never talk to translations/*.js directly.
//
// STATIC LOCAL TRANSLATION ONLY. Resolution order for any piece of content:
//   1. stored local Tamil translation (translations/tamil-approved.js)
//   2. English source fallback (the caller already has the English text —
//      this service never invents or substitutes it)
// This is a synchronous, in-memory lookup — no network request, no
// loading state, no automatic-translation provider is called during
// normal application use. See docs/tamil-static-translation-map.md.
//
// The prior Google Cloud Translation proxy integration
// (services/translation-provider.js, api/translate.js) is RETAINED in the
// repository but is not imported or called anywhere in this file or its
// callers — see that doc's "Google runtime usage status" section.

import { TAMIL_APPROVED_TRANSLATIONS } from '../translations/tamil-approved.js';
import { TRANSLATION_STATUS } from '../translations/translation-status.js';

// ---------------------------------------------------------------------------
// Stable content identifiers — built from IDs that already exist and never
// change (module.id, lesson.id, quiz.id, question.id, option.id), never
// from array position or visible wording, so a translation stays correctly
// linked even if the English text is later edited for clarity.
// ---------------------------------------------------------------------------

export function moduleTitleContentId(moduleId) {
  return `module.title.${moduleId}`;
}

export function moduleSummaryContentId(moduleId) {
  return `module.summary.${moduleId}`;
}

export function moduleRealWorldPaceContentId(moduleId) {
  return `module.realWorldPace.${moduleId}`;
}

// The sign-off panel's explanatory paragraph is identical, static text
// across every module that requires sign-off — one shared record rather
// than duplicating the same translation 11 times.
export function moduleSignoffExplanationContentId() {
  return 'module.signoffExplanation';
}

export function lessonTitleContentId(lessonId) {
  return `lesson.title.${lessonId}`;
}

export function lessonParagraphContentId(lessonId) {
  return `lesson.paragraph.${lessonId}`;
}

export function quizTitleContentId(quizId) {
  return `quiz.title.${quizId}`;
}

// The "This Skill Check has N questions..." sentence is the same template
// (only the question count varies) across every quiz — one shared record,
// with {count} substituted at render time by the caller.
export function quizInstructionsTemplateContentId() {
  return 'quiz.instructions.template';
}

export function quizQuestionContentId(questionId) {
  return `quiz.question.${questionId}`;
}

export function quizOptionContentId(questionId, optionId) {
  return `quiz.option.${questionId}.${optionId}`;
}

// ---------------------------------------------------------------------------
// Static local lookup — synchronous, in-memory. Safe to call on every
// render; never throws.
// ---------------------------------------------------------------------------

/**
 * Returns the stored local translation record for a contentId, or null.
 * If `sourceText` is supplied and doesn't match the record's stored
 * englishText, the record is treated as stale/missing rather than shown —
 * this catches curriculum text (data.js) drifting out of sync with a
 * translation authored against older wording, rather than silently
 * showing a translation of the wrong sentence.
 */
export function getStaticTranslation(contentId, sourceText) {
  const record = TAMIL_APPROVED_TRANSLATIONS[contentId];
  if (!record) return null;
  if (typeof sourceText === 'string' && record.englishText !== sourceText) {
    return null;
  }
  return record;
}

export function getTranslationStatus(contentId, sourceText) {
  return getStaticTranslation(contentId, sourceText)
    ? TRANSLATION_STATUS.APPROVED_LOCAL
    : TRANSLATION_STATUS.TRANSLATION_UNAVAILABLE;
}

// ---------------------------------------------------------------------------
// DEPRECATED — tosp.ui.language.v1
// ---------------------------------------------------------------------------
// The global English/Tamil sidebar preference has been removed (paragraph-
// level Translate/Show English controls make a page-wide preference
// unnecessary — see docs/tamil-static-translation-map.md). This service no
// longer reads or writes tosp.ui.language.v1 in any way: any value a
// learner's browser already has stored under that key is left untouched
// (never read, never migrated, never deleted) and is simply inert.
