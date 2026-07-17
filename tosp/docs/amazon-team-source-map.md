# Amazon Team — Source Map

Status: source documents = **FINAL_TRUTH** (read-only) · generated programme
content = FINAL_TRUTH (sourced) · learner progress = PROTOTYPE_ONLY.

This map records every Amazon Team source document inspected in the repository
root, its final-truth status, what it was used for, and the duplicate/conflict
decisions taken before any module was created. Root source documents are
read-only and were **not** modified.

Modules referenced below are `az-m1 … az-m16` in
`tosp/js/programmes/amazon-team-modules.js`.

---

## 1. Documents inspected

All paths are relative to the repository root. Three tracks exist: **FBA**,
**FBM**, **Vendor Central**. Every document is treated as FINAL_TRUTH per the
user instruction ("The final Amazon Team source documents … Source status:
FINAL_TRUTH").

### FBM track (`Amazon_Team/Amazon FBM/`)

| # | File | Title / date | Purpose | Used by | Category |
|---|------|--------------|---------|---------|----------|
| 1 | `Amazon_Account_Health_Guide_2026.md` | Account Health & Performance · Mar 2026 | AHR bands, performance thresholds, AHA | **az-m1** | foundational |
| 2 | `Amazon Listing SEO Guideline (UK Marketplace).md` | Listing SEO SOP · 2025–2026 | Title/bullets/backend SOP | **az-m2** | foundational |
| 3 | `Amazon_Keyword_Research_Complete_Guide.md` | Keyword Research · 2026 | Match types, Magnet IQ/CPR, A10+ | **az-m3** | operational |
| 4 | `Amazon Competitor Analysis_Guidelines.md` | Competitor Analysis | Competitor criteria, price positioning | **az-m4** | operational |
| 5 | `PRICING STRATEGY_Guide Lines.md` | Dynamic Pricing · **2025** | Break-even, fees, Buy Box, launch ladder | **az-m5** | advanced |
| — | `AMAZON SEO -BGCT - 2026 .pptx (2).pdf` | SEO deck (binary PDF) | Slide summary of docs 2 & 3 | reference-only (not readable) | reference |
| — | `Amazon_Image_Guidelines2026_FINAL 1.pdf` | Image Guidelines FINAL (binary PDF) | Image rules | reference-only (not readable) | reference |

### FBA track (`Amazon_Team/Amazon FBA/`)

| # | File | Title / date | Purpose | Used by | Category |
|---|------|--------------|---------|---------|----------|
| 6 | `AMAZON FBA_Guidelines 2026.md` | FBA Rules & Product Selection · Feb 2026 | Eligibility, 180-day, pricing, conversion | **az-m6** | foundational |
| 7 | `Amazon FBA Unfulfillable Settings.md` | Unfulfillable Settings · Jan 2026 | Auto-dispose configuration | **az-m7** | operational |
| 8 | `SIPP – Ships in Product Packaging.md` | SIPP webinar summary · Feb 2025 fee update | SIPP programme + enrollment | **az-m8** | advanced/optional |

### Vendor Central track (`Amazon_Team/Amazon vendor/`, authored sequence 01–10)

| # | File | Used by | Category |
|---|------|---------|----------|
| 9 | `01. Amazon_Vendor_Intro_Guidline_2026.md` | **az-m9** | introductory |
| 10 | `02. Amazon_FBM_FBA_Vendor_Complete_Guide_2026.docx.md` | **az-m9** | introductory |
| 11 | `03. Amazon_Product_Selection_Vendor_Central_Migration_Guide_2026.docx.md` | **az-m10** | operational |
| 12 | `04. LEDSone_Vendor_Central_Listings_Guide_2026.docx.md` | **az-m11** | operational |
| 13 | `05. LEDSone_Label_Booking_Guide_2026.docx.md` | **az-m12** | operational |
| 14 | `06. Amazon_Vendor_Central_Invoice_Guide_2026.docx.md` | **az-m13** | operational |
| 15 | `07. Receive_Variance_Dashboard_Dispute_Daily_Check_Guide_2026.docx.md` | **az-m14** | operational |
| 16 | `08. Amzon_Vendor_Chargeback _Guidline_2026.docx.md` | **az-m15** | operational/reference |
| 17 | `09. Amzon_Vendor_Shortage_Claims_Guidline_2026.docx.md` | **az-m14** | advanced |
| 18 | `10. Amazon _Vendor_Product_Returns_Management_Guide_2026.docx.md` | **az-m16** | operational |
| — | `Master Copy of Amazon Process Documentation_BGCT_2026 - Amazon Vendor Process.csv` | (sequence authority) | reference / index |

**Total source documents inspected: 21** (18 markdown/CSV read in full + 1 CSV
index + 2 binary PDFs recorded but not machine-readable). Documents actually
used to author content: **18**.

---

## 2. Implied learning sequence (source-backed, not filename-alphabetical)

Filename order was **not** treated as learning order. Sequence was derived from
document headings, the Vendor CSV master index (authoritative 01→10 ordering),
and prerequisite logic:

1. **FBM Foundations** (az-m1…az-m5): Account Health first (the compliance
   floor), then listing SEO → keyword research → competitor analysis → pricing.
2. **FBA Operations** (az-m6…az-m8): FBA selection (only FBM-proven products go
   to FBA) → unfulfillable settings → SIPP (optional/advanced).
3. **Vendor Central** (az-m9…az-m16): the authored 01→10 sequence from the CSV
   master index — intro → migration → listing → PO/label → invoicing →
   variance/shortage → chargebacks → returns.

The engine unlocks modules strictly in `orderIndex` order, so this is a single
linear path across the three tracks.

---

## 3. Duplicate findings & canonical choices

| Overlap | Documents | Canonical choice | Rationale |
|---------|-----------|------------------|-----------|
| SEO / keyword / listing writing | Listing SEO (2), Keyword Research (3), SEO PDF, Vendor Listings (12) | **Listing SEO (2)** for on-page writing (az-m2); **Keyword Research (3)** for research/scoring/algorithm (az-m3); Vendor Listings (12) only for the **Vendor channel** image/NIS rules (az-m11) | Most complete + correct scope per channel; SEO PDF is a superseded slide summary |
| FBA fees / economics | Pricing (5), FBA Guidelines (6), Platforms (10), Migration (11) | **Pricing (5)** for fee/Buy-Box figures (az-m5); **FBA Guidelines (6)** for FBA selection thresholds (az-m6) | Each is the most granular for its own topic; different fee components, not true duplicates |
| Carton / dispute / chargeback rules | Label Booking (13), RVD (15), Chargeback (16), Shortage (17) | **Label Booking (13)** for carton/dispatch (az-m12); **Chargeback (16)** for the metric set (az-m15); **Shortage (17)** for dispute escalation (az-m14, superseding the shorter RVD cheat-sheet) | Avoids teaching the same 23 kg / 30-day rules in multiple modules |
| Two FBA-folder docs | FBA Guidelines (6) vs Unfulfillable (7) | Both kept (az-m6, az-m7) | Different scope (selection vs disposal) — not duplicates |

No module teaches the same rule twice. Where a rule recurs across documents
(e.g. 23 kg carton, POD-mandatory), it is taught once in its canonical module
and merely cited elsewhere.

**Duplicate-source groups identified: 4.**

---

## 4. Conflicts (recorded, NOT implemented — `SOURCE_CONFLICT`)

These contradictions were found across the SEO documents. Per the requirement,
the disputed figures are **not stated as fact in any lesson and are not used in
any quiz question** until reconciled by the source owners.

| ID | Field | Conflicting values | Sources | Handling |
|----|-------|--------------------|---------|----------|
| SC-1 | Backend search-term limit | "250 bytes / 249 chars" vs "500 characters per field" vs "2500-character expansion" | Listing SEO (2) base vs its own 2026 insert; Keyword Research (3) | Lessons state backend rules **qualitatively** (space-separated, singular, no brand/ASIN/competitor) with **no numeric limit**; no quiz item on backend length |
| SC-2 | Product description character limit | "up to 1500" vs "2000 (rec 1500–1800)" vs "min 500 / max 2000" | Listing SEO (2) vs Keyword Research (3) vs Vendor Listings (12) | No lesson states a description character limit; no quiz item on it |
| SC-3 (minor) | Title length phrasing | "150–200" vs "max 200 / aim <150" | (2) vs (3),(12) | Lessons use the source's own phrasing per channel; not quizzed as a single number where ambiguous |
| Flag | Pricing doc year stamp | Pricing doc stamped **2025** while peers are 2026 | Pricing (5) | Cited honestly as "Dynamic Pricing Strategy Guide (2025)"; figures used are stable fee/Buy-Box facts |
| Data defect | Vendor doc 02 Section 4 mis-populated (repeats FBA text) | Platforms (10) | Section 4 **not** used for any content |

**Conflict count: 3 substantive (SC-1..SC-3) + 2 flags.**

---

## 5. Content excluded from quizzes (sensitive / assumption-dependent)

Per requirements (no invented rules, no sensitive/named-contact content, no
assumption-based questions), the following were **excluded** from all lessons
and questions:

- **Named individuals / contacts:** "Nivarnan" (invoice doc), Amazon internal
  email `AP-CI-Feedback-GB@amazon.com`, `amazon.c2fo.com`.
- **Confidential account identifiers:** vendor codes (EQ73N, OW8WB, UKIRF),
  Payee Code (R8U1M), VAT number (GB287587828), company name/address, login
  URLs, live account IDs (return IDs, VRET/PO/tracking/EAN numbers), FC codes.
- **Live scorecard figures** (e.g. In-Full 9.33%, Overweight −£1.21, Packaging
  £18.19) — current internal performance, not stable facts.
- **Company-specific price guardrails** (Floor £22.07 / Ceiling £26.32) and
  example cost prices — product-specific, not general rules.
- **Conflicted figures** SC-1 / SC-2 (see §4).
- **Internal escalation tactics / soft estimates** ("shipment hold warning",
  "60–75% success"), and the external non-corporate URL in the SIPP doc.
- The **"PS" currency artifact** in the Unfulfillable doc is a mangled "£";
  lessons use £, not "PS".

---

## 6. Unused / reference-only documents

- The two **binary PDFs** (SEO deck, Image Guidelines) could not be machine-read
  and are reference-only; their topics are covered by the markdown SEO docs and
  the Vendor image rules, so no content depends on them.
- **CSV master index** used only to confirm the Vendor 01→10 sequence (it also
  lists planned files 11–13 that do not yet exist in the folder — not used).
- **Vendor doc 02 Section 4** excluded as a known data defect (see §4).

---

## 7. Known limits

- Where sources conflicted (SC-1, SC-2) the safe choice was to teach the rule
  qualitatively and omit the disputed number; a future revision can add those
  facts once the source owners reconcile them.
- The two PDFs were not ingested; if their exact figures are needed, convert
  them to text and extend the relevant module.
- All figures are reproduced verbatim from FINAL source documents; none were
  invented. `FINAL_USER_ACCEPTANCE: PENDING` (no separate business acceptance
  rule was provided).
