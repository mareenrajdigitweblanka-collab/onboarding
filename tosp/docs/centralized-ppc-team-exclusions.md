# Centralized PPC Team — Exclusions Register

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced) · **implementation was authorised without resolving the nine
source conflicts found during discovery**. Per that authorisation, every
conflict below is EXCLUDED from learner-facing lessons, quizzes, and the
practical task — never selected, averaged, merged, normalised, or
reinterpreted. This document records each: the source(s), the issue, the
implementation action taken, the learner impact, and the future resolution
path.

---

## 1. Amazon SP minimum star-rating conflict

- **Sources**: Amazon PPC Campaign Management BGCT Standard Handbook §B3
  states a minimum star rating of 3.5★ for Sponsored Products (4.0★ for
  Sponsored Brands/Display); Amazon Ads BGCT §8 states a minimum of 4.0★ for
  **all three** campaign types including Sponsored Products.
- **Issue**: two different SP minimum star-rating figures for what is
  presented as the same eligibility rule.
- **Implementation action**: Module 2 (Amazon Campaign Foundations &
  Eligibility) describes the eligibility-gate concept without stating a
  specific star-rating figure anywhere. No quiz question in Module 2's Skill
  Check tests a star-rating number.
- **Learner impact**: learners understand that a minimum-rating check exists
  as part of the eligibility gate, without being given a specific figure to
  memorise or apply.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future resolution path**: once the business confirms a single correct SP
  minimum rating across both documents, that value could be added to Module
  2 as a targeted content update.

## 2. Amazon budget-review cadence conflict

- **Sources**: Amazon PPC Campaign Management BGCT Standard Handbook §B9/G11
  mandates daily budget review "every morning, Sri Lanka time" as the first
  task of the working day; Amazon Ads BGCT Checklist §3 states spend and
  ACOS are monitored daily but budgets are adjusted "twice weekly."
- **Issue**: two different budget-adjustment cadences for the same
  operational rule.
- **Implementation action**: Module 13 (Cross-Platform Reporting & Evidence
  Standards) explicitly states this programme does not assert one universal
  Amazon budget-review cadence, and teaches only the shared pattern that
  recurring, scheduled review exists on every platform. No quiz question
  states or tests a specific cadence for Amazon budget review.
- **Learner impact**: learners are taught that Amazon budget review is
  recurring and scheduled, without being given a specific frequency to treat
  as confirmed.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future resolution path**: the business needs to confirm one cadence
  across both BGCT documents before a specific frequency can be taught.

## 3. Amazon ASINs-per-ad-group internal contradiction

- **Source**: Amazon PPC Campaign Management BGCT Standard Handbook
  contradicts itself — §B5 states "5-10 ASINs per ad group" for Sponsored
  Products campaigns, while §G5, §G7, the Checklist Phase 3, and the
  Tutorial section all state "one ASIN per ad group," listing mixed-ASIN ad
  groups as a named "common mistake."
- **Issue**: the same single source document states two contradictory rules
  about the same structural detail.
- **Implementation action**: Module 2 does not state any specific number of
  ASINs per ad group. No quiz question in this programme tests an
  ASIN-per-ad-group figure or rule.
- **Learner impact**: learners are not given a specific, confirmed rule for
  how many ASINs may share an ad group.
- **Status**: `SOURCE_CONFLICT` (internal self-contradiction) — unresolved.
- **Future resolution path**: the Handbook's own owner needs to correct
  §B5 (likely a drafting error, since "5-10 ASINs" may have been intended to
  read "5-10 keywords") before this content can be safely taught.

## 4. Amazon UK vs. DE/FR/IT high-ACOS pause threshold conflict

- **Sources**: User-Level Product Pause Workflow (Spend-Based, SB & SD) —
  Amazon UK states a 35% high-ACOS pause threshold (2026 rule set); User-
  Level Product Pause Workflow — Amazon DE, FR & IT states 50% for the
  structurally equivalent rule, and its own 2026 section heading still reads
  "Amazon UK" — direct evidence the document was cloned from the UK source
  without full localisation.
- **Issue**: two different ACOS thresholds for what should be the same rule,
  compounded by clear evidence of an incomplete copy rather than a
  deliberate market-specific decision.
- **Implementation action**: Module 7 (Amazon Multi-Market Operations &
  Scaling) states plainly that the DE/FR/IT rule documents show signs of
  being an unreconciled draft/clone and does not state a DE/FR/IT-specific
  ACOS threshold anywhere. No quiz question tests this figure.
