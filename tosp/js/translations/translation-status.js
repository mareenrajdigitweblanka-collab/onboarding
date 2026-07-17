// translations/translation-status.js — the statuses a piece of Tamil
// content can carry under the STATIC local-translation flow. Nothing
// outside this module should hardcode these strings.
//
// There is no runtime automatic-translation status here: curriculum Tamil
// content is either a stored local translation (APPROVED_LOCAL) or it
// doesn't exist yet (TRANSLATION_UNAVAILABLE) — see
// docs/tamil-static-translation-map.md.

export const TRANSLATION_STATUS = Object.freeze({
  // A translation authored and stored in translations/tamil-approved.js.
  // Displayed immediately on request — a plain synchronous lookup, no
  // network request, no loading state.
  APPROVED_LOCAL: 'APPROVED_LOCAL',
  // No stored translation exists for this contentId. English stays shown;
  // a concise message is offered instead of Tamil.
  TRANSLATION_UNAVAILABLE: 'TRANSLATION_UNAVAILABLE',
});

// Concise message shown when no local translation exists for a contentId.
// Bilingual so it's understandable regardless of the learner's reading
// language at that moment.
export const TRANSLATION_UNAVAILABLE_MESSAGE = Object.freeze({
  ta: 'இந்த உள்ளடக்கத்திற்கு தமிழ் மொழிபெயர்ப்பு கிடைக்கவில்லை.',
  en: 'Tamil translation is not available for this content.',
});
