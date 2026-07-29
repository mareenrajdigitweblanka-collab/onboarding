# Customer Service Team — Exclusions Register

Internal documentation. Not learner-facing. Records every item deliberately
excluded from this programme, why, its implementation impact, and its future
resolution path. Nothing below was resolved by picking, averaging, or
guessing a value — every exclusion is a deliberate omission, not a silent
substitution.

---

## 1. Filename "v1.6" versus document body "Edition 1.0 / Version 1.0"

**What was found:** the source file's name is
`Ledsone_CS_Handbook_v1.6_Complete.docx`. The document's own cover page and
Chapter 1 Document Ownership table state "Edition 1.0" / "Version 1.0." No
embedded DOCX metadata exists to corroborate either claim.

**Treatment:** per explicit user instruction, the document is treated as
**FINAL PROTOTYPE TRUTH** despite this conflict. The conflict is documented
here and in `customer-service-team-source-map.md`, and is **never silently
corrected** and **never displayed as resolved**. `PROGRAMME.version` in the
programme descriptor (`'1.0'`) is this TOSP programme's own version number —
a distinct concept from the source's disputed label — and the programme
description states plainly that the two disagree.

**Implementation impact:** none on programme content or rules — the
conflict is about the document's own version label, not about which rules
are correct. No lesson, question, or template content depends on resolving
it.

**Future resolution path:** ask the handbook's Content Owner (a source-
internal role, not a specific named individual per this programme's own
confidentiality rule) which label is authoritative, or obtain a genuine
version-history record, then update this register and the source map
accordingly. Not blocking for this implementation.

---

## 2. "BGCT" undefined and hidden

**What was found:** "BGCT" appears only in the confidential source folder
name (`Customer_Service_Team/CST - BGCT/`). A full-text search of the
extracted handbook content returns zero matches for "BGCT" anywhere inside
the document itself.

**Treatment:** treated only as an internal source-folder label. Not
displayed, not defined, no meaning invented, anywhere in learner-facing
content, module/lesson/question text, UI, or programme titles. This register
and the source map are the only places it is even mentioned, and only as a
statement that it is undefined and hidden.

**Implementation impact:** none — no content depended on knowing what BGCT
stands for.

**Future resolution path:** none required unless the business chooses to
define the term for internal use; even then, it would remain an internal
label, not learner-facing content, unless separately instructed.

---

## 3. Numeric eBay Transaction Defect Rate (TDR) threshold excluded

**What was found:** this handbook states an eBay TDR threshold (Chapter 10 /
Chapter 38 account-health tables). During discovery, this figure was found to
conflict with the TDR figure already taught in the existing eBay Team
onboarding programme (a different source, a different document set).

**Treatment:** neither this handbook's TDR figure nor the eBay Team
programme's TDR figure is stated anywhere in this programme — not in any
lesson, not in any quiz question, not in any quiz option (including
distractors), not in the practical task, and not in any learner-facing
reference table or "approved rule" summary. Module 6 teaches marketplace
account-health protection as a **case-response workflow** (never let a case
close without resolution, respond within stated windows, upload return
labels before deadlines) without restating **any** numeric, percentage-based
account-health metric definition for **any** marketplace — this is a
deliberately wider exclusion than TDR alone, to avoid any risk of
inconsistency with the Amazon Team or eBay Team programmes' own numeric
definitions.

**Implementation impact:** Module 6 Lesson 1 explicitly states that specific
numeric account-health metric thresholds are owned and taught by the Amazon
Team and eBay Team programmes, not restated here. The existing eBay Team
programme is **not modified** by this work.

**Future resolution path:** the business (Operations Manager equivalent)
needs to confirm which TDR figure — this handbook's or the eBay Team
programme's — is correct, or issue a corrected, reconciled figure. Once
resolved, a future update could add the reconciled number to both
programmes consistently. Not blocking for this implementation.

---

## 4. Lost-parcel 7-day domestic / 14-day international timing excluded

**What was found:** Chapter 23 (Scenario D12) and Chapter 26 describe a
domestic and an international day-count figure used both as a courier-
investigation trigger and as a "parcel considered lost" threshold. These
figures were flagged during discovery as internally disputed between
sources.

