# Purchasing Team — Source Map

Status: programme content = FINAL_TRUTH (sourced) · learner progress =
PROTOTYPE_ONLY · **implementation was authorised without resolving the
conflicts found between sources during discovery** — see
`purchasing-team-exclusions.md` for the full register of every excluded
item. `Purchasing_Team/` is gitignored (confidential source documents,
read-only, not modified by this work) — the sourced programme content lives
in `tosp/js/programmes/` instead.

---

## 1. Source authority model applied

Per the confirmed authorisation, sources were used in this priority order:

1. **Written Purchasing policies, procedures, BGCT documents, and
   operational process documents** = primary prototype learner-content
   sources.
2. **PO Decision Engine written rules/specifications** = supplemental
   sources only, used only for rules that are internally consistent and do
   not conflict with another approved source.
3. **Excel workbooks** = formula/reference sources only, used only for
   formulas and logic that are internally correct and consistent with
   written sources.
4. **The HTML UI prototype** = interface/reference evidence only, never
   treated as policy truth.
5. **Samples and worked examples** = examples only, never taught as
   universal policy unless a source explicitly states a rule that a worked
   example happens to illustrate.

Where any two sources disagreed, the disputed item was excluded rather than
resolved by picking a side — see `purchasing-team-exclusions.md`.

## 2. All 14 source files inspected

| # | File | Format | Authority tier | Modules using it |
|---|------|--------|-----------------|---------------------|
| 1 | Purchase_Order_Update_Procedure_Purchasing_Dashboard.pdf | PDF | 1 — primary | Modules 1, 4, 5 |
| 2 | Container_Arrival_Stock_Receipt_Inventory_Update_Policy_SOP.pdf | PDF | 1 — primary | Modules 2, 9 |
| 3 | Purchase_Order_Ordering_Policy_SOP.pdf | PDF | 1 — primary | Modules 1, 2, 3, 4, 10 |
| 4 | Order_Followup_Production_Container_Loading_Policy_SOP.pdf | PDF | 1 — primary | Modules 2, 5, 6, 8, 10 |
| 5 | BGCT_PURCHASING_SKILL.md.pdf ("Purchasing Rule Book") | PDF | 1 — primary, with one excluded figure | Module 4 (Electro Colour item only); contributes context, not the disputed CBM/lead-time detail |
| 6 | PURCHASING BGCT.pptx (tutorial) | PPTX | 1 — context only | No module content drawn directly from it — duplicates/conflicts with the SOP sources; used only to cross-check the CBM conflict (see exclusions §1) |
| 7 | PO_Decision_Engine_Rules_v2.4.docx / .docx.md | DOCX + MD (duplicate formats) | 2 — supplemental, non-conflicting parts only | Module 7 (purpose, tier-band structure, general kill-switch concept only) |
| 8 | PO_Decision_Engine_Spec_V2.4_Update.docx / .docx.md | DOCX + MD (duplicate formats) | 2 — supplemental, non-conflicting parts only | Module 7 (used only to identify the conflicts recorded in the exclusions register — no direct rule taught from it) |
| 9 | PO_Decision_Engine_UI_V2.2_Gate5.html | HTML | 4 — interface/reference evidence only | Not used as a content source anywhere; used only to identify conflicts |
| 10 | PO_Intelligence_Engine.xlsx | XLSX | 3 — formula/reference, non-conflicting parts only | Module 7 (tier-band cutoffs only) |
| 11 | PO_Decision_Engine_Sample (1).xlsx | XLSX | 5 — sample/example only | Not used as a direct content source (explicitly a test/sample workbook — see exclusions §12) |
| 12 | Container_Scoring_Model_V2.2.xlsx | XLSX | 3 — formula/reference source; found to contain confirmed defects | Modules 7, 8 (used only as the source of the documented defects, never for its calculated output — see exclusions §8-10) |
| 13 | PO_Decision_Engine_Rules_v2.4.docx.md | MD | duplicate of #7 | (counted with #7) |
| 14 | PO_Decision_Engine_Spec_V2.4_Update.docx.md | MD | duplicate of #8 | (counted with #8) |

