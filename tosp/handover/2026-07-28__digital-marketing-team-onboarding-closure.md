# Digital Marketing Team Onboarding — Closure Handover

Date: 2026-07-28

## Requirement

Build a Digital Marketing Team onboarding programme inside the existing TOSP
application, reusing the shared engine, following the exact requirements
list supplied by the user (10 active modules across a Foundation + Performance
Max + Shopping structure, 80%/3-attempt quizzes, no sign-off, no Tamil, one
non-gating final practical task, and a documented set of exclusions for
PMAX-005, the PMAX-003 NCA conflict, the SHOPPING-002 approval-metadata
conflict, and the SHOPPING-001 defective naming example).

## Branch base

- Verified eBay merged into `origin/main` (`3dcffd6`, PR #2) before
  branching.
- Fast-forwarded local `main` to `origin/main`.
- Created `feat/digital-marketing-team-onboarding` from updated `main`.
- No work occurred on `feat/ebay-team-onboarding` or on `main` directly.

## Source authority

The 10 narrative "SOURCE" BGCT handbooks under `Digital_Marketing_Team/` are
user-confirmed FINAL_TRUTH content authority for this prototype. Governance
files (`.skill.md`, validation queues, metadata registries, review/evidence
templates) were consulted only for status/conflict/exclusion context, never
as content sources. See `tosp/docs/digital-marketing-team-source-map.md`.

## Final module structure

10 active modules: 1 Foundation + 7 Performance Max + 2 Shopping, in the
exact order the user specified. See
`tosp/docs/digital-marketing-team-programme-architecture.md` §3 for the
full table and rationale.

## Files created

- `tosp/js/programmes/digital-marketing-team-modules.js` (10 modules, 40 lessons)
- `tosp/js/programmes/digital-marketing-team-question-bank.js` (10 quizzes, 60 questions)
- `tosp/js/programmes/digital-marketing-team-programme.js` (descriptor + final practical task content)
- `tosp/js/views/practical-task-view.js` (new, non-gating practical-task screen)
- `tosp/docs/digital-marketing-team-source-map.md`
- `tosp/docs/digital-marketing-team-programme-architecture.md`
- `tosp/docs/digital-marketing-team-exclusions.md`
- `tosp/validation/digital-marketing-team-programme-check.md`
- `tosp/handover/2026-07-28__digital-marketing-team-onboarding-closure.md` (this file)

## Files modified

- `tosp/js/programmes/registry.js` — one import + one array entry, registering the fourth programme
- `tosp/js/data.js` — one additive re-export line (`PRACTICAL_TASK`, `undefined` for other programmes)
- `tosp/js/app.js` — one additive, guarded route registration (`/practical-task`)
- `tosp/js/views/dashboard-view.js` — one additive, guarded section (practical-task availability panel)

No PH, Amazon, or eBay content file was touched. No shared scoring,
progression, or storage-engine logic was changed.

## Source mapping

See `tosp/docs/digital-marketing-team-source-map.md` for the full
module-to-handbook mapping. Summary: Module 1 draws lightly from four
handbooks (no single foundation source exists); Modules 2-10 each have
exactly one primary narrative source handbook.

## Excluded conflicts

Four documented exclusions — full detail, reasoning, and future correction
path for each in `tosp/docs/digital-marketing-team-exclusions.md`:

1. **PMAX-005 (Budget Bleed Control)** — excluded entirely; its metadata
   registry belongs to a different topic (PMAX-004) and remains unresolved.
   `EXCLUDED_PENDING_SOURCE_CORRECTION`.
2. **PMAX-003 NCA ceiling** — the Bidding Strategy source states three
   different numeric values for the same safeguard; no numeric value is
   taught or quizzed anywhere in the programme. `SOURCE_CONFLICT`.
3. **SHOPPING-002 approval-metadata conflict** — a governance-file
   bookkeeping dispute (`approved_by` blank vs. set) unrelated to the
   narrative handbook; out of scope since only the narrative handbook was
   ever used as a content source.
4. **SHOPPING-001 defective naming example** — one worked example uses the
   wrong ad-type token (a copy-paste defect); excluded entirely, not
   silently repaired.

## Excluded confidential content

Real client/brand names, live URLs, an external AI-tool link, specific
worked-example figures tied to named collections/markets, named individual
staff, and internal file paths/hashes — all identified during the earlier
discovery phase — were never reproduced. Named individuals were replaced
with generic role wording throughout; generic escalation-team names already
used by the sources (Ads Team Lead, Technical Team, Account Manager,
Creative Team, Management) were kept as-is. Full category list in
`tosp/docs/digital-marketing-team-source-map.md` §6.

## Quiz rules

80% passing score, 3 max attempts — the exact existing shared TOSP
configuration, reused unchanged. 10 quizzes, 60 questions (6 per quiz).

## No-sign-off result

Every module sets `requiresSignoff: false`; `features.requiresReviewerSignoff: false`.
Verified: no sign-off panel, button, or gate renders anywhere in this
programme.

## Practical-task result

One final practical task (`digital-marketing-final-practical-v1`), 12
source-cited checklist items across 8 sections, rendered at `/practical-task`,
labelled PROTOTYPE_ONLY, using only fictional example data. Verified
non-gating: an automated run reached full programme completion without ever
opening this screen.

## Completion boundary

Completion = all required lessons complete + all 10 module Skill Checks
passed. No sign-off, no practical-task approval required. Verified
end-to-end via an automated all-correct quiz run.

## No-Tamil result

`enableTamilTranslation: false`. Verified: no Tamil controls render anywhere
in this programme; English Read Aloud remains available on every screen,
including the new practical-task screen. PH's Tamil functionality is
unaffected.

## Storage key

`tosp.digital-marketing-team.prototype.v1`. Verified isolated: writing then
resetting Digital Marketing progress left pre-seeded PH/Amazon/eBay/theme
localStorage values untouched.

## Real-browser validation session (2026-07-28, follow-up pass)

A second verification pass was performed specifically to close out the 5
browser-dependent checks left open in the first pass, using a real browser
rather than Node-level stubs.

**Browser/environment**: real headless Google Chrome 150.0.7871.182
(`C:\Program Files\Google\Chrome\Application\chrome.exe`), driven via a
zero-dependency Chrome DevTools Protocol client written against Node's
built-in `WebSocket`/`fetch` (no npm packages installed). The app was served
by a zero-dependency Node `http` static file server on `127.0.0.1:5173`. No
new dependency was added to the repository.

**What was exercised directly in the browser**: full programme load; exact
module order (screenshotted); Module 1 lesson-by-lesson walkthrough with
read-aloud clicks; a deliberate quiz failure (wrong answers, "Attempt 1 of
3"); a full 3-attempt exhaustion test in an isolated run (module 2 confirmed
still locked, 4th attempt blocked with "Skill Check Unavailable"); a full
golden-path run through all 10 modules (40 lessons marked complete, all 10
quizzes passed with correct answers, sequential unlocking observed at every
step); a targeted DOM-text exclusion scan (NCA £1/£0.10/£0.15, PMAX-005,
the SHOPPING-002 `approved_by`/`MUG-` pattern, the SHOPPING-001 defective
naming example, named staff, internal paths/hashes) across every lesson and
quiz screen — zero violations; the completion screen (10/10, PROTOTYPE_ONLY,
no certificate claim); the final practical task (12 items, stable IDs,
source citations, PROTOTYPE_ONLY, fictional-data language) opened
*independently after* completion, confirming its non-gating design; a
genuine CDP `Page.reload()` at both `#/module/dm-m5` and `#/completion`
confirming persistence; a reset-isolation test using seeded sentinel values
in PH/Amazon/eBay/theme storage, exercised through the real "Reset Demo
Progress" button and its confirm dialog; a corrupted-storage recovery test
(malformed JSON written to the Digital Marketing key, reloaded, recovered
safely with the one-time recovery toast); a light/dark theme toggle
(progress unaffected); 4 responsive viewports (360×800, 768×1024, 1024×768,
1440×900) checked for horizontal overflow across 5 screens each; and a
PH/Amazon/eBay regression pass (18/16/8 modules confirmed exactly, Tamil
confirmed present only for PH, no Digital-Marketing practical-task panel
leaked into any of them, all sentinel storage values confirmed untouched).

**Console/network result**: 0 console errors, 0 uncaught exceptions, 0
failed required network requests (only a harmless browser-automatic
`favicon.ico` 404), and 0 Google Translation calls observed across the
entire session.

**Targeted review of the four directly-authored modules** (Budget, Audit,
Shopping Automated, Shopping Manual — completed without a background agent
after the earlier session-limit failure): each module's 4 lessons and quiz
were opened and passed in the browser; the exclusion scan above covered
their text specifically; visually confirmed no oversized verbatim block, no
named staff, and (for the two Shopping modules) confirmed the naming-formula
lesson explicitly states the defective example is excluded rather than
silently repaired.

**Bugs found**: zero application defects. Two test-harness bugs were found
and fixed in the disposable CDP scripts only (case-insensitive text checks
needed because shared CSS applies `text-transform: uppercase` to badges; two
keyword checks were too broad and matched legitimate quiz-content wording) —
full detail in the validation report's "Bugs found" section. No application
file was touched as a result.

**Screenshot evidence**: 21 PNG files written to
`tosp/evidence/digital-marketing-team-2026-07-28/` — dashboard (light + dark),
module journey, Foundation module (light + dark), Budget/Audit/Shopping-Automated/Shopping-Manual
modules, failed quiz, passed quiz, practical task (light + dark), completion,
mobile dashboard/quiz/drawer, desktop dashboard, and PH/Amazon/eBay
regression dashboards.

## Validation result

See `tosp/validation/digital-marketing-team-programme-check.md` for the full
68-item binary check table. **DIGITAL_MARKETING_IMPLEMENTATION_CHECKS: PASS
— 68/68 checks passed**, all independently verified: 63 via direct real-browser
interaction in this follow-up pass, and the remaining 5 (light/dark mode,
mobile/desktop layout, refresh persistence) also directly confirmed in this
same real-browser pass, superseding the earlier Node-level verification.

## Regressions

None found. PH (18 modules), Amazon (16 modules), and eBay (8 modules)
dashboards, navigation, module views, and storage all confirmed correct and
untouched in the real browser, with no cross-programme nav-item leakage and
no shared-storage cross-contamination.

## Known limits

- The practical task's checked-item state is transient (in-memory only,
  local to its view) and resets on page refresh — intentional, since it is
  explicitly non-gating and PROTOTYPE_ONLY; this was directly verified in the
  browser (checking an item, reloading, and confirming it un-checks).
  Persisting it would require a small additive change to `storage.js`'s
  progress shape, out of scope here.
- The four documented exclusions remain open pending the future correction
  paths described in `digital-marketing-team-exclusions.md`.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step was
  supplied as part of this task.

## Next action

User review and acceptance of the programme content, module structure, and
documented exclusions. If accepted, this branch can be opened as a pull
request against `main` (not done as part of this task, per the "do not
commit or push" instruction — no commit was made in this session either).

## Result

**DIGITAL_MARKETING_IMPLEMENTATION_CHECKS: PASS — 68/68**
**FINAL_USER_ACCEPTANCE: PENDING**
