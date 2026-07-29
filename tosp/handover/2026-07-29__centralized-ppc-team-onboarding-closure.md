# Centralized PPC Team Onboarding — Closure Handover

Date: 2026-07-29

## Requirement

Build a Centralized PPC Team onboarding programme inside the existing TOSP
application, reusing the shared engine, following the user-confirmed
decisions (six-area programme structure: Shared PPC Foundation, Amazon PPC,
Google Ads, Meta Ads, eBay Advertising, Reporting and Governance; 80%/3-
attempt quizzes; no sign-off; no Tamil; one non-gating final practical task)
— **with implementation explicitly authorised without resolving the nine
source conflicts found during discovery**. Per that authorisation, every
disputed item is excluded from learner-facing content rather than resolved.

## Starting branch and HEAD

- Branch: `feat/centralized-ppc-team-onboarding` (already created and
  current at session start, per the task brief)
- HEAD: `9b85e572991f4422ebc06f23a1f5c5216b278273`
- `origin/main` matched exactly (no divergence); branch confirmed created
  from `main` at that same commit, containing `7c05c34` (the merged
  whole-app UI/UX work)
- Working tree was clean at session start except the already-approved,
  uncommitted `.gitignore` edit (3 lines: `Centralized_PPC_Team/`,
  `Customer_Service_Team/`, `US_Or_Canada_Market_Rebuild_Team/`) — preserved
  unchanged throughout this session, never discarded

## Precheck result

All eight precheck confirmations from the task brief passed: correct
branch; branch created from approved merged main; no unrelated application
work found (only the pre-approved `.gitignore` edit); nothing staged; all
three source folders matched by explicit real `.gitignore` rules
(`.gitignore:19-21`); none of the three folders tracked; the whole-app
programme-selection architecture (`registry.js` + six-programme pattern)
confirmed present; PH, Amazon, eBay, Digital Marketing, and Purchasing all
confirmed present and registered. `CENTRALIZED_PPC_BUILD_BLOCKED_UNRELATED_WORK`
did **not** trigger.

## Source authority

All 30 Centralized PPC source files treated as FINAL PROTOTYPE TRUTH per
user authorisation, subject to four mandatory restrictions: exclude all
nine unresolved conflicts; exclude confidential/live data; never silently
resolve a contradiction; never present an example as universal policy. See
`tosp/docs/centralized-ppc-team-source-map.md` for the full inventory
(confirmed count 23 Amazon / 3 Google Ads / 1 Meta / 3 eBay = 30, verified by
opening and mapping every file rather than relying on an earlier estimate).

## Final module structure

14 modules, six `ui.tracks`, one strict linear unlock sequence: Shared PPC
Foundation (1) → Amazon PPC (2-7) → Google Ads (8-9) → Meta Ads (10) → eBay
Advertising (11-12) → Reporting and Governance (13-14). See
`tosp/docs/centralized-ppc-team-programme-architecture.md` §3 for the full
per-module source justification.

## Files created

- `tosp/js/programmes/centralized-ppc-team-modules.js` (14 modules, 56 lessons)
- `tosp/js/programmes/centralized-ppc-team-question-bank.js` (14 quizzes, 84 questions)
- `tosp/js/programmes/centralized-ppc-team-programme.js` (descriptor + final practical task content)
- `tosp/docs/centralized-ppc-team-source-map.md`
- `tosp/docs/centralized-ppc-team-programme-architecture.md`
- `tosp/docs/centralized-ppc-team-exclusions.md`
- `tosp/validation/centralized-ppc-team-programme-check.md`
- `tosp/evidence/centralized-ppc-team-2026-07-29/` (22 PNG screenshots)
- `tosp/handover/2026-07-29__centralized-ppc-team-onboarding-closure.md` (this file)

## Files modified

- `tosp/js/programmes/registry.js` — one import + one array entry,
  registering the sixth programme. This is the **only** shared-file edit
  this task made.

