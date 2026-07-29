# US and Canada Market Rebuild Team — Source Map

Internal documentation. Not learner-facing. Records the repository-relative
source paths (never shown in learner UI), each source's own authority claim,
the full content inventory, and how content maps to this programme's six
modules.

## Source folder

- **Repository-relative folder (internal only, never shown in learner UI):**
  `US_Or_Canada_Market_Rebuild_Team/`
- **Actual contents found (full recursive listing):** exactly two files,
  both under one subfolder whose name includes a personal identifier that is
  never reproduced in learner-facing content:
  - `US_Or_Canada_Market_Rebuild_Team/USA - BGCT (Indhujan)/USA_BGCT_Guidelines_Criteria_Tutorial.docx`
  - `US_Or_Canada_Market_Rebuild_Team/USA - BGCT (Indhujan)/USA_BGCT_v0.1.docx`
- No other subfolders, files, spreadsheets, PDFs, slide decks, images, or
  HTML/dashboard files exist anywhere under `US_Or_Canada_Market_Rebuild_Team/`.
  Both DOCX files were checked for embedded media (diagrams/images) — neither
  contains any embedded image.

## Source files

| Field | Doc 1 | Doc 2 |
|---|---|---|
| Repository-relative path (internal only) | `US_Or_Canada_Market_Rebuild_Team/USA - BGCT (Indhujan)/USA_BGCT_Guidelines_Criteria_Tutorial.docx` | `US_Or_Canada_Market_Rebuild_Team/USA - BGCT (Indhujan)/USA_BGCT_v0.1.docx` |
| Learner-safe title used throughout this programme | "US BGCT Operations Handbook — Guidelines & Criteria Edition" | "US BGCT Operations Handbook — Best Practice & Guidance Edition" |
| Format | DOCX | DOCX |
| Structure | Part A (Guidelines), Part B (Criteria), Part C (Tutorial) | Section B (Best Practice), G (Guidance), C (Checklist), T (Tutorial) |
| Internal version claim | Footer: "Version 1.0" | Filename: "v0.1"; own Section B.1 Standard Identification table: "Version \| v1.0" |
| Size | ~31.7 KB, 379 extracted paragraph/table items | ~44.0 KB, 249 extracted paragraph/table items (denser tables) |
| Platforms named (cover/body text) | Amazon \| eBay \| Wayfair \| Walmart | Amazon \| eBay \| Wayfair (cover); body text also references "Walmart Seller Center," "Amazon/eBay/Walmart fees" |
| Explicit "Platforms Covered" field | Not present as a discrete field | Section B.1: "Amazon (US), eBay (US), Wayfair (US)" |
| Source authority (this implementation) | Duplicate/overlapping content — cited alongside Doc 2 for KPI tables and criteria; treated as the less complete of the two | Treated as the more **complete** of the two duplicate documents (adds Standard Identification governance block, worked examples, anti-examples, troubleshooting, and the binary Checklist/Final Compliance Gate section absent from Doc 1) — cited first wherever both cover the same rule |

Both documents were read only, via structural XML extraction (paragraphs and
tables) to a scratch file outside the repository working tree, for
content-authoring purposes. Neither was modified, renamed, moved, staged,
committed, or copied into `tosp/`.

## Critical discovery findings — stated plainly, never silently absorbed

1. **Neither document contains the word "rebuild" anywhere.** A full-text
   case-insensitive search of both extracted documents returned zero matches.
   Both documents describe an ongoing operational Best-Practice standard
   ("BGCT") for *existing* US marketplace accounts — not a market-entry,
   relaunch, or catalogue-rebuild workflow.
2. **Neither document contains any Canada-specific content.** A full-text
   case-insensitive search for "Canada," "Canadian," and "CAD" across both
   documents returned zero matches. There is no Canada subfolder, no
   Canada-named file, and no Canada-labelled table row anywhere in the
   source folder.
3. **The confirmed scope is US-only, three marketplaces:** Amazon (US), eBay
   (US), Wayfair (US) — per Doc 2's explicit "Platforms Covered" field.
   Walmart is named inconsistently in cover/body text in both documents but
   is absent from the one explicit scope field — documented as a
   SOURCE_CONFLICT (see exclusions register) rather than included or
   excluded by guesswork.
