# Tamil Translation Review / Curation Workflow

Status: **PARTIALLY DORMANT.** The "flag an automatic translation as a
candidate" workflow described below applied to the earlier Google Cloud
Translation iteration of this feature and is
`NOT_USED_BY_CURRENT_STATIC_TRANSLATION_FLOW` — see
[tamil-static-translation-map.md](tamil-static-translation-map.md). It is
retained (not deleted) below for reference, followed by the workflow that
actually matters now: **how a new or updated static translation gets added.**

## How a static translation actually gets added or updated today

All 451 current curriculum content records already have a stored Tamil
translation in `js/translations/tamil-approved.js`, authored directly
against the exact English text in `js/data.js` (verified programmatically
— see [validation/tamil-static-translation-check.md](../validation/tamil-static-translation-check.md)).
When curriculum content changes or new content is added, the workflow is:

1. Identify the stable `contentId` for the new/changed content, using the
   patterns in [tamil-static-translation-map.md](tamil-static-translation-map.md#content-id-format)
   (e.g. a new lesson `m19-l1` gets `lesson.paragraph.m19-l1`).
2. Add or update the entry in `js/translations/tamil-approved.js`:

   ```js
   'lesson.paragraph.m19-l1': {
     englishText: '<the exact English text from data.js>',
     tamilText: '<a faithful Tamil translation>',
     status: 'APPROVED_LOCAL',
     sourceReference: '<citation, mirrors the data.js `source` field>',
   },
   ```

   `englishText` must match the corresponding `data.js` field **exactly**
   — `services/translation-service.js`'s `getStaticTranslation()` compares
   them and falls back to `TRANSLATION_UNAVAILABLE` (not a stale
   translation) on any mismatch, so a copy-paste error here just means the
   entry silently stops being used rather than showing wrong Tamil text.
3. Commit the change like any other code change (this workflow does not
   commit or push on its own).
4. No other code change is required — `translation-control.js` picks up
   the new entry the next time that block's "Translate to Tamil" is
   clicked.

If `data.js`'s English text for a `contentId` changes, the existing
`tamil-approved.js` entry becomes stale by design (the `englishText`
comparison fails) and must be re-translated and updated the same way.

## The user is the approver

The user remains the final approver of Tamil content added to
`tamil-approved.js` in this repository, consistent with prior guidance —
this file is only ever changed through a controlled code change, never by
browser interaction.

---

## (Dormant) Automatic-translation curation workflow

This section describes the Translation Review panel
(`js/views/translation-review-view.js`) as it behaved when
`translation-service.js` still called the Google Cloud Translation proxy
at runtime. It no longer applies to normal use — see the status note at
the top of this document.

Automatic (Google Cloud Translation) Tamil output used to display to
learners immediately, with no review or approval step blocking it. The
Translation Review panel let a maintainer look at what Google had
generated in a browser session (cached under
`tosp.translation.cache.ta.v1`), copy it, and "flag" it
(`tosp.translation.prototypeApprovals.v1`) as a candidate worth curating
into a static `tamil-approved.js` entry — a personal/local to-do marker
only, with no effect on what learners saw and no write to
`tamil-approved.js`.

Since nothing currently populates `tosp.translation.cache.ta.v1` (the
proxy is not called), this panel will normally show zero entries. It
remains reachable from the sidebar as a diagnostic tool in case the
automatic-translation path is reconnected later — see
[tamil-translation-architecture.md](tamil-translation-architecture.md).

### Audit requirements for a future backend

This prototype has no audit trail beyond git history on
`tamil-approved.js` (who committed which translation, when). A production
implementation should record, durably and server-side, who authored/
approved each translation, when, and against what English text — the same
evidentiary bar the rest of TOSP's `PRODUCTION_BLOCKER` notes already hold
client-side data to.
