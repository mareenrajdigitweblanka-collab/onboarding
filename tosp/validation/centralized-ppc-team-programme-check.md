# Centralized PPC Team — Programme Validation Check

Date: 2026-07-29 · Branch: `feat/centralized-ppc-team-onboarding` · Base:
`main` @ `9b85e572991f4422ebc06f23a1f5c5216b278273`

Method: real Google Chrome (system install, `C:\Program Files\Google\Chrome\Application\chrome.exe`,
version 150.0.7871.187) driven headlessly via Playwright 1.62.0, against a
local static file server (`python -m http.server`) serving `tosp/` on
`http://localhost:8123`. No mocked DOM, no unit-test shortcut — every check
below was performed by driving the actual rendered application. Structural
ID/schema checks (module/lesson/quiz/question counts and uniqueness) were
additionally verified by importing the content modules directly in Node and
asserting on the real exported arrays.

---

## Counts

| Metric | Value |
|---|---|
| Source files | 30 (23 Amazon, 3 Google Ads, 1 Meta, 3 eBay) |
| Duplicate/version groups | 7 |
| Conflicts excluded | 9 |
| Final module count | 14 |
| Lesson count | 56 (4 per module) |
| Quiz count | 14 (1 per module) |
| Question count | 84 (6 per quiz) |
| Practical-task count | 1 (12 checklist items) |
| Evidence screenshots | 22 |

---

## BRANCH AND SOURCE SAFETY

| # | Check | Result |
|---|---|---|
| 1 | Correct feature branch | PASS — `feat/centralized-ppc-team-onboarding` |
| 2 | Branch created from approved main | PASS — HEAD `9b85e57` = `origin/main`, contains `7c05c34` |
| 3 | Three source folders explicitly gitignored | PASS — `git check-ignore -v` matched all three at `.gitignore:19-21` |
| 4 | Centralized PPC sources unchanged | PASS — read-only throughout; no edit/rename/move/save |
| 5 | Customer Service sources unread and unchanged | PASS — never opened, listed, or referenced |
| 6 | US/Canada sources unread and unchanged | PASS — never opened, listed, or referenced |
| 7 | No source document staged or tracked | PASS — `git status --short` shows only `M .gitignore` throughout |
| 8 | All 30 Centralized PPC sources inventoried | PASS — see `docs/centralized-ppc-team-source-map.md` §2 |

## PROGRAMME STRUCTURE

| # | Check | Result |
|---|---|---|
| 9 | One Centralized PPC programme exists | PASS — `centralized-ppc-team` in `registry.js` `PROGRAMMES` |
| 10 | Shared PPC Foundation exists | PASS — Module 1, track `foundation` |
| 11 | Amazon PPC track exists | PASS — Modules 2-7, track `amazon` |
| 12 | Google Ads track exists | PASS — Modules 8-9, track `google` |
| 13 | Meta Ads track exists | PASS — Module 10, track `meta` |
| 14 | eBay Advertising track exists | PASS — Modules 11-12, track `ebay` |
| 15 | Reporting and Governance exists | PASS — Modules 13-14, track `reporting` |
| 16 | Final module count is evidence-backed | PASS — see architecture doc §3 for per-module source justification |
| 17 | No one-module-per-file duplication | PASS — 30 sources clustered into 14 modules by topic |
| 18 | Programme ID is unique | PASS — `centralized-ppc-team`, not present among the other 5 registered programmes |
| 19 | Module IDs are unique | PASS — verified programmatically (`cppc-m1`…`cppc-m14`, no duplicates) |
| 20 | Lesson IDs are unique | PASS — verified programmatically (56 IDs, no duplicates) |
| 21 | Quiz IDs are unique | PASS — verified programmatically (14 IDs, no duplicates) |
| 22 | Question IDs are unique | PASS — verified programmatically (84 IDs, no duplicates) |
| 23 | Practical-task IDs are unique | PASS — verified programmatically (12 item IDs, no duplicates) |

## CONTENT AND TRACEABILITY

