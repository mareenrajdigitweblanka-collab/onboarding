# Purchasing Team Onboarding — Closure Handover

Date: 2026-07-28

## Requirement

Build a Purchasing Team onboarding programme inside the existing TOSP
application, reusing the shared engine, following the exact requirements
list supplied by the user (10 active modules, 80%/3-attempt quizzes, no
sign-off, no Tamil, one non-gating final practical task) — **with
implementation explicitly authorised without resolving the source
conflicts found during discovery**. Per that authorisation, every disputed
item is excluded from learner-facing content rather than resolved.

## Starting branch and HEAD

- Branch: `main`
- HEAD: `e90497ff57422c178db1d4a28a1e00fc01aab8cb`
- `origin/main` matched exactly (no divergence)
- Working tree was clean except the untracked `Purchasing_Team/` folder

## Branch base

- Verified all four prior programmes (PH, Amazon, eBay, Digital Marketing)
  are merged into `origin/main` at `e90497f`.
- Fast-forwarded local `main` to `origin/main` (already up to date, no-op).
- Created `feat/purchasing-team-onboarding` from updated `main`.
- No work occurred on any other feature branch or on `main` directly.

## Purchasing_Team/ gitignore result

Discovery had flagged an anomaly: `git check-ignore -v Purchasing_Team/`
reported the folder as ignored via `.gitignore:11`, but that line was
actually blank and the string "Purchasing_Team" did not appear anywhere in
the file. This session explicitly inspected `.gitignore`, confirmed the
anomaly still held (no real rule existed), and added an explicit
`Purchasing_Team/` line (now line 18, alongside the other four team
folders). Re-running `git check-ignore -v Purchasing_Team/` now correctly
matches that real line, and `Purchasing_Team/` no longer appears in
`git status --short`.

## Source authority

Five-tier authority model applied (written SOPs primary; PO Decision Engine
written rules supplemental/non-conflicting only; Excel workbooks
formula-reference/non-conflicting only; HTML prototype interface-evidence
only; samples/worked examples illustrative only). All 14 source files under
`Purchasing_Team/` were inventoried; see
`tosp/docs/purchasing-team-source-map.md`.

## Final module structure

10 active modules, single track, in the order the shared SOP sources'
process sequence supports: Foundation → End-to-End Workflow → Requirement
Inputs → PO Creation → PO Updates → Supplier Follow-Up → Decision
Intelligence → Container Planning → Stock Receipt → Exceptions/Final
Review. See `tosp/docs/purchasing-team-programme-architecture.md` §3.

## Files created

- `tosp/js/programmes/purchasing-team-modules.js` (10 modules, 40 lessons)
- `tosp/js/programmes/purchasing-team-question-bank.js` (10 quizzes, 60 questions)
- `tosp/js/programmes/purchasing-team-programme.js` (descriptor + final practical task content)
- `tosp/docs/purchasing-team-source-map.md`
- `tosp/docs/purchasing-team-programme-architecture.md`
- `tosp/docs/purchasing-team-exclusions.md`
- `tosp/validation/purchasing-team-programme-check.md`
- `tosp/evidence/purchasing-team-2026-07-28/` (8 PNG screenshots)
- `tosp/handover/2026-07-28__purchasing-team-onboarding-closure.md` (this file)

## Files modified

- `.gitignore` — one line added (`Purchasing_Team/`), the only permitted
  write outside `tosp/`
- `tosp/js/programmes/registry.js` — one import + one array entry,
  registering the fifth programme

No other file was modified. `tosp/js/views/practical-task-view.js`,
`tosp/js/data.js`, `tosp/js/app.js`, and `tosp/js/views/dashboard-view.js`
already support any programme that defines `content.PRACTICAL_TASK` /
`ui.practicalTask` (added generically for Digital Marketing) — confirmed by
direct inspection before writing any Purchasing code, so **zero** further
changes were needed to any of them. No PH, Amazon, eBay, or Digital
Marketing content file was touched. No shared scoring, progression,
module-access, or storage-engine logic was changed.

## Source mapping

See `tosp/docs/purchasing-team-source-map.md` §3 for the full
module-to-source mapping. Summary: Modules 1-6, 9, 10 are built from the
four written SOP PDFs plus the Purchasing Rule Book; Modules 7-8 draw from
the PO Decision Engine documents and workbooks, using only the
non-conflicting purpose/structure/limitation content — the majority of that
source cluster's specific figures are excluded (see next section).

## Excluded conflicts and defects

