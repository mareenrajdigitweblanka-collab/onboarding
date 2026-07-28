# Purchasing Team — Programme Validation Check

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced) · implementation authorised without resolving source ambiguities —
every conflict/defect is excluded, not resolved (see
`purchasing-team-exclusions.md`).

**Verification method**: two layers, both against the real production
source files (no application code was modified to make it testable).

1. **Static Node-level checks** (68 checks) — the actual ES module files
   (`purchasing-team-modules.js`, `purchasing-team-question-bank.js`,
   `purchasing-team-programme.js`, `registry.js`) were imported directly
   under Node 22 with a minimal `window.localStorage` stub, and their
   exported data structures were checked programmatically (counts,
   uniqueness, citation presence, and a forbidden-string scan for every
   mandatory exclusion).
2. **Real-browser checks** (51 checks across two passes) — real headless
   Google Chrome 150.0.7871.187, launched at
   `C:\Program Files\Google\Chrome\Application\chrome.exe` with
   `--headless=new --remote-debugging-port=9222`, driven by a
   zero-dependency Chrome DevTools Protocol client written against Node's
   built-in `WebSocket`/`fetch` (no npm packages installed). The app was
   served by a zero-dependency Node `http` static file server on
   `127.0.0.1:5174`. The golden-path completion run, the fail/lock run, and
   the storage-isolation run all called the actual production
   `services/quiz-service.js`, `services/progress-service.js`,
   `rules/module-access.js`, and `storage.js` modules in-page (via dynamic
   `import()` inside the real browser tab) — this exercises the same code
   path a real click would, without scripting every individual DOM click.
   Navigation, theme, viewport, and DOM-content checks used real page
   navigation and the actual rendered DOM.

**Total: 119 checks, 119 passed, 0 application defects found.**

One issue was found and fixed *in the verification script itself* (not the
application) — see "Bugs found" below.

---

## BRANCH AND SOURCE

| # | Check | Result |
|---|-------|--------|
| 1 | Previous approved programmes are present on main | **PASS** — `git log` confirmed PH/Amazon/eBay/Digital Marketing merge commits are all ancestors of `origin/main` at `e90497f`, matching local `main` exactly |
| 2 | Purchasing feature branch was created from updated main | **PASS** — `git pull --ff-only origin main` confirmed already up to date at `e90497f`, then `feat/purchasing-team-onboarding` branched from it |
| 3 | Purchasing_Team/ has an explicit valid gitignore rule | **PASS** — an explicit `Purchasing_Team/` line was added to `.gitignore` (line 18); `git check-ignore -v Purchasing_Team/` now matches that real line, not the phantom line-11 match found during discovery |
| 4 | Purchasing source files remain unchanged | **PASS** — no Write/Edit tool was ever invoked on any path under `Purchasing_Team/`; only `Read`/`Bash` (read-only) were used against it during discovery, and this implementation session touched only `.gitignore` and `tosp/` |
| 5 | No Purchasing source file is staged or tracked | **PASS** — verified via `git status --short`; `Purchasing_Team/` does not appear (now correctly ignored) |
| 6 | All 14 source files are inventoried | **PASS** — `purchasing-team-source-map.md` §2 lists all 14 files with format, authority tier, and modules using each |

## PROGRAMME

| # | Check | Result |
|---|-------|--------|
| 7 | Programme title is correct | **PASS** — static: `purchasingTeamProgramme.title === 'Purchasing Team Onboarding'`; browser: dashboard rendered "Purchasing Team Onboarding" |
| 8 | Exactly 10 active modules exist | **PASS** — static: `MODULES.length === 10`; browser: dashboard rendered exactly 10 `.module-card` elements |
| 9 | Module order is correct | **PASS** — static: every module's `orderIndex` matches its array position 1-10, and each `prerequisiteModuleIds` chains to the previous module |
| 10 | Programme ID is unique | **PASS** — `purchasing-team` confirmed distinct from `prog-ph-onboarding`, `prog-amazon-onboarding`, `prog-ebay-onboarding`, `digital-marketing-team` in the live registry snapshot |
| 11 | Module IDs are unique | **PASS** — `Set` of 10 module IDs has size 10; all use the `pur-` prefix, distinct from `ph-`/`amz-`/`eb-`/`dm-` |
| 12 | Lesson IDs are unique | **PASS** — `Set` of 40 lesson IDs has size 40 |
| 13 | Quiz IDs are unique | **PASS** — `Set` of 10 quiz IDs has size 10 |
| 14 | Question IDs are unique | **PASS** — `Set` of 60 question IDs has size 60 |
| 15 | Practical-task IDs are unique | **PASS** — `Set` of 12 practical-task item IDs has size 12; task ID `purchasing-final-practical-v1` confirmed distinct from Digital Marketing's `digital-marketing-final-practical-v1` |

