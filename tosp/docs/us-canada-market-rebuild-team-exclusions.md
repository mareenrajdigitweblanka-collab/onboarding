# US and Canada Market Rebuild Team — Exclusions Register

Internal documentation. Not learner-facing. Records every item deliberately
excluded from this programme, why, its implementation impact, and its future
resolution path. Nothing below was resolved by picking, averaging, or
guessing a value — every exclusion is a deliberate omission, not a silent
substitution.

---

## 1. Canada scope — not supported by source

**What was found:** the entire source folder (`US_Or_Canada_Market_Rebuild_Team/`)
contains exactly two DOCX files. A full-text, case-insensitive search of both
extracted documents for "Canada," "Canadian," and "CAD" returned **zero
matches** in either document. Both documents describe US-only marketplace
operations (Amazon, eBay, Wayfair).

**Treatment:** no lesson, question, or practical-task item in this programme
teaches a Canada-specific rule as fact. Every lesson explicitly states
"Applicability: US only" rather than leaving the scope implicit. The
programme's required title retains "and Canada" per explicit instruction, but
the programme description, dashboard blurb, and Sources screen all state
plainly that Canada scope is not supported by source. This is the single
largest and most consequential exclusion in this programme.

**Implementation impact:** the programme's six modules are structured as one
shared US-only track, not a US-track/Canada-track split, because no
Canada-specific content exists to form a second track from.

**Future resolution path:** obtain a dedicated Canada-market source document
(covering, at minimum, marketplace scope, currency, tax/duty, listing
compliance, and shipping/fulfilment) before any Canada-specific module,
lesson, or question could be added to this programme.

---

## 2. "Market rebuild" — not defined by either source document

**What was found:** neither source document uses the word "rebuild"
anywhere. Both describe an ongoing Best-Practice operational standard
("BGCT") for existing accounts, not a market-entry, relaunch, or
catalogue-rebuild process. Neither document describes market-entry analysis,
market selection, catalogue rebuild, pricing rebuild, or a launch/relaunch
methodology.

**Treatment — corrected 2026-07-29 (source-accuracy reconciliation):** an
earlier version of this programme's learner-facing content stated that
"market rebuild... means exactly this: converting ad-hoc... practices into
BGCT's... standard" — presenting a specific meaning as if the sources
defined it. That framing has been removed everywhere (module content,
Progression Rules, dashboard/sources copy, practical task). "Market Rebuild"
is now treated, and stated to the learner, strictly as **the approved
project requirement title label** — not a source-defined methodology. This
programme's learner-facing content instead states plainly that it applies
the approved US marketplace operational guidance the source documents
actually contain (the BGCT standard: warehouse, listing, refund, shipment,
account-health, and escalation/governance content), without characterising
that guidance as "the rebuild process" or claiming the sources support
market-entry analysis, market selection, catalogue rebuild, pricing rebuild,
launch/relaunch methodology, Canada expansion, or legal/compliance
readiness. No candidate meaning of "market rebuild" (listing rebuild,
account recovery, market expansion, sales recovery, advertising rebuild, or
broader operational restructuring) is taught, quizzed, or implied anywhere.

**Implementation impact:** this programme does not contain a
product/market-assessment module, a catalogue-relaunch workflow, a
compliance/certification module, or an advertising-campaign-build module,
because none of these exists in source and none is invented. Quiz question
`usca-m1-q2` was reworded so its correct answer is "no formal market-rebuild
methodology is source-defined," not a description of what "market rebuild
means."

**Future resolution path:** if the business defines "market rebuild" more
broadly in a future source document, this programme's scope statement (and
potentially its module structure) would need a documented update against
that new source — not against assumption.

---

## 2a. CURRENT PROTOTYPE SCOPE notice — added 2026-07-29

**What was found:** during a source-accuracy reconciliation pass, the
programme's learner-facing content was found to describe the Canada-scope
gap (item 1 above) only inside longer descriptive paragraphs, without a
short, unmissable, consistently worded scope statement.

**Treatment:** a standard notice — **"CURRENT PROTOTYPE SCOPE: US
MARKETPLACE OPERATIONS ONLY. Canada-market training is not included because
no approved Canada source material was available."** — was added as the
opening statement of `PROGRAMME.description` (feeds the programme-selection
card, the dashboard, and the programme/journey introduction screen, since
all three read the same field), the practical task's `intro` field, and a
new guarded `ui.scopeNote` field rendered on the completion screen (see
`programme-architecture.md`, "Whole-app integration," for the one-line,
additive, guarded change this required in the shared `completion-view.js`).