**Treatment:** excluded completely from lessons, quiz questions (including
distractors), the practical task, and any learner-facing workflow
description. Module 3 teaches the full lost-parcel investigation,
verification, courier-contact, evidence, escalation, and customer-update
workflow **using the courier's own confirmed investigation outcome as the
trigger**, not a day count, and **no replacement timing figure was
invented**. Question `cs-m3-q6` explicitly quizzes this workflow decision
(state-based trigger, not a day count) without ever naming the excluded
figures. The one complete template reproduced for this scenario (the "Lost
Parcel Confirmed" template, Module 8 Lesson 3) was checked and confirmed to
contain **no** day-count wording in its own text, so it was safe to include
as-is.

**Implementation impact:** Module 3 Lessons 3-4 and the practical task never
state a specific day count anywhere.

**Future resolution path:** the business needs to confirm the correct
domestic/international figures (or confirm they should be replaced with a
courier-SLA-driven rule instead of a fixed count) before any future version
of this programme states a specific number. Not blocking for this
implementation.

---

## 5. Personal names genericised

**What was found:** the source names specific individuals for governance
roles (Chapter 1, Document Ownership table) and channel/shift assignments
(Chapter 6, Sales Channels and Agent Assignments table), and references
individuals by name in various escalation, approval, and task-table examples
throughout.

**Treatment:** every real name is replaced throughout this programme with a
generic role title: Content Owner, System Owner, Operations Manager,
Visibility Owner, Team Head, Accounts/Admin Role, Marketplace Agent,
Delivery Support Agent, Warehouse Contact, Postage Team Contact. The
underlying rule's meaning (who is accountable for what, and what authority
each role carries) is fully preserved — only the personal identity is
removed. This register intentionally does **not** reproduce the source's
full original name-to-role list, per the instruction that internal
documentation may state that names were genericised without reproducing an
unnecessary employee list.

**Implementation impact:** every module, lesson, question, and the practical
task use only the generic role titles above; none references a real
individual.

**Future resolution path:** none required — this is a permanent
confidentiality policy for this programme, not a temporary gap.

---

## 6. Incomplete templates excluded