All 14 files that exist under `Purchasing_Team/` were inspected during
discovery. Files 13-14 are the Markdown export duplicates of files 7-8's
`.docx` binaries (same content, different format) and are listed separately
here only because they are separate files on disk — see §4 for the duplicate
groups.

## 3. Module → primary source mapping

| Module | Title | Primary source(s) | Prerequisite |
|--------|-------|---------------------|---------------|
| pur-m1 | Purchasing Team Foundation | Purchase Order Ordering Policy SOP; Purchase Order Update Procedure SOP; Purchasing Rule Book | none |
| pur-m2 | End-to-End Purchasing Workflow | Purchase Order Ordering Policy SOP; Order Follow-Up SOP; Container Arrival SOP | pur-m1 |
| pur-m3 | Purchase Requirement and Inventory Inputs | Purchase Order Ordering Policy SOP | pur-m2 |
| pur-m4 | Purchase Order Creation and Ordering Policy | Purchase Order Update Procedure SOP; Purchase Order Ordering Policy SOP | pur-m3 |
| pur-m5 | Purchase Order Updates and Change Control | Purchase Order Update Procedure SOP; Order Follow-Up SOP | pur-m4 |
| pur-m6 | Supplier Follow-Up and Production Control | Order Follow-Up SOP | pur-m5 |
| pur-m7 | Purchase Order Decision Intelligence | PO Decision Engine Rules v2.4; PO Decision Engine Specification Update v2.4; PO Intelligence Engine workbook | pur-m6 |
| pur-m8 | Container Planning and Scoring | Order Follow-Up SOP; Container Scoring Model workbook | pur-m7 |
| pur-m9 | Container Arrival and Stock Receipt | Container Arrival SOP | pur-m8 |
| pur-m10 | Exceptions, Evidence and Final Operational Review | All four SOPs; PO Decision Engine Rules v2.4 | pur-m9 |

Module order was chosen to follow the shared, non-conflicting process
sequence found across the SOP sources (foundation → workflow overview →
purchase-requirement inputs → PO creation → PO updates → supplier follow-up
→ decision intelligence → container planning → stock receipt →
consolidation/exceptions), not the alphabetical or folder order the source
files happen to be named in.

## 4. Duplicate/version groups

1. **Exact-content duplicate pair (format only)**: `PO_Decision_Engine_Rules_v2.4.docx` ≡ `PO_Decision_Engine_Rules_v2.4.docx.md`. Only the `.md` was read directly.
2. **Exact-content duplicate pair (format only)**: `PO_Decision_Engine_Spec_V2.4_Update.docx` ≡ `PO_Decision_Engine_Spec_V2.4_Update.docx.md`. Only the `.md` was read directly.
3. **Near-identical dataset pair**: `PO_Intelligence_Engine.xlsx` and `PO_Decision_Engine_Sample (1).xlsx` share the same fictional 10-SKU dataset; the Sample workbook is explicitly a test/demo variant and is not used as a direct content source.
4. **Three-vintage version chain, same subject**: `PO_Decision_Engine_UI_V2.2_Gate5.html` (V2.2, interface prototype) → `PO_Decision_Engine_Rules_v2.4.docx.md` (v2.4) → `PO_Decision_Engine_Spec_V2.4_Update.docx.md` (v2.4 addendum) — these three disagree with each other on Gate numbering, Gate content, and activation status (exclusions §3-6); none is treated as sole canonical truth.
5. **Conceptual overlap, different altitude, same processes**: the 4 root-level SOP PDFs (procedural/checklist level) vs. the Purchasing Rule Book (formula/threshold level) vs. the tutorial pptx (click-path/UI level) describe the same ordering → dashboard → container loading → receiving workflow with numeric disagreements between them (the CBM conflict, exclusions §1).
6. **Conceptual overlap, different scoring models**: `PO_Intelligence_Engine.xlsx` / `PO_Decision_Engine_Sample.xlsx` (6-dimension asset score, labour-inclusive formula) vs. `Container_Scoring_Model_V2.2.xlsx` (3-dimension + flat constant, no labour term) — not reconciled, both excluded from direct teaching (exclusions §7).

