# Purchasing Team — Exclusions Register

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced) · **implementation was authorised without resolving the source
ambiguities found during discovery**. Per that authorisation, every
unresolved conflict or defect below is EXCLUDED from learner-facing lessons,
quizzes, and the practical task — never selected, averaged, merged,
repaired, or reinterpreted. This document records every such exclusion: the
source(s), the issue, the implementation action taken, the learner impact,
and the future correction path.

---

## 1. Container-fill CBM threshold conflict

- **Sources**: Purchasing Rule Book (BGCT_PURCHASING_SKILL) — states 68 CBM
  as the container-size target with ≥98% utilisation in one section, then
  "If CBM > 67" in a later step of the same document; Purchasing & Warehouse
  Best Practice Guideline tutorial — states "If CBM > 64" on one slide and
  "Maintain 68 CBM" / "If CBM > 68" on a later slide; Purchase Order
  Ordering Policy SOP and Order Follow-Up, Production Monitoring & Container
  Loading Policy SOP — both state 68 CBM as the target.
- **Issue**: three different numeric values (64, 67, 68) appear across these
  sources for what is presented as the same container-fill trigger rule,
  including two different values within the same single document (the
  Purchasing Rule Book) and two different values within the same single
  presentation (the tutorial).
- **Implementation action**: no module, lesson, or quiz question anywhere in
  this programme states a specific CBM threshold. Module 8 (Container
  Planning and Scoring) and Module 2 (End-to-End Purchasing Workflow) teach
  the general planning concept — that a container has a fixed usable
  capacity and loading should make good use of it — without ever stating a
  number. Verified by a manual pass over every module/lesson/question string
  for "64", "67", "68", and "CBM >".
- **Learner impact**: learners are taught that a capacity target exists and
  why it matters, but are not given a specific figure to memorise or apply,
  and are told the figure is disputed if they encounter one elsewhere.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future correction path**: once the business confirms a single, correct
  CBM target across all documents, that value could be added to Modules 2
  and 8 as a small, targeted content update.

## 2. Tier-A warehouse-capacity cutoff conflict

- **Sources**: PO Decision Engine Rules v2.4 (§6.2, §9, `CFG_WH_CRITICAL`),
  PO Intelligence Engine workbook, and PO Decision Engine Sample workbook —
  all state 85% as the cutoff above which only Tier A SKUs may be ordered;
  Container Scoring Model V2.2 workbook (`WH_Soft_Cap`) — states 90% for the
  same concept.
- **Issue**: two different percentage cutoffs for the same warehouse-capacity
  restriction rule.
- **Implementation action**: Module 7 (Purchase Order Decision Intelligence)
  and Module 8 do not state either 85% or 90% anywhere. No quiz question
  tests this figure.
- **Learner impact**: learners are not given a specific warehouse-capacity
  cutoff and are told this figure is disputed in the source material.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future correction path**: once reconciled by the business, the confirmed
  figure could be added to Module 7 as a targeted update.

## 3. Conflicting Gate 2 definitions

- **Sources**: PO Decision Engine Rules v2.4 §6.2 defines Gate 2 as "Space
  Qualification" (the warehouse-capacity check); the PO Decision Engine
  Specification Update v2.4's own "Updated Gate Summary (V2.4)" table
  relabels Gate 2 as "Space (£/CBM)" — the ROI check the Rules document
  itself calls Gate 3.
- **Issue**: the same gate number is assigned two unrelated definitions
  across two documents that both claim to describe the v2.4 engine.
- **Implementation action**: Module 7 never refers to a numbered "Gate 2" or
  states what it checks. The concept of gates/checks in general is described
  only abstractly (see item 6 below).
- **Learner impact**: learners are not taught a specific gate-numbering
  scheme.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future correction path**: the two source documents' gate numbering needs
  to be reconciled by their owner before any gate-specific content can be
  safely taught.

## 4. Conflicting Gate 5 definitions

- **Sources**: PO Decision Engine Rules v2.4 §11 states Gate 5 (Shipping
  Efficiency) is "specified in V2.4 but not yet active in the current engine
  build," with a target of ">85% container utilisation per shipment"; the PO
  Decision Engine UI V2.2 HTML prototype shows a "Gate 5: Container Fill"
  check that is fully active and passing, with a completely different
  requirement ("≥10%, or ≥5% if Tier A") and an actual value of "19.3%."
