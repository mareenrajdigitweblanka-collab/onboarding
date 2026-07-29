# Centralized PPC Team — Source Map

Status: programme content = FINAL_TRUTH (sourced, per user authorisation) ·
learner progress = PROTOTYPE_ONLY · **implementation was authorised without
resolving the nine conflicts found between sources during discovery** — see
`centralized-ppc-team-exclusions.md` for the full register of every excluded
item. `Centralized_PPC_Team/` is gitignored (confidential source documents,
read-only, never modified by this work) — the sourced programme content
lives in `tosp/js/programmes/` instead.

---

## 1. Source authority model applied

Per the user-confirmed authorisation, all 30 sources are treated as FINAL
PROTOTYPE TRUTH, subject to four mandatory restrictions applied throughout:

1. Every one of the nine unresolved source conflicts is **excluded**, never
   resolved by picking, averaging, or repairing a value.
2. Confidential or live operational data (real account/client/seller names,
   account/campaign/ad-group/portfolio IDs, live ASINs/SKUs/Item IDs, real
   budgets/spend/sales/ACOS/TACOS/ROAS/CPA/CPC figures, named individual
   staff) is never reproduced.
3. A worked example or illustrative figure is never presented as universal
   policy.
4. No PPC knowledge from outside these 30 sources is introduced anywhere.

Where two sources disagreed on a rule that should be the same, the disputed
detail was excluded rather than either source being preferred — see
`centralized-ppc-team-exclusions.md`.

## 2. All 30 source files inspected

An early discovery-phase estimate of the Amazon source count was superseded
once every file was actually opened and mapped, rather than relied on as a
substitute for direct inspection. The confirmed count found on disk and used
throughout this programme is **23 Amazon, 3 Google Ads, 1 Meta, 3 eBay = 30
total**.