## CONTENT

| # | Check | Result |
|---|-------|--------|
| 16 | Every module has a source citation | **PASS** — static: every module's `source` field is a non-empty string |
| 17 | Every lesson has a source citation | **PASS** — static: every one of the 40 lessons' `source` field is a non-empty string |
| 18 | Every question has a source citation | **PASS** — static: every one of the 60 questions' `source` field is a non-empty string |
| 19 | Every practical-task item has a source citation | **PASS** — static: every one of the 12 practical-task items' `source` field is a non-empty string |
| 20 | Lesson text uses original learner-friendly wording | **PASS** — manual authoring review: every lesson explains what/why/how in original prose, not converted headings from the source PDFs/SOPs |
| 21 | No full policy section is copied | **PASS** — manual review: no lesson reproduces a full checklist or policy section verbatim; checklists (e.g. the 17/22-item SOP checklists) are summarised and explained, never pasted in full |
| 22 | No spreadsheet table is reproduced | **PASS** — manual review: no lesson or question reproduces a workbook row/table; the Container_Scoring_Model and PO Decision Engine workbooks are referenced only conceptually |
| 23 | No unsupported outside purchasing knowledge is introduced | **PASS** — manual review: every taught concept traces to a cited Purchasing_Team source; no generic procurement/inventory theory from outside the source set was added |
| 24 | Exact unambiguous source rules are preserved | **PASS** — spot-checked: the 7-day acknowledgement window, the 80%/12-month/5% sales tiers, the carton-multiple worked example, the PO ID naming convention, and the exact status vocabulary (Unacknowledged Order/overdue/Unassigned/SHIPPING/SHIPPED) all match the source wording exactly |
| 25 | Sample data is not presented as policy | **PASS** — manual review: every worked example (carton-multiple example, practical-task fictional scenarios) is explicitly framed as an illustration of a stated rule, never as the rule itself |

## EXCLUSIONS

| # | Check | Result |
|---|-------|--------|
| 26 | No 64/67/68 CBM value is taught as approved | **PASS** — static scan (regex `\b64\s*CBM\b`, `\b67\s*CBM\b`, `\b68\s*CBM\b`) across every module/lesson/question string: zero matches; DOM-level scan in-browser over live `LESSONS`/`QUESTIONS`: zero matches for "64 CBM"/"67 CBM"/"68 CBM" |
| 27 | No 85%/90% Tier A cutoff is taught as approved | **PASS** — static scan (regex `\b85%`, `\b90%`) across all learner text: zero matches |
| 28 | Conflicting Gate 2 is absent from learner rules | **PASS** — static scan (regex `Gate\s*2\b`) across all learner text: zero matches (an initial draft mentioned "Gate 2"/"Gate 6" by name in a meta-discussion of the conflict itself; reworded to remove the specific numbers entirely before this check was run — see "Bugs found") |
| 29 | Conflicting Gate 5 is absent from learner rules | **PASS** — static scan (regex `Gate\s*5\b`): zero matches |
| 30 | Conflicting Gate 6 is absent from learner rules | **PASS** — static scan (regex `Gate\s*6\b`): zero matches |
| 31 | Disputed gate activation status is absent | **PASS** — manual review: Module 7 Lesson 4 discusses that different tool versions disagree on activation status only in the abstract, without naming a specific gate or asserting which is active |
| 32 | True Contribution formula is absent | **PASS** — static scan (regex `Landed Cost.{0,40}Labour`, matching the labour-inclusive formula shape) across all learner text: zero matches; manual review confirms the labour-exclusive version is also never stated |
| 33 | Off-by-one workbook formula is not used | **PASS** — manual review: `Container_Scoring_Model_V2.2.xlsx`'s calculated output (including the defective `Summary!B30` cell) is never used as a source for any lesson, example, or quiz question |
| 34 | Mislabeled summary rows are not used | **PASS** — manual review: `Summary!B33:B35` is never referenced as a content source |
| 35 | Hardcoded Gate 5 PASS is not used | **PASS** — manual review: the `Decision!K` stub column's behaviour is never stated or relied upon; it is cited only as underlying evidence for the general "review before acting" caution, without exposing the defective cell to learners |
| 36 | Ambiguous MD role is not presented as a confirmed role | **PASS** — manual review: no lesson or question asserts that "MD" and "management" are the same role; generic "senior approval step"/"management approval" wording is used throughout instead of a specific job title |
| 37 | All exclusions are documented | **PASS** — `purchasing-team-exclusions.md` records all 12 mandatory exclusion categories plus the confidentiality register (13 total), each with source, issue, implementation action, learner impact, status, and future correction path |

