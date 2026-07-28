# eBay Team Programme — Validation Check

Verification methods:
- **[static]** — verified by a Node harness importing the actual
  `ebay-team-programme.js` / `ebay-team-modules.js` / `ebay-team-question-bank.js`
  / `registry.js` modules and asserting on their real exported content (ID
  uniqueness, references, config values, a confidentiality string scan).
- **[engine]** — verified by a Node harness with a minimal `localStorage`
  shim that runs the **real, unmodified** engine modules end-to-end without a
  browser (a business-logic-only smoke test). Superseded by [browser] below
  wherever both exist; kept here as the second, independent confirmation.
- **[browser]** — verified in a **real Chrome browser** (see Real-Browser
  Validation below) via a zero-install Chrome DevTools Protocol driver: the
  actual `index.html`/`app.js` loaded over HTTP, real clicks/radio-selection/
  form submission, real `hashchange` routing, console/exception/network
  capture, `Emulation.setDeviceMetricsOverride` for responsive checks, and
  `Page.captureScreenshot` for evidence.
- **[code]** — verified by reading the implementing code path.
- **[reuse]** — inherited unchanged from the shared engine/UI/CSS that PH and
  Amazon already pass, because eBay renders through the identical
  components, `theme-service`, `speech-service`, and stylesheet — no shared
  UI file was touched for this work (see architecture doc §2).

Recorded totals for the eBay programme:

| Metric | Value |
|--------|-------|
| Total eBay source files inventoried | 3 (1 duplicate pair: PDF ↔ Markdown) |
| Total modules | 8 |
| Total lessons | 22 |
| Total quizzes | 8 |
| Total questions | 35 |
| Duplicate-source groups | 1 (7-Day PDF vs. its Markdown export) |
| Contamination exclusions | 1 (Amazon A+ Content slide) |
| Confidential exclusions | 3 categories (account names, listing counts, internal IDs) |
| Conflicts recorded | 0 factual; 1 structural completeness gap (resolved by source priority) |
| Unsupported/invented rules introduced | 0 |
| Real-browser assertions run | 89 (89 PASS / 0 FAIL) |
| Console errors / uncaught exceptions / failed network requests captured | 0 / 0 / 0 |

---

## Real-Browser Validation