- **Issue**: the two sources disagree on both whether Gate 5 is active and
  what it is meant to measure (an order-of-magnitude difference in the
  stated threshold).
- **Implementation action**: no module or question in this programme states
  a Gate 5 requirement, threshold, or activation status.
- **Learner impact**: learners are told (Module 7, Lesson 4) that different
  versions of the tool disagree on which checks are active, without being
  given a specific number for any of them.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future correction path**: needs reconciliation between the Rules
  document's roadmap status and the HTML prototype's apparently-active
  implementation before any Gate 5 content can be taught.

## 5. Conflicting Gate 6 definitions

- **Sources**: PO Decision Engine Rules v2.4 §11.2 reserves Gate 6 for "MOQ
  Efficiency," explicitly marked as not yet active; the PO Decision Engine
  Specification Update v2.4 §31 defines Gate 6 as "Warehouse Capacity," an
  active hard-block gate with its own three-tier percentage scheme (distinct
  from, and additional to, the 85%/90% single-cutoff conflict in item 2).
- **Issue**: the same gate number is used for two entirely different
  concepts (MOQ efficiency vs. warehouse capacity) with conflicting
  activation status.
- **Implementation action**: no module or question states a Gate 6
  definition, threshold, or activation status. MOQ is taught in Module 3 as
  a plain, undisputed ordering rule (see the Order Quantity Rules content),
  entirely separate from any "Gate 6" framing.
- **Learner impact**: learners learn the MOQ concept from the undisputed SOP
  source, never from the disputed Decision Engine gate framing.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future correction path**: needs reconciliation between the two documents
  before Gate 6 can be taught as a Decision Engine concept.

## 6. Disputed gate activation status (general)

- **Sources**: PO Decision Engine Rules v2.4 (several gates marked "not yet
  active"); PO Decision Engine Specification Update v2.4 (some of the same
  gates presented as newly active); PO Decision Engine UI V2.2 HTML (shows
  gates as already active and passing, in an earlier-labelled version than
  either written document).
- **Issue**: whether specific named checks are "live" in the real system or
  still on a roadmap cannot be determined consistently from the sources.
- **Implementation action**: Module 7, Lesson 4 teaches this disagreement
  itself as a limitation of the prototype tools, without asserting which
  gates are actually active. No quiz question tests any gate's activation
  status.
- **Learner impact**: learners are taught to distrust a tool's apparent
  "active" status until confirmed, as a general lesson in working safely
  with these prototype tools.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future correction path**: needs a single confirmed system-of-record for
  which gates are live before this can be taught as fact.

## 7. True Contribution formula conflict

- **Sources**: PO Decision Engine Rules v2.4 §2.1–2.2 and the PO
  Intelligence Engine / PO Decision Engine Sample workbooks compute "True
  Contribution" as Selling Price minus Landed Cost minus **Labour Cost**
  minus Marketplace Fee minus PPC Cost minus Postage minus Returns Cost (with
  labour cost derived from a handling-class lookup table); Container Scoring
  Model V2.2 workbook computes the same-named metric as Selling Price minus
  Landed Cost minus Marketplace Fee minus PPC Cost minus Postage minus
  Returns Cost, with **no labour-cost term at all** (that workbook has no
  Handling Class data column to support one).
- **Issue**: two structurally different formulas for the same named metric,
  producing systematically different margin and £/CBM outputs for the same
  item.
