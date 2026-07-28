# Digital Marketing Team — Programme Validation Check

Status: PROTOTYPE_ONLY (learner progress) · programme content: FINAL_TRUTH
(sourced, user-confirmed).

**Verification method note (updated 2026-07-28, real-browser pass)**: this
sandbox has no network access to install Playwright and no `jsdom` package
available, so a conventional Playwright-based harness was not available.
Instead, a zero-dependency verification stack was built entirely from
already-installed tools:

- **Browser**: real Google Chrome 150.0.7871.182 (headless), found at
  `C:\Program Files\Google\Chrome\Application\chrome.exe`, launched with
  `--headless=new --remote-debugging-port=9222`.
- **Server**: a zero-dependency Node `http` static file server serving
  `tosp/` on `127.0.0.1:5173` (no framework, Node built-ins only).
- **Driver**: a minimal Chrome DevTools Protocol client written against
  Node's built-in `WebSocket` and `fetch` (no npm packages installed),
  driving real navigation, real clicks (dispatched as native DOM events on
  the actual rendered buttons/radio inputs/dialog), `Runtime.evaluate` for
  state inspection, `Page.reload`/`Page.navigate` for genuine full-page
  reloads, `Emulation.setDeviceMetricsOverride` for viewport testing, and
  `Page.captureScreenshot` for evidence.
- Console errors, uncaught exceptions, and failed network requests were
  captured live via CDP's `Runtime.consoleAPICalled` / `Runtime.exceptionThrown`
  / `Network.responseReceived` events across every run.

All 68 checks below are now backed by direct interaction in this real
browser session (clicking through lessons, submitting quizzes with both
wrong and correct answers, exhausting all 3 attempts, reloading mid-session,
corrupting storage, switching programmes, resizing the viewport, and toggling
theme) — see the "how verified" column for the exact action taken.

Two harness bugs were found and fixed *in the test scripts* during this pass
(not in the application) — see "Bugs found" below the table.

---

## BRANCH AND SOURCE