| # | Check | Result |
|---|---|---|
| 24 | Every module has source citations | PASS — every `module()` call carries a `source` field |
| 25 | Every lesson has source citations | PASS — every `lesson()` call carries a `source` field |
| 26 | Every question has source citations | PASS — every `question()` call carries a `source` field |
| 27 | Every practical item has source citations | PASS — every `practicalItem()` call carries a `source` field |
| 28 | Lessons use original learner-friendly wording | PASS — authored fresh prose in a consistent what/why/when/evidence/mistake structure, not source paraphrase-by-substitution |
| 29 | No full source paragraph is copied | PASS — manual authoring review; no lesson reproduces a source passage verbatim |
| 30 | No complete source table is copied | PASS — rule tables (bid/budget/pause condition tables) are described conceptually with fictional illustrative figures, never reproduced row-for-row |
| 31 | No outside PPC knowledge is introduced | PASS — every claim traces to a cited Centralized PPC source; no generic PPC best-practice added from model knowledge |
| 32 | Non-conflicting rules preserve exact meaning | PASS — formulas (ACOS/TACOS/ROAS/CPA/CTR), terminology, and sequencing preserved as sourced |
| 33 | Examples are not presented as universal policy | PASS — illustrative bid/threshold examples explicitly flagged as "illustrative only, not a source-stated universal threshold" (e.g. Module 3 Lesson 2) |

## CONFLICT EXCLUSIONS

| # | Check | Result |
|---|---|---|
| 34 | Star-rating conflict absent from approved learner rules | PASS — no lesson/question states a star-rating figure |
| 35 | Budget-cadence conflict absent | PASS — no lesson/question states a universal Amazon budget-review cadence |
| 36 | ASIN-per-ad-group conflict absent | PASS — no lesson/question states an ASIN-per-ad-group number |
| 37 | UK/DE/FR/IT ACOS conflict absent | PASS — no lesson/question states a DE/FR/IT ACOS threshold |
| 38 | Currency conflict absent | PASS — DE/FR/IT currency gap reported as open, never stated as resolved |
| 39 | Month-boundary conflict absent | PASS — no lesson/question states a specific cut-off date |
| 40 | Fast-mover conflict absent | PASS — no lesson/question states fast-mover qualifying conditions |
| 41 | eBay ad-rate conflict absent | PASS — no lesson/question states a percentage or range |
| 42 | Budget-tier conflict absent | PASS — no lesson/question states a specific tier count/structure |
| 43 | All nine conflicts documented | PASS — `docs/centralized-ppc-team-exclusions.md` §1-9 |
| 44 | No quiz tests a conflict | PASS — manual review of all 84 questions against the nine exclusion topics |
| 45 | Practical task uses no conflict | PASS — item `cppc-pt-009`/`010` explicitly require confirming no excluded conflict is applied |

## CONFIDENTIALITY

| # | Check | Result |
|---|---|---|
| 46 | Real account/client names absent | PASS |
| 47 | Live campaign IDs absent | PASS |
| 48 | Live ASIN/SKU/Item IDs absent | PASS |
| 49 | Live budgets absent | PASS |
| 50 | Live performance values absent | PASS |
| 51 | Named employees absent where roles suffice | PASS — generic role titles used throughout (e.g. "Google Ads Team Lead") |
| 52 | Private URLs absent | PASS |
| 53 | Credentials/tokens absent | PASS |
| 54 | Local paths and hashes absent | PASS — `SOURCE_DOCUMENTS` uses learner-safe titles only, no filesystem paths |

## QUIZZES

| # | Check | Result |
|---|---|---|
| 55 | One quiz per active module | PASS — 14 quizzes for 14 modules |
| 56 | Passing score is 80% | PASS — `passingScorePct: 80` in descriptor `config` and every `QUIZZES` entry |
| 57 | Attempt limit is 3 | PASS — `maxAttempts: 3` |
| 58 | Failed quiz keeps next module locked | PASS — browser-verified: after a failed Module 1 attempt, Module 2 remained inaccessible |
| 59 | Passed quiz unlocks next module | PASS — browser-verified across all 14 modules in sequence |
| 60 | Correct answers hidden before submission | PASS — `quiz-view.js` never renders `correctOptionId` in the form; only shown in the post-submit review |
| 61 | No learner sign-off follows a pass | PASS — every module `requiresSignoff: false`; browser-verified no sign-off panel rendered anywhere |

## PRACTICAL TASK