No other file was modified. `tosp/js/views/practical-task-view.js`,
`tosp/js/data.js`, `tosp/js/config.js`, `tosp/js/app.js`, and
`tosp/js/views/dashboard-view.js` already support any programme that
defines `content.PRACTICAL_TASK` / `ui.practicalTask` (the generic
mechanism first built for Digital Marketing and already reused by
Purchasing) — confirmed by direct inspection before writing any Centralized
PPC code, so **zero** further changes were needed to any of them. No PH,
Amazon, eBay, Digital Marketing, or Purchasing content file was touched. No
shared scoring, progression, module-access, or storage-engine logic was
changed. **Source documents changed: NO** — every file under
`Centralized_PPC_Team/` remained read-only throughout, was never staged, and
is not present in this or any prior commit (protected by the gitignore rule
below). The `.gitignore` edit referenced in "Starting branch and HEAD"
above was already present and approved before this session began; this
session did not modify it further.

## Source mapping

See `tosp/docs/centralized-ppc-team-source-map.md` §3 for the full
module-to-source mapping. Summary: Modules 2-7 (Amazon, the largest single
source cluster at 23 files) draw from the BGCT handbook/guidebook trio, the
five developer rule configurators, and the 15 UK/DE-FR-IT user-level
workflow documents; Modules 8-9 (Google Ads) draw from the strategy
analysis, incident-review memo, and PMax setup guide; Module 10 (Meta) from
the single campaign proposal; Modules 11-12 (eBay) from the BGCT reference
and both individually authored strategy documents (with the disputed one
used only for its non-conflicting portions); Modules 13-14 (Reporting and
Governance) synthesise cross-cutting reporting, evidence, and role content
already introduced in earlier modules.

## Excluded conflicts

Nine documented `SOURCE_CONFLICT` exclusions — full detail, source, issue,
implementation action, learner impact, and future resolution path for each
in `tosp/docs/centralized-ppc-team-exclusions.md`:

1. **Amazon SP minimum star-rating conflict** (3.5★ vs. 4.0★) — no rating figure taught.
2. **Amazon budget-review cadence conflict** (daily vs. twice weekly) — no cadence taught as universal.
3. **Amazon ASINs-per-ad-group internal contradiction** ("5-10" vs. "one", within the same source) — no figure taught.
4. **Amazon UK vs. DE/FR/IT high-ACOS pause threshold conflict** (35% vs. 50%, with copy-paste evidence) — no DE/FR/IT threshold taught.
5. **Un-localised DE/FR/IT currency conflict** (£ used where local currency expected) — reported as an open gap, not corrected.
6. **Amazon month-boundary split date conflict** (19th/20th vs. 20th/21st) — no cut-off date taught.
7. **Amazon "fast-moving product" definition conflict** (2 vs. 3 qualifying conditions) — no definition taught.
8. **eBay advertising-rate conflict** (2-4% start vs. 5-7% mandatory — directly contradictory) — no percentage or range taught.
9. **Amazon budget-tier structure conflict** (2-tier vs. 5-tier for the same rule family) — no tier count/structure taught.

Plus a tenth, non-conflict confidentiality register (real account/client
names, live campaign performance figures, named individuals in
accountability contexts, internal resource links) — full category table in
`centralized-ppc-team-exclusions.md` §10.

## Quiz settings

80% passing score, 3 max attempts — the exact existing shared TOSP
configuration, reused unchanged. 14 quizzes, 84 questions (6 per quiz). No
question tests any of the nine excluded conflicts or any confidential/live
data — verified both by manual authoring review and by a real-browser DOM
scan of every rendered question during the golden-path walkthrough.

## No-sign-off result

Every module sets `requiresSignoff: false`; `features.requiresReviewerSignoff: false`.
Verified in a real browser: no sign-off panel, button, or gate renders
anywhere in this programme across all 14 modules; PH's sign-off
functionality is unaffected.

## No-Tamil result

`enableTamilTranslation: false`. Verified in a real browser: no Tamil
controls render anywhere in this programme; the CPPC navigation descriptor
carries no Translation Review item; English Read Aloud remains available on
every screen (dashboard, module, lesson, quiz, practical task). PH's Tamil
functionality is unaffected.