**Implementation impact:** the notice is now visible, verified live in a
real browser, on: the programme-selection card, the dashboard, the
programme/journey introduction, the practical-task introduction, and the
completion screen.

**Future resolution path:** none required — remove or update the notice
text only if Canada-market source material becomes available and a Canada
track is separately approved and built.

---

## 3. Confirmed marketplace scope — Walmart excluded from confirmed scope (SOURCE_CONFLICT)

**What was found:** both documents' cover pages and some body text name
"Walmart" alongside Amazon, eBay, and Wayfair (e.g. "Walmart Seller Center,"
"Amazon/eBay/Walmart fees," Doc 1's A.2 coverage table lists "Amazon, eBay,
Wayfair, Walmart (US)"). However, Doc 2's own explicit "Platforms Covered"
field (Section B.1, Standard Identification table) states only "Amazon (US),
eBay (US), Wayfair (US)" — Walmart is absent from that one authoritative
field.

**Treatment:** documented as an unresolved SOURCE_CONFLICT. This programme's
confirmed scope statement (Module 1, Lesson 2) names Amazon, eBay, and
Wayfair only. Walmart is neither taught as confirmed scope nor asserted as
excluded — it is stated as a documented scope conflict, and no lesson or
quiz question treats a Walmart-specific rule as confirmed.

**Implementation impact:** Module 2, Lesson 4 (Amazon/eBay marketplace
guidelines) does not include a Walmart-specific checklist, because the
source provides no Walmart criteria section at the same depth as Amazon or
eBay, regardless of the scope-field question.

**Future resolution path:** ask the Account Holder (source-internal role)
which platforms-covered statement is authoritative, or obtain a corrected,
single source-of-truth scope statement.

---

## 4. Late Shipment Rate — numeric target conflict (one occurrence vs. four)

**What was found:** within Doc 1 itself, the two figures directly conflict.
Section A.5.1 ("Mandatory Account Health Targets") states one figure for
Late Shipment Rate. Every other Late Shipment Rate figure in Doc 1 — Section
B.1.4 ("Same-Day Shipment Control" KPI Targets), Section B.4 ("Shipment
Processing Criteria" KPI Targets), and Section B.5 ("Master KPI Reference
Table") — all three state a different, stricter figure. Doc 2's own KPI
section (B.3, "Mandatory Account Health KPI Targets") states the same
stricter figure and does not contain the looser figure anywhere. So the
looser figure appears exactly once, in Doc 1's account-health target list
only, while every operational KPI table across both documents (four separate
table instances) states the stricter figure.

**Treatment — corrected 2026-07-29 (source-accuracy reconciliation):** an
earlier version of this programme resolved this conflict itself by always
teaching the stricter figure as "the operative target." That was a mistake:
this programme must never select between two disputed source figures on the
learner's behalf. **Both disputed numeric values are now excluded entirely**
from every learner-facing surface — no module, lesson, KPI table, quiz
question, answer option (including distractors), quiz feedback, practical-
task item, or completion summary states either figure as a Late Shipment
Rate target anywhere. `usca-m2-l2`, `usca-m3-l4`, and `usca-m6-l1` now teach
only that Late Shipment Rate is a monitored KPI, that its numeric target is
disputed between the two source documents, that the disagreement requires
business-owner resolution, and that a learner must never select a threshold
independently — always use the current approved operational source instead.
`usca-m2-q3` was reworded to test exactly this handling (escalate, don't
pick) without naming either disputed figure. The practical task
(`usca-pt-003`) was reworded so the fictional KPI snapshot no longer includes
a Late Shipment Rate figure to "pass or fail" against a stated target;
instead it asks the learner to explain why no such comparison can be made.

**Implementation impact:** no lesson, quiz question, quiz option, quiz
feedback, or practical-task item states either disputed numeric value
anywhere; `usca-m2-l2` and `usca-rule-late-shipment-conflict` (in
`PROGRESSION_RULES`) both explicitly name this as a documented, unresolved
SOURCE_CONFLICT.

**Future resolution path:** ask the Account Holder to confirm a single,
unambiguous Late Shipment Rate target across both documents in a future
source revision. Until that happens, this programme will continue to teach
the monitoring/escalation behaviour only, never a number.

---

## 5. No invented pricing formulas, currency, tax, duty, or compliance content

**What was found:** the only pricing/financial rule stated in either source
document is a profit-margin target of "20-30% minimum depending on SKU"
(Doc 1, A.6.3) and a general instruction to review marketplace fees and PPC
spend-vs-sales. Neither document states a currency-conversion rule, exchange
rate, tax rule, duty rule, marketplace fee amount, advertising-budget
formula, or any compliance/certification requirement (electrical safety,
labelling, customs, product certification).

**Treatment:** this programme teaches only the single stated margin target
and the fee/PPC-review instruction (Module 2, Lesson 3). No currency
conversion, exchange rate, tax rule, duty rule, fee amount, or compliance/
certification content is stated or invented anywhere in this programme.

**Implementation impact:** this programme has no dedicated compliance module
and no pricing-formula module beyond the single lesson above — this is a
direct, honest reflection of source depth, not an omission by oversight.

**Future resolution path:** would require dedicated pricing/compliance
source documents before any such content could be added.

---

## 6. Personal name in source subfolder path excluded

**What was found:** the source subfolder is named
`USA - BGCT (Indhujan)` — a personal identifier.

**Treatment:** never displayed, referenced, or reproduced anywhere in
learner-facing content, module/lesson/question text, or UI. Only the internal
source map and this register record the exact repository-relative path
containing this name.

**Implementation impact:** none on programme content — no rule depended on
this name.

**Future resolution path:** none required — permanent confidentiality
policy for this programme.

---

## 7. Duplicate source documents — completeness-based citation order, not resolution

**What was found:** two DOCX files exist describing the same BGCT framework
with ~85-90% content overlap, each internally claiming to be "Version 1.0"
despite one filename saying "v0.1."

**Treatment:** both are retained as source documents (see source map). The
Best Practice & Guidance Edition (filename "v0.1") is cited first wherever
both cover the same rule, based on completeness (it contains everything in
the Guidelines & Criteria Edition plus additional worked examples,
anti-examples, troubleshooting, and the binary Checklist/Final Compliance
Gate section) — this is an authoring decision about citation order, not a
claim that the underlying filename/internal-version-label disagreement is
resolved.

**Implementation impact:** none on rule content — both documents agree on
substance wherever they overlap; only presentation/structure differs.

**Future resolution path:** ask the Account Holder which document is the
actual, currently-maintained standard, and whether the other should be
archived or merged.

---

## 8. Cross-programme boundaries — CPPC and Customer Service

**What was found:** the source names the CPPC Team (PPC campaigns) and the
Customer Service Team/CST (customer queries, returns, refunds) as separate
specialist teams whose general operation this programme's source material
does not itself document in full.

**Treatment:** this programme teaches only the market-rebuild-specific
accountability dependencies BGCT itself documents — reviewing CPPC spend
against sales (Module 2, Lesson 3) and the warehouse-to-CST return-inspection
handoff (Module 5, Lesson 3) — and cross-references the existing Centralized
PPC Team programme and existing Customer Service Team programme for general
operation of each function. Neither existing programme is modified by this
work.

**Implementation impact:** no PPC-campaign-management content and no
general customer-case-handling content appears in this programme.

**Future resolution path:** none required — this is a permanent
cross-programme boundary, not a temporary gap.

---

## 9. No certification or live-action authority

**What was found:** the source is written as an operational reference and
training document for real warehouse/listing/CST/postage/Account Holder
staff; it is not itself a learner-management or certification system, and
states no quiz pass score, attempt limit, sign-off rule, practical-task
requirement, completion definition, mandatory training duration, or
Tamil/multilingual requirement anywhere.

**Treatment:** this programme's quiz configuration (80% / 3 attempts),
lesson structure (4 per module), sign-off setting (off), Tamil setting
(off), and completion rule are all **TOSP presentation/configuration
decisions**, stated explicitly as such, per the explicit implementation
instructions this programme was built from. The completion screen and every
PROTOTYPE_ONLY notice make clear that finishing this programme does not
grant certification, marketplace authorisation, financial approval
authority, or any live account/listing/refund/shipment authority.

**Implementation impact:** `views/completion-view.js`'s existing, shared,
unmodified `CERTIFICATION_DISCLAIMER` plus this programme's own description
and source blurb together carry this requirement without any shared file
needing a US/Canada-specific change.

**Future resolution path:** none required — this is a permanent, correct
characterisation of what a browser-only prototype can and cannot represent.