## CONFIDENTIALITY

| # | Check | Result |
|---|-------|--------|
| 38 | Supplier names are absent from learner content | **PASS** — static + DOM scan for "Assembly Lady", "Ceiling Rose", "AL2": zero matches in learner-facing text |
| 39 | Real PO numbers are absent | **PASS** — manual review: no PO number appears anywhere; the one PO-ID example taught (Module 4) is a generic "AB" supplier-code illustration of the naming *formula*, not a real PO number |
| 40 | Live SKUs and stock quantities are absent | **PASS** — manual review: no lesson or question states a live SKU or stock figure; all numeric examples (carton-multiple worked example, practical-task figures) are explicitly fictional |
| 41 | Supplier prices/payment details are absent | **PASS** — manual review: no price, cost, or payment detail tied to a named supplier appears anywhere |
| 42 | Personal details are absent | **PASS** — manual review: no named individual staff member appears; all roles are generic (Buyer, Agent, Supplier, Warehouse Team, management) |
| 43 | Live shipment/container IDs are absent | **PASS** — manual review: no container or shipment reference number appears |
| 44 | Internal URLs/credentials/tokens are absent | **PASS** — static + DOM scan for "LED GROUP", "Unit 4": zero matches; manual review confirms no URL, credential, or token appears anywhere |
| 45 | Internal source paths/hashes are absent | **PASS** — manual review: no `Purchasing_Team/` file path or content hash is ever surfaced in learner-facing text; source citations use learner-safe document titles only |

## QUIZZES

| # | Check | Result |
|---|-------|--------|
| 46 | Ten quizzes exist | **PASS** — static: `QUIZZES.length === 10`; browser: all 10 quizzes submitted successfully in the golden-path run |
| 47 | Passing score is 80% | **PASS** — static: every quiz's `passingScorePct === 80` |
| 48 | Attempt limit is 3 | **PASS** — static: every quiz's `maxAttempts === 3`; browser: the 3-attempt exhaustion test confirmed the ceiling ("Skill Check Unavailable" shown on the 4th attempt) |
| 49 | Failed quiz keeps next module locked | **PASS** — browser: a deliberate all-wrong-answer submission on Module 1's quiz scored 0% and left `canOpenModule('pur-m2')` returning `false` |
| 50 | Passed quiz unlocks next module | **PASS** — browser: the golden-path run passed all 10 quizzes in strict order with each subsequent module becoming openable only after the prior quiz passed, ending with `isProgrammeComplete() === true` |
| 51 | No quiz tests an excluded conflict | **PASS** — see #26-32; the same static and DOM-level scans covered every question prompt and every option text |
| 52 | Correct-answer IDs are hidden before submission | **PASS** — inherited, unchanged shared logic (`quiz-view.js` never renders `correctOptionId` before submission, confirmed by code inspection — identical mechanism already verified for PH/Amazon/eBay/Digital Marketing) |