## 5. Excluded rules and defects (full detail in `purchasing-team-exclusions.md`)

| Source(s) | Issue | Effect on this programme |
|-----------|-------|----------------------------|
| Purchasing Rule Book; tutorial; both Ordering/Follow-Up SOPs | Three different CBM threshold values (64/67/68) | No CBM figure is taught or quizzed anywhere |
| PO Decision Engine Rules v2.4 + 2 workbooks vs. Container Scoring Model | 85% vs. 90% Tier-A warehouse cutoff | No cutoff figure is taught or quizzed |
| PO Decision Engine Rules v2.4 vs. Specification Update vs. HTML | Conflicting Gate 2, 5, 6 definitions and activation status | No gate number, definition, or activation status is taught or quizzed |
| PO Decision Engine Rules v2.4 + 2 workbooks vs. Container Scoring Model | Labour-inclusive vs. labour-exclusive True Contribution formula | Neither formula is taught, quizzed, or used |
| Container Scoring Model V2.2 workbook | Off-by-one CBM-subtraction defect; mislabeled summary rows; hardcoded Gate 5 "PASS" stub | This workbook's calculated output is never used as a content source; the defects themselves are cited only as evidence for a general "review before acting" caution |
| Purchasing Rule Book; tutorial vs. Ordering Policy SOP | Ambiguous "MD" wording vs. plain "management" wording | Generic "management approval"/"senior approval step" language used instead of asserting a specific role |

## 6. Confidential content excluded (source-safety)

See `purchasing-team-exclusions.md` §13 for the full category table (real/
informally-coded supplier identities and pricing/performance commentary,
plaintext-credential procedural detail, internal chat/group and facility
names, populated sample data in the HTML prototype, staff/owner initials in
workbook data, and a personal name in file metadata). No real prices, real
PO numbers, bank/payment details, credentials, tokens, or internal URLs were
found as concrete values in any SOP source — all such fields appear only as
blank checklist placeholders in those documents.

## 7. Source priority applied where sources overlapped

Where more than one primary SOP source covered the same topic (for example,
CBM verification appearing in both the Ordering Policy SOP and the
Purchasing Rule Book), the written procedural SOP was treated as the primary
source and the Rule Book was treated as supplemental context, per the
confirmed authority model (§1). Where the Rule Book and the SOPs disagreed
on a specific figure, the figure was excluded rather than either source
being preferred (exclusions §1).

## 8. Known limits

- No pass-percentage, attempt-limit, or sign-off rule is stated in any
  Purchasing source; the existing shared TOSP quiz configuration (80% / 3
  attempts, no sign-off) is reused unchanged — this is a platform default,
  not a figure sourced from the Purchasing documents (confirmed prototype
  default).
- The sources do not establish an organisational boundary between
  "Purchasing" and "Inventory Purchasing" as two separate teams; Module 1
  teaches this explicitly as an open question rather than inventing an
  answer.
- Several acronyms appear in the sources without ever being expanded or
  defined ("NNV," "PH Team" as referenced inside the Purchasing sources,
  "GH Supplier") — none of these are taught as if their meaning were known
  beyond what the source itself states.
- A referenced "SKU Creation Policy" document (named in the Container
  Arrival SOP) is not present in the `Purchasing_Team/` source set and is
  not covered by this programme.
- Whether the PO Decision Engine's algorithmic output is meant to feed into,
  replace, or run parallel to the human-gated SOP approval process is not
  stated by any source; Module 7 addresses this gap directly rather than
  assuming an answer.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step
  was supplied as part of this task.
