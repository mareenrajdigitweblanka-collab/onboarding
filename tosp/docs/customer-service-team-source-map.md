# Customer Service Team — Source Map

Internal documentation. Not learner-facing. Records the repository-relative
source path (never shown in learner UI), the source's own authority claim,
the full chapter inventory, and how every chapter maps to this programme's
eight modules and canonical-register lessons.

## Source file

- **Repository-relative path (internal only, never shown in learner UI):**
  `Customer_Service_Team/CST - BGCT/Ledsone_CS_Handbook_v1.6_Complete.docx`
- **Learner-safe source title used throughout this programme:**
  "Ledsone Customer Support Handbook"
- **Format:** DOCX, single file, no companion exports, no separate PDF/XLSX/
  CSV/HTML sources exist under `Customer_Service_Team/`.
- **Size:** ~950 KB compressed; extracted text ~238,000 characters, 196
  internal tables, 57 chapters across 12 sections.
- **Source authority (user-confirmed):** treated as **FINAL PROTOTYPE TRUTH**
  for this implementation. The document was never modified, renamed, moved,
  staged, committed, or copied into `tosp/`; it was read only, via a
  structural XML extraction to a scratch file outside the repository working
  tree, for content-authoring purposes.

## Version-label conflict — documented, not resolved

The source **filename** states `v1.6` (`Ledsone_CS_Handbook_v1.6_Complete.docx`).
The source's own **document body** states a different version in two places:

- Cover page: "Edition 1.0 | May 2026 | CONFIDENTIAL — INTERNAL USE ONLY"
- Chapter 1, Document Ownership table: "Version 1.0"
- Closing line: "END OF CUSTOMER SUPPORT HANDBOOK — Edition 1.0 — Ledsone UK
  Ltd — May 2026"

No embedded DOCX metadata (`docProps/core.xml` / `app.xml`) exists to
corroborate either claim independently — the file carries no author, created,
or modified timestamp.

**Per explicit user instruction:** this conflict is real, is documented here
and in `customer-service-team-exclusions.md`, and is **never silently
corrected** and **never displayed as resolved** anywhere in learner-facing
content. `PROGRAMME.version` in `customer-service-team-programme.js` (`'1.0'`)
is this **TOSP programme's own** version number — a separate concept from the
source document's disputed version label — and the programme description
explicitly states that the conflict exists rather than implying a single
agreed version.

## "BGCT" — folder label, never defined or displayed

`BGCT` appears only in the confidential source folder path (`CST - BGCT`). It
does **not** appear anywhere inside the handbook's own extracted text (zero
matches on a full-text search). No meaning is stated in the source, no
meaning is invented by this programme, and the string never appears in any
learner-facing title, module, lesson, question, template, or UI element.

## 57-chapter inventory (12 sections)

| Section | Chapters | Title |
|---|---|---|
| Front matter | — | Foreword; How to Use This Handbook; Glossary (A — Marketplace & Platform Terms; B — Customer Support Process Terms); Understanding Your Role (Parts A-C) |
| 1 — Handbook Governance & Control | 1-5 | Handbook Governance Framework; Version Control & Change Management; Handbook Scope & Exclusion Matrix; Rule Ownership Registry; Handbook Quality Assurance System |
| 2 — Company & Operational Foundation | 6-10 | Company Overview; Customer Support Mission & Standards; Customer Support Team Structure; Working Hours & SLA Standards; KPI & Performance Management |
| 3 — Rule Engine & Decision Architecture | 11-15 | Master Rule Architecture; Decision Tree & Gate Logic System; Rule Conflict Resolution System; Exception & No-Match Handling; BLOS Governance System |
| 4 — Message & Communication System | 16-22 | Complete Message Categorisation System; Message Reading & Conversation Analysis; Order Verification Process; Response Building Framework; Marketplace Communication Rules; Emotional Intelligence & Difficult Customer Handling; Multilingual & International Support Standards |
| 5 — Delivery & Courier Management | 23-26 | Delivery Query Handling; INR (Item Not Received) Handling System; Courier Management System; Courier Escalation & Appeals |
| 6 — Returns, Refunds & Warranty System | 27-32 | Return Policy Master System; Refund Decision Engine; Partial Refund Rules; Return Label Management; Warranty Handling System; Refund Escalation Rules |
| 7 — Product Issue & Technical Support System | 33-37 | Damaged Item Handling; Faulty Product Troubleshooting; Missing Parts & Wrong Item Handling; Product Information & Technical Support; Safety, Compliance & Recall Handling |
| 8 — Marketplace Protection & Risk Management | 38-42 | eBay Account Health Protection; Amazon Account Health Protection; Negative Feedback Management; Fraud Detection & Abuse Prevention; Crisis Management Procedures |
| 9 — Evidence, Audit & Compliance Discipline | 43-46 | Evidence Requirement Matrix; Audit Trail & Logging Standards; Evidence Failure Handling; Documentation & Record Keeping |
| 10 — Internal Operations & Business Workflows | 47-50 | Supplier Communication System; Warehouse Communication Workflow; Inventory & Out-of-Stock Handling; Internal Escalation Framework |
| 11 (canonical registers, unlabelled as its own numbered section but positioned after 50) | 51-56 | Claim Window Definitions (CS-051); Pre-Send Message Checklist (CS-042); Fraud Signal Register (CS-047); Message Category Register (CS-061); Evidence Requirement Matrix — canonical (CS-045); Canonical Template Register (CS-070) |
| 12 — Master Operational Principles & Golden Rules | 57 | The Ten Golden Principles |