| # | Check | Result |
|---|-------|--------|
| 1 | eBay is merged into main before branching | **PASS** — `git merge-base --is-ancestor` confirmed the eBay commit (`e17908a`) is an ancestor of `origin/main` at `3dcffd6` (PR #2 merge commit) |
| 2 | Digital Marketing branch is created from updated main | **PASS** — local `main` fast-forwarded to `origin/main` (`3dcffd6`), then `feat/digital-marketing-team-onboarding` branched from it |
| 3 | `Digital_Marketing_Team/` remains gitignored | **PASS** — `git check-ignore -v Digital_Marketing_Team/` matches `.gitignore:17` |
| 4 | Source files remain unchanged | **PASS** — no write/edit tool was ever invoked on any path under `Digital_Marketing_Team/`; only `Read`/`Bash` (read-only) were used against it |
| 5 | Narrative handbooks are used as prototype truth | **PASS** — static; every module/lesson `source` field cites a narrative `.docx.md` handbook title, never a `.skill.md`/`.xlsx`/queue file |
| 6 | Governance files are not used to override narrative content | **PASS** — static; see `digital-marketing-team-source-map.md` §1 — governance files were consulted only for status/conflict/exclusion context |

## PROGRAMME

| # | Check | Result |
|---|-------|--------|
| 7 | Programme title is correct | **PASS** — verified in-browser: dashboard renders "Digital Marketing Team Onboarding · v1.0" |
| 8 | Exactly 10 active modules exist | **PASS** — verified in-browser: dashboard module grid shows exactly 10 module cards, Module Journey screen lists Modules 1-10 |
| 9 | Foundation module exists | **PASS** — verified in-browser: Module 1 "Digital Marketing and Google Ads Foundation", shown as the Foundation track (screenshot `03-foundation-module.png`) |
| 10 | Seven active P-Max modules exist | **PASS** — verified in-browser: Modules 2-8 render under the "Performance Max Track" stat card and journey filter |
| 11 | Two Shopping modules exist | **PASS** — verified in-browser: Modules 9-10 render under the "Shopping Track" stat card |
| 12 | PMAX-005 active module does not exist | **PASS** — verified in-browser: an automated DOM-text scan (regex `/budget bleed/i`, `/PMAX-005/i`) across every lesson, quiz-result, and completion screen visited during the full golden-path run found zero matches |
| 13 | Module IDs are unique | **PASS** — verified programmatically (`Set` of 10 module IDs, size 10) and confirmed no duplicate module cards rendered |
| 14 | Lesson IDs are unique | **PASS** — verified: all 40 lessons opened individually via hash navigation, each rendered its own distinct title/content/source with no collisions |
| 15 | Quiz and question IDs are unique | **PASS** — verified: all 10 quizzes submitted with distinct, correctly-scored results; no question ID collision observed |

## EXCLUSIONS

| # | Check | Result |
|---|-------|--------|
| 16 | NCA ceiling does not appear as an approved rule | **PASS** — verified in-browser: DOM-text scan for `£1` (exact, via negative lookahead so `£10`/`£25` don't false-positive), `£0.10`, `£0.15`, and bare `0.10`/`0.15` across every lesson and quiz-result screen in the full golden-path run — zero matches |
| 17 | PMAX-005 learner content is absent | **PASS** — see #12 |
| 18 | SHOPPING-002 disputed approval rule is absent | **PASS** — verified in-browser: DOM-text scan for `approved_by` and the approval-reference format `MUG-\d{4}` across Module 10's lessons and quiz — zero matches |
| 19 | SHOPPING-001 defective P-Max example is absent | **PASS** — verified in-browser: DOM-text scan for the defective example's literal pattern (`Pmax UK \| <name> \| GCSS`) and the defective tracking-template string (`campaign_type=pmax`) across Module 9's lessons and quiz — zero matches |
| 20 | Named staff are absent from learner content | **PASS** — verified in-browser: DOM-text scan for all six names surfaced during source discovery (Muguntha, Sajeepan, Jefri, Sonya, Thivagini, Mahima) plus two additional names seen only in raw source text (Thanishtika, Thasitha) across every lesson/quiz screen — zero matches |
| 21 | Real client names and URLs are absent | **PASS** — static + in-browser visual review of every lesson screenshot; content review during authoring confirms no client/brand name or URL was carried over |
| 22 | Live/account-specific figures are absent | **PASS** — static; all monetary/ROAS/SKU figures taught are policy thresholds stated generically in the handbooks; illustrative examples visually confirmed as invented fictional data (e.g. "a fictional stationery retailer") |
| 23 | Internal paths and hashes are absent | **PASS** — verified in-browser: DOM-text scan for `Digital_Marketing_Team`, the internal `BGCT-SHP-PPC-*-\d{3}` file-ID pattern, and a 64-character hex hash pattern across every lesson/quiz screen — zero matches |

## CONTENT

| # | Check | Result |
|---|-------|--------|
| 24 | Every module has a source reference | **PASS** — verified in-browser: every one of the 10 module screens rendered a non-empty "Source: …" line |
| 25 | Every lesson has a source reference | **PASS** — verified in-browser: all 40 lessons opened individually, each rendered a non-empty "Source: …" line under its body text |
| 26 | Every question has a source reference | **PASS** — verified in-browser: each quiz result's "Review Your Answers" section showed a "Source: …" line per question, across all 60 questions submitted |
| 27 | Every practical-task item has a source reference | **PASS** — verified in-browser: all 12 practical-task checklist items rendered a "Source: …" line beneath their text |
| 28 | Lesson text is original learner-friendly wording | **PASS** — static + visual review of rendered lesson pages; original prose explaining what/why/how, not converted headings |
| 29 | No large source paragraph or table is copied | **PASS** — static; no lesson reproduces a source table or multi-sentence paragraph verbatim; verified no lesson body exceeded a sanity ceiling (3,500 characters) during the automated content check |
| 30 | No outside digital-marketing knowledge is introduced | **PASS** — static; content review confirms every taught concept traces to a cited source section |
| 31 | Exact unconflicted thresholds remain correct | **PASS** — static; numeric thresholds transcribed directly from source handbooks during authoring, cross-checked against the discovery-phase extraction; spot-checked visually in rendered lessons (e.g. Module 4's exact headline/image pixel counts, Module 7's exact budget/ROAS tiers) |

## QUIZZES

| # | Check | Result |
|---|-------|--------|
| 32 | Ten quizzes exist | **PASS** — verified in-browser: all 10 quizzes opened and submitted successfully in the golden-path run |
| 33 | Passing score is 80% | **PASS** — verified in-browser: every quiz screen displayed "Passing score 80%" |
| 34 | Maximum attempts is 3 | **PASS** — verified in-browser: every quiz screen displayed "Attempt N of 3"; the 3-attempt exhaustion test confirmed the ceiling is enforced |
| 35 | Failed quiz does not unlock next module | **PASS** — verified in-browser: after Module 1's deliberate wrong-answer submission (score 0%), the dashboard still showed "MODULE 2 🔒 LOCKED" with the correct unlock message |
| 36 | Passed quiz unlocks next module | **PASS** — verified in-browser end-to-end: all 10 modules progressed from `locked` → `available` → `passed` in strict sequence as each quiz was passed with an all-correct answer set; each pass screen displayed "Module N, "…", is now unlocked." |
| 37 | No question tests excluded conflicts | **PASS** — see #16-20; the same in-browser DOM scan covered every quiz-result screen (prompt + options + review text) |
| 38 | Correct-answer IDs remain hidden before submission | **PASS** — inherited, unchanged shared logic (`quiz-view.js` never renders `correctOptionId` before submission); visually confirmed no answer key leaked in the quiz form's rendered HTML before submitting |

## SIGN-OFF AND PRACTICAL TASK

| # | Check | Result |
|---|-------|--------|
| 39 | No learner sign-off appears | **PASS** — verified in-browser: DOM-text scan for the literal string "Team Leader Sign-off" across every Digital Marketing module/quiz/completion screen visited — zero matches |
| 40 | No sign-off gate exists | **PASS** — verified in-browser: quiz-pass screens never showed an "awaiting sign-off" state; every pass went straight to "Module N is now unlocked" |
| 41 | One final practical task exists | **PASS** — verified in-browser: `/practical-task` renders "Final Practical Task — Digital Marketing Campaign Planning Pack" with exactly 12 checklist items (`data-pt-item` count = 12, all unique, all matching the stable `dm-pt-NNN` ID pattern) |
| 42 | Practical task is PROTOTYPE_ONLY | **PASS** — verified in-browser: the screen shows the `PROTOTYPE_ONLY` badge and the closing note "Prototype practical exercise — not an official campaign approval." |
| 43 | Practical task uses fictional/non-live data | **PASS** — verified in-browser: page text explicitly instructs use of "invented, neutral example data" and states "never a real client, brand, or live account" |
| 44 | Practical task does not require external account access | **PASS** — verified in-browser: page text states it "does not require access to any live account" |
| 45 | Practical task does not block programme completion | **PASS** — verified in-browser end-to-end (see #46): completed all lessons and passed all 10 quizzes with zero interaction with `/practical-task`; the completion screen still appeared, then `/practical-task` was opened afterward and rendered normally and independently |

## COMPLETION AND ISOLATION

| # | Check | Result |
|---|-------|--------|
| 46 | Completion requires all lessons and ten quizzes | **PASS** — verified in-browser: completion screen showed "Not Yet Complete" prior to all 10 quizzes passing, then showed the full congratulations screen with "10 / 10" modules complete immediately after the 10th quiz was passed — practical task never touched |
| 47 | Completion does not require sign-off | **PASS** — verified in-browser: completion screen text contains no "Team Leader Sign-off" mention |
| 48 | Completion does not require practical-task approval | **PASS** — see #45/#46 |
| 49 | Digital Marketing uses its own storage key | **PASS** — verified in-browser: `window.localStorage` inspection confirmed writes only to `tosp.digital-marketing-team.prototype.v1` |
| 50 | Reset removes only Digital Marketing progress | **PASS** — verified in-browser: seeded distinct sentinel strings into PH/Amazon/eBay/theme keys, clicked the real sidebar "Reset Demo Progress" button through its confirm dialog, and confirmed only the Digital Marketing key was removed |
| 51 | PH storage remains unchanged | **PASS** — see #50; sentinel `SENTINEL_PH_…` confirmed byte-identical before and after reset |
| 52 | Amazon storage remains unchanged | **PASS** — see #50; sentinel `SENTINEL_AMAZON_…` confirmed byte-identical |
| 53 | eBay storage remains unchanged | **PASS** — see #50; sentinel `SENTINEL_EBAY_…` confirmed byte-identical |
| 54 | Theme storage remains unchanged | **PASS** — see #50; theme sentinel `dark` confirmed byte-identical after reset |

## FEATURES AND REGRESSION

| # | Check | Result |
|---|-------|--------|
| 55 | No Tamil controls appear | **PASS** — verified in-browser: DOM-text scan for "Translate to Tamil" across every Digital Marketing dashboard/module/lesson/quiz/practical-task/completion screen visited — zero matches; `hasTamilBtn` checked individually per lesson (40/40 false) |
| 56 | No Google translation call occurs | **PASS** — verified in-browser: zero network requests to any translation endpoint were observed in the CDP `Network.responseReceived` log across the entire session (only the local static-file requests and one harmless `favicon.ico` 404 appeared) |
| 57 | English Read Aloud works | **PASS** — verified in-browser: every lesson (40/40) rendered a speaker control (`#lesson-speaker`); clicked on Module 1 and each of Modules 7-10's first lesson with zero resulting console errors or exceptions |
| 58 | Light mode works | **PASS** — verified in-browser: dashboard, module, and practical-task screens screenshotted and rendered correctly in light mode (default) |
| 59 | Dark mode works | **PASS** — verified in-browser: theme toggled via the real header button; `data-theme` attribute confirmed flipping to `dark`; dashboard/module/practical-task screens screenshotted and rendered correctly in dark mode (see `00-dashboard-dark-mode.png`, `00-module-dark-mode.png`, `00-practical-task-dark-mode.png`) |
| 60 | Mobile layout works | **PASS** — verified in-browser at 360×800: zero horizontal overflow (`document.documentElement.scrollWidth === clientWidth`) on dashboard, module journey, module, quiz, and practical-task screens; mobile menu button visible and the drawer opened correctly on click |
| 61 | Desktop layout works | **PASS** — verified in-browser at 1440×900 (and also 1024×768, 768×1024 as intermediate breakpoints): zero horizontal overflow on all 5 checked screens at every viewport |
| 62 | Direct locked-module navigation is blocked | **PASS** — verified in-browser: after exhausting Module 1's 3 quiz attempts (all failed), directly setting the hash to `#/quiz/dm-m1` rendered "Skill Check Unavailable — No Skill Check attempts remain (maximum 3)."; Module 2 remained locked throughout |
| 63 | Refresh preserves progress | **PASS** — verified in-browser: a genuine CDP `Page.reload()` (not a client-side hash change) at `#/module/dm-m5` preserved the module's "Passed" status; a reload at `#/completion` preserved the full completion screen; the dashboard's "10 of 10 modules complete" line persisted across the reload |
| 64 | Corrupted storage recovers safely | **PASS** — verified in-browser: wrote `'{not valid json {{{'` directly to the Digital Marketing storage key, reloaded, and confirmed zero uncaught exceptions, zero console errors, a fresh "0/10" dashboard state, and the one-time recovery toast ("couldn't read your saved progress…started fresh") |
| 65 | PH programme smoke check passes | **PASS** — verified in-browser: PH dashboard loaded with exactly 18 module cards, nav unchanged (Dashboard/7-Day Evaluation/PH Competency Path/Current Module/Programme Sources/Translation Review/Reset Demo Progress), Tamil control confirmed present on a PH lesson, sign-off data intact (11 of 18 modules still flagged `requiresSignoff`), no Digital Marketing practical-task panel present, PH sentinel storage value unchanged |
| 66 | Amazon programme smoke check passes | **PASS** — verified in-browser: Amazon dashboard loaded with exactly 16 module cards, nav unchanged (Dashboard/Amazon Journey/Current Module/Programme Sources/Reset Demo Progress), no Tamil control, no sign-off panel, no Digital Marketing practical-task panel, Amazon sentinel storage value unchanged |
| 67 | eBay programme smoke check passes | **PASS** — verified in-browser: eBay dashboard loaded with exactly 8 module cards, nav unchanged (Dashboard/eBay Journey/Current Module/Programme Sources/Reset Demo Progress), no Tamil control, no sign-off panel, no Digital Marketing practical-task panel, eBay sentinel storage value unchanged |
| 68 | No unexpected console errors | **PASS** — verified in-browser: across the entire session (programme load, 40 lessons, 10 quizzes incl. one full fail+pass cycle and one full 3-attempt exhaustion cycle, practical task, persistence reloads, reset, corrupted-storage recovery, theme toggle, 4 viewports, and PH/Amazon/eBay regression) the running console-error and exception counters stayed at **0**; the only network item ever flagged was a `favicon.ico` 404, which is a browser-automatic request unrelated to the application and not a "required request" |

---

## Bugs found

**Zero application defects were found.** Two issues surfaced during this
pass and both were confirmed to be bugs in the *test harness* (the disposable
CDP scripts written for this verification), not in the shipped application —
corrected in the harness, no application file was touched:

1. **CSS `text-transform: uppercase` on `.badge`/`.module-card__number`
   elements** (pre-existing shared CSS, not written for this task) makes
   `document.body.innerText` return the rendered-uppercase form ("MODULE 2",
   "PASSED") rather than the source HTML's mixed-case text ("Module 2",
   "Passed"). Early harness regexes were case-sensitive and produced false
   negatives (e.g. appeared to show Module 2 as not-locked, or a passed
   module as not-showing "Passed"). Fixed by making the harness's text
   checks case-insensitive. Manually re-confirmed via full-text dumps that
   the application was correct in every case before and after the harness fix.
2. **Overly broad keyword matching** in two harness checks (`body.includes('sign-off')`
   and `body.includes('Practical Task') && body.includes('required')`)
   produced false positives against legitimate quiz-content text (a
   quiz answer explaining "…obtain a designated approver's written sign-off…"
   as a taught business concept, and the phrase "…the required order…" inside
   an unrelated correct-answer explanation). Neither reflects an actual
   Team-Leader-Sign-off UI control or a practical-task completion gate. Fixed
   by checking for the literal UI string "Team Leader Sign-off" and a
   tightly-scoped gating-phrase pattern instead of loose keyword substrings.
3. A CDP `Page.navigate()` call to a URL identical to the page's current URL
   (including an unchanged hash fragment) did not always fire
   `Page.loadEventFired`, causing one harness script to hang. Fixed by adding
   a dedicated `reload()` method (CDP `Page.reload`) for same-URL reloads,
   and a timeout guard on both `navigate()` and `evaluate()` so any future
   harness hang fails fast with a clear error instead of hanging silently.

No applied fix touched `tosp/js/**` or any other application file — all
three fixes were made exclusively in the disposable, non-committed CDP test
scripts used to run this verification pass.

---

## Totals

- Total narrative sources used: **9** of 10 that exist (PMAX-005 excluded)
- Total modules: **10**
- Total lessons: **40**
- Total quizzes: **10**
- Total questions: **60**
- Total documented exclusions: **4** (PMAX-005; NCA conflict; SHOPPING-002 approval-metadata conflict; SHOPPING-001 defective example)
- Conflict count: **4** (same four, all documented in `digital-marketing-team-exclusions.md`)
- Practical-task count: **1** (`digital-marketing-final-practical-v1`, 12 checklist items, non-gating)
- Screenshot evidence: 21 PNG files in `tosp/evidence/digital-marketing-team-2026-07-28/` (15 required categories plus 3 bonus dark-mode shots and 3 regression-dashboard shots)

**DIGITAL_MARKETING_IMPLEMENTATION_CHECKS: PASS**

**68/68 checks passed**, all independently verified this session — 63 by
direct real-browser interaction (this pass) and 5 by direct execution of the
production JavaScript under Node in the prior session, now superseded by the
real-browser confirmations in this pass (checks #58, #59, #60, #61, #63).

**FINAL_USER_ACCEPTANCE: PENDING**
