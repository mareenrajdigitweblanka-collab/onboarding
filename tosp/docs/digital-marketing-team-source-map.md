# Digital Marketing Team — Source Map

Status: narrative SOURCE handbooks = **FINAL_TRUTH** for this prototype
(user-confirmed) · generated programme content = FINAL_TRUTH (sourced) ·
learner progress = PROTOTYPE_ONLY.

This map records every Digital Marketing Team narrative source handbook used
to build this programme, the modules built from each one, and the excluded
sources/rules — including PMAX-005 in full. `Digital_Marketing_Team/` is
gitignored (confidential source documents, read-only, not modified by this
work) — the sourced programme content lives in `tosp/js/programmes/` instead.

---

## 1. Final-truth confirmation

The user has confirmed the 10 narrative "SOURCE" BGCT handbooks under
`Digital_Marketing_Team/DM - BGCT/Google Ads/` are **FINAL_TRUTH** content
authority for this prototype. The governance layer surrounding each
handbook — its `.skill.md` file, `VALIDATION_QUEUE_v1.md`,
`METADATA_REGISTRY.xlsx`, and the `14_DAY_REVIEW_v1.md` / `EOD_LINK_TEST_v1.md`
templates — was consulted **only** to understand source status history,
known conflicts, duplicate risk, and confidentiality exclusions. None of
that governance metadata was used to override, correct, or supersede the
narrative handbook content. Where a handbook's own governance layer disagreed
with the handbook's self-declared status (e.g. "Status: ACTIVE" vs. the
skill-file's "DRAFT_PENDING_OWNER_VALIDATION"), the narrative content itself
was still used as FINAL_TRUTH per the user's explicit instruction — the
disagreement is recorded below and in
`digital-marketing-team-exclusions.md`, not silently resolved.

## 2. Narrative source handbooks used

| # | Handbook | Modules built from it |
|---|----------|------------------------|
| 1 | Performance Max Campaigns — Campaign Creation & Setup Standard (BGCT Ads Handbook) | Module 3 (primary); Module 1 (Foundation, partial) |
| 2 | Performance Max (P.Max) Feed Optimisation (BGCT Ads Handbook) | Module 2 (primary); Module 1 (Foundation, partial) |
| 3 | Google Performance Max — Asset Group Setup (BGCT Ads Handbook) | Module 4 (primary) |
| 4 | Performance Max Audience Signal Strategy & Optimisation (BGCT Ads Handbook) | Module 5 (primary) |
| 5 | Performance Max Campaigns — Bidding Strategy & Optimisation (BGCT Ads Handbook) | Module 6 (primary) |
| 6 | Performance Max Campaigns — Budget Management & Allocation Rules (BGCT Ads Handbook) | Module 7 (primary) |
| 7 | Performance Max (PMax) Campaign Management & Audit (BGCT Ads Handbook) | Module 8 (primary) |
| 8 | Google Shopping Ads — Standard Campaign Creation, Setup and Management (BGCT Ads Handbook) | Module 9 (primary); Module 1 (Foundation, partial) |
| 9 | Manual Google Shopping Campaign Creation (BGCT Ads Handbook) | Module 10 (primary); Module 1 (Foundation, partial) |

**Total narrative source handbooks used: 9 of the 10 that exist in
`Digital_Marketing_Team/`.** The 10th — Performance Max Budget Bleed Control
(PMAX-005) — is **excluded** (see §3).

## 3. PMAX-005 — Budget Bleed Control (excluded)

- **Source**: Performance Max Budget Bleed Control (BGCT Ads Handbook)
- **Reason for exclusion**: this handbook's own `METADATA_REGISTRY.xlsx` was
  found, during discovery, to contain the *wrong topic's* data — its
  `clean_title`, `owner_name`, and `subfunction` fields all describe the
  Budget Management handbook (PMAX-004), not Budget Bleed Control. This
  mislabeling is self-flagged as an open item in PMAX-005's own
  `VALIDATION_QUEUE_v1.md` and remains unresolved.
- **User decision**: exclude PMAX-005 entirely until the metadata registry
  is corrected.
- **Status**: `EXCLUDED_PENDING_SOURCE_CORRECTION`
- **Effect**: no module, lesson, or quiz question exists for Budget Bleed
  Control anywhere in this programme. This programme has exactly 10 active
  modules, not 11. Module 7 (Budget Management and Allocation) is built only
  from PMAX-004 and does not incorporate any Budget Bleed Control content.

## 4. Module → source mapping