Chapters 51-56 are explicitly self-described in the source as the single
authoritative version of a rule that also appears in shorter form earlier
(e.g. Chapter 51 supersedes the shorter claim-window mentions in Chapters 27
and 31; Chapter 54 supersedes the shorter category list in Chapter 16).
Module 8 of this programme teaches this precedence explicitly.

## Module ↔ chapter mapping

| Module | Chapters (primary) |
|---|---|
| 1 — Customer Service Foundation and Governance | 1-15 |
| 2 — Communication and Message Handling | 16-22, plus canonical Ch. 52, 54 |
| 3 — Delivery and Courier Management | 23-26 |
| 4 — Customer Returns, Refunds and Warranty | 27-32, plus canonical Ch. 51 |
| 5 — Product Issues and Technical Support | 33-37 |
| 6 — Marketplace Protection and Risk | 38-42 |
| 7 — Evidence, Audit and Internal Operations | 43-50, plus canonical Ch. 55 |
| 8 — Canonical References and Golden Principles | 51-57 (all six canonical-register chapters plus the closing chapter) |

The four-lessons-per-module structure is a **TOSP presentation decision**,
not a claim that the handbook itself defines four lessons per module — this
is stated explicitly in the header comment of
`customer-service-team-modules.js`.

## Canonical register mapping (Chapters 51-56)

| Chapter | Rule ID | Superseded/shorter earlier mention | Taught in |
|---|---|---|---|
| 51 — Claim Window Definitions | CS-051 | Ch. 27 (Return Eligibility Matrix), Ch. 31 (Warranty Claim Timeline) | Module 4 (applied), Module 8 Lesson 1 (precedence skill) |
| 52 — Pre-Send Message Checklist | CS-042 | Ch. 19 (Anatomy of a Correct Response, summary form) | Module 2 (applied), Module 8 Lesson 2 (full 9-point spec) |
| 53 — Fraud Signal Register | CS-047 | Ch. 17 (Detecting Fraud and Abuse Signals), Ch. 41 (High-Risk Behaviour Patterns) | Module 6 Lesson 3 |
| 54 — Message Category Register | CS-061 | Ch. 16 (The 11 Categories) | Module 2 Lesson 1 (applied), Module 8 Lesson 1 (precedence skill) |
| 55 — Evidence Requirement Matrix (canonical, adds Team Head approval column) | CS-045 | Ch. 43 (Evidence Requirement Matrix, shorter form) | Module 7 Lesson 1 (applied), Module 8 Lesson 2 (full expanded matrix) |
| 56 — Canonical Template Register | CS-070 | Ch. 19, 23, 24, 27-29, 33-35, 37-40 (individual inline templates) | Module 8 Lesson 3 |

## Template-support register (Chapter 56, ~30 named IDs)

Chapter 56 names 30 template IDs. This programme reproduces **only** the
templates whose **complete wording** was actually found elsewhere in the
handbook's own text. Every other ID is known by name/scenario/chapter only
and is never taught as usable, reproducible message content — see
`customer-service-team-exclusions.md` item 6 for the full policy.

