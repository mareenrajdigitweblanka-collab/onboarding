# Digital Marketing Team — Exclusions Register

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced, user-confirmed). This document lists every conflict or source
defect excluded from the Digital Marketing Team programme, with the source,
the issue, the user's decision, the implementation effect, and the future
correction path.

---

## 1. PMAX-005 — Budget Bleed Control (entire topic excluded)

- **Source**: Performance Max Budget Bleed Control (BGCT Ads Handbook), and
  its accompanying `.skill.md`, `METADATA_REGISTRY.xlsx`,
  `VALIDATION_QUEUE_v1.md`.
- **Issue**: the topic's own `METADATA_REGISTRY.xlsx` contains data belonging
  to a different topic — its `clean_title`, `owner_name`, and `subfunction`
  fields describe the Budget Management handbook (PMAX-004), not Budget
  Bleed Control. This mislabeling is self-flagged as an open item in
  PMAX-005's own `VALIDATION_QUEUE_v1.md` (item recorded during discovery)
  and remains unresolved.
- **User decision**: exclude the entire topic from the active programme
  until the metadata registry is corrected, even though the narrative
  handbook content itself (waste-elimination via product/negative-keyword/
  location-device exclusion) is conceptually distinct from and does not
  duplicate PMAX-004's budget-sizing content.
- **Implementation effect**: no module (`dm-m*`), no lesson, and no quiz
  question anywhere in this programme references Budget Bleed Control. The
  programme has exactly 10 active modules. Module 7 (Budget Management and
  Allocation) is built strictly from PMAX-004 and does not incorporate any
  waste-elimination/exclusion content.
- **Status**: `EXCLUDED_PENDING_SOURCE_CORRECTION`
- **Future correction path**: once the metadata registry is corrected and
  the topic is independently re-reviewed by the user, an 11th module could
  be added following the same authoring process used for the other 10 —
  read the narrative handbook, author original lesson content, cite exact
  sections, exclude confidential/disputed data, add one Skill Check.

## 2. PMAX-003 — New Customer Acquisition (NCA) ceiling conflict

- **Source**: Performance Max Campaigns — Bidding Strategy & Optimisation
  (BGCT Ads Handbook).
- **Issue**: the handbook states three different numeric ceilings for the
  same New Customer Acquisition bidding safeguard across its own sections
  (a Quality Standards figure, a Starting-Point pre-requisite figure, and an
  Accident-Spots/Troubleshooting figure) — a genuine internal
  self-contradiction, not a cross-document disagreement.
- **User decision**: do not select any of the three values as the "correct"
  one; exclude the NCA-limit rule from learner-facing content and quizzes
  entirely, programme-wide (not only in Module 6, since the same value
  reappears in the Campaign Creation and Shopping handbooks as well).
- **Implementation effect**: no lesson or question anywhere in this
  programme states a numeric New Customer Acquisition value. Where the
  workflow genuinely requires acknowledging that a customer-acquisition
  safeguard must be configured (Modules 3, 6, 9, 10), the lessons describe
  the existence of the setting without ever stating what value it should be
  set to, and Module 6's lesson explicitly tells the learner this figure is
  deliberately excluded due to a source conflict. Verified by an automated
  content scan for `£1`, `£0.10`, `£0.15`, and `0.10` across every module,
  lesson, and question string — none found.
- **Status**: `SOURCE_CONFLICT` — unresolved in the source material.
- **Future correction path**: once the Bidding Strategy handbook's owner and
  validator reconcile the three figures into one confirmed value, that value
  could be added to Module 6 (and cross-referenced from Modules 3/9/10) as a
  small, targeted content update — no structural change would be needed.

## 3. SHOPPING-002 — disputed approval-metadata conflict

- **Source**: Manual Google Shopping Campaign Creation (BGCT Ads Handbook)
  and its `.skill.md` / `METADATA_REGISTRY.xlsx` governance layer.
- **Issue**: the `.skill.md` file's own inline comment claims the metadata
  registry records the `approved_by` field as blank, but the actual
  `METADATA_REGISTRY.xlsx` shows `approved_by = [a named individual]`,
  status `SET` — a direct, verifiable inconsistency between two governance
  artifacts. This is a documentation-bookkeeping dispute, not a dispute
  about the underlying operational rule.