## Practical-task result

One final practical task (`centralized-ppc-final-practical-v1`), 12
source-cited checklist items across 8 sections, rendered at
`/practical-task`, labelled PROTOTYPE_ONLY, using only fictional example
data, explicitly stating it does not connect to any advertising platform,
launch or change a real campaign, or spend real budget. Verified non-gating
in a real browser: the golden-path run reached full programme completion
(completion screen rendered, showing all 14 modules complete) before the
practical task was ever opened; the screen was then opened independently
afterward and rendered/interacted with correctly (checklist item checked,
progress counter updated).

## Completion boundary

Completion = all required lessons complete + all 14 module Skill Checks
passed. No sign-off, no practical-task completion required. Verified
end-to-end in a real browser via an automated all-correct quiz run driving
the actual production `quiz-service.js`/`progress-service.js`/
`module-access.js` modules across all 14 modules in sequence. The
completion screen (shared, unmodified) displays `PROTOTYPE_ONLY` and does
not claim official advertising authorisation, campaign-management
authority, or competency certification.

## Storage key

`tosp.centralized-ppc-team.prototype.v1`. Verified isolated in a real
browser: seeded a sentinel value into the Purchasing programme's storage
key, completed part of the CPPC programme, triggered the real
`resetProgress()` via the sidebar "Reset Demo Progress" action, and
confirmed only the CPPC key was cleared while the Purchasing sentinel value
remained byte-for-byte untouched.

## Verification session (2026-07-29)

**Method**: real Google Chrome (system install, version 150.0.7871.187, at
`C:\Program Files\Google\Chrome\Application\chrome.exe`), driven headlessly
via Playwright 1.62.0, serving `tosp/` from a local Python static file
server on `127.0.0.1:8123`. Playwright's own bundled Chromium could not be
downloaded in this environment (`ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC`
on every attempt against `cdn.playwright.dev`), so `executablePath` was
pointed at the already-installed system Chrome instead — this drove a real,
full browser throughout, not a mock. Preceded by direct Node-level
structural checks importing the real production `MODULES`/`LESSONS`/
`QUIZZES`/`QUESTIONS`/programme-descriptor exports and asserting on ID
uniqueness, lesson/question counts, `orderIndex` sequencing, prerequisite
chains, and track-filter coverage.

**What was exercised directly in the browser**: full programme-select
screen load with the CPPC card present alongside all five existing
programmes; switching to CPPC via the real `setActiveProgramme` (full page
reload); a golden-path run through all 14 modules (56 lessons marked
complete via the real `markLessonComplete`, all 14 Skill Checks passed with
correct answers via the real production quiz service, sequential module
unlocking confirmed at every step) ending at the completion screen; a
deliberate all-wrong-answer Module 1 quiz submission (0%, next module
stayed locked) followed by a correct retry (passed, next module unlocked);
a full 3-attempt exhaustion test on an isolated run (3 failed attempts, 4th
attempt blocked with the "No Skill Check attempts remain" panel); direct
navigation to a locked module, lesson, and quiz URL (all correctly blocked)
without ever completing a prior module; a reset-isolation test using a
seeded Purchasing sentinel value, exercised through the real
`resetProgress()`/sidebar UI; a corrupted-storage recovery test (malformed
JSON written directly to the CPPC storage key, page reloaded, recovered
safely to a fresh initial state); a genuine full-page reload confirming
progress persistence; a light/dark theme toggle; three responsive viewports
(390×844 mobile including the slide-in drawer, 768×1024 tablet, 1440×900
desktop); the final practical task opened independently *after* full
completion (confirming non-gating) with one checklist item checked; and a
full five-programme regression pass (PH, Amazon, eBay, Digital Marketing,
Purchasing) — each programme's dashboard loaded correctly with zero console
errors and zero failed requests.