| Template ID (Ch. 56 register) | Scenario | Register's cited chapter | Full wording found? | Where full text was actually located | Learner usage |
|---|---|---|---|---|---|
| TMPL-HLD-01 | Holding message — general, internal investigation required | Ch. 19 | **YES** | Ch. 9 ("The Holding Message Rule" — the register's own chapter citation points to Ch.19, but the actual reproduced template text is in Ch.9; both are cited in the lesson for transparency) | Taught in Module 8 Lesson 3 as a complete, reproducible template |
| TMPL-DEL-01 | Delivery query — parcel in transit, within expected window | Ch. 23 | **YES** | Ch. 23, Template D1 | Taught (exact match) |
| TMPL-DEL-02 | Delivery query — delayed beyond estimated date, tracking still moving | Ch. 23 | NO | — | Not taught as a message; Ch. 23 Scenario D2 has complete text for a related-but-distinct scenario (no movement yet, not "delayed beyond estimate") — see the unmapped extra row below |
| TMPL-DEL-03 | No tracking movement 3+ days, investigation being opened | Ch. 23 | **YES** (close match) | Ch. 23, Template D4 (2-7 days no movement, investigation contacted) | Taught (closest match, noted as approximate) |
| TMPL-DEL-04 | Delivered Not Received (DNR) | Ch. 23 | NO | — | Not taught |
| TMPL-DEL-05 | Holding message — courier investigation opened | Ch. 23 | NO | — | Not taught (distinct from the general TMPL-HLD-01 already covered) |
| TMPL-INR-01 | INR — initial acknowledgement, investigation opened | Ch. 24 | NO | — | Not taught |
| TMPL-INR-02 | INR — courier confirmed lost, replacement/refund choice offered | Ch. 24 | **YES** (close match) | Ch. 23, Template D12 (physically located in Ch.23, not Ch.24 as the register states) | Taught — verified to contain **no** disputed lost-parcel timing figures in its own wording |
| TMPL-RET-01 | Return — buyer-side, within 30-day window, accepted | Ch. 27 | NO | — | Not taught |
| TMPL-RET-02 | Return — buyer-side, outside 30-day window, goodwill exception | Ch. 27 | NO | — | Not taught |
| TMPL-RET-03 | Return — seller-side fault confirmed, prepaid label issued | Ch. 27 | NO | — | Not taught |
| TMPL-RET-04 | High-value return (£100+) — acknowledgement while awaiting approval | Ch. 27 | NO | — | Not taught |
| TMPL-REF-01 | Refund confirmed, amount + timeline advised | Ch. 28 | NO | — | Not taught |
| TMPL-REF-02 | Partial refund (damage discount) explanation | Ch. 29 | NO | — | Not taught |
| TMPL-DAM-01 | Damaged item — initial response, requesting photos | Ch. 33 | **YES** | Ch. 33, Template DA1 | Taught (exact match) |
| TMPL-DAM-02 | Damaged item — evidence verified, offering replacement | Ch. 33 | NO | — | Not taught |
| TMPL-DAM-03 | Damaged item — cosmetic damage, partial discount offered | Ch. 33 | NO | — | Not taught |
| TMPL-FLT-01 | Defective item — initial response, requesting photos | Ch. 34 | NO | — | Not taught |
| TMPL-FLT-02 | Defective item — fault confirmed, offering replacement | Ch. 34 | NO | — | Not taught |
| TMPL-FLT-03 | Defective item — troubleshooting steps offered first | Ch. 34 | NO | — | Not taught |
| TMPL-SAF-01 | Safety concern — stop-use instruction, urgent Team Head notification | Ch. 37 | **YES** | Ch. 37, Template SF1 | Taught (exact match) — used as the practical task's response template |
| TMPL-WRG-01 | Wrong item — initial response, requesting photos | Ch. 35 | NO | — | Not taught |
| TMPL-WRG-02 | Wrong item confirmed — correct item dispatched | Ch. 35 | NO | — | Not taught |
| TMPL-MIS-01 | Missing parts — initial response, requesting a photo | Ch. 35 | NO | — | Not taught |
| TMPL-MIS-02 | Missing parts confirmed — parts dispatched | Ch. 35 | NO | — | Not taught |
| TMPL-PRE-01 | Pre-sales — confirmed specification answer | Ch. 36 | NO | — | Not taught |
| TMPL-PRE-02 | Pre-sales — specification not confirmable, referred to listing | Ch. 36 | NO | — | Not taught |
| TMPL-WAR-01 | Warranty — within 60-day window, standard product fault | Ch. 31 | NO | — | Not taught |
| TMPL-WAR-02 | Warranty — beyond 60 days, escalated to Team Head | Ch. 31 | **YES** (close match) | Ch. 31, Template W1 ("Initial Warranty Claim Response, 31 Days to 3 Years" — spans both the 31-60-day and 61-day-to-3-year windows) | Taught (closest match, noted as approximate) |
| TMPL-HLD-02 | Holding message — awaiting warehouse confirmation | Ch. 19 | NO | — | Not taught |
| TMPL-HLD-03 | Holding message — awaiting Team Head decision | Ch. 19 | NO | — | Not taught |
| TMPL-EBY-01 | eBay case response — label uploaded before deadline | Ch. 38 | NO | — | Not taught |
| TMPL-AMZ-01 | Amazon A-to-Z — evidence submission | Ch. 39 | NO | — | Not taught |
| TMPL-AMZ-02 | Amazon A-to-Z — proactive refund offered | Ch. 39 | NO | — | Not taught |
| TMPL-FBK-01 | Negative feedback public response | Ch. 40 | NO | — | Not taught |
| *(unmapped — not a Ch. 56 register ID)* | Delivery update — no tracking movement yet (within 3-4 days of dispatch) | Ch. 23, Scenario D2 | **YES** | Ch. 23, Template D2 | Taught in Module 8 Lesson 3 as an additional complete template, cited by its own chapter/scenario label rather than forced into a Ch.56 ID it does not precisely match |

**Result: 7 of the 30 Chapter 56 register IDs have complete, reproducible
wording (TMPL-HLD-01, TMPL-DEL-01, TMPL-DEL-03, TMPL-INR-02, TMPL-WAR-02,
TMPL-DAM-01, TMPL-SAF-01), plus one additional complete template found
outside the register's own numbering (Ch.23 Scenario D2) — 8 usable
templates in total. The remaining 23 register IDs are description-only and
are never reproduced as message content.**

## Confidential exclusions applied throughout

- Real employee names in Ch. 1 (Document Ownership table: Content Owner,
  System Owner, Operations Manager, Visibility Owner) and Ch. 6 (Sales
  Channels and Agent Assignments table: named agents per channel/shift) are
  replaced everywhere with generic role titles. This source map does **not**
  reproduce the full original name list — see
  `customer-service-team-exclusions.md` item 5 for the policy statement only.
- No real customer names, addresses, emails, phone numbers, order IDs,
  tracking numbers, marketplace case IDs, payment details, or transcripts
  exist anywhere in the source (all in-source examples already use bracketed
  placeholders such as `[Customer Name]`, `[Order Number]`) — none are
  reproduced or invented by this programme; the practical task uses entirely
  fictional data (see `customer-service-team-programme.js`, PRACTICAL_TASK).
- No local absolute paths, source hashes, or credentials appear anywhere in
  learner-facing content — only this internal source map records the
  repository-relative source path.

## Cross-programme overlap (see also `customer-service-team-exclusions.md` item 3)

| Overlapping topic | Existing programme | Resolution applied here |
|---|---|---|
| Marketplace account-health metrics (ODR, LDR, TDR, VTR, OTDR, Feedback %, etc.) | Amazon Team (`az-m1`), eBay Team (`eb-m5`) | No numeric threshold for any marketplace account-health metric is stated anywhere in this programme (Module 6). The eBay TDR figure specifically conflicts between this handbook and the existing eBay Team programme content and is never chosen between — see exclusions item 3. |
| "Returns" terminology | Amazon Team `az-m16` ("Vendor Product Returns Management" — vendor-to-Amazon warehouse returns of unsold stock) | This programme's Module 4 is titled "Customer Returns, Refunds and Warranty" (never just "Returns") specifically to avoid confusion with Amazon's vendor-returns module, which covers a structurally different process. |
| Customer-service-standard content | eBay Team `eb-m5-l2` (brief mention) | No overlap in depth — eBay Team's mention is a few bullets; this programme's Modules 2, 3, 4, 5, 6, 7 are the full, detailed treatment and are not duplicated back into the eBay Team programme, which is not modified by this work. |
| Digital Marketing / Purchasing | No overlap found (their "customer"/"escalation" content is ad-audience and supply-chain terminology, unrelated to human customer support) | No action needed. |

## Known gaps (source itself does not cover in the depth this programme requires)

- Detailed case-handling procedures for Wayfair, B&Q, and Avasam (only eBay
  and Amazon are documented to the same depth as this programme requires).
- Payment procedures, detailed invoice procedures, data/privacy-request
  workflows, and chargeback handling (the handbook itself names these as
  routed to the Accounts/Admin Role or as out of its own documented scope —
  Chapter 3, "What This Handbook Does Not Cover").
- The evidence-storage/case-record system is referred to generically as "the
  case record" throughout the source; no specific database or software
  system is ever named, and this programme does not invent one.

See `customer-service-team-exclusions.md` for the full exclusions register
with implementation impact and future-resolution paths.