**What was found:** Chapter 56 (Canonical Template Register, rule CS-070)
names approximately 30 template IDs, each with a scenario description and a
source-chapter citation. Cross-referencing every named ID against the full
extracted handbook text found **complete, reproducible wording for only 7 of
the 30 register IDs**, plus **one additional complete template** whose full
text exists in the source but does not map precisely onto any single
register ID (Chapter 23's Scenario D2). The remaining 23 register IDs are
description-only — a scenario and a chapter citation, with no template body
text located anywhere in the source.

**Treatment:** only the 8 templates with complete, verified wording are
reproduced or taught as usable message content (Module 8, Lesson 3, and the
practical task's Item 8, which uses the Safety Issue Response template).
None of the 23 description-only IDs are assembled from the scenario
description, none are guessed, and none are presented as if they were
approved templates. The full register (all ~30 IDs, by name and scenario) is
still taught as a **lookup index** — knowing that a named category exists
and where to ask for its wording is a distinct, source-backed skill from
having the wording itself — but the lesson is explicit that description-only
IDs are not usable message content.

**Implementation impact:** see `customer-service-team-source-map.md`'s
full template-support register for the item-by-item YES/NO breakdown and
citations.

**Future resolution path:** request the missing wording for the 23
description-only template IDs from the handbook's Content Owner (a source-
internal role); once supplied and verified, a future version of this
programme could add them to Module 8's supported-template set.

---

## 7. Payment procedures excluded

**What was found:** the handbook routes payment-gateway disputes and
duplicate-charge investigations to the Accounts/Admin Role (Chapter 6,
Chapter 8) without documenting agent-level payment procedures in the same
operational depth as, for example, delivery or returns handling.

**Treatment:** excluded from lessons, questions, and the practical task.
Module 8 Question 6 (`cs-m8-q6`) explicitly teaches that such requests route
to the Accounts/Admin Role or the no-match protocol, without inventing a
payment procedure.

**Implementation impact:** none — no payment procedure is taught as if it
were agent-level guidance.

**Future resolution path:** if the business supplies a separate, approved
payment-procedure source in future, a new module or lesson could be added
without disturbing this one.

---

## 8. Detailed invoice procedures excluded

**What was found:** VAT invoice requests are named as Category 04 (Admin)
triggers and routed to the Accounts/Admin Role (Chapter 6, Chapter 16), but
no detailed invoice-generation procedure is documented in this handbook.

**Treatment:** excluded from lessons, questions, and the practical task, for
the same reason and in the same way as payment procedures (item 7 above).

**Implementation impact:** none.

**Future resolution path:** same as item 7 — a separate, approved source
would be required before this programme could teach detailed invoice
handling.

---

## 9. Data/privacy-request workflows excluded

**What was found:** the handbook does not document a data-subject-access,
data-deletion, or general privacy-request workflow anywhere in its 57
chapters.

**Treatment:** excluded entirely. No lesson, question, or practical-task
item references a data/privacy-request procedure. Where a case genuinely
falls into this gap, this programme teaches the general no-match escalation
rule (Chapter 14) rather than inventing a privacy procedure.

**Implementation impact:** none — this is a genuine gap in the source, not
an oversight in this programme.

**Future resolution path:** would require a separate, approved data-
protection/privacy source before any such content could be added.

---

## 10. Chargeback workflow excluded

**What was found:** "chargeback" is defined only as a glossary term and
named as an Order Defect Rate contributor (glossary, Chapter 39); no
dedicated chargeback-handling chapter or workflow exists in this handbook.

**Treatment:** excluded entirely from lessons, questions, and the practical
task. A chargeback scenario, if it arose, would follow the general
escalation and evidence rules taught in Modules 6 and 7, but this programme
never presents a chargeback-specific procedure as source-backed, because
none exists in the source.

**Implementation impact:** none.

**Future resolution path:** would require a separate, approved source
documenting Ledsone's chargeback procedure.

---

## 11. Unsupported marketplace-case workflows excluded (Wayfair, B&Q, Avasam)

**What was found:** the handbook documents detailed case-handling procedures
for eBay (Resolution Centre) and Amazon (A-to-Z Guarantee Claims, Seller
Central) in real depth (Chapters 38-39), but does not document a comparable
case-handling workflow for Wayfair, B&Q, or Avasam, despite listing all
seven-plus channels as supported sales channels (Chapter 3, Chapter 6).

**Treatment:** Module 6 Lesson 2 teaches eBay and Amazon case-handling in
full, and explicitly states that Wayfair/B&Q/Avasam case procedures are not
documented in the same depth and that the no-match escalation rule applies
instead (`cs-m6-q5` quizzes exactly this). No procedure is invented for these
three channels.

**Implementation impact:** none beyond the explicit statement of the gap.

**Future resolution path:** would require the business to supply or approve
a Wayfair/B&Q/Avasam-specific case-handling source before this programme
could teach it as a documented workflow rather than a no-match scenario.

---

## 12. Evidence-storage system unspecified

**What was found:** the handbook refers to "the case record" throughout
(Chapters 43-46, 55) as the place all case evidence and audit-trail entries
must be captured, but never names a specific database, CRM, ticketing tool,
or software system.

**Treatment:** this programme uses the same generic term, "case record,"
throughout (Module 7), and does not invent, assume, or name any specific
technical system. `cs-m7-q6` explicitly quizzes this as a known limitation.

**Implementation impact:** none — no lesson or question implies a specific
named system exists.

**Future resolution path:** if the business names a specific system in
future (e.g. a CRM name), that could be added to a future version without
changing any underlying evidence rule taught here.

---

## 13. No certification or live-action authority

**What was found:** the handbook is written as an operational reference and
training document for real Customer Support agents; it is not, itself, a
description of a learner-management or certification system, and states no
quiz pass score, attempt limit, sign-off rule, practical-task requirement,
completion definition, mandatory training duration, or Tamil/multilingual
learning requirement anywhere (confirmed during discovery — see the prior
discovery report's sections Z-AD).

**Treatment:** this programme's quiz configuration (80% / 3 attempts), lesson
structure (4 per module), sign-off setting (off), Tamil setting (off), and
completion rule are all **TOSP presentation/configuration decisions**, stated
explicitly as such (never claimed as handbook-derived), and were only
finalised once the user explicitly confirmed them in the implementation
instructions this programme was built from. The completion screen and every
PROTOTYPE_ONLY notice make clear that finishing this programme does not
grant certification, marketplace authorisation, financial approval
authority, customer-contact authorisation, or policy-owner status.

**Implementation impact:** `views/completion-view.js`'s existing, shared,
unmodified `CERTIFICATION_DISCLAIMER` plus this programme's own description
and source blurb (see `customer-service-team-programme-architecture.md`,
"Completion rule") together carry this requirement without any shared file
needing a Customer-Service-specific change.

**Future resolution path:** none required — this is a permanent, correct
characterisation of what a browser-only prototype can and cannot represent.
