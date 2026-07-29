# US and Canada Market Rebuild Team — Programme Architecture

Internal documentation. Not learner-facing.

## Final programme name

**US and Canada Market Rebuild Team Onboarding** (required title, retained
per explicit instruction). Neither source document defines an alternative
official team name; both describe the operational framework "BGCT" without
naming the team itself beyond "US Marketplace Operations." The programme
`team` field is set to "US and Canada Market Rebuild Team" to match the
requested scope, while every module/lesson states its actual confirmed
applicability as US-only — see "Business purpose" below.

## Business purpose

Discovery found that neither source document uses the word "rebuild" or
contains any Canada-specific content (confirmed by full-text search — see
`us-canada-market-rebuild-team-source-map.md`). The two source documents
instead describe **BGCT** ("Best Guidance Criteria Tutorial" per one
document; restructured as "Best Practice, Guidance, Checklist, Tutorial" per
the other) — a documented operational Best Practice standard for **existing**
US marketplace accounts on Amazon, eBay, and Wayfair, covering warehouse
operations, listing accuracy, refund/replacement control, shipment
processing SLA, account-health KPIs, pricing/profitability oversight, and
escalation/governance.

**"Market Rebuild" is the approved project requirement label only.** The
source documents describe US marketplace operational standardisation (the
BGCT standard: warehouse, listing, refund, shipment, account-health, and
escalation/governance practice) and do not define a formal market-rebuild
methodology — no market-entry analysis, market selection, catalogue
rebuild, pricing rebuild, or launch/relaunch process is described anywhere.
This programme's business purpose, as actually supported by source, is
therefore: **teach a new staff member how to operate US marketplace accounts
to the BGCT Best Practice standard** — corrected, warehouse-error/listing-
inaccuracy/refund-control/shipment-SLA practice, per the four root-cause
failure categories the standard's own adoption rationale names (warehouse
errors, listing inaccuracies, uncontrolled refund/duplicate-compensation,
and late single-slot shipment processing). This programme applies that
guidance; it does not claim the sources define, or itself invent, a
market-entry, listing-rebuild, market-expansion, or advertising-rebuild
curriculum. This internal explanation is documentation-only and is not
repeated to learners on every screen — see "US-only prototype scope notice"
below for what learners actually see.

### US-only prototype scope notice

Added 2026-07-29 during a source-accuracy reconciliation pass. The exact
notice — **"CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY.
Canada-market training is not included because no approved Canada source
material was available."** — is shown to learners in five places: the
programme-selection card (as the card's short description, via
`programmeShortPurpose`, since it is the first sentence of
`PROGRAMME.description`), the dashboard (full `PROGRAMME.description`), the
programme/journey introduction (same field, via `programme-view.js`), the
practical-task introduction (`PRACTICAL_TASK.intro`), and the completion
screen (`ui.scopeNote`, a new guarded field — see "Whole-app integration"
below).

## Exact module count and order

Six modules, source-clustered (not one module per source file — both source
files feed every module):

1. BGCT Foundation, Scope and Account Holder Accountability
2. Account Health, Governance and Pricing Oversight
3. Warehouse Operations — Picking and Packing
4. Listing Accuracy Readiness
5. Refund, Replacement and Return Inspection
6. Shipment Processing, Escalation and Weekly Governance

Linear prerequisite chain (M1 → M2 → M3 → M4 → M5 → M6), matching the
source's own logical order: understand the standard and its scope first,
then account-level governance, then the four operational areas the standard
corrects, closing with the shipment-SLA correction and the weekly-governance
loop that ties every KPI back to an owner and a deadline.

## Lesson count

24 lessons total — exactly 4 per module (a TOSP presentation decision, not a
source-defined structure; stated explicitly in the header of
`us-canada-market-rebuild-team-modules.js`).

## Quiz / question count

6 Skill Checks (one per module), 6 questions each, **36 questions total**.

## Source-authoring method

Every module, lesson, and question cites an exact section of one or both
source documents (see `us-canada-market-rebuild-team-source-map.md` for the
full module-to-section mapping). Where the two source documents disagree
(Walmart platform scope; Late Shipment Rate 2%-vs-4% wording), the conflict
is stated in-lesson and in the exclusions register — never silently resolved
by picking, averaging, or guessing a value, except where verified in-source
consistency (three of four Late Shipment Rate table instances state 2%)
provided an unambiguous basis to state 2% as operative while still
disclosing the one 4% outlier.

## US/Canada separation