| # | Learner-safe title | Platform | Modules using it |
|---|---|---|---|
| 1 | Amazon PPC Campaign Management — BGCT Standard Handbook | Amazon | Modules 2, 7, 13, 14 |
| 2 | Amazon Ads BGCT — Best Practices, Guidelines, Checklist & Tutorial | Amazon | Module 2 (overlap with #1, see duplicate group) |
| 3 | What is the Amazon Campaign? — Guidebook | Amazon | Module 2 |
| 4 | Bid Optimization Rule Configurator — Developer Specification | Amazon | Module 3, 14 |
| 5 | Budget Optimization Rule Configurator — Developer Specification | Amazon | Module 4 |
| 6 | Hour-Basic Budget Optimization Rule Configurator — Developer Specification | Amazon | Module 4 |
| 7 | Product Re-Activation Rule Configurator — Developer Specification | Amazon | Module 5 |
| 8 | Spend-Basic Product Pause Rule Configurator — Developer Specification | Amazon | Module 5 |
| 9 | User-Level Bid Optimization Workflow (SP) — Amazon UK | Amazon | Module 3 |
| 10 | User-Level Daily Budget Optimization Workflow (SB & SD) — Amazon UK, prior version | Amazon | Module 4 (context only, see duplicate group) |
| 11 | User-Level Daily Budget Optimization Workflow (SP) — Amazon UK | Amazon | Module 4 |
| 12 | User-Level Daily Budget Optimization Workflow (SB & SD) — Amazon UK, 2026 revision | Amazon | Module 4 |
| 13 | User-Level TACOS Workflow (SB/SD) — Amazon UK | Amazon | Module 6 (content-identical to #14, see duplicate group) |
| 14 | User-Level TACOS Workflow (SP) — Amazon UK | Amazon | Module 6 |
| 15 | User-Level Product Re-Activation Workflow (Spend-Based) — Amazon UK | Amazon | Module 5 |
| 16 | User-Level Product Pause Workflow (Spend-Based, SB & SD) — Amazon UK | Amazon | Module 5 |
| 17 | User-Level Product Pause Workflow (Spend-Based, SP) — Amazon UK | Amazon | Module 5 |
| 18 | User-Level Product Pause Workflow (Stock-Based, SB & SD) — Amazon UK | Amazon | Module 5 |
| 19 | User-Level Product Pause Workflow (Stock-Based, SP) — Amazon UK | Amazon | Module 5 |
| 20 | User-Level Daily Budget Optimization Workflow — Amazon DE, FR & IT | Amazon | Module 7 |
| 21 | User-Level Hour-Basic Optimization Workflow — Amazon DE, FR & IT | Amazon | Module 7 |
| 22 | User-Level Product Pause Workflow — Amazon DE, FR & IT | Amazon | Module 7 |
| 23 | User-Level Product Re-Activation Workflow (Spend-Based, SP) — Amazon DE, FR & IT | Amazon | Module 7 |
| 24 | Google PPC Strategy — 17 Months of Live Data | Google Ads | Module 8 |
| 25 | What We Lost and Why — Google Ads Incident Review & Rules | Google Ads | Module 8, 13 |
| 26 | Google Ads Performance Max — Campaign Setup & Optimization Strategy | Google Ads | Module 9 |
| 27 | FB Ads New Campaign Proposal — Cold Prospecting & Mid-Funnel | Meta | Module 10 |
| 28 | eBay Ads BGCT — Best Practices, Guidelines, Checklist & Tutorial | eBay | Module 11, 12 |
| 29 | Rules of Successful Ad Strategy — The Accelerator Method | eBay | Module 12 (non-conflicting portion only) |
| 30 | eBay Team Guides | eBay | Module 11, 12, 13 |

All 30 files that exist under `Centralized_PPC_Team/CPPC - BGCT/` were
inspected in full (text, tables, and available document metadata) during
discovery. None contained embedded Office core-properties metadata (no
author/created/modified date recoverable from any file) — all version/date/
authorship signals used above came from in-body text only.

## 3. Module → primary source mapping

| Module | Track | Title | Primary source(s) | Prerequisite |
|---|---|---|---|---|
| cppc-m1 | Foundation | Shared PPC Foundation | Amazon Handbook; Google 17-Months Analysis; eBay Ads BGCT; FB Ads Proposal | none |
| cppc-m2 | Amazon | Amazon Campaign Foundations & Eligibility | Amazon Handbook; Amazon Ads BGCT; What is the Amazon Campaign? Guidebook | cppc-m1 |
| cppc-m3 | Amazon | Amazon Bid & Placement Optimization Logic | Bid Optimization Rule Configurator; User-Level Bid Optimization Workflow (SP) UK | cppc-m2 |
| cppc-m4 | Amazon | Amazon Budget Optimization & Special Rules | Budget Optimization Rule Configurator; Hour-Basic Budget Rule Configurator; Daily Budget Workflows (UK) | cppc-m3 |
| cppc-m5 | Amazon | Amazon Product Activation & Pause Automation | Product Re-Activation Rule Configurator; Spend-Basic Pause Rule Configurator; UK Activation/Pause Workflows | cppc-m4 |
| cppc-m6 | Amazon | Amazon TACOS Monitoring & Escalation | User-Level TACOS Workflow (UK) | cppc-m5 |
| cppc-m7 | Amazon | Amazon Multi-Market Operations & Scaling | Amazon Handbook (scaling); DE/FR/IT Budget, Hourly, Pause, Activation Workflows | cppc-m6 |
| cppc-m8 | Google Ads | Google Ads Strategy, Kill Gates & Campaign Governance | 17-Months Analysis; What We Lost and Why | cppc-m7 |
| cppc-m9 | Google Ads | Google Ads Campaign Setup & Optimization | Google Ads Performance Max Setup & Optimization Strategy | cppc-m8 |
| cppc-m10 | Meta | Meta Campaign Proposal Discipline | FB Ads New Campaign Proposal | cppc-m9 |
| cppc-m11 | eBay | eBay Campaign Setup & Listing Readiness | eBay Ads BGCT; eBay Team Guides | cppc-m10 |
| cppc-m12 | eBay | eBay Monitoring, Optimization & Escalation | eBay Team Guides; Rules of Successful Ad Strategy (non-conflicting portion) | cppc-m11 |
| cppc-m13 | Reporting | Cross-Platform Reporting & Evidence Standards | Amazon Handbook; What We Lost and Why; eBay Team Guides; 17-Months Analysis | cppc-m12 |
| cppc-m14 | Reporting | Roles, Approval Gates & Programme Closure | Bid Optimization Rule Configurator (role table); What We Lost and Why; FB Ads Proposal; eBay Team Guides | cppc-m13 |

Module order follows the shared, non-conflicting workflow shape found in
discovery (foundation → per-platform campaign lifecycle, Amazon-deepest-first
by source volume → reporting/governance close-out), not the folder order the
source files happen to be named in. Module unlocking itself is one strict
linear sequence across all 14 modules (see
`centralized-ppc-team-programme-architecture.md` §3); the six `ui.tracks`
above are a navigation grouping only.

## 4. Duplicate/version groups

1. **Version pair**: User-Level Daily Budget Optimization Workflow (SB & SD)
   — Amazon UK exists in two files differing only in three cosmetic header
   lines; the file carrying an explicit "2026" label is treated as the
   current revision, the other as its immediate predecessor (both listed,
   #10 and #12 above).
2. **Exact-content duplicate pair**: User-Level TACOS Workflow (SB/SD) and
   User-Level TACOS Workflow (SP) — Amazon UK are byte-identical in content
   despite differing filenames implying platform-specific logic; only one
   canonical TACOS workflow is taught (Module 6), with the duplicate noted.
3. **Overlapping, not identical, pair**: Amazon PPC Campaign Management BGCT
   Standard Handbook and Amazon Ads BGCT cover the same core targets and
   structure, but the Handbook is materially more governed (named owner/
   validator/approver, eligibility gates, escalation table) — treated as the
   more authoritative of the two per the source-priority model (§5); Module
   2 draws primarily from the Handbook.
4. **Copy-paste clone evidence**: User-Level Product Pause Workflow — Amazon
   DE, FR & IT contains a 2026 section whose own heading still reads "Amazon
   UK" — strong evidence the document was cloned from the UK pause workflow
   without full localisation. Treated as unreliable for any DE/FR/IT-specific
   numeric claim (see exclusions #4, #5).
5. **Unreconciled dual-authorship draft pair**: both the DE/FR/IT Daily
   Budget and Hour-Basic workflow documents contain two separate,
   named-author rule variants for the same rule, with different thresholds
   and execution times, never reconciled into one agreed rule — treated as
   draft status throughout Module 7, never as settled fact.
6. **Companion, not duplicate, pair**: Google PPC Strategy — 17 Months of
   Live Data and What We Lost and Why share the same underlying dataset and
   author context one day apart, and are mutually consistent — treated as
   companion documents (fleet-wide strategy vs. single-incident deep-dive),
   both used in Module 8.
7. **Contradictory, not duplicate, pair**: Rules of Successful Ad Strategy —
   The Accelerator Method and eBay Team Guides share no verbatim content and
   directly contradict each other on eBay advertising rate — treated as two
   independent documents, not a version chain (see exclusion #8); only the
   non-conflicting portions of the Accelerator Method are used (Module 12).

## 5. Source priority applied where sources overlapped

Per the confirmed priority order (explicit final/approved designation →
newest confirmed version → effective date → named owner → completeness →
explicit supersession statement): where the Amazon Handbook (named Owner/
Validator/Authoriser, versioned v2.1, explicit compliance-review date) and
Amazon Ads BGCT (no version, no named owner) covered the same topic, the
Handbook was treated as primary and Amazon Ads BGCT as supplemental context
(duplicate group #3 above). Where no source in a group carried a clear
canonical designation (for example, the two DE/FR/IT named-author rule
variants), only content common to the relevant sources was used, and the
duplicate/version risk was recorded rather than a version being silently
selected (duplicate group #5).

## 6. Excluded rules (full detail in `centralized-ppc-team-exclusions.md`)

| Source(s) | Issue | Effect on this programme |
|---|---|---|
| Amazon Handbook vs. Amazon Ads BGCT | Two different SP minimum star-rating figures | No star-rating figure is taught or quizzed |
| Amazon Handbook vs. Amazon Ads BGCT | Two different budget-review cadences (daily vs. twice weekly) | No cadence is taught as a universal Amazon rule |
| Amazon Handbook (self-contradiction) | "5-10 ASINs" vs. "one ASIN" per Sponsored Products ad group | No ASIN-per-ad-group figure is taught or quizzed |
| UK vs. DE/FR/IT Product Pause workflows | Two different high-ACOS pause thresholds (35% vs. 50%) | No DE/FR/IT ACOS threshold is taught as confirmed |
| DE/FR/IT Budget/Hourly workflows | Thresholds priced in the UK's currency, not localised | Not corrected; reported as an open localisation gap |
| UK Product Pause (SB&SD) vs. (SP) workflows | Two different month-boundary split dates | No specific cut-off date is taught |
| UK Product Pause (Stock-Based) SB&SD vs. SP workflows | Two different "fast-moving product" definitions | No specific fast-mover definition is taught |
| Rules of Successful Ad Strategy vs. eBay Team Guides | Directly contradictory eBay advertising-rate guidance | No specific rate percentage or range is taught |
| UK Daily Budget (SB&SD) vs. (SP) workflows | Structurally different tier counts for the same rule family | No specific tier count/structure is taught |

## 7. Confidential content excluded (source-safety)

See `centralized-ppc-team-exclusions.md` §10 for the full category table
(real account/client/seller names, account/campaign/ad-group/portfolio IDs,
live ASINs/SKUs/Item IDs, real budgets/spend/sales/performance figures,
named individual staff in accountability contexts, internal resource links).
No credentials, API tokens, or private system URLs were found in any of the
30 files.

## 8. Known limits

- No pass-percentage, attempt-limit, or sign-off rule is stated in any
  Centralized PPC source; the existing shared TOSP quiz configuration (80% /
  3 attempts, no sign-off) is reused unchanged — a platform default, not a
  figure sourced from these documents (user-confirmed).
- The Amazon TACOS escalation flow hands flagged products to a "PH
  Dashboard" whose relationship (if any) to the pre-existing PH Team
  onboarding programme is never confirmed by any source; Module 6 addresses
  this gap directly rather than assuming an answer.
- The Meta proposal references an internal "pattern repeatability" / "Gate
  2/3" evaluation framework without fully defining it in that document; this
  programme does not invent the missing detail (Module 10).
- Whether "Sponsored Display" has any Amazon rule content of its own beyond
  its taxonomy listing is unclear from the sources — the Bid Optimization
  Rule Configurator lists it as a supported campaign type but authors zero
  SD-specific rule content; this programme does not invent SD-specific
  content to fill the gap.
- Authorship attribution for several Google Ads and eBay documents is
  filename-only and not independently confirmed by the document body (the
  Google Ads setup/review source; both individually authored eBay strategy
  documents); this programme never asserts authorship the source itself
  does not confirm.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step
  was supplied as part of this task.
