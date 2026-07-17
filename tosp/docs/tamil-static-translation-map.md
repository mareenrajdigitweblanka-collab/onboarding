# Tamil Static Translation Map

Status: PROTOTYPE_ONLY. Supersedes the runtime Google Cloud Translation
flow described in the (now largely dormant) `tamil-translation-architecture.md`
and `google-translation-setup.md` for **curriculum content**. Read this
document first for how Tamil actually works in TOSP today.

## Purpose

Every piece of learner-facing curriculum text — module titles/summaries,
lesson titles/paragraphs, quiz titles/instructions/questions/answer
options — has a Tamil translation authored and stored directly in this
repository. Clicking "Translate to Tamil" is a synchronous, in-memory
lookup: no network request, no provider, no loading spinner, no approval
gate. If a stored translation doesn't exist for some content, English
stays shown with a concise unavailable message.

## English source-truth rule

`js/data.js` remains the sole authoritative English source and was **not
edited** by this work. Nothing in the Tamil layer rewrites, paraphrases,
shortens, or reinterprets the English business meaning — each Tamil entry
is a faithful translation of the exact English sentence it's paired with,
verified programmatically (see Validation below) to match `data.js`
byte-for-byte.

## Translation file

`js/translations/tamil-approved.js` — the single canonical file. An object
keyed by `contentId` (not an array), each value:

```js
{
  englishText: string,        // exact English source text
  tamilText: string,          // the Tamil translation
  status: 'APPROVED_LOCAL',
  sourceReference: string,    // citation, mirrors data.js `source`
}
```

No view or component duplicates any Tamil string — `services/translation-service.js`
is the only reader of this file.

## Content-ID format

Built only from IDs that already exist and never change (`module.id`,
`lesson.id`, `quiz.id`, `question.id`, `option.id`) — never from array
position or wording:

| Content | contentId pattern | Example |
| --- | --- | --- |
| Module title | `module.title.<moduleId>` | `module.title.m1` |
| Module summary | `module.summary.<moduleId>` | `module.summary.m1` |
| Module real-world pace | `module.realWorldPace.<moduleId>` | `module.realWorldPace.m1` |
| Sign-off explanation (shared, identical text on every sign-off module) | `module.signoffExplanation` | — |
| Lesson title | `lesson.title.<lessonId>` | `lesson.title.m1-l1` |
| Lesson paragraph | `lesson.paragraph.<lessonId>` | `lesson.paragraph.m1-l1` |
| Quiz title | `quiz.title.<quizId>` | `quiz.title.m1-quiz` |
| Quiz instructions (shared template, `{count}` substituted at render time) | `quiz.instructions.template` | — |
| Quiz question prompt | `quiz.question.<questionId>` | `quiz.question.m1-quiz-q1` |
| Quiz answer option | `quiz.option.<questionId>.<optionId>` | `quiz.option.m1-quiz-q1.b` |

## Translated content counts

Verified programmatically against `data.js` (see Validation doc):

| Category | Count |
| --- | --- |
| Module titles | 18 / 18 |
| Module summaries | 18 / 18 |
| Module real-world pace | 18 / 18 |
| Sign-off explanation (shared) | 1 / 1 |
| Lesson titles | 41 / 41 |
| Lesson paragraphs | 41 / 41 |
| Quiz titles | 18 / 18 |
| Quiz instructions template (shared) | 1 / 1 |
| Quiz questions | 59 / 59 |
| Quiz answer options | 236 / 236 |
| **Total** | **451 / 451** |

**Untranslated content count: 0.** Every content ID currently rendered by
`module-view.js`, `lesson-view.js`, and `quiz-view.js` resolves to a stored
Tamil translation.

## Technical-term handling

Company/product/platform names (Digitweb Lanka, Claude, Amazon, eBay,
Shopify, B&Q, Seller Central), internal abbreviations (BGCT, ASIN, SKU,
CTR, CVR, ACOS, TACOS, PPC, FBA, FBM), tool names (Helium 10, Terapeak,
Google Trends, Jungle Scout), and named individuals (Mithusa) are
preserved in their original form within Tamil sentences — never
transliterated or translated. Where a BGCT-specific or sales term benefits
from a Tamil gloss, the pattern used throughout is
`தமிழ் விளக்கம் (English Term)` — e.g. `சிறந்த நடைமுறை (Best Practice)`,
`கிளிக் விகிதம் (CTR)` — so the English term stays recognisable, per the
CTR example in the requirements. Numeric thresholds, dates, times, and
formulas (e.g. `Clicks ÷ Impressions`) are preserved exactly.

## Quiz-ID preservation

Translation only ever swaps the **visible label text**. `question.id`,
`quiz.id`, `option.id`, the `<input name/value>` attributes the quiz form
and `rules/scoring.js` rely on, `correctOptionId`, and `points` are never
touched — verified live: option `value` attributes for a question were
identical before and after translating it, and answering by option ID
after translation scored identically to the English-only baseline (100%,
3/3).

## Global language button removal

The sidebar English/Tamil toggle (`components/language-toggle.js`) has
been **deleted**. `components/header.js` no longer imports, renders, or
wires it. Paragraph-level Translate to Tamil / Show English controls
remain on every module/lesson/quiz content block — removing the global
control does not force or imply a page-wide language mode.

## Deprecated storage key

`tosp.ui.language.v1` is **deprecated**. `services/translation-service.js`
no longer reads, writes, or migrates this key in any way. If a learner's
browser already has a value stored under it (from a prior version of this
app), it is left untouched — never read, never deleted — and is simply
inert. `tosp.prototype.v2` (progress) and `tosp.ui.theme.v1` (theme) are
unaffected by any part of this change.

## Tamil speech behaviour

Unchanged from the existing `speech-service.js`: `getTamilVoice()` prefers
an exact `ta-LK` match, then `ta-IN`, then any voice whose `lang` starts
with `ta`, and returns `null` (never throws) if none is installed;
`speakTamil()` reuses `speakText()`/`stopSpeech()`. The "Read Tamil" button
in `translation-control.js` only ever speaks the resolved Tamil text for
its own block; the block's English "Read Aloud" control is gated to a
no-op + toast while that block shows Tamil, so hidden English is never
read and correct answers are never spoken before submission (quiz option
speech never carries `correctOptionId`).

## Known limits

- 451 curriculum content records are translated by this work; if `data.js`
  is edited later, the corresponding `tamil-approved.js` entry becomes
  stale (English text no longer matches) and `getStaticTranslation()`
  will correctly fall back to `TRANSLATION_UNAVAILABLE` rather than show a
  translation of outdated wording — but the Tamil text itself will need a
  fresh translation pass to be re-added.
- The Google Cloud Translation proxy (`api/translate.js`,
  `services/translation-provider.js`, `translations/tamil-runtime-cache.js`,
  `translations/prototype-approvals.js`, `views/translation-review-view.js`)
  is **retained but not used** by the current static flow — see
  `docs/google-translation-setup.md`, updated to note this, and
  `NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW` markers in those files'
  own headers. Retained (not deleted) in case automatic translation for
  future/new content is reintroduced later.
- Translated display state (English vs. Tamil per block) is per-render,
  not persisted — reloading or navigating away and back resets a block to
  English, matching the existing English "Read Aloud" state's lifecycle
  and satisfying "no whole-page automatic switching."
- Tamil voice availability depends entirely on the learner's OS/browser;
  none is bundled.