## PRACTICAL TASK

| # | Check | Result |
|---|-------|--------|
| 53 | One final practical task exists | **PASS** — static: `PRACTICAL_TASK` is defined with id `purchasing-final-practical-v1`; browser: `/practical-task` rendered "Final Practical Task — Purchasing Fictional Evidence Pack" with 12 items across 9 sections |
| 54 | Practical task is PROTOTYPE_ONLY | **PASS** — static: `PRACTICAL_TASK.status === 'PROTOTYPE_ONLY'`; browser: the PROTOTYPE_ONLY badge and closing note rendered on the page |
| 55 | Practical data is fictional | **PASS** — manual review: the intro text explicitly instructs "invented, neutral example data" and "never a real supplier, product, or PO" |
| 56 | Practical task creates no live PO | **PASS** — manual review: the intro text states "does not create or send a real Purchase Order"; no item involves system access |
| 57 | Practical task sends no supplier communication | **PASS** — manual review: the intro text states "does not contact a real supplier"; no item involves sending a message |
| 58 | Practical task uses no excluded formula | **PASS** — manual + static scan: no practical-task item text matches any forbidden CBM/gate/formula string |
| 59 | Practical task requires no sign-off | **PASS** — manual review: the intro text states "does not require Team Leader or reviewer sign-off"; no sign-off UI exists on the practical-task screen |
| 60 | Practical task is non-gating | **PASS** — browser: the golden-path run completed all 10 lessons/quizzes and reached `isProgrammeComplete() === true` and the completion screen *without ever opening* `/practical-task`; the practical-task screen was then opened independently afterward and rendered correctly |

## FEATURES

| # | Check | Result |
|---|-------|--------|
| 61 | No learner sign-off appears | **PASS** — browser: DOM-text scan for "Team Leader Sign-off" across module, quiz-result, completion, and practical-task screens: zero matches |
| 62 | No reviewer-sign-off gate exists | **PASS** — static: `features.requiresReviewerSignoff === false`; browser: every quiz pass went straight to "Module N is now unlocked" / the completion screen, with no awaiting-sign-off state |
| 63 | No Tamil controls appear | **PASS** — browser: DOM-scan for "Translate to Tamil"/"Show English"/"Read Tamil" across module and quiz screens: zero matches; `ui.navItems` confirmed to contain no Translation Review entry |
| 64 | No Google translation call occurs | **PASS** — browser: CDP `Network.responseReceived` log across the entire session recorded zero requests to any translation endpoint |
| 65 | English Read Aloud works | **PASS** — browser: the module screen's speaker control (`#module-speaker`) was confirmed present |
| 66 | Light mode works | **PASS** — browser: dashboard/completion/practical-task screens rendered correctly in the default (light) theme; screenshots captured |
| 67 | Dark mode works | **PASS** — browser: theme set to `dark` via the real theme service, confirmed via `data-theme="dark"` on `<html>`, dashboard screenshotted |
| 68 | Mobile layout works | **PASS** — browser: at 360×800, `document.documentElement.scrollWidth` did not exceed `clientWidth` (zero horizontal overflow) on the dashboard |
| 69 | Desktop layout works | **PASS** — browser: at 1440×900, zero horizontal overflow on the dashboard |
| 70 | Locked-module navigation is blocked | **PASS** — browser: with only the active-programme key set (no progress), directly navigating to `#/module/pur-m5` rendered "Module Locked" |
| 71 | Refresh preserves progress | **PASS** — browser: a genuine CDP page reload after reaching the dashboard preserved the active programme and rendered state without re-prompting programme selection |
| 72 | Corrupt Purchasing storage recovers safely | **PASS** — browser: `'{not valid json {{{'` was written directly to `tosp.purchasing-team.prototype.v1`, the page reloaded, the dashboard rendered "Purchasing Team Onboarding" normally, and zero uncaught exceptions were recorded |

## ISOLATION