- **Learner impact**: learners are told the DE/FR/IT material is not yet as
  reliable as the UK material, without being given a specific figure to
  treat as confirmed for either market.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future resolution path**: the DE/FR/IT document needs a full, deliberate
  localisation pass (not just a heading fix) before its thresholds can be
  taught with confidence.

## 5. Un-localised DE/FR/IT currency conflict

- **Sources**: User-Level Daily Budget Optimization Workflow and User-Level
  Hour-Basic Optimization Workflow — Amazon DE, FR & IT — both price every
  threshold in the UK's currency (£) rather than a currency appropriate to
  the DE/FR/IT markets.
- **Issue**: a market-labelled document uses the wrong market's currency
  throughout, with no plausible market-specific justification found.
- **Implementation action**: Module 7 states this as an open localisation
  gap and does not convert, correct, or otherwise silently repair the
  currency anywhere in this programme. No quiz question states a DE/FR/IT
  threshold in any currency.
- **Learner impact**: learners are taught that Amazon rule documents can
  contain unresolved localisation defects, and are told not to trust a
  DE/FR/IT currency figure as confirmed.
- **Status**: `SOURCE_CONFLICT` (source defect) — unresolved.
- **Future resolution path**: the document owner needs to convert every
  threshold to the correct market currency and value before this content can
  be taught as market-specific fact.

## 6. Amazon month-boundary split date conflict

- **Sources**: User-Level Product Pause Workflow (Spend-Based, SB & SD) —
  Amazon UK uses a 1st-19th / 20th-31st split for choosing between a 30-day
  ACOS figure and a month-to-date figure; User-Level Product Pause Workflow
  (Spend-Based, SP) — Amazon UK uses a 1st-20th / 21st-31st split for the
  structurally equivalent decision.
- **Issue**: two different day-of-month cut-offs for what should be the same
  underlying rule, within the same UK market and the same overall rule
  family.
- **Implementation action**: Module 4 (Amazon Budget Optimization & Special
  Rules) teaches the underlying concept — the engine trades stability for
  recency as the month progresses — without stating a specific cut-off date
  anywhere. No quiz question tests a specific day-of-month figure.
- **Learner impact**: learners understand why the switch happens without
  being given a specific date to treat as universally confirmed.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future resolution path**: the business needs to confirm one cut-off date
  across both sibling SB&SD/SP documents before a specific date can be
  taught.

## 7. Amazon "fast-moving product" definition conflict

- **Sources**: User-Level Product Pause Workflow (Stock-Based, SB & SD) —
  Amazon UK defines "Fast-Moving" using three OR-conditions (including a
  "Last 30 days Sales ≥1.5× Average Monthly Sales" clause); User-Level
  Product Pause Workflow (Stock-Based, SP) — Amazon UK uses only two of the
  same three OR-conditions, omitting the sales-multiple clause entirely.
- **Issue**: two different qualifying-condition sets for the same concept
  across sibling documents in the same rule family.
- **Implementation action**: Module 5 (Amazon Product Activation & Pause
  Automation) describes the stock-based pause concept and the purpose of the
  "fast-moving" classification without stating its specific qualifying
  conditions anywhere. No quiz question tests the exact fast-mover
  definition.
- **Learner impact**: learners understand why fast-moving products get a
  distinct stock-based pause rule, without being given a specific,
  confirmed definition to apply.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future resolution path**: the business needs to confirm whether the
  sales-multiple clause belongs in the definition before a single set of
  conditions can be taught.

## 8. eBay advertising-rate conflict

- **Sources**: Rules of Successful Ad Strategy — The Accelerator Method
  recommends starting an eBay ad rate at 2-4% and explicitly calls a 5-7%
  starting rate a "loss trap"; eBay Team Guides states the "General Ad Rate"
  "must be maintained between 5% – 7% at all times."
- **Issue**: two individually authored eBay sources give directly
  contradictory guidance on the single most fundamental PPC lever for that
  platform — the range one source calls a loss trap is the range the other
  source mandates.
- **Implementation action**: Modules 11 and 12 (eBay Campaign Setup &
  Listing Readiness; eBay Monitoring, Optimization & Escalation) never state
  a specific starting percentage, ceiling percentage, or "correct" range for
  eBay advertising rate anywhere. Only the non-conflicting portions of the
  Accelerator Method (kill-after-sustained-no-sales concept, scheduling
  concept, budget-as-share-of-profit concept) are used in Module 12. No quiz
  question tests any advertising-rate percentage.
