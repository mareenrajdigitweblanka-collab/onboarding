# US and Canada Market Rebuild Team Onboarding — Closure Report

Date: 2026-07-29 (updated same day — source-accuracy reconciliation pass)

## Requirement

Discover and implement a TOSP onboarding programme for the team represented
by `US_Or_Canada_Market_Rebuild_Team/`, in a single run (discovery +
implementation, not discovery only), gated on the Customer Service Team
programme being safely merged first.

## Reconciliation pass (same day)

A follow-up, targeted source-accuracy reconciliation audited every
learner-facing surface for Canada content, unsupported "market rebuild"
claims, disputed Late Shipment Rate numbers, and a stray Walmart mention, and
corrected each hit found. Nothing below in this closure report describes the
pre-reconciliation state unless explicitly marked as superseded — this
report reflects the corrected, final state. See "Reconciliation corrections"
below for the itemised before/after.

## Starting branch and HEAD

- Gate: Customer Service Team commit `7fe295e50687c6caae8aa39cb866db14189b0124`
  confirmed contained in `origin/main` (merged via PR #7, merge commit
  `cf5d465dcec28e6cbd2db2e4c6e74d7d9c655d37`).
- Starting `main` hash for this work: `cf5d465dcec28e6cbd2db2e4c6e74d7d9c655d37`.
- Feature branch: `feat/us-canada-market-rebuild-team-onboarding`, created
  fresh from that commit.

## Source inventory

Exactly two DOCX files, both under one subfolder, found under
`US_Or_Canada_Market_Rebuild_Team/`:
- `USA - BGCT (Indhujan)/USA_BGCT_Guidelines_Criteria_Tutorial.docx`
- `USA - BGCT (Indhujan)/USA_BGCT_v0.1.docx`

No other files, subfolders, spreadsheets, PDFs, slide decks, or images exist
anywhere in the source folder. Full detail in
`docs/us-canada-market-rebuild-team-source-map.md`.

## Source authority

Both documents describe the same "BGCT" operational framework for US-only
marketplace operations. The Best Practice & Guidance Edition (filename
"v0.1") is cited first wherever both documents cover the same rule, on
completeness grounds (it contains everything the other document has plus
additional worked examples, anti-examples, troubleshooting, and a binary
Checklist/Final Compliance Gate section). Both documents internally claim
"Version 1.0" despite the filename disagreement — documented, not resolved.

## Exact programme name

**US and Canada Market Rebuild Team Onboarding** (required title, retained).
Neither source document defines an alternative official team name.

## Meaning of "market rebuild"

Neither source document uses the word "rebuild" or defines a formal
market-rebuild methodology. **"Market Rebuild" is the approved project
requirement title label only.** This programme applies the approved US
marketplace operational guidance the source documents actually contain (the
BGCT standard: warehouse, listing, refund, shipment, account-health, and
escalation/governance practice) and never claims the sources define a
rebuild process. (The original implementation stated a specific inferred
meaning as if it were source-defined; this was corrected during the same-day
reconciliation pass — see below.)

## US/Canada separation

**No Canada-specific content exists anywhere in either source document** —
confirmed by full-text search ("Canada," "Canadian," "CAD": zero matches in
both files). This programme states this finding plainly in the programme
description, every lesson's applicability line, and the dashboard/Sources
screens, rather than inventing Canada content or silently dropping "Canada"
from the required title. Confirmed marketplace scope is Amazon (US), eBay
(US), and Wayfair (US); Walmart is named inconsistently across the source
documents and is documented as an unresolved SOURCE_CONFLICT, excluded from
confirmed scope.

## Final module structure

Six modules, source-clustered, linear prerequisite chain:
1. BGCT Foundation, Scope and Account Holder Accountability
2. Account Health, Governance and Pricing Oversight
3. Warehouse Operations — Picking and Packing
4. Listing Accuracy Readiness
5. Refund, Replacement and Return Inspection
6. Shipment Processing, Escalation and Weekly Governance

## Totals

- 6 modules
- 24 lessons (4 per module)
- 6 Skill Checks (1 per module)
- 36 questions (6 per Skill Check)
- 1 final practical task, 11 items across 6 sections
- 32 evidence screenshots

## Conflicts and exclusions

Ten items recorded in `docs/us-canada-market-rebuild-team-exclusions.md`:
Canada scope not supported by source; "market rebuild" not source-defined
(title label only); the US-only prototype scope notice; Walmart
platform-scope conflict; Late Shipment Rate numeric conflict (one occurrence
states a different figure from the other four occurrences across both
documents — **neither disputed figure is taught anywhere in this programme**,
corrected during the same-day reconciliation pass; the original
implementation had taught the stricter of the two figures as "operative,"
which has been removed); no invented pricing/currency/tax/compliance
content; personal name in source subfolder path excluded; duplicate-source
completeness-based citation order; CPPC/Customer-Service cross-programme
boundaries; no certification/live-action authority.