Thirteen documented exclusion categories — full detail, source, issue,
implementation action, learner impact, and future correction path for each
in `tosp/docs/purchasing-team-exclusions.md`:

1. **Container-fill CBM threshold conflict** (64/67/68 CBM across 4 sources) — no CBM figure taught anywhere.
2. **Tier-A warehouse-capacity cutoff conflict** (85% vs. 90%) — no cutoff figure taught.
3. **Conflicting Gate 2 definitions** (Rules doc vs. Spec Update) — no Gate 2 definition taught.
4. **Conflicting Gate 5 definitions** (Rules doc vs. HTML prototype, including activation status and an order-of-magnitude threshold difference) — no Gate 5 definition taught.
5. **Conflicting Gate 6 definitions** (MOQ Efficiency vs. Warehouse Capacity) — no Gate 6 definition taught; MOQ taught only from the undisputed SOP source.
6. **Disputed gate activation status** (general) — taught only as an abstract limitation, no specific gate named as active/inactive.
7. **True Contribution formula conflict** (labour-inclusive vs. labour-exclusive) — neither formula taught or used.
8. **Off-by-one CBM-subtraction defect** (`Container_Scoring_Model_V2.2.xlsx Summary!B30`) — this workbook's calculated output never used as a content source.
9. **Mislabeled summary rows** (`Summary!B33:B35`) — same treatment as #8.
10. **Hardcoded Gate 5 "PASS" stub** (`Decision!K` column) — cited only as evidence for a general caution, never as taught content.
11. **Ambiguous "MD" role wording** — generic "management approval"/"senior approval step" language used instead of asserting a specific job title.
12. **Sample-data-as-policy caution** — standing authoring discipline applied throughout; no sample/worked-example figure taught as universal policy.
13. **Confidentiality register** — real/informally-coded supplier identities, a plaintext-credential procedural detail, internal channel/facility names, HTML-prototype sample data, workbook staff initials, and a file-metadata personal name — all excluded or genericised.

## Excluded confidential content

Real/informally-coded supplier names with pricing/performance commentary,
an internal chat/group name, an internal facility name, populated
supplier/PO/monetary sample data in the HTML prototype, staff initials in
workbook data, and a personal name in file metadata — all identified during
the earlier discovery phase — were never reproduced. Full category list in
`tosp/docs/purchasing-team-exclusions.md` §13.

## Quiz settings

80% passing score, 3 max attempts — the exact existing shared TOSP
configuration, reused unchanged. 10 quizzes, 60 questions (6 per quiz). No
question tests any of the 13 excluded categories or any confidential/live
data — verified by both a static regex scan and a DOM-level scan of the
live rendered data in a real browser.

## No-sign-off result

Every module sets `requiresSignoff: false`; `features.requiresReviewerSignoff: false`.
Verified in a real browser: no sign-off panel, button, or gate renders
anywhere in this programme; PH's sign-off functionality is unaffected.

## No-Tamil result

`enableTamilTranslation: false`. Verified in a real browser: no Tamil
controls render anywhere in this programme; zero network requests to any
translation endpoint were observed; English Read Aloud remains available on
every screen. PH's Tamil functionality is unaffected.

## Practical-task result

One final practical task (`purchasing-final-practical-v1`), 12 source-cited
checklist items across 9 sections, rendered at `/practical-task`, labelled
PROTOTYPE_ONLY, using only fictional example data, explicitly stating it
creates no real PO and contacts no real supplier. Verified non-gating in a
real browser: the golden-path run reached full programme completion
(`isProgrammeComplete() === true`, completion screen rendered) without ever
opening this screen; the screen was then opened independently afterward and
rendered correctly.

## Completion boundary

Completion = all required lessons complete + all 10 module Skill Checks
passed. No sign-off, no practical-task approval required. Verified
end-to-end in a real browser via an automated all-correct quiz run driving
the actual production `quiz-service.js`/`progress-service.js`/
`module-access.js` modules. The completion screen (shared, unmodified)
displays `PROTOTYPE_ONLY` and explicitly states it is not an official
employment, onboarding, or competency certificate.

## Storage key

`tosp.purchasing-team.prototype.v1`. Verified isolated in a real browser:
seeding sentinel values into PH/Amazon/eBay/Digital Marketing/theme keys,
then calling the real `resetProgress()`, removed only the Purchasing key
and left every sentinel value untouched.

## Verification session (2026-07-28)

**Method**: real headless Google Chrome 150.0.7871.187, driven via a
zero-dependency Chrome DevTools Protocol client written against Node's
built-in `WebSocket`/`fetch` (no npm packages installed), serving the app
from a zero-dependency Node `http` static file server on
`127.0.0.1:5174`. No new dependency was added to the repository. Preceded
by 68 static Node-level checks that imported and inspected the real
production ES modules directly.

