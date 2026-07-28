# eBay Team — Source Map

Status: source documents = **FINAL_TRUTH** (read-only) · generated programme
content = FINAL_TRUTH (sourced) · learner progress = PROTOTYPE_ONLY.

This map records every eBay Team source document inspected in `Ebay_Team/`,
its purpose, the duplicate relationship between the two 7-day exports, the
source-priority decision, and everything deliberately excluded before any
module was written. `Ebay_Team/` is gitignored (confidential source
documents, read-only, not modified by this work) — the sourced programme
content lives in `tosp/js/programmes/` instead.

Modules referenced below are `eb-m1 … eb-m8` in
`tosp/js/programmes/ebay-team-modules.js`.

---

## 1. Documents inspected

| # | File | Purpose | Duplicate relationship | Used by |
|---|------|---------|-------------------------|---------|
| 1 | `Ebay_Team/7-Day eBay Traning Program.pptx.pdf` | The 7-day training slide deck — **primary structural source** for module order and day content. (Filename carries a source typo, "Traning"; not altered.) | Same underlying programme as file 2, exported to a different format | eb-m1 … eb-m7 |
| 2 | `Ebay_Team/7-Day-eBay-BGCT-Training-Program.docx.md` | Markdown export of the same 7-day programme | **Secondary, lossy duplicate of file 1** — see §2 | Consulted only to cross-check file 1; not used as a standalone source for any module content |
| 3 | `Ebay_Team/EBAY BGCT.pptx.pdf` ("Create the Perfect Listing") | A separate, deeper listing-optimization reference (title, images, item specifics, description, postage & returns, variation rules) | Not a duplicate of files 1/2 — no day-by-day structure of its own | eb-m8 (and cited in eb-m3/eb-m4 lesson text as forward references only) |

**Total source files inventoried: 3. Duplicate-source pairs: 1** (files 1 & 2).

---

## 2. Source priority and why the Markdown is secondary

File 1 (PDF) and file 2 (Markdown) describe the identical Day 1–7 programme,
but the Markdown export **lost structure** in conversion:

- Day 2: the PDF splits the checklist into "Hands-On Activities" plus a
  3-item "Knowledge Check" (Seller Hub sections / performance metrics /
  order-management flow). The Markdown drops the Knowledge Check entirely.
- Day 7: the PDF cleanly separates "Mistakes to Avoid" from "Final Skill
  Evaluation" as two named tables. The Markdown flattens both into one
  undifferentiated checklist.
- The PDF's "After 7 Days — Trainee Can" outcome list has 6 items; the
  Markdown's closing section carries only 3 of them.

Per the confirmed source priority, **the PDF is treated as authoritative**
and the Markdown's missing sections are **not** treated as evidence that the
PDF content is invalid — the content restored from the PDF (notably eb-m2-l2,
the Day 2 Knowledge Check lesson) is FINAL_TRUTH, sourced directly from the
PDF slides, not an addition beyond the source.

---

## 3. Module → source mapping

| Module | Title | Source | Slides/section |
|--------|-------|--------|-----------------|
| eb-m1 | Introduction to eCommerce | File 1 | Day 1, Slides 1–3 |
| eb-m2 | eBay Account Basics & Seller Hub Navigation | File 1 | Day 2, Slides 4–5 |
| eb-m3 | Product Research & Listing Fundamentals | File 1 | Day 3, Slides 6–7 |
| eb-m4 | Practical Listing Creation | File 1 | Day 4, Slides 8–9 |
| eb-m5 | Account Health & Customer Service | File 1 | Day 5, Slides 10–11 |
| eb-m6 | Order Management & Daily Operations | File 1 | Day 6, Slides 12–13 |
| eb-m7 | Advanced Optimization & Final Evaluation | File 1 | Day 7, Slides 14–16 |
| eb-m8 | Listing Optimization Deep-Dive | File 3 | Slides 2–20 (excluding 15, 18–19 — see §4) |

Module 3 and Module 4 lesson text references the *existence* of the deeper
listing-optimization rules (as a forward pointer to Module 8) without
absorbing file 3's exact figures — those figures are taught exactly once,
in Module 8, per the "do not teach the same rule twice" principle.

---

## 4. Contamination and confidential content excluded (source-safety)

Per the explicit exclusion list, the following were found in file 3 and are
**excluded completely** from every lesson and every question:

| Item | Location in source | Why excluded |
|------|---------------------|---------------|
| "A+ Teampleted" slide, listing an "Amazon A+ Premium Content" description format | File 3, Slide 15 | **Source contamination** — Amazon A+ Content is an Amazon-specific mechanism that does not exist on eBay; this slide reads as an unedited Amazon template left in an eBay deck. Not treated as an eBay rule under any circumstance. |
| Named internal seller accounts: "LEDSone UK", "Sun sone UK", "Electricalsone UK", "LEDSone DE", "LEDSone DE UK Registered" | File 3, Slides 18–19 | Confidential, account-identifying operational data |
| Live listing counts (2,892 / 878 / 1,455 / 822 / 772 listings) | File 3, Slides 18–19 | Confidential internal business figures |
| Internal policy/profile ID strings (e.g. `466e4f4e82ff000`, `243643607012`, `498667be91ba000`) | File 3, Slides 18–19 | Confidential internal identifiers, not general eBay policy |

Only the **general, account-agnostic policy pattern** those slides illustrate
— free shipping via a named carrier, a 30-day buyer-paid return window, an
immediate-pay expectation — is taught, in Module 8, stripped of every
account identity and figure above. This is reflected as the generic
"Postage & Returns" lesson (eb-m8-l6), not as a description of any specific
account.

**Contamination exclusions: 1. Confidential exclusions: 3 categories
(account names, listing counts, internal IDs).**

---

## 5. Conflicts

No numeric or factual conflicts were found between file 1 (PDF) and file 3
(listing deck) — they cover different topics (day sequence vs. listing
mechanics) and never state contradictory figures for the same rule. The only
conflict recorded is the structural one in §2 (PDF vs. Markdown
completeness), which is a completeness gap, not a factual contradiction.

**Conflict count: 0 factual conflicts. 1 structural (completeness) gap,
resolved by source priority.**

---

## 6. Known limits

- "BGCT" (used in file 2's filename and throughout file 3's title bar) is
  never defined in either source document; it is treated as an internal
  naming convention and is not surfaced as a concept in any lesson.
- No explicit prerequisite statement exists beyond the Day 1–7 numbering
  itself; the module chain (`eb-m1 → eb-m2 → … → eb-m8`) is a reasonable,
  but not verbatim-stated, inference from that sequence.
- No pass-percentage, attempt-limit, or team-leader sign-off rule is stated
  in either source. Per the confirmed decision, the existing shared TOSP
  quiz configuration (80% / 3 attempts, no sign-off) is reused unchanged —
  this is a platform default, not a figure sourced from the eBay documents.
- File 3's two confidential slides (18–19) were read in full to identify
  what must be excluded; no value from them appears anywhere in the
  generated content (see §4 and the validation report's confidentiality
  scan).
