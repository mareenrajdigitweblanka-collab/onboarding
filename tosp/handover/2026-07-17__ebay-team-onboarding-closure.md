# Handover — eBay Team Onboarding (Closure)

Date: 2026-07-17 (session executed 2026-07-28) · Programme code: TOSP-EBAY-01
· Status: implemented, not committed.

## Requirement

Add an eBay Team onboarding programme to the existing TOSP application,
reusing the shared engine/UI (themes, responsive layout, accessibility,
English TTS, module journey, lesson/quiz workflow, scoring, progress,
localStorage safety, toasts/dialogs, source-reference UI, completion). No PH
or Amazon curriculum, no team-leader sign-off, no Tamil, isolated storage. Do
not rebuild the engine, do not install packages, do not connect a backend, do
not commit/push. Branch only from `main`, and only once Amazon Team work is
merged into `main`.

## Branch base

- Starting branch: `feat/amazon-team-onboarding` @ `63caa06`.
- Verified `main` did **not** yet contain the Amazon commit (`git merge-base
  --is-ancestor 63caa06 main` → false), both locally and on `origin/main` —
  stopped and reported `EBAY_BUILD_BLOCKED_AMAZON_NOT_MERGED: YES` per
  instruction.
- On re-check, `origin/main` had advanced to `0a7d23e` (merge commit for PR
  #1, "Merge pull request #1 from
  mareenrajdigitweblanka-collab/feat/amazon-team-onboarding"), which does
  contain the Amazon commit and the `tosp/js/programmes/registry.js`
  infrastructure.
- Fast-forwarded local `main` to `origin/main` (`git fetch origin
  main:main` — a strict fast-forward, no divergence, nothing discarded) and
  created `feat/ebay-team-onboarding` from the updated `main`@`0a7d23e`.

## Source scope

The three FINAL eBay Team documents in `Ebay_Team/` (gitignored, read-only,
not modified): the 7-Day eBay Training Program PDF (primary structural
source), its Markdown export (secondary, lossy duplicate), and the EBAY BGCT
"Create the Perfect Listing" deck (separate deep-dive source, with a
contaminated Amazon-A+ slide and two confidential slides excluded). Full
inventory, duplicate relationship, and exclusions:
`tosp/docs/ebay-team-source-map.md`.

## Final module structure (8 modules, all required, no sign-off)

- **7-Day Onboarding (1–7):** Introduction to eCommerce · eBay Account Basics
  & Seller Hub Navigation · Product Research & Listing Fundamentals ·
  Practical Listing Creation · Account Health & Customer Service · Order
  Management & Daily Operations · Advanced Optimization & Final Evaluation
- **Listing Optimization Deep-Dive (8):** Title Optimization, Main Image,
  Supporting Images, Item Specifics, Description, Postage & Returns,
  Variation Rules — one lesson each.

## Files created

- `tosp/js/programmes/ebay-team-modules.js` — 8 MODULES + 22 LESSONS.
- `tosp/js/programmes/ebay-team-question-bank.js` — 8 QUIZZES + 35 QUESTIONS.
- `tosp/js/programmes/ebay-team-programme.js` — eBay descriptor (content +
  config + features + UI).
- `tosp/docs/ebay-team-source-map.md`
- `tosp/docs/ebay-team-programme-architecture.md`
- `tosp/validation/ebay-team-programme-check.md`
- `tosp/handover/2026-07-17__ebay-team-onboarding-closure.md` (this file)

## Files modified

- `.gitignore` — added `Ebay_Team/` (same confidential-source-folder pattern
  as `Amazon_Team/`/`PH_Team/`).
- `tosp/js/programmes/registry.js` — one import + one array entry added
  (`ebayTeamProgramme`); no other line changed.

No source documents were modified. No PH or Amazon programme file was
touched — the existing programme-boundary infrastructure (already on `main`
from the Amazon merge) required no changes to support a third programme; it
was designed for this.

## Source mapping

Each module maps to its Day (1–7) or, for Module 8, its listing-deck
section. Full table in `ebay-team-programme-architecture.md` §3 and the
source map §3.

## Quiz behaviour

Reuses the exact existing engine and config: 80% pass, 3 attempts,
all-required-lessons-before-quiz, unchanged scoring/attempt/progress/unlock
logic (`rules/scoring.js`, `rules/progression.js`, `rules/module-access.js`,
`services/quiz-service.js`, `services/progress-service.js` — none modified).
Verified live with a real engine run: a deliberately-wrong Module 1 attempt
left Module 2 locked; a correct-answer attempt unlocked it immediately. 35
questions across 8 quizzes, every one source-cited; the Amazon-A+ slide and
all confidential account data are excluded from every question (verified by
an automated string scan — 0 matches).

## No-sign-off confirmation

Every eBay module sets `requiresSignoff: false`; descriptor
`requiresReviewerSignoff: false`. The shared sign-off capability is retained
for PH, so no sign-off UI/state/storage/gate exists in the eBay programme.
This is also directly tested by two quiz questions (`eb-m2-quiz-q3`,
`eb-m7-quiz-q4`), so a learner cannot mistake the absence of sign-off for a
gap.

## No-Tamil confirmation

`enableTamilTranslation: false`. No Tamil controls render (the shared
`renderTranslationControl` choke point returns `''` when the flag is off,
unchanged code), the translation service is never called (no Google
Translation request), and the eBay `navItems` descriptor has no Translation
Review entry. PH Tamil is unaffected.

## Storage key

`tosp.ebay-team.prototype.v1` (v1). Separate from PH (`tosp.prototype.v2`),
Amazon (`tosp.amazon-team.prototype.v1`), theme (`tosp.ui.theme.v1`), and the
programme selector (`tosp.active-programme.v1`). Verified live: after
switching the active programme to eBay, running a full lesson/quiz/reset
cycle, and writing a sentinel value under the PH key beforehand, resetting
eBay progress removed only the eBay key — the PH sentinel was untouched.

## Real-browser validation (this session)

Performed a full real-Chrome validation pass with no code redesign and no
content/threshold/ID/scoring changes, per instruction. No browser automation
package was installed — real Chrome (already present on the machine at
`C:\Program Files\Google\Chrome\Application\chrome.exe`) was driven directly
over the Chrome DevTools Protocol using a small zero-dependency Node script
(Node 22's built-in `WebSocket`/`fetch`, no npm packages), and the app was
served from `tosp/` by a zero-dependency Node static file server. Both
scripts are throwaway test tooling in the session scratchpad, not part of
the repo.

**Result: 89/89 real-browser assertions passed.** 0 `console.error`, 0
uncaught exceptions, 0 failed network requests, 0 Google Translate calls,
across: eBay programme load + nav isolation, all 8 modules in correct
order/lock-state, direct-hash-nav blocking, lesson rendering + Read Aloud,
Module 1 quiz fail → pass → next-module-unlock, an isolated 3-attempt
exhaustion test, the **full 8-module golden path** (all 8 lessons sets + all
8 Skill Checks, ending at the completion screen with 8/8 and
`PROTOTYPE_ONLY`), a genuine full-page refresh preserving progress, reset
isolation (eBay key removed; PH/Amazon/theme sentinel keys untouched), 4
responsive breakpoints (360/768/1024/1440) with 0px horizontal overflow at
every one, the mobile drawer, and a PH + Amazon regression smoke pass (PH:
18 modules, Tamil present and isolated to PH, 11 sign-off-required modules
intact; Amazon: 16 modules, no Tamil, no sign-off — both programmes'
progress storage byte-identical to sentinel values planted before the run).

Full detail, screenshot list, and the upgraded 48-check table:
`tosp/validation/ebay-team-programme-check.md`.

### Bugs found

**None in the application.** Three issues surfaced while building the
browser test script itself — all test-harness bugs, fixed in the throwaway
test script only, with **zero application file changes**:
1. A nav-label CSS query was too broad and matched the shared "Reset Demo
   Progress" button — fixed by scoping to `[data-shell-nav-item]`, the
   attribute the app already uses to mark descriptor-driven nav buttons.
2. The test's raw `location.hash = x` assignment doesn't trigger Chrome's
   `hashchange` event when `x` already equals the current hash (e.g.
   retrying a quiz) — the app's own `router.navigate()` already handles this
   case correctly (explicit `rerender()` on a same-hash target), so the test
   was changed to call `navigate()` via a dynamic import instead of
   assigning the hash directly, matching what a real click does.
3. A `localStorage.clear()` used mid-suite (to start the golden path from a
   clean slate) also wiped PH/Amazon/theme sentinel values planted earlier
   for the reset-isolation check, causing a false failure unrelated to the
   actual eBay reset action — fixed by re-planting the sentinels immediately
   before that check.

### Bugs fixed

N/A — no application defect was found, so no application fix was made.

## Validation

`EBAY_PROGRAMME_IMPLEMENTATION_CHECKS: PASS` — **48/48 full PASS**
(`tosp/validation/ebay-team-programme-check.md`). Verified by:
- a static Node harness importing the real programme/registry modules
  (content integrity, ID uniqueness across all three programmes, config
  values, an automated confidentiality/contamination string scan — 0
  matches for any excluded name, count, or ID);
- a functional engine smoke test with a minimal `localStorage` shim running
  the real, unmodified engine modules end-to-end (module-unlock gating,
  quiz pass/fail, full 8-module completion, storage isolation,
  corrupt-storage recovery);
- **a real-Chrome browser pass** (89/89 assertions — see above);
- `node --check` across all new/modified JS files.

Totals: 8 modules / 22 lessons / 8 quizzes / 35 questions / 3 source
documents / 5 progression rules. PH still resolves 18 modules / 41 lessons /
59 questions and Amazon still resolves 16 modules / 42 lessons / 62
questions, both unchanged from before this work — confirmed both statically
and live in the browser this session.

## Regressions

None found — neither in this session's static/engine checks nor in the
live-browser PH/Amazon smoke pass. PH and Amazon content files were not
touched; both still load through the registry with their original counts;
both storage keys are distinct from eBay's and were confirmed byte-identical
to planted sentinel values after the entire eBay suite ran, including after
an eBay reset action.

## Known limits

- The Markdown 7-day export is a lossy duplicate of the PDF; per source
  priority its missing sections were not treated as invalidating the PDF.
- No pass-percentage, attempt-limit, or sign-off rule is stated in the eBay
  sources — the shared platform default (80%/3/no-signoff) was reused per
  the confirmed decision, not derived from the documents themselves.
- The browser test tooling (static server + CDP driver + test script) is
  throwaway session scratchpad, not committed to the repo; a future formal
  test suite would need its own home (e.g. a `tosp/tests/` convention) if
  this level of coverage is wanted on an ongoing basis rather than as a
  one-off validation pass.

## Next action

User acceptance review. `FINAL_USER_ACCEPTANCE: PENDING` (no separate
business acceptance rule provided). No commit or push was performed.

## Result

`EBAY_PROGRAMME_IMPLEMENTATION_CHECKS: PASS` (48/48) · `FINAL_USER_ACCEPTANCE: PENDING`