**No separation exists to represent**, because no Canada-specific content
exists in source. Every lesson and question states "Applicability: US only
(confirmed source scope)" explicitly in its own text — this is the
determinable answer the sources actually give, not an unresolved gap. This
programme therefore uses a **single shared US-only track** (Option-A-style,
per the task's own clustering framework) rather than a shared/US/Canada
three-way split, because building a US-vs-Canada split would require
inventing the Canada side.

## Quiz settings (explicit TOSP prototype configuration)

- Passing score: 80%
- Maximum attempts: 3
- All lessons in a module required before its Skill Check unlocks
- A failed Skill Check (after exhausting attempts) keeps the next module
  locked
- A passed Skill Check unlocks the next module
- Correct answer never shown before submission (shared, unmodified quiz
  engine)

These figures are **not** source-derived — the source states no quiz, pass
score, attempt, or completion rule of its own (confirmed during discovery).
They reuse the exact existing TOSP prototype configuration already used by
every other programme in this repository.

## No-sign-off rule

`requiresSignoff: false` on every module; `requiresReviewerSignoff: false`
programme-wide. No module in this programme ever requires learner sign-off
or reviewer sign-off. This is an explicit TOSP prototype configuration
decision (the source states no sign-off rule of its own).

## English-only rule

`enableTamilTranslation: false`. No Tamil UI and no translation calls appear
anywhere in this programme; the shared, unmodified English Read Aloud
speaker-control component remains available. The source states no
language/localisation requirement of its own (and, as Canada is out of
scope, no Canadian French requirement is inferred either).

## Practical-task boundary

One fictional, non-live, non-gating practical task:
`us-canada-market-rebuild-final-practical-v1` — "Final Practical Task —
Fictional BGCT Operational Rebuild Readiness Pack." Modelled directly on the
source's own Section C "Checklist — Binary Control Gate" and "Final
Compliance Gate" (the closest thing either source document has to a
rebuild-readiness pack). 11 items across 6 sections: scope confirmation
(including a Canada-boundary-recognition exercise), KPI validation, listing
gap identification, a pricing-input check, inventory/fulfilment and refund
readiness, and unresolved-conflict/approval/handover recording. Uses only
fictional data (a fictional SKU, `DW-CHR-BLU-M`, invented for this task and
not present in either source document). Displayed and completable but never
gates completion, never numerically scored, and never requires sign-off —
its checked-item state is transient, in-memory UI state local to
`views/practical-task-view.js`, exactly matching the mechanism already used
by Digital Marketing, Purchasing, Centralized PPC, and Customer Service.

## Completion rule

Completion requires all 24 required lessons complete and all 6 Skill Checks
passed (`rules/module-access.js`, unchanged, shared, generic across every
programme). The practical task never blocks completion. Completing this
programme does not grant certification, marketplace authorisation, financial
approval authority, or any live listing/refund/pricing/shipment authority —
carried by the shared, unmodified `CERTIFICATION_DISCLAIMER` in
`views/completion-view.js` plus this programme's own PROTOTYPE_ONLY notices.

## Storage key

`tosp.us-canada-market-rebuild-team.prototype.v1` — this programme's own
key, distinct from every other programme's key, the theme key
(`tosp.ui.theme.v1`), and the active-programme selector key
(`tosp.active-programme.v1`). Reset clears only this key.

## Whole-app integration

Descriptor-driven. Registered in `tosp/js/programmes/registry.js` (one
import line + one array entry, matching the exact pattern of every other
programme). `rules/`, `services/`, `components/`, `config.js`, `data.js`,
`state.js`, `storage.js`, and `router.js` are all unchanged by this work.

**One shared view file received a small, guarded, additive change on
2026-07-29** during a source-accuracy reconciliation pass:
`views/completion-view.js` now renders one extra, guarded line immediately
under the completion headline — a paragraph showing `ui.scopeNote` only when
the active programme's descriptor defines that field. This follows the exact
same guarded-optional-field pattern already established for `ui.practicalTask`
(rendered only if the active programme's descriptor defines it; `undefined`,
and therefore fully inert with zero rendering change, for all 7 other
programmes, none of which define `ui.scopeNote`). It was added because the
completion screen is otherwise fully generic (title/version/stats/fixed
disclaimer only) with no existing slot for programme-specific free text, and
the explicit requirement that the US-only scope notice be visible on the
completion screen could not be met without it. This was confirmed with the
user before making the change (see the corresponding conversation turn) and
is the only shared-engine change made across either the original
implementation or this reconciliation pass.

Every other shared view — programme-selection card, dashboard,
module/lesson/quiz/sources/practical-task views, scoring, progression,
module-locking, storage-safety, theme, and speech logic — is reused exactly
as-is for every other programme.

## Programme isolation

- Own `id` (`prog-us-canada-market-rebuild-onboarding`), own `code`
  (`TOSP-USCA-01`), own `storageKey` — verified unique against all 7 other
  registered programmes (see validation report).
- No existing programme file was edited except `registry.js` (one import +
  one array entry, the same minimal pattern used to add every prior
  programme).
- This programme's content never references live data from, or duplicates
  the full curriculum of, the Amazon Team, eBay Team, Digital Marketing
  Team, Purchasing Team, Centralized PPC Team, Customer Service Team, or PH
  Team programmes — see `us-canada-market-rebuild-team-duplicate-risk.md`.