- **Implementation action**: neither version of the True Contribution
  formula is stated, taught, or used anywhere in this programme. Module 7
  describes only that such a formula exists conceptually ("a formula
  calculates the real profit per unit after all costs") and that a product
  which would lose money should never be ordered, without specifying which
  costs are subtracted or in what order.
- **Learner impact**: learners understand the purpose of a profitability
  check without learning either disputed calculation.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future correction path**: the business needs to confirm whether labour
  cost belongs in this calculation before either formula can be taught.

## 8. Container_Scoring_Model_V2.2.xlsx — off-by-one CBM-subtraction defect

- **Source**: Container Scoring Model V2.2 workbook, `Summary!B30` ("CBM
  After Removal").
- **Issue**: the cell's formula (`=B5-B28`) subtracts an empty header-row
  cell (`B28`, the "--- SPACE RECOVERY ---" section header) instead of `B29`
  ("CBM to Remove"), so the displayed "CBM After Removal" figure silently
  equals the unmodified Total CBM rather than Total CBM minus removed CBM —
  a confirmed calculation defect, not a disputed value.
- **Implementation action**: this workbook's calculated output is never used
  as a source for any lesson, example, or quiz question anywhere in this
  programme.
- **Learner impact**: none directly — learners never see this figure. Module
  7/8 use the existence of this defect as a general lesson in why
  spreadsheet-based recommendations require a human check.
- **Status**: confirmed source defect, excluded by omission.
- **Future correction path**: the workbook owner should fix cell `B30`'s
  formula to reference `B29` instead of `B28`.

## 9. Container_Scoring_Model_V2.2.xlsx — mislabeled summary rows

- **Source**: Container Scoring Model V2.2 workbook, `Summary!B33:B35`.
- **Issue**: row 34 is labelled "UK WH Utilisation" but its formula
  (`=Config!B12`) actually returns Available CBM; row 35 is labelled "UK WH
  Available CBM" but its formula (`=Config!B11`) actually returns Used CBM —
  the labels and the values they describe are shifted one row out of
  alignment.
- **Implementation action**: this workbook's summary section is never used
  as a source for any lesson, example, or quiz question anywhere in this
  programme.
- **Learner impact**: none directly — same defective-tool caution as item 8.
- **Status**: confirmed source defect, excluded by omission.
- **Future correction path**: the workbook owner should realign rows 33-35's
  labels with their intended formulas.

## 10. Hardcoded Gate 5 "PASS" stub

- **Source**: Container Scoring Model V2.2 workbook, `Decision!K` column.
- **Issue**: this column, described by the workbook's own Instructions sheet
  as an active "Gate 5: Shipping — does container fill ≥ 10%?" check, is
  actually the literal text `"PASS"` in every single row — not a computed
  formula — and is excluded from the workbook's own overall `All_Gates`
  AND() decision formula, meaning it has zero real effect on any outcome
  despite appearing to be an active gate.
- **Implementation action**: no module or question states or relies on this
  gate's behaviour. Module 7/8 cite this specific defect as a concrete
  example of why an apparently "passing" automated check must still be
  reviewed by a person.
- **Learner impact**: learners are taught the general caution (see item 6);
  the specific defective cell is not itself surfaced to learners, only used
  in this document as the underlying evidence for that caution.
- **Status**: confirmed source defect, excluded by omission.
- **Future correction path**: the workbook owner should implement the
  described ≥10%/≥5% check as a real formula and include it in the
  `All_Gates` decision.

## 11. Ambiguous "MD" role wording

- **Sources**: Purchasing Rule Book and the Purchasing & Warehouse Best
  Practice Guideline tutorial both use "MD" as an approval authority (for
  example, "No exceptions without MD approval," "Confirm final Purchase
  Order (PO) with Managing Director (MD)") without every instance clearly
  distinguishing an individual Managing Director role from a general
  "management" approval step; the Purchase Order Ordering Policy SOP
  separately uses the word "management" (not "MD") for a structurally
  similar approval gate (MOQ shortfall, Electro Colour value check), without
  stating whether this is the same role.
- **Issue**: it cannot be established from the sources whether "MD" and
  "management" always refer to the same approval authority.
- **Implementation action**: this programme never asserts that "MD" and
  "management" are the same role. Where a source clearly writes out
  "Managing Director (MD)" as an approval step, this programme describes it
  generically as "a senior approval step" rather than asserting a specific
  job title is confirmed system-wide; where a source says only "management
  approval," this programme uses that generic wording directly. No quiz
  question tests whether "MD" and "management" are interchangeable.
- **Learner impact**: learners learn that certain decisions require a
  defined approval step above the immediate purchaser, without being taught
  a specific, universally-applicable job title for that step.
- **Status**: ambiguous source wording, excluded by using generic role
  language.
- **Future correction path**: the business should confirm whether "MD" and
  "management" refer to the same approval authority across all Purchasing
  processes.

## 12. Sample-data-as-policy caution (general rule applied throughout)

- **Sources**: PO Decision Engine Sample workbook (explicitly named
  "Sample"), PO Intelligence Engine workbook (a static worked-example
  snapshot), and worked examples embedded in the Purchasing Rule Book and
  the PO Decision Engine UI HTML prototype.
- **Issue**: none of these are stated by their own source to be universal
  policy — they are illustrations, demo data, or test cases.
- **Implementation action**: no example, figure, or scenario drawn from a
  sample workbook or worked example is presented in this programme as an
  approved rule. Where a worked example from a non-conflicting SOP source is
  used (for example, the carton-multiple example in Module 3), it is
  presented explicitly as an illustration of a stated rule, not as the rule
  itself.
- **Learner impact**: learners are taught to distinguish a stated policy
  from an illustrative example throughout the programme.
- **Status**: applied as a standing authoring rule, not a single fixed item.
- **Future correction path**: none needed — this is a permanent authoring
  discipline, not a pending correction.

## 13. Confidential content excluded (not a conflict, a confidentiality rule)

| Category | Source(s) | Action taken |
|----------|-----------|----------------|
| Real/informally-coded supplier identities and comparative pricing/performance commentary | Purchase Order Ordering Policy SOP; Order Follow-Up SOP; Purchase Order Update Procedure SOP (PO-ID worked example) | Never reproduced; generic role/entity wording used instead ("a preferred supplier," "a supplier with a longer lead time") |
| Plaintext supplier credential storage practice | Purchase Order Update Procedure SOP | The procedural step (recording supplier login access) is described generically; the specific plaintext-storage detail is not taught as an endorsed practice |
| Internal chat/group and facility names | Container Arrival, Stock Receipt & Inventory Update Policy SOP | Genericised to "the relevant internal team" and "the receiving location" |
| Supplier company names, monetary figures, PO/container/shipment references, SKU-shaped codes shown as populated sample data | PO Decision Engine UI V2.2 HTML prototype | This source is never used as a content source in this programme at all — see source-map §authority model |
| Internal incident reference | PO Decision Engine Specification Update v2.4 | Not referenced anywhere in this programme |
| Staff/owner initials and placeholder-styled supplier names in workbook data | PO Intelligence Engine workbook; Container Scoring Model V2.2 workbook | These workbooks' data rows are never used as a content source in this programme |
| Personal name in file metadata | Purchasing & Warehouse Best Practice Guideline tutorial (`docProps` author metadata) | Never surfaced in learner content |

## Summary table

| # | Item | Conflict/defect type | Status | Taught/quizzed in this programme? |
|---|------|----------------------|--------|-------------------------------------|
| 1 | Container-fill CBM threshold (64/67/68) | `SOURCE_CONFLICT` | Unresolved | No |
| 2 | Tier-A warehouse cutoff (85%/90%) | `SOURCE_CONFLICT` | Unresolved | No |
| 3 | Gate 2 conflicting definitions | `SOURCE_CONFLICT` | Unresolved | No |
| 4 | Gate 5 conflicting definitions | `SOURCE_CONFLICT` | Unresolved | No |
| 5 | Gate 6 conflicting definitions | `SOURCE_CONFLICT` | Unresolved | No |
| 6 | Disputed gate activation status | `SOURCE_CONFLICT` | Unresolved | No (discussed only as a general limitation) |
| 7 | True Contribution formula (labour vs. no-labour) | `SOURCE_CONFLICT` | Unresolved | No |
| 8 | Off-by-one CBM-subtraction defect | Confirmed workbook defect | Excluded by omission | No |
| 9 | Mislabeled summary rows | Confirmed workbook defect | Excluded by omission | No |
| 10 | Hardcoded Gate 5 "PASS" stub | Confirmed workbook defect | Excluded by omission | No (cited only as evidence for a general caution) |
| 11 | Ambiguous "MD" role wording | Ambiguous source wording | Excluded — generic role used | No specific role confirmed |
| 12 | Sample data presented as policy | Standing authoring discipline | Applied throughout | N/A |

Thirteen categories in total (12 mandatory items plus the confidentiality
register), all documented above with source, issue, implementation action,
learner impact, and future correction path.