- **Learner impact**: learners are explicitly told (Module 12, Lesson 3)
  that this figure is disputed, and taught the general pause/review shape
  around it without being given a number to apply.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future resolution path**: the business needs to confirm which document's
  guidance (or a reconciled third figure) is correct before an eBay
  advertising-rate range can be taught.

## 9. Amazon budget-tier structure conflict

- **Sources**: User-Level Daily Budget Optimization Workflow (SB & SD) —
  Amazon UK uses a 2-category performance-tier structure (Good Performer /
  Weak Performer); User-Level Daily Budget Optimization Workflow (SP) —
  Amazon UK uses a 5-category structure (Strong/Good/Medium/Weak/Failing)
  for the structurally equivalent rule.
- **Issue**: two different tier counts and boundary shapes for what should
  be one consistent rule family within the same UK market.
- **Implementation action**: Module 4 teaches the shared underlying shape —
  campaigns are grouped by ACOS performance and each group receives a
  matching budget response — without stating a specific number of tiers or
  their boundaries as a confirmed, universal Amazon rule. No quiz question
  tests a specific tier count.
- **Learner impact**: learners understand the category-then-response pattern
  without being given a specific tier structure to apply as if it were
  identical across every Amazon campaign type.
- **Status**: `SOURCE_CONFLICT` — unresolved.
- **Future resolution path**: the business needs to confirm whether SB&SD
  and SP are deliberately meant to use a different tier granularity, or
  whether one document needs to be corrected to match the other.

## 10. Confidential content excluded (not a conflict, a confidentiality rule)

| Category | Source(s) | Action taken |
|---|---|---|
| Real advertising account/client/seller names | Hour-Basic Budget Rule Configurator §6 (Seller Accounts Reference); Google 17-Months Analysis; What We Lost and Why; the Google Ads setup/review source; FB Ads New Campaign Proposal | Never reproduced; generic "a seller account" / "a fictional account" wording used instead |
| Real campaign/account performance history (spend, sales, ROAS, CTR, CPA) | Google 17-Months Analysis; What We Lost and Why; the Google Ads setup/review source; FB Ads Proposal | Never reproduced; every example in this programme uses invented, fictional figures |
| Named individuals in performance/accountability context | Google 17-Months Analysis (operator league table); What We Lost and Why (named former/current operators) | Never named; generic role titles used ("Google Ads Team Lead," "an operator") |
| Named individuals in governance/ownership fields | Amazon Handbook Document Control table (Owner/Validator/Authoriser) | Never named; described generically as "a named owner," "a named approver" |
| Internal resource links (Drive folder, YouTube search) | eBay Ads BGCT §5 | Not reproduced or linked anywhere in this programme |
| Live campaign/ad-level performance tables tied to a real Meta account | FB Ads New Campaign Proposal §1.2-1.3, §3.1 | Never reproduced; Module 10 uses only the proposal's structural/procedural content |

## Summary table

| # | Item | Conflict type | Status | Taught/quizzed? |
|---|---|---|---|---|
| 1 | SP minimum star-rating (3.5★ vs. 4.0★) | `SOURCE_CONFLICT` | Unresolved | No |
| 2 | Budget-review cadence (daily vs. twice weekly) | `SOURCE_CONFLICT` | Unresolved | No |
| 3 | ASINs per ad group ("5-10" vs. "one") | `SOURCE_CONFLICT` (self-contradiction) | Unresolved | No |
| 4 | UK vs. DE/FR/IT high-ACOS pause threshold (35% vs. 50%) | `SOURCE_CONFLICT` | Unresolved | No |
| 5 | Un-localised DE/FR/IT currency | `SOURCE_CONFLICT` (source defect) | Unresolved | No |
| 6 | Month-boundary split date (19th/20th vs. 20th/21st) | `SOURCE_CONFLICT` | Unresolved | No |
| 7 | "Fast-moving product" definition (2 vs. 3 conditions) | `SOURCE_CONFLICT` | Unresolved | No |
| 8 | eBay advertising-rate range (2-4% vs. 5-7% mandatory) | `SOURCE_CONFLICT` | Unresolved | No |
| 9 | Amazon budget-tier structure (2-tier vs. 5-tier) | `SOURCE_CONFLICT` | Unresolved | No |
| 10 | Confidential account/individual data | Confidentiality rule | Applied throughout | N/A |

Ten categories in total (nine mandatory conflict exclusions plus the
confidentiality register), all documented above with source, issue,
implementation action, learner impact, and future resolution path.
