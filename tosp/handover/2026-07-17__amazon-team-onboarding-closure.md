# Handover — Amazon Team Onboarding (Closure)

Date: 2026-07-17 · Programme code: TOSP-AMZ-01 · Status: implemented, not
committed.

## Requirement

Add an Amazon Team onboarding programme to the existing TOSP application,
reusing the shared engine/UI (themes, responsive layout, accessibility, English
TTS, module journey, lesson/quiz workflow, scoring, progress, localStorage
safety, toasts/dialogs, source-reference UI, completion). No PH curriculum, no
team-leader sign-off, no Tamil, isolated storage. Do not rebuild the engine, do
not install packages, do not connect a backend, do not commit/push.

## Source scope

All FINAL Amazon Team documents in the repository root (`Amazon_Team/…`) across
three tracks — FBA, FBM, Vendor Central — treated as FINAL_TRUTH and read-only.
21 documents inspected (18 used to author content; 2 binary PDFs unreadable; 1
CSV as the Vendor sequence authority). Full inventory, duplicates, conflicts and
exclusions: `tosp/docs/amazon-team-source-map.md`.

## Final module structure (16 modules, all required, no sign-off)

- **FBM Foundations (1–5):** Account Health & Compliance · Listing SEO & Content
  · Keyword Research · Competitor Analysis · Pricing Strategy & Buy Box
- **FBA Operations (6–8):** FBA Product Selection & Rules · FBA Unfulfillable
  Inventory Settings · SIPP
- **Vendor Central (9–16):** Vendor Central Introduction · Product Selection &
  Migration · Listing Creation · PO Fulfilment & Label Booking · Invoicing ·
  Receive Variance & Shortage Disputes · Chargebacks · Product Returns Management

## Files created

- `tosp/js/programmes/registry.js` — active-programme selection + list.
- `tosp/js/programmes/ph-team-content.js` — PH content (byte-for-byte copy of the
  old `data.js`).
- `tosp/js/programmes/ph-team-programme.js` — PH descriptor (config/features/UI).
- `tosp/js/programmes/amazon-team-modules.js` — Amazon MODULES + LESSONS.
- `tosp/js/programmes/amazon-team-question-bank.js` — Amazon QUIZZES + QUESTIONS.
- `tosp/js/programmes/amazon-team-programme.js` — Amazon descriptor + content.
- `tosp/docs/amazon-team-source-map.md`
- `tosp/docs/amazon-team-programme-architecture.md`
- `tosp/validation/amazon-team-programme-check.md`
- `tosp/handover/2026-07-17__amazon-team-onboarding-closure.md` (this file)

## Files modified (shared engine, made programme-aware — not duplicated)

- `tosp/js/data.js` — now an active-programme content dispatcher.
- `tosp/js/config.js` — CONFIG/FEATURES/STORAGE_KEY resolve from active programme.
- `tosp/js/components/header.js` — descriptor-driven nav + programme switcher.
- `tosp/js/components/translation-control.js` — Tamil gated by feature flag.
- `tosp/js/views/dashboard-view.js` — descriptor-driven tracks/readiness/blurb.
- `tosp/js/views/programme-view.js` — descriptor-driven tracks.
- `tosp/js/views/sources-view.js` — conditional PH-only tables; descriptor intro.
- `tosp/js/views/module-view.js` — descriptor-driven "back to programme" link.
- `tosp/js/views/completion-view.js` — shows Team + explicit PROTOTYPE_ONLY status.
- `tosp/js/app.js` — Tamil-review route redirects when Tamil is disabled.
- `tosp/css/styles.css` — programme-switcher styles (existing tokens only).

No source documents were modified. No PH content file was edited (the PH content
was copied, and the old `data.js` became the dispatcher).

## Source mapping

Each module maps to one canonical document; recurring rules are taught once.
Full table in `amazon-team-programme-architecture.md` §3 and the source map.

## Quiz behaviour

Reuses the exact existing engine and config: 80% pass, 3 attempts,
all-required-lessons-before-quiz, unchanged scoring/attempt/progress/unlock
logic. Failed quiz → next module stays locked; passed quiz → next module unlocks
immediately (no sign-off). 62 questions, every one source-cited; conflicted and
sensitive material excluded.

## No-sign-off configuration

Every Amazon module `requiresSignoff: false`; descriptor
`requiresReviewerSignoff: false`. Shared sign-off capability retained for PH, so
no sign-off UI/state/storage/gate exists in Amazon.

## Completion rule

Complete when all 16 required modules' lessons are completed and Skill Checks
passed (no reviewer sign-off). Completion screen shows Amazon Team, module count,
version, date, PROTOTYPE_ONLY, and is explicitly not a certificate.

## No-Tamil confirmation

`enableTamilTranslation: false`. No Tamil controls render, translation service is
never called (no Google Translation), Tamil review screen removed/redirected. PH
Tamil unchanged.

## Storage key

`tosp.amazon-team.prototype.v1` (v1). Separate from PH (`tosp.prototype.v2`),
theme (`tosp.ui.theme.v1`), and selector (`tosp.active-programme.v1`). Amazon
reset clears only the Amazon key.

## Validation

`AMAZON_PROGRAMME_IMPLEMENTATION_CHECKS: PASS` — 40/40 checks
(`tosp/validation/amazon-team-programme-check.md`). Verified by a Node harness
over the real modules (content integrity, uniqueness, storage isolation,
dispatcher switching), a DOM-shim render smoke test of every view for both
programmes (no throws), and `node --check` across all JS. Totals: 16 modules /
42 lessons / 16 quizzes / 62 questions / 18 source docs / 8 progression rules.

## Conflicts

3 substantive SEO conflicts recorded as SOURCE_CONFLICT (backend byte limit,
description length, title-length phrasing) — omitted from content until
reconciled. See source map §4.

## Known limits

- Programme switch reloads the page (by design for the static ES-module engine).
- Two source PDFs unreadable; their topics are covered by markdown peers.
- Browser-level visual checks (themes/responsive/TTS) are inherited from the
  unchanged shared UI that PH already passes; they were not re-driven in a live
  browser this session (no browser automation / package install permitted).

## Next action

User acceptance review. `FINAL_USER_ACCEPTANCE: PENDING` (no separate business
acceptance rule provided). Optionally run a live browser pass and, once
approved, commit (not done here per instruction).

## Result

`AMAZON_PROGRAMME_IMPLEMENTATION_CHECKS: PASS` · `FINAL_USER_ACCEPTANCE: PENDING`