**What was exercised directly in the browser**: full programme load and
title/module-count check; a golden-path run through all 10 modules (40
lessons marked complete, all 10 Skill Checks passed with correct answers via
the real production quiz service, sequential module unlocking confirmed at
every step, `isProgrammeComplete()` confirmed `true`); the completion screen
(PROTOTYPE_ONLY, explicit non-certificate disclaimer); the final practical
task opened independently *after* completion (confirming non-gating); a
DOM-level exclusion scan across every live lesson/question string (CBM
values, gate numbers, named suppliers, internal channel/facility names) —
zero violations; a deliberate all-wrong-answer quiz failure (0%, next module
stayed locked); a full 3-attempt exhaustion test (4th attempt blocked with
"Skill Check Unavailable"); a reset-isolation test using seeded sentinel
values in PH/Amazon/eBay/Digital Marketing/theme storage, exercised through
the real `resetProgress()` function; a corrupted-storage recovery test
(malformed JSON written to the Purchasing key, reloaded, recovered safely
with zero exceptions); a genuine page reload confirming persistence; a
light/dark theme toggle; two responsive viewports (360×800, 1440×900)
checked for horizontal overflow; direct navigation to a locked module
(blocked); and a full PH/Amazon/eBay/Digital Marketing regression pass
(18/16/8/10 modules confirmed exactly, no Purchasing content leakage into
any of them, all sentinel storage values confirmed untouched).

**Console/network result**: 0 console errors, 0 uncaught exceptions, 0
failed required network requests, and 0 Google Translation calls observed
across both verification passes.

**Bugs found**: zero application defects. One content-authoring issue (an
early lesson draft named two disputed gate numbers while explaining the
conflict between them) was caught by the static exclusion scan and reworded
before finalising; one verification-harness regex bug (a false positive on
the completion screen's correctly-worded negation sentence) was found and
fixed in the disposable test script only — full detail in the validation
report's "Bugs found" section. No application file required a fix.

**Screenshot evidence**: 8 PNG files written to
`tosp/evidence/purchasing-team-2026-07-28/` — dashboard (light + dark),
completion, practical task, a module screen, a cross-programme regression
dashboard, mobile dashboard, and desktop dashboard.

## Validation result

See `tosp/validation/purchasing-team-programme-check.md` for the full
84-item binary check table (mapped from 119 underlying automated checks).
**PURCHASING_IMPLEMENTATION_CHECKS: PASS — 84/84 required checks passed**,
all independently verified this session: 68 via direct execution of the
real production JavaScript under Node, and 51 via direct interaction with
the real application running in headless Chrome.

## Regressions

None found. PH (18 modules), Amazon (16 modules), eBay (8 modules), and
Digital Marketing (10 modules) dashboards, navigation, module counts, and
storage all confirmed correct and untouched in the real browser, with no
cross-programme navigation-item leakage and no shared-storage
cross-contamination.

## Known limitations

- Thirteen categories of disputed or defective source content are
  deliberately excluded from this programme rather than resolved — see
  `purchasing-team-exclusions.md` for the full register and future
  correction paths. Implementation was explicitly authorised to proceed on
  this basis.
- The sources do not establish an organisational boundary between
  "Purchasing" and "Inventory Purchasing"; Module 1 teaches this as an open
  question rather than inventing an answer.
- No pass-percentage, attempt-limit, or sign-off rule is stated in the
  Purchasing sources; the shared platform default (80% / 3 attempts / no
  sign-off) is reused per the confirmed prototype default, not derived from
  the Purchasing documents.
- The practical task's checked-item state is transient (in-memory only,
  local to its view) and resets on page refresh — intentional, since it is
  explicitly non-gating and PROTOTYPE_ONLY, identical to Digital Marketing's
  design.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step
  was supplied as part of this task.

## Next action

User review and acceptance of the programme content, module structure, and
documented exclusions — in particular the 18 open confirmations carried
over from discovery (canonical CBM value, canonical gate definitions,
whether "MD"/"management" should be unified, etc.), none of which block this
implementation since every disputed item was excluded rather than resolved.
If accepted, this branch can be opened as a pull request against `main` (not
done as part of this task, per the "do not commit or push" instruction — no
commit was made in this session either).

## Result

**PURCHASING_IMPLEMENTATION_CHECKS: PASS — 84/84**
**FINAL_USER_ACCEPTANCE: PENDING**