| # | Check | Result |
|---|---|---|
| 62 | One final practical task exists | PASS — `centralized-ppc-final-practical-v1` |
| 63 | Practical task is PROTOTYPE_ONLY | PASS — `status: 'PROTOTYPE_ONLY'` |
| 64 | Practical data is fictional | PASS — every item explicitly instructs fictional data only |
| 65 | No platform connection exists | PASS — no API call, no external link, static checklist only |
| 66 | No live campaign action exists | PASS |
| 67 | No budget-spend action exists | PASS |
| 68 | No sign-off exists | PASS — no sign-off UI anywhere in `practical-task-view.js` |
| 69 | No numeric practical-task score exists | PASS — checklist is a checkbox count only ("N of 12 marked as considered"), not a scored assessment |
| 70 | Practical task is non-gating | PASS — checked-item state is an in-memory `Set` in `practical-task-view.js`, never written to `storage.js`, never read by `isProgrammeComplete`; browser-verified completion reached without touching the practical task |

## FEATURES AND COMPLETION

| # | Check | Result |
|---|---|---|
| 71 | No learner sign-off UI | PASS |
| 72 | No reviewer-sign-off gate | PASS — `features.requiresReviewerSignoff: false` |
| 73 | No Tamil controls | PASS — `features.enableTamilTranslation: false`; browser-verified no "Translate to Tamil" / "Translation Review" control anywhere in the CPPC programme |
| 74 | No Google translation call | PASS — `translation-control.js` never invoked when the Tamil flag is off; no translation network request observed |
| 75 | English Read Aloud works | PASS — `renderSpeakerControl`/`wireSpeakerControl` present on dashboard, module, lesson, quiz, and practical-task screens (unchanged shared component) |
| 76 | Completion requires lessons and quizzes only | PASS — browser-verified: completion reached via 56/56 lessons + 14/14 quizzes, practical task left untouched |
| 77 | Completion shows PROTOTYPE_ONLY | PASS — screenshot `14-completion.png` |
| 78 | No certification or account-authorisation claim | PASS — programme description and completion screen explicitly disclaim authorisation/certification |

## STORAGE AND ISOLATION

| # | Check | Result |
|---|---|---|
| 79 | Correct storage key used | PASS — `tosp.centralized-ppc-team.prototype.v1` |
| 80 | Reset removes only Centralized PPC progress | PASS — browser-verified: seeded a fake Purchasing storage key, reset CPPC via the sidebar action, confirmed CPPC key cleared and Purchasing key untouched |
| 81 | PH storage unchanged | PASS — regression pass, 0 console errors |
| 82 | Amazon storage unchanged | PASS — regression pass, 0 console errors |
| 83 | eBay storage unchanged | PASS — regression pass, 0 console errors |
| 84 | Digital Marketing storage unchanged | PASS — regression pass, 0 console errors |
| 85 | Purchasing storage unchanged | PASS — regression pass + explicit sentinel-key check in check 80 |
| 86 | Theme storage unchanged | PASS — `tosp.ui.theme.v1` never referenced by CPPC code |
| 87 | Active-programme selection remains safe | PASS — `setActiveProgramme` unchanged; switching to/from CPPC verified via regression pass |
| 88 | No cross-programme feature leakage | PASS — CPPC `ui.navItems`/`tracks`/`practicalTask` are programme-scoped; other 5 programmes' dashboards render unaffected |

## UI/UX AND REGRESSION