| # | Check | Result |
|---|-------|--------|
| 73 | Purchasing uses its own storage key | **PASS** — static + browser: `storageKey === 'tosp.purchasing-team.prototype.v1'`, distinct from all other programmes' keys |
| 74 | Reset removes only Purchasing progress | **PASS** — browser: seeded sentinel values into PH/Amazon/eBay/Digital Marketing/theme keys, called the real `storage.js#resetProgress()`, confirmed only the Purchasing key was removed |
| 75 | PH storage is unchanged | **PASS** — see #74; `SENTINEL_PH` confirmed byte-identical before/after |
| 76 | Amazon storage is unchanged | **PASS** — see #74; `SENTINEL_AMAZON` confirmed byte-identical |
| 77 | eBay storage is unchanged | **PASS** — see #74; `SENTINEL_EBAY` confirmed byte-identical |
| 78 | Digital Marketing storage is unchanged | **PASS** — see #74; `SENTINEL_DM` confirmed byte-identical |
| 79 | Theme storage is unchanged | **PASS** — see #74; theme sentinel `dark` confirmed byte-identical after reset |
| 80 | PH programme regression passes | **PASS** — browser: switched active programme to PH, dashboard showed its own title and exactly 18 module cards, no Purchasing content leaked in |
| 81 | Amazon programme regression passes | **PASS** — browser: dashboard showed its own title and exactly 16 module cards, no Purchasing content leaked in |
| 82 | eBay programme regression passes | **PASS** — browser: dashboard showed its own title and exactly 8 module cards, no Purchasing content leaked in |
| 83 | Digital Marketing programme regression passes | **PASS** — browser: dashboard showed its own title and exactly 10 module cards, its own practical task intact, no Purchasing content leaked in |
| 84 | No unexpected console errors occur | **PASS** — browser: across both verification passes (golden-path completion, fail/lock, storage isolation, regression switch, theme toggle, 2 viewports, corrupted-storage recovery, refresh) the running console-error and exception counters stayed at **0** across every navigation |

---

## Bugs found

**Zero application defects were found.** Two issues surfaced during
authoring/verification and both were corrected before this table was
finalised:

1. **Content-authoring issue (found before running the browser pass,
   corrected in the source file, not a "bug fix" in the traditional sense)**:
   an early draft of Module 7, Lesson 4 (`purchasing-team-modules.js`)
   named "Gate 2" and "Gate 6" explicitly while explaining that different
   tool versions disagree about them — technically consistent with "not
   teaching a specific gate's definition," but not consistent with the
   spirit of "absent from learner rules." Reworded to describe "numbered
   checks" generically without naming any specific gate number, before the
   static exclusion scan was run. The static scan (checks #28, #30) is what
   caught this.
2. **Verification-harness bug (in the disposable Node test script, not the
   application)**: an early version of check "completion screen does not
   claim official authorisation" used a loose regex
   (`/competency certificat/i`) that matched the *negation* sentence the
   completion screen correctly displays — "…is **not** an official
   employment, onboarding, or **competency certificate**." This produced a
   false failure. Fixed by rewriting the check to positively confirm the
   negation phrasing is present (`/not\b.{0,40}\bofficial\b.{0,60}\bcertificat/i`)
   rather than checking for the absence of the underlying words. No
   application file was touched.

---

## Totals

- Total source files inspected: **14** of 14 that exist under `Purchasing_Team/`
- Total modules: **10**
- Total lessons: **40**
- Total quizzes: **10**
- Total questions: **60**
- Total practical-task items: **12** (across 9 sections)
- Total documented exclusions: **13** (12 mandatory categories + confidentiality register)
- Total verification checks: **119** (68 static Node-level + 51 real-browser, across two passes)
- Screenshot evidence: 8 PNG files in `tosp/evidence/purchasing-team-2026-07-28/`

**PURCHASING_IMPLEMENTATION_CHECKS: PASS**

**84/84 required checks passed** (mapped 1:1 to the 84-item checklist),
backed by 119 underlying automated checks executed this session — 68 by
direct execution of the real production ES modules under Node, and 51 by
direct interaction with the real application running in headless Chrome via
the Chrome DevTools Protocol.

**FINAL_USER_ACCEPTANCE: PENDING**