**Console/network result**: the only console errors observed anywhere
across every run were two pre-existing `favicon.ico` 404s (no
`<link rel="icon">` exists in `tosp/index.html`) — reproducible identically
on the unmodified baseline and on every other programme, confirmed not a
Centralized PPC regression. Zero CPPC-caused console errors, zero failed
application requests, and zero Google Translation calls observed across
every verification pass.

**Bugs found**: zero application defects. One test-harness misunderstanding
was caught and corrected during this session: an early version of the
attempts-exhaustion test script navigated via `page.goto` between quiz
attempts instead of clicking the in-app "Retry Skill Check" control, which
tripped the app's intentional one-shot post-refresh result display
(`state.js`'s `takeLastResult`, an existing, correct, documented behaviour)
and was misread as a false "quiz blocked after 1 attempt" signal. Debugging
confirmed the real behaviour is correct (`canAttemptQuiz` correctly allows
3 attempts); the test script was fixed to drive the UI the way a learner
actually would, and it then passed correctly. No application file required
a fix.

**Stray files note**: during the earlier discovery phase (prior turn), one
sub-agent's DOCX-extraction output was accidentally written to three
eBay-source extraction dump files in the repository root instead of the
scratchpad. These were identified and deleted before this implementation
session began; `git status` has been clean of them throughout.

**Screenshot evidence**: 22 PNG files written to
`tosp/evidence/centralized-ppc-team-2026-07-29/` — programme select,
dashboard, module journey, five representative track lessons (Foundation,
Amazon, Google Ads, Meta, eBay, Reporting), failed quiz, passed quiz,
attempts-exhausted, practical task, completion, mobile dashboard/lesson/
quiz/drawer, tablet view, desktop view, and dark/light mode.

## Validation result

See `tosp/validation/centralized-ppc-team-programme-check.md` for the full
111-item binary check table mirroring the task brief's structure.
**CENTRALIZED_PPC_IMPLEMENTATION_CHECKS: PASS — 111/111 checks passed.**

## Regressions

None found. PH, Amazon, eBay, Digital Marketing, and Purchasing dashboards
all confirmed to load correctly and unaffected, with zero console errors,
zero failed requests, and zero cross-programme storage or navigation
leakage.

## Known limitations

- Nine `SOURCE_CONFLICT` items plus a confidentiality register are
  deliberately excluded from this programme rather than resolved — see
  `centralized-ppc-team-exclusions.md` for the full register and future
  resolution paths. Implementation was explicitly authorised to proceed on
  this basis.
- No pass-percentage, attempt-limit, or sign-off rule is stated in the
  Centralized PPC sources; the shared platform default (80% / 3 attempts /
  no sign-off) is reused per the confirmed prototype default, not derived
  from these source documents.
- The relationship (if any) between the Amazon TACOS escalation flow's
  "PH Dashboard" and the pre-existing PH Team onboarding programme is never
  confirmed by any source; this programme does not assume one (Module 6).
- The Amazon DE, FR & IT rule material is treated throughout as an
  unreconciled draft (dual authorship, incomplete localisation), not a
  finished multi-market policy (Module 7).
- The practical task's checked-item state is transient (in-memory only,
  local to its view) and resets on page refresh — intentional, since it is
  explicitly non-gating and PROTOTYPE_ONLY, identical to every other
  programme's practical task on this platform.
- `FINAL_USER_ACCEPTANCE: PENDING` — no separate business acceptance step
  was supplied as part of this task.

## Next action

User review and acceptance of the programme content, module structure, and
documented exclusions — in particular the eight open confirmations recorded
in the earlier discovery report (programme shape, handling of the nine
conflicts, DE/FR/IT readiness, quiz/sign-off defaults, practical-task scope,
Tamil scope, the "PH Dashboard" question, and whether the disputed eBay
source is usable at all), none of which block this implementation since
every disputed item was excluded rather than resolved. If accepted, this
branch can be opened as a pull request against `main` (not done as part of
this task, per the "do not commit or push" instruction — no commit was made
in this session).

## Result

**CENTRALIZED_PPC_IMPLEMENTATION_CHECKS: PASS — 111/111**
**FINAL_USER_ACCEPTANCE: PENDING**