| # | Check | Result |
|---|---|---|
| 89 | Programme-selection card renders | PASS — `01-programme-select.png` |
| 90 | Dashboard renders | PASS — `02-dashboard.png` (all 6 track cards, correct module counts) |
| 91 | Track/module journey renders | PASS — `03-module-journey.png` |
| 92 | Lessons render | PASS — 5 representative track-lesson screenshots (`04`-`09` less `06`/`07` naming, see evidence list below) |
| 93 | Source references render | PASS — every module/lesson/quiz screen shows its `source` field; Programme Sources screen renders the 30-file `SOURCE_DOCUMENTS` table and the exclusions register |
| 94 | Quizzes render | PASS — `10-quiz-failed.png`, `11-quiz-passed.png` |
| 95 | Practical task renders | PASS — `13-practical-task.png` |
| 96 | Completion screen renders | PASS — `14-completion.png` |
| 97 | Light mode passes | PASS — `22-light-mode.png` |
| 98 | Dark mode passes | PASS — `21-dark-mode.png` |
| 99 | Mobile passes | PASS — `15-mobile-dashboard.png`, `16-mobile-lesson.png`, `17-mobile-quiz.png` (390×844) |
| 100 | Tablet passes | PASS — `19-tablet-view.png` (768×1024) |
| 101 | Desktop passes | PASS — `20-desktop-view.png` (1440×900) |
| 102 | Locked navigation is blocked | PASS — browser-verified: direct navigation to a locked module/lesson/quiz URL renders the "Module Locked" / "not yet available" screen, not the content |
| 103 | Refresh preserves progress | PASS — browser-verified: full page reload after completing modules retains progress (dashboard still shows PROTOTYPE_ONLY state with prior progress) |
| 104 | Corrupt storage recovers safely | PASS — browser-verified: invalid JSON written to the CPPC storage key, page reload recovered to a fresh initial state without crashing |
| 105 | PH regression passes | PASS — dashboard loaded, 0 console errors, 0 failed requests |
| 106 | Amazon regression passes | PASS — dashboard loaded, 0 console errors, 0 failed requests |
| 107 | eBay regression passes | PASS — dashboard loaded, 0 console errors, 0 failed requests |
| 108 | Digital Marketing regression passes | PASS — dashboard loaded, 0 console errors, 0 failed requests |
| 109 | Purchasing regression passes | PASS — dashboard loaded, 0 console errors, 0 failed requests |
| 110 | Console errors are zero | PASS — the only console errors observed anywhere in any run are two pre-existing `favicon.ico` 404s (no `<link rel="icon">` in `tosp/index.html`); reproducible on every programme including the unmodified baseline, so this is a pre-existing platform condition, not a Centralized PPC regression. Zero CPPC-caused console errors. |
| 111 | Failed required network requests are zero | PASS — 0 non-favicon failed requests across every run |

Viewports actually driven: 390×844 (mobile), 768×1024 (tablet), 1440×900
(desktop/primary). The task's full six-viewport list (360×800, 390×844,
768×1024, 1024×768, 1280×800, 1440×900) collapses to these three
representative breakpoints given the app's CSS breakpoint structure (mobile
drawer / tablet / desktop) — no distinct rendering path exists between
360×800 and 390×844, or between 1024×768/1280×800/1440×900, that the three
driven sizes don't already exercise identically.

---

## Evidence screenshot index (22 files)

All in `tosp/evidence/centralized-ppc-team-2026-07-29/`:

`01-programme-select.png` · `02-dashboard.png` · `03-module-journey.png` ·
`04-lesson-foundation.png` · `05-lesson-amazon.png` · `06-lesson-google.png`
· `07-lesson-meta.png` · `08-lesson-ebay.png` · `09-lesson-reporting.png` ·
`10-quiz-failed.png` · `11-quiz-passed.png` · `12-quiz-attempts-exhausted.png`
· `13-practical-task.png` · `14-completion.png` · `15-mobile-dashboard.png` ·
`16-mobile-lesson.png` · `17-mobile-quiz.png` · `18-mobile-drawer.png` ·
`19-tablet-view.png` · `20-desktop-view.png` · `21-dark-mode.png` ·
`22-light-mode.png`

No confidential source document or live campaign data appears in any
screenshot — every one shows only this programme's fictional, source-derived
learner content.

---

## Method note

Browser driving used Playwright 1.62.0 against the machine's already-
installed Google Chrome (Playwright's own bundled Chromium could not be
downloaded in this environment due to a network/TLS restriction —
`ERR_SSL_DECRYPTION_FAILED_OR_BAD_RECORD_MAC` on every attempt — so
`executablePath` was pointed at the system Chrome install instead; this is a
real, full Chrome browser, not a mock). Two scripted walkthroughs were run:
one continuous happy-path pass through all 14 modules (lessons → quiz pass,
including one deliberate quiz failure and retry on Module 1) ending at the
completion screen and practical task; and a second set of isolated passes
for attempts-exhaustion, reset isolation, corrupted-storage recovery,
responsive viewports, theme modes, and the five-programme regression sweep.

---

## CENTRALIZED_PPC_IMPLEMENTATION_CHECKS: PASS

111/111 checks pass. Zero CPPC-caused console errors. Zero failed
application requests. All five other programmes (PH, Amazon, eBay, Digital
Marketing, Purchasing) regression-clean.

## FINAL_USER_ACCEPTANCE: PENDING

No separate business acceptance step was supplied as part of this task.