- **User decision**: exclude the disputed approval rule; do not teach or
  quiz the conflicting approval metadata.
- **Implementation effect**: because this programme's content authority is
  the narrative handbook only (governance files were consulted for context,
  never as content sources — see `digital-marketing-team-source-map.md` §1),
  this conflict never had a route into learner-facing content in the first
  place. Module 10 teaches only the plain, undisputed operational rule
  stated directly in the narrative handbook: a campaign must remain Paused
  until it receives documented approval from the designated approver. No
  specific approval-reference format, and no reference to the `approved_by`
  field or its dispute, appears anywhere in this programme.
- **Status**: out of scope (governance-file dispute, not a content dispute).
- **Future correction path**: none needed for learner content; the
  underlying governance-file inconsistency should be corrected by whoever
  owns the BGCT documentation pipeline, independent of this programme.

## 4. SHOPPING-001 — defective naming-convention example

- **Source**: Google Shopping Ads — Standard Campaign Creation, Setup and
  Management (BGCT Ads Handbook).
- **Issue**: the handbook's own "Correct Name Example" for a Shopping
  campaign naming convention (and a paired tracking-template example) uses
  the wrong ad-type token — a leftover copy-paste artifact from an unrelated
  Performance Max template. If followed literally, it would mislabel a real
  Shopping campaign.
- **User decision**: exclude the defective example entirely; do not silently
  repair it and present a corrected version as if it were the source's real
  example, and do not teach it as valid Shopping guidance.
- **Implementation effect**: Module 9's lesson on the naming convention
  describes the formula's field structure only, explicitly states that one
  of the source's worked examples is known-defective and is not used, and
  illustrates the (sound) formula with an invented, clearly fictional
  example that correctly uses a Shopping-type token instead. No quiz
  question references the defective example.
- **Status**: source defect, excluded by omission.
- **Future correction path**: whoever owns the BGCT documentation pipeline
  should correct the worked example in the source handbook itself; once
  corrected, the corrected example could optionally be added to Module 9 as
  a real (rather than invented) illustration.

## 5. Confidential content excluded (not a conflict, a confidentiality rule)

| Category | Source(s) | Action taken |
|----------|-----------|----------------|
| Real client/brand name + live domain URLs | Asset Group Setup handbook | Never reproduced; invented fictional examples used instead |
| Specific worked-example outcome figures tied to named collections/markets | Audience Signal, Manual Shopping handbooks | Never reproduced; invented fictional figures used where an example was needed |
| Named individual staff (Owner/Validator/process-owner roles) | Every handbook | Replaced with generic role wording throughout ("the designated approver", "the process owner"); generic escalation-team names already used by the sources (Ads Team Lead, Technical Team, Account Manager, Creative Team, Management) kept as-is |
| Internal repository file paths and content-integrity hashes | Every `.skill.md` (not used as a content source) | Never referenced in learner-facing content |
| External AI-tool link | Asset Group Setup handbook | Never reproduced |

## Summary table

| # | Source | Issue | User decision | Status | Future correction path |
|---|--------|-------|-----------------|--------|--------------------------|
| 1 | PMAX-005 | Metadata registry belongs to a different topic | Exclude entire topic | `EXCLUDED_PENDING_SOURCE_CORRECTION` | Correct registry, re-review, then author as an 11th module |
| 2 | PMAX-003 | Three conflicting NCA ceiling values in the same document | Exclude the numeric value programme-wide | `SOURCE_CONFLICT` | Owner/validator reconcile to one figure, then add as a targeted content update |
| 3 | SHOPPING-002 | Governance-file `approved_by` bookkeeping dispute | Exclude disputed metadata; teach only the plain undisputed rule | Out of scope | Correct governance file independently; no learner-content change needed |
| 4 | SHOPPING-001 | Defective naming-example (wrong ad-type token) | Exclude example entirely, do not repair silently | Source defect | Correct example in source; optionally add as real illustration later |