| Module | Title | Primary source | Prerequisite |
|--------|-------|-----------------|---------------|
| dm-m1 | Digital Marketing and Google Ads Foundation | Multiple (Campaign Creation, Feed Optimisation, Manual Shopping, Automated Shopping — foundation sections only) | none |
| dm-m2 | Feed Optimisation and Merchant Center Readiness | Performance Max Feed Optimisation | dm-m1 |
| dm-m3 | Performance Max Campaign Creation | Performance Max Campaign Creation & Setup Standard | dm-m2 |
| dm-m4 | Asset Group Design | Google Performance Max — Asset Group Setup | dm-m3 |
| dm-m5 | Audience Signals and Search Themes | Performance Max Audience Signal Strategy & Optimisation | dm-m4 |
| dm-m6 | Bidding Strategy | Performance Max Bidding Strategy & Optimisation | dm-m5 |
| dm-m7 | Budget Management and Allocation | Performance Max Budget Management & Allocation Rules | dm-m6 |
| dm-m8 | Performance Max Campaign Audit | Performance Max (PMax) Campaign Management & Audit | dm-m7 |
| dm-m9 | Shopping Campaign Creation: Automated Route | Google Shopping Ads — Standard Campaign Creation, Setup and Management | dm-m8 |
| dm-m10 | Shopping Campaign Creation: Manual Route | Manual Google Shopping Campaign Creation | dm-m9 |

This order was specified directly by the user (Foundation → 7 Performance Max
modules in their stated operational order → 2 Shopping modules), not derived
from the BGCT filename numbering, which the earlier discovery phase found to
be alphabetical-by-topic-name rather than a stated build sequence.

## 5. Excluded rules and defects (full detail in `digital-marketing-team-exclusions.md`)

| Source | Issue | Effect on this programme |
|--------|-------|----------------------------|
| Bidding Strategy handbook | States three different numeric ceilings for the New Customer Acquisition (NCA) bid safeguard across its own sections (SOURCE_CONFLICT) | No numeric NCA value is taught or quizzed anywhere in this programme |
| Automated Shopping handbook | One worked naming-convention example uses the wrong ad-type token for a Shopping campaign (a copy-paste defect from an unrelated template) | That specific example is never used, repaired, or taught; only the naming formula itself (with an invented, correct fictional example) is taught |
| Manual Shopping handbook governance layer | The `.skill.md` file's inline comment and the `.xlsx` metadata registry disagree on whether `approved_by` is populated — a governance-bookkeeping conflict unrelated to the narrative handbook | Out of scope entirely: this programme's content is sourced only from the narrative handbook, which does not reference this field; only the plain, undisputed "stay Paused until approved" rule is taught |

## 6. Confidential content excluded (source-safety)

Per the confirmed confidentiality rules, the following categories were
identified across the narrative handbooks and are **excluded completely**
from every lesson and every question:

| Category | Where found | Why excluded |
|----------|-------------|----------------|
| Real client/brand name and live domain URLs | Asset Group Setup handbook (worked examples, prerequisites) | Confidential client-identifying data |
| Specific worked-example figures tied to named product collections/markets | Audience Signal, Manual Shopping handbooks | Possibly real historical figures disguised as generic examples; replaced with invented fictional data |
| Named individual staff (used as Owner/Validator/process-owner roles) | Every handbook | Replaced throughout with generic role wording ("the designated approver", "the process owner"); generic escalation-team names already used by the sources (Ads Team Lead, Technical Team, Account Manager, Creative Team, Management) were kept as-is since they are not individual identities |
| Internal repository file paths and content-integrity hashes | Every `.skill.md` governance file (not used as content source) | Never referenced in learner-facing content |
| External AI-tool link | Asset Group Setup handbook | Not reproduced |

**No live Google Ads account IDs, Merchant Center IDs, campaign IDs, or
credentials were found in any narrative handbook** — consistent with the
earlier discovery-phase finding.

## 7. Source priority

Each module has exactly one primary narrative source handbook (see §4), so
no source-priority conflict between competing primary documents exists in
this programme (unlike, e.g., the eBay PDF-vs-Markdown case). The one
genuine content conflict found — the Bidding Strategy handbook's internal
NCA inconsistency — is resolved by exclusion, not by picking a side (§5).

## 8. Known limits

- The BGCT numeric suffixes (PMAX-001, 002, ...) do not reflect the module
  order used in this programme; the user specified the operational order
  directly (see §4).
- No pass-percentage, attempt-limit, or sign-off rule is stated in any
  Digital Marketing narrative source; the existing shared TOSP quiz
  configuration (80% / 3 attempts, no sign-off) is reused unchanged — this is
  a platform default, not a figure sourced from the Digital Marketing
  documents (user-confirmed).
- Module 1 (Foundation) draws lightly from four different handbooks rather
  than one primary source, since no single Digital Marketing handbook covers
  general account/campaign foundations on its own.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step was
  supplied as part of this task.