A potential cross-programme numeric-conflict topic (Late Shipment Rate vs.
the existing Amazon Team programme's own figure) was reviewed and is now
moot: this programme states no Late Shipment Rate figure at all, so it
cannot present a number that contradicts Amazon Team's. See
`docs/us-canada-market-rebuild-team-duplicate-risk.md`.

## Duplicate-risk handling

Full cross-programme overlap table in
`docs/us-canada-market-rebuild-team-duplicate-risk.md` covering Amazon,
eBay, Digital Marketing, Purchasing, Centralized PPC, Customer Service, and
PH. One confirmed low-risk overlap requiring cross-reference (Centralized
PPC, Customer Service); the Late Shipment Rate topic (Amazon Team) is now
low-risk since this programme teaches no figure to compare; no
full-curriculum duplication anywhere.

## Reconciliation corrections (same-day pass)

| Area | Before | After |
|---|---|---|
| `usca-m1-l1` | Stated "Rebuilding US marketplace operations... means exactly this: converting..." | States "Market Rebuild" is the title label only; sources don't define a rebuild methodology |
| `usca-m1-l3` | "monitor eBay/Walmart order counts" | "monitor eBay order counts" (Walmart removed) |
| `usca-m2-l2` | Taught "Late Shipment Rate below 2%" as operative, disclosed the 4% outlier | Teaches neither figure; states the conflict and directs the learner to the current approved source |
| `usca-m3-l4` | "KPI target: Late Shipment Rate below 2%" | No numeric target stated; references Module 2 Lesson 2 and Programme Sources |
| `usca-m1-q2` | Correct answer described "market rebuild" as "converting ad-hoc... into BGCT's standard" | Correct answer states neither source defines a rebuild methodology |
| `usca-m2-q3` | Correct answer described "always teaches the stricter... 2% target" | Correct answer states neither disputed figure is taught; escalate to current approved source |
| `usca-pt-003` (practical task) | Fictional snapshot included "Late Shipment Rate = 3.1%" compared against "its BGCT target" | LSR figure removed from the comparison; item now asks why no such comparison can be made |
| `usca-pt-009` (practical task) | Source field named "Late Shipment Rate 2%-vs-4% conflict" | Source field renamed "Late Shipment Rate numeric disagreement" (no numbers) |
| `PROGRAMME.description` | No standard scope notice; described "market rebuild" as sources' meaning | Opens with "CURRENT PROTOTYPE SCOPE: US MARKETPLACE OPERATIONS ONLY..."; market-rebuild framing corrected |
| `PRACTICAL_TASK.intro` | No scope notice | Opens with the same standard scope notice |
| `dashboardSourceBlurb` / `sourcesIntro` | Named the disputed 2%/4% figures explicitly; described a source-backed "market rebuild" meaning | Numbers removed; market-rebuild framing corrected |
| `PROGRESSION_RULES` | `usca-rule-market-rebuild-meaning` and `usca-rule-late-shipment-conflict` asserted resolved positions | Both reworded to state the conflicts are unresolved and no figure/methodology is taught; one new rule (`usca-rule-scope-notice`) added |
| `views/completion-view.js` (shared) | No programme-specific text slot | One guarded line added: renders `ui.scopeNote` if the active programme defines it (inert for all other programmes) — confirmed with the user before making this shared-file change |

All four documentation files (`source-map.md`, `exclusions.md`,
`programme-architecture.md`, `duplicate-risk.md`) and the validation
checklist were updated to match. No module, lesson, quiz, or question was
added or removed; totals are unchanged (6/24/6/36/1).

## Source traceability

Every module, lesson, question, and practical-task item carries an exact
source citation to one or both editions of the US BGCT Operations Handbook.
No raw source file path or the personal name in the source subfolder appears
in any learner-facing content.

## Practical-task boundary

`us-canada-market-rebuild-final-practical-v1` — PROTOTYPE_ONLY, fictional
data only (SKU `DW-CHR-BLU-M`, invented for this task), no live connection,
no numeric scoring, non-gating (confirmed live: completion screen identical
before/after practical-task use).

## No-sign-off result

`requiresSignoff: false` on all 6 modules; `requiresReviewerSignoff: false`
programme-wide. No sign-off screen appeared anywhere in the live completion
run.

## English-only result

`enableTamilTranslation: false`. Zero translation-related network requests
observed during the full validation run.

## Completion rule

All 24 lessons + all 6 Skill Checks required; practical task never gates
completion (shared, unmodified `rules/module-access.js`). Completing this
programme grants no certification, marketplace authorisation, financial
approval authority, or any live account action authority (shared, unmodified
`CERTIFICATION_DISCLAIMER`).

## Storage key

`tosp.us-canada-market-rebuild-team.prototype.v1` — verified unique against
all 7 other registered programmes, the theme key, and the active-programme
selector key.

## Files created

- `tosp/js/programmes/us-canada-market-rebuild-team-programme.js`
- `tosp/js/programmes/us-canada-market-rebuild-team-modules.js`
- `tosp/js/programmes/us-canada-market-rebuild-team-question-bank.js`
- `tosp/docs/us-canada-market-rebuild-team-source-map.md`
- `tosp/docs/us-canada-market-rebuild-team-programme-architecture.md`
- `tosp/docs/us-canada-market-rebuild-team-exclusions.md`
- `tosp/docs/us-canada-market-rebuild-team-duplicate-risk.md`
- `tosp/validation/us-canada-market-rebuild-team-programme-check.md`
- `tosp/evidence/us-canada-market-rebuild-team-2026-07-29/` (32 screenshots; no temporary artifact — the `_validation-run-result.json` automation-run summary was removed before staging)
- `tosp/handover/2026-07-29__us-canada-market-rebuild-team-onboarding-closure.md` (this file)

## Files modified

- `tosp/js/programmes/registry.js` — one import line + one array entry
  (identical minimal pattern used to add every prior programme).
- `tosp/js/views/completion-view.js` (shared) — one guarded line added
  during the reconciliation pass, rendering `ui.scopeNote` only if the
  active programme defines it; inert for all 7 other programmes. Confirmed
  with the user before making this change. This is the only shared-engine
  file touched by either the original implementation or the reconciliation
  pass. `rules/`, `services/`, `config.js`, `data.js`, `state.js`,
  `storage.js`, `router.js`, and every other `views/`/`components/` file
  remain unmodified.

## Validation result

`US_CANADA_MARKET_REBUILD_IMPLEMENTATION_CHECKS: PASS` — full 130-item
checklist (114 original + 16 reconciliation-specific) in
`tosp/validation/us-canada-market-rebuild-team-programme-check.md`; 130 PASS,
0 PARTIAL, 0 FAIL.

## Evidence paths

`tosp/evidence/us-canada-market-rebuild-team-2026-07-29/` — 32 screenshots
covering programme selection, dashboard, module journey, all representative
lesson types, source references, quiz fail/pass/attempts-exhausted, locked
module, practical task, completion (before/after practical task), light/dark
mode, and mobile/tablet/desktop responsive layouts across multiple viewport
sizes (dashboard, lesson, quiz, and mobile drawer each captured at more than
one breakpoint, which is why the final count is 32 rather than one shot per
named category). The programme-selection card, dashboard, practical-task,
and completion screenshots were recaptured after the reconciliation pass to
show the corrected US-only scope notice live. Console-error, failed-request,
translation-request, persistence, corrupt-storage-recovery, and
7-programme regression results were captured during the automated Playwright
run (re-run after reconciliation — unchanged, all still PASS) and are
reported in this closure document; the automation run's own JSON summary
file was a temporary artifact and has been removed from the evidence folder
before Git staging — only the 32 intended PNG screenshots remain.

## Seven-programme regression results

All PASS: PH, Amazon, eBay, Digital Marketing, Purchasing, Centralized PPC,
Customer Service — each confirmed to still render a non-trivial dashboard
with no console error when set as the active programme, after this work.

## Known limitations

- Canada scope: entirely unsupported by source; a dedicated Canada-market
  source document would be required before any Canada-specific content
  could be added.
- No product/market-assessment methodology, catalogue-rebuild workflow,
  currency/tax/duty rules, or compliance/certification content — none of
  these exists in source and none was invented.
- Walmart platform scope and the Late Shipment Rate numeric disagreement
  remain documented, unresolved source conflicts pending business
  reconciliation; this programme teaches neither disputed Late Shipment Rate
  figure and states plainly that the learner must use the current approved
  operational source rather than select a threshold independently.
- Reset-isolation (item 79/103 in the validation check) was verified by
  mechanism review (shared, unmodified code, identical to every other
  programme) rather than by a live destructive test against another
  programme's real stored progress, to avoid disturbing existing data.

## Queryability result

YES — every module, lesson, question, and practical-task item is
independently queryable by ID and carries its own source citation; the
Sources screen renders the full citation list live (confirmed:
`19-source-reference-sources-page.png`).

## Next action

Await `FINAL_USER_ACCEPTANCE`.

## Final status markers

- Source files changed or tracked: NO
- Shared scoring/progression/storage changed: NO
- `US_CANADA_SCOPE_RECONCILED: YES`
- `US_CANADA_MARKET_REBUILD_IMPLEMENTATION_CHECKS: PASS`
- `FINAL_USER_ACCEPTANCE: PENDING`

## PASS/FAIL

**PASS**