- **Browser**: Google Chrome (`HeadlessChrome/150.0.0.0`, `Chrome/150.0.7871.182`), headless mode, driven directly over the Chrome DevTools Protocol (`Page`, `Runtime`, `Network`, `Log`, `Emulation` domains) via a small zero-dependency Node driver (Node's built-in `WebSocket`/`fetch`, no npm packages installed).
- **App host**: a zero-dependency Node static file server (`http`+`fs`, no npm packages) serving `tosp/` at `http://127.0.0.1:5183/index.html` — the repo's actual static frontend, unmodified.
- **Environment**: Windows 10, local machine, Node v22.23.1.
- **Coverage**: eBay programme load, nav isolation, module order/lock states, direct-hash-nav blocking, lesson rendering, Read Aloud, quiz fail/pass/3-attempt exhaustion (Module 1, isolated) and the full 8-module golden path (all 8 quizzes, including Module 8), completion screen, refresh persistence, reset isolation (with PH/Amazon/theme sentinel keys), 4 responsive breakpoints (360×800, 768×1024, 1024×768, 1440×900) including the mobile drawer, and a PH + Amazon regression smoke pass — 89 assertions, all real DOM/state observations, not mocked.
- **Result**: 89/89 assertions passed. 0 `console.error`, 0 uncaught exceptions, 0 failed network requests, 0 Google Translate calls (structurally impossible — the Tamil control never mounts when `enableTamilTranslation:false`, confirmed by 0 `.translation-control` elements anywhere in the eBay programme across every page visited) across the entire run, including the PH/Amazon smoke pass.
- **Bugs found in the application**: **none.** Three issues surfaced during this session were all in the **test harness script**, not the app — see "Test-harness issues found and fixed" below. No application file needed a change as a result of real-browser testing.
- **Screenshots**: `tosp/evidence/ebay-team-2026-07-17/` (11 PNGs, listed below) — visually spot-checked (dashboard and completion screen) and confirmed to show correctly rendered, non-blank content.

### Test-harness issues found and fixed (not app bugs)

1. **Nav-label query too broad.** The first assertion of "exactly the expected 4 eBay nav items" initially failed because the CSS selector `.nav-link__label` also matched the always-present "Reset Demo Progress" shell button (which reuses the same class). Fixed by scoping the query to `[data-shell-nav-item] .nav-link__label` — the attribute the app's own code already uses to mark descriptor-driven nav buttons specifically. No app code changed.
2. **Same-hash retry navigation.** Setting `window.location.hash` directly (bypassing the app's `navigate()`) is a no-op when the target hash equals the current one — which happens when retrying a Skill Check (`/quiz/eb-m1` → fail → retry → `/quiz/eb-m1` again). The app's real `navigate()` function explicitly handles this by calling `rerender()` when the hash is unchanged (this is why clicking the real "Retry Skill Check" button works correctly for a user). The driver's `setHash` helper was fixed to call the app's own `router.navigate()` via a dynamic import, exactly mirroring what a real click does, instead of raw hash assignment. No app code changed.
3. **Sentinel keys wiped by an in-test `localStorage.clear()`.** A later phase's `localStorage.clear()` (used deliberately, to start the golden path from a clean slate) also cleared the PH/Amazon/theme sentinel values planted earlier for the reset-isolation check, causing a false failure ("PH/Amazon/theme keys not found") that had nothing to do with the actual eBay reset action. Fixed by re-planting the sentinels immediately before the reset-isolation check. No app code changed.

None of these represent application defects — they are all artifacts of driving the browser via the DevTools Protocol from a fresh script, now corrected.

### Screenshots captured (`tosp/evidence/ebay-team-2026-07-17/`)

| File | Shows |
|---|---|
| `01-ebay-dashboard.png` | eBay dashboard — nav, tracks, overall progress |
| `02-ebay-module-journey.png` | Full 8-module journey, Module 1 available / 2–8 locked |
| `04-ebay-lesson-page.png` | Module 1 lesson page — content, source reference, Read Aloud |
| `05-ebay-quiz-failed.png` | Module 1 Skill Check — failed result, score, attempt count |
| `06-ebay-quiz-passed.png` | Module 1 Skill Check — passed result, no sign-off step |
| `07-ebay-module8-deep-dive.png` | Module 8 (Listing Optimization Deep-Dive), unlocked |
| `08-ebay-completion.png` | Completion screen — 8/8 modules, PROTOTYPE_ONLY |
| `09-ebay-mobile-completion-360x800-mobile.png` | Completion screen at 360px |
| `10-ebay-dashboard-1440x900-desktop.png` | Dashboard at 1440px |
| `11-ebay-mobile-quiz-360x800-mobile.png` | Quiz form at 360px — options wrap correctly |
| `12-ebay-mobile-drawer-open.png` | Mobile nav drawer open, no overflow |

---

## Binary checks

| # | Check | Result | Method |
|---|-------|:------:|--------|
| 1 | eBay branch created from updated main | PASS | [code] `git log` — `feat/ebay-team-onboarding` created from `main`@`0a7d23e`, which contains PR #1 (Amazon merge) |
| 2 | Amazon work exists on main before branching | PASS | [code] `git merge-base --is-ancestor 63caa06 main` confirmed true after fast-forwarding local `main` to `origin/main` |
| 3 | `Ebay_Team/` is gitignored | PASS | [code] `.gitignore` line added: `Ebay_Team/`; confirmed absent from `git status` untracked list |
| 4 | All source files inventoried | PASS | source-map §1 (3 files) |
| 5 | 7-day PDF used as primary structural source | PASS | source-map §2; every Module 1–7 `source` field cites the PDF |
| 6 | Markdown treated as secondary duplicate | PASS | source-map §1–2; not used as a standalone content source anywhere |
| 7 | Listing deck treated as separate deep-dive source | PASS | source-map §1, §3; Module 8 only |
| 8 | Amazon A+ content excluded | PASS | [static] confidentiality scan for `"A+ Content"` / `"Amazon A+"` — 0 matches in generated content |
| 9 | Account names excluded | PASS | [static] scan for `LEDSone` / `Electricalsone` / `Sun sone` — 0 matches |
| 10 | Listing counts excluded | PASS | [static] scan for `2892` / `878` / `1455` / `822` / `772` — 0 matches |
| 11 | Internal policy/profile IDs excluded | PASS | [static] scan for the three recorded ID strings — 0 matches |
| 12 | Eight modules created | PASS | [static]/[browser] `MODULES.length === 8`; 8 module cards rendered in the real browser |
| 13 | Modules 1–7 follow Day 1–7 | PASS | [code] each module's `source` cites its Day; `orderIndex` 1–7 matches; [browser] rendered order matches exactly |
| 14 | Module 8 is Listing Optimization Deep-Dive | PASS | [code] `eb-m8`, sourced from EBAY BGCT PDF only; [browser] screenshot `07-ebay-module8-deep-dive.png` |
| 15 | Every module has source references | PASS | [static] all 8 `module.source` set and non-empty |
| 16 | Every lesson has source references | PASS | [static] all 22 `lesson.source` set and non-empty; [browser] source line visible on rendered lesson page |
| 17 | Every question has source references | PASS | [static] all 35 `question.source` set and non-empty |
| 18 | Lesson wording is original and learner-friendly | PASS | [code] manual authoring review — no source paragraph copied; see source-map + architecture docs |
| 19 | Source meaning remains unchanged | PASS | [code] manual cross-check of each lesson against its cited slide |
| 20 | No large source passage copied directly | PASS | [code] manual review; only short verbatim terms/thresholds preserved (titles, numeric limits) as required |
| 21 | No unsupported outside eBay knowledge added | PASS | [code] every rule traced to the PDF or the listing deck; no external eCommerce knowledge introduced |
| 22 | Exact thresholds preserved | PASS | [code] 80 chars / 40-char zone / forbidden chars / 2000×2000px / 16px–12px / 1500–2000 chars / 250-char lead / 30-day returns / 14-day cancellation / 4 account-health %s — all verbatim |
| 23 | 80% pass rule used | PASS | [static] `passingScorePct: 80`; [browser] Module 1/8 pass results showed 100% (≥80%) |
| 24 | Three-attempt limit used | PASS | [static] `maxAttempts: 3`; [browser] live 3-attempt exhaustion test confirmed lockout after attempt 3 |
| 25 | Failed quiz does not unlock next module | PASS | [browser] deliberate all-wrong Module 1 attempt in real Chrome: Module 2 card stayed `locked` |
| 26 | Passed quiz unlocks next module | PASS | [browser] correct-answer Module 1 attempt: Module 2 card became `available` immediately |
| 27 | No sign-off UI appears | PASS | [browser] `.signoff-panel` count = 0 on eBay dashboard and every eBay module visited; result page text confirmed no "Sign-off" mention after any pass |
| 28 | No sign-off gate exists | PASS | [browser] every eBay module unlocked its successor immediately on a passed quiz, across all 8 modules in the golden path |
| 29 | No Tamil controls appear | PASS | [browser] `.translation-control` count = 0 on eBay dashboard and lesson page (vs. count = 3 on a PH module page in the same session, confirming the check is meaningful) |
| 30 | No Google translation call occurs | PASS | [browser] 0 network requests of any kind failed or were observed for a translation endpoint across the whole run; structurally impossible since the control never mounts |
| 31 | eBay progress uses its own storage key | PASS | [browser] `localStorage.getItem('tosp.ebay-team.prototype.v1')` populated after the first lesson completion |
| 32 | PH progress remains unchanged | PASS | [browser] a PH sentinel value planted before the run was byte-identical after the entire eBay suite, including the eBay reset action |
| 33 | Amazon progress remains unchanged | PASS | [browser] an Amazon sentinel value planted before the run was byte-identical after the entire eBay suite, including the eBay reset action |
| 34 | Theme remains functional | PASS | [browser] light theme rendered correctly (dashboard screenshot); dark theme also rendered correctly and legibly when the theme key was absent mid-run (completion screenshot, OS-preference fallback) — both themes visually confirmed working |
| 35 | English Read Aloud works | PASS | [browser] Read Aloud control rendered on the lesson page and was clicked without error; `speechSynthesis` reported supported in this Chrome build |
| 36 | Mobile layout works | PASS | [browser] 360×800 dashboard/journey/quiz/completion all rendered with 0px horizontal overflow; mobile drawer opened correctly |
| 37 | Desktop layout works | PASS | [browser] 1024×768 and 1440×900 dashboard/journey/quiz/completion all rendered with 0px horizontal overflow |
| 38 | Direct locked-module access is blocked | PASS | [browser] navigating straight to `#/module/eb-m3` before Module 2 was unlocked rendered "Module Locked", not lesson content |
| 39 | Refresh preserves eBay progress | PASS | [browser] a genuine full-page reload (`Page.navigate` to the exact current URL, hash included) after full completion still showed the completion screen with 8/8 |
| 40 | Corrupt eBay storage recovers safely | PASS | [engine] invalid JSON written to the eBay key; `loadProgress()` returned a valid initial shape and `wasLastLoadCorrupted()` reported true (non-browser functional harness; browser session did not need to re-corrupt storage mid-flow) |
| 41 | Completion requires all eight modules | PASS | [browser] completion screen only appeared after all 8 Skill Checks passed in sequence; earlier direct navigation to `/completion` before that point was not attempted mid-run because the golden path completes it naturally — engine-level confirmation in the prior functional harness also covers the negative case explicitly |
| 42 | Completion screen is PROTOTYPE_ONLY | PASS | [browser] `PROTOTYPE_ONLY` badge and "not an official... certificate" sentence both present in rendered completion HTML (screenshot `08-ebay-completion.png`) |
| 43 | PH Team programme still works | PASS | [browser] switched active programme to PH live: dashboard loaded, 18 modules confirmed via the loaded `data.js`, Tamil controls present (isolated to PH), sign-off flag data intact (11 modules) |
| 44 | Amazon Team programme still works | PASS | [browser] switched active programme to Amazon live: dashboard loaded, 16 modules confirmed, 0 Tamil controls, 0 sign-off panels, Amazon sentinel storage untouched |
| 45 | No console errors | **PASS** | [browser] 0 `console.error`/`Log.entryAdded(error)` events, 0 `Runtime.exceptionThrown` events, and 0 HTTP ≥400 or failed network loads across all 89 assertions and every page/route/viewport visited, in a real Chrome instance |
| 46 | IDs are unique | PASS | [static] module/lesson/quiz/question IDs asserted unique via `Set` size checks; also unique across the full 3-programme registry |
| 47 | Source documents remain unchanged | PASS | [code] `Ebay_Team/*` files were only read via the Read tool, never edited |
| 48 | No unsupported assumptions were introduced | PASS | [code] every module/lesson/rule/question traces to a cited slide; the only non-source-derived values are the reused platform quiz config (80%/3/no-signoff), which is disclosed as such in the descriptor comments and source map |

---

## Markers

`EBAY_PROGRAMME_IMPLEMENTATION_CHECKS: PASS` — **48/48**

`FINAL_USER_ACCEPTANCE: PENDING`

(No separate business acceptance rule was provided by the user. All 48
checks are now full PASS: check 45 was upgraded from PARTIAL to PASS after
a real-Chrome validation pass — see "Real-Browser Validation" above and the
handover doc for full detail.)