4. **Neither source document defines a formal "market rebuild" methodology
   — corrected 2026-07-29.** An earlier version of this programme's
   learner-facing content stated that the sources support a specific meaning
   of "market rebuild" (converting ad-hoc operations into BGCT's standard),
   drawing on Doc 2 Section B.2 ("Reason This Standard Was Chosen"), which
   describes why BGCT was adopted (four recurring root-cause failure
   categories — warehouse errors, listing inaccuracies, uncontrolled refund
   approvals, late single-slot shipment processing) but does not itself use
   the word "rebuild" or describe a rebuild methodology. On reconciliation
   review this framing was judged to overstate what the source supports: it
   presented an inference as if it were a defined term. "Market Rebuild" is
   now treated, and stated to the learner, strictly as **the approved
   project requirement title label**, not a source-defined methodology; this
   programme's learner-facing content states that it applies the approved US
   marketplace operational guidance the sources actually contain (the BGCT
   standard), without characterising that guidance as a "rebuild process."
   No candidate meaning (listing rebuild, account recovery, market
   expansion, sales recovery, advertising rebuild, or broader operational
   restructuring) is taught, quizzed, or implied anywhere.

## Content inventory and duplicate/version analysis

Both documents describe the same underlying BGCT framework and overlap
roughly 85-90% in substantive content (KPI targets, warehouse/listing/refund/
shipment rules). They are **not** simple duplicates of the same file — Doc 2
restructures the same rules under a different internal model (Best
Practice/Guidance/Checklist/Tutorial vs. Doc 1's Guidelines/Criteria/
Tutorial) and adds material not present in Doc 1 (worked examples with
concrete SKUs, anti-examples, a troubleshooting section, and the binary
Checklist/Final Compliance Gate).

**Version-label conflict — documented, not resolved:** Doc 2's filename says
"v0.1" (suggesting an earlier draft) while its own internal Standard
Identification table says "Version | v1.0" — the same version number Doc 1's
footer claims for itself. Both documents therefore internally claim to be
"Version 1.0" despite the filename suggesting otherwise. Per the completeness
criterion (Doc 2 contains everything in Doc 1 plus additional structure), Doc
2 is cited first wherever both cover the same rule — this is a completeness-
based authoring decision, not a claim that the filename/internal-version
conflict itself is resolved.

## Module ↔ source-section mapping

| Module | Doc 1 sections (primary) | Doc 2 sections (primary) |
|---|---|---|
| 1 — BGCT Foundation, Scope and Account Holder Accountability | A.1-A.4 | B.1-B.2 |
| 2 — Account Health, Governance and Pricing Oversight | A.5-A.7, A.5.1, B.5 | B.3 |
| 3 — Warehouse Operations: Picking and Packing | B.1.1-B.1.4 | G.2.1-G.2.2, T.1.1-T.1.2 |
| 4 — Listing Accuracy Readiness | B.2.1-B.2.3 | G.3.1, T.2 |
| 5 — Refund, Replacement and Return Inspection | B.3.1-B.3.3 | G.4.1, T.3 |
| 6 — Shipment Processing, Escalation and Weekly Governance | B.4, C.6-C.7 | G.5-G.6, C.8, T.4, T.6-T.7 |

The four-lessons-per-module structure is a **TOSP presentation decision**,
not a claim that either source document itself defines four lessons per
module.

## US/Canada applicability

Every lesson and question in this programme is labelled, in its own text, as
**"Applicability: US only"** — there is no shared/US-only/Canada-only
three-way split to represent, because no Canada-specific content exists to
form the Canada or shared/Canada-differing side of that split. This is a
determinable answer (Canada = confirmed out of scope), not an unresolved
question.

## Confidentiality exclusions applied throughout

- The personal name in the source subfolder path (`USA - BGCT (Indhujan)`) is
  never displayed anywhere in learner-facing content — only this internal
  source map and the exclusions register record the exact repository-
  relative path.
- No real account names, seller IDs, tax/registration numbers, credentials,
  live ASINs/SKUs, live sales or margin figures, or customer/employee
  personal data exist anywhere in either source document (both documents use
  only illustrative example SKUs such as `DW-KB-BLK-001` and
  `DW-CHAIR-GRY-L`, which are themselves fictional/illustrative, not live
  identifiers) — the practical task reuses this same illustrative style with
  its own new fictional SKUs.

## Known gaps (source itself does not cover)

- No Canada content of any kind (see Critical Discovery Findings above).
- No product/market-assessment methodology, demand/competition scoring, or
  numeric market-opportunity formula.
- No catalogue-rebuild, relaunch, or "current-state to future-state" listing
  workflow beyond the listing-accuracy checklist itself.
- No currency conversion, exchange rate, tax, or duty rule.
- No compliance/certification (electrical, safety-labelling, customs)
  content.
- No advertising-spend procedure beyond the accountability check ("review
  CPPC spend vs. sales, stop wasteful spend") — general PPC operation is
  owned by the existing Centralized PPC Team programme.
- No Walmart-specific checklist at the same depth as Amazon/eBay (Walmart is
  named inconsistently but never given its own criteria section).
- No quiz pass score, attempt limit, sign-off rule, practical-task
  requirement, completion definition, or language/Tamil requirement anywhere
  in either document (confirmed during discovery) — this programme's
  quiz/completion/language configuration is an explicit TOSP prototype
  configuration decision, not a source-derived one.

See `us-canada-market-rebuild-team-exclusions.md` for the full exclusions
register with implementation impact and future-resolution paths, and
`us-canada-market-rebuild-team-duplicate-risk.md` for cross-programme overlap
handling.
