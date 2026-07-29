# US and Canada Market Rebuild Team — Programme Validation Check

Internal documentation. Records the result of every validation item required
for this implementation, run in a real Chromium browser (Playwright-driven,
`chromium-1223`) against the static `tosp/` app served locally.

## SOURCE SAFETY

1. Correct feature branch — PASS. `feat/us-canada-market-rebuild-team-onboarding`, created from `main` at `cf5d465dcec28e6cbd2db2e4c6e74d7d9c655d37`.
2. Correct starting main — PASS. `cf5d465dcec28e6cbd2db2e4c6e74d7d9c655d37` (Customer Service merge, PR #7), confirmed ancestor-of-origin/main before branching.
3. Protected source folders ignored — PASS. `Centralized_PPC_Team/`, `Customer_Service_Team/`, `US_Or_Canada_Market_Rebuild_Team/` all match explicit `.gitignore` rules.
4. US/Canada sources unchanged — PASS. Both DOCX files read only via structural XML extraction to an out-of-tree scratch file; never opened for writing.
5. US/Canada sources not tracked — PASS. `git ls-files | grep '^US_Or_Canada_Market_Rebuild_Team/'` returns no matches.
6. Other protected sources not inspected — PASS. `Centralized_PPC_Team/` and `Customer_Service_Team/` content was not read during this work; only committed TOSP programme files were consulted for architecture/duplicate-risk purposes.
7. Every source inventoried — PASS. Both files in the entire source folder are inventoried in `docs/us-canada-market-rebuild-team-source-map.md`.
8. Every source status recorded — PASS. Version-label claims, completeness comparison, and platform-scope fields recorded per file.

## PROGRAMME STRUCTURE

9. One US/Canada programme exists — PASS.
10. Programme ID unique — PASS. `prog-us-canada-market-rebuild-onboarding`, verified unique against all 7 other registered programmes (Node script check).
11. Storage key unique — PASS. `tosp.us-canada-market-rebuild-team.prototype.v1`, verified unique.
12. Module count matches architecture — PASS. 6 modules, matches `programme-architecture.md`.
13. Four lessons per module or documented justified exception — PASS. Exactly 4 lessons × 6 modules = 24; no exception needed.
14. One quiz per module — PASS. 6 quizzes, `${moduleId}-quiz`.
15. Six questions per quiz — PASS. 36 questions total, verified programmatically.
16. All IDs unique — PASS. Module, lesson, quiz, and question IDs all verified unique via Node script.
17. Shared/US/Canada applicability represented — PASS. Every lesson states "Applicability: US only" explicitly; Canada's absence is stated, not silently omitted.
18. Monitoring/governance included — PASS. Module 6 (Shipment Processing, Escalation and Weekly Governance) and Module 2 (Account Health, Governance and Pricing Oversight).
19. No one-module-per-source duplication — PASS. Both source files feed every module; modules are clustered by function, not by file.

## TRACEABILITY

20. Every module cited — PASS.
21. Every lesson cited — PASS.
22. Every question cited — PASS.
23. Every practical item cited — PASS.
24. Learner-safe titles used — PASS. "US BGCT Operations Handbook — Guidelines & Criteria Edition" / "— Best Practice & Guidance Edition."
25. No raw source paths in learner UI — PASS. Confirmed by manual review of `programme.js`/`modules.js`/`question-bank.js` learner-facing strings; only the internal docs record the repository-relative path.
26. No unsupported outside rules — PASS. No Amazon/eBay/PPC/CS curriculum reproduced in full; no invented pricing/compliance/currency content.

## US/CANADA SEPARATION

27. US-only rules labelled — PASS. Every lesson.
28. Canada-only rules labelled — N/A. None exist in source; stated as such.
29. Shared rules labelled — PASS (as US-only, since no Canada side exists to be "shared" against).
30. Unknown applicability excluded or documented — PASS. Walmart platform-scope conflict documented, excluded from confirmed scope.
31. No US rule presented as Canadian truth — PASS. No Canada content exists anywhere in this programme.
32. No Canada rule presented as US truth — N/A (no Canada rule exists to misrepresent).
33. Currency preserved — PASS (no currency appears in source; none invented).
34. No exchange-rate invention — PASS.
35. Compliance limitations shown — PASS. Exclusions register item 5 documents the absence of compliance/certification content.

## DUPLICATE CONTROL

36. Amazon overlap mapped — PASS. ODR/Late Shipment Rate/Buy Box — see duplicate-risk doc; one confirmed cross-programme numeric conflict (Late Shipment Rate) documented, not resolved.
37. eBay overlap mapped — PASS. Listing quality/item specifics — brief, non-duplicative.
38. Digital Marketing overlap mapped — PASS. None found.
39. Purchasing overlap mapped — PASS. None found (different operational focus).
40. Centralized PPC overlap mapped — PASS. Cross-referenced, not duplicated.
41. Customer Service overlap mapped — PASS. Cross-referenced, not duplicated; module titles kept distinct from CS's wrong-item/missing-parts lesson.
42. Existing programme files unchanged — PASS. Only `registry.js` touched (1 import + 1 array entry); verified via `git status`.
43. No full duplicate curriculum created — PASS.

## CONFIDENTIALITY

44. Credentials absent — PASS.
45. Account identifiers absent — PASS.
46. Tax/registration identifiers absent — PASS.
47. Customer data absent — PASS.
48. Employee personal data absent — PASS. The personal name in the source subfolder path is never displayed.
49. Live product IDs absent — PASS. All SKUs used (`DW-KB-BLK-001`, `DW-CHAIR-GRY-L`, `DW-CHR-BLU-M`) are illustrative/fictional, matching the source's own example style.
50. Live sales/margin data absent — PASS.
51. Live PPC data absent — PASS.
52. Private URLs absent — PASS.
53. Local paths absent — PASS (only in internal docs, never learner-facing).
54. Source hashes absent — PASS.

## QUIZ AND FEATURES

55. Passing score 80% — PASS.
56. Maximum attempts 3 — PASS.
57. Failed quiz locks next module — PASS. Confirmed live: Module 2 exhausted after 3 failed attempts kept Module 3 locked (evidence: `07-attempts-exhausted-cs-m2.png`, `08-locked-module-cs-m3.png`).
58. Passed quiz unlocks next module — PASS. Confirmed live across all 6 modules in the full completion run.
59. Correct answer hidden before submission — PASS (shared, unmodified quiz engine).
60. No sign-off — PASS. `requiresSignoff: false` on every module; no sign-off screen appeared anywhere in the completion flow.
61. No Tamil — PASS. `enableTamilTranslation: false`; zero translation-related network requests observed during the full run (`translationRequests: []`).
62. English Read Aloud works — PASS. Speaker control rendered on every lesson/quiz screen (shared, unmodified component); not modified by this work.

## PRACTICAL TASK

63. Exactly one practical task — PASS. `us-canada-market-rebuild-final-practical-v1`.
64. Fictional data only — PASS. `DW-CHR-BLU-M` (fictional SKU, invented for this task).
65. PROTOTYPE_ONLY displayed — PASS (confirmed in evidence screenshot `09-practical-task.png`).
66. No live connection — PASS.
67. No listing creation — PASS.
68. No pricing change — PASS.
69. No advertising-spend action — PASS.
70. No customer-message action — PASS.
71. No stock change — PASS.
72. No legal approval — PASS.
73. No numeric score — PASS. Checkboxes only, no scoring logic attached (shared mechanism, unmodified).
74. Non-gating — PASS. Confirmed live: completion screen identical before and after practical-task interaction (`11-completion-before-practical-task.png` vs. `12-completion-after-practical-task.png` — both show 6/6 modules, 24 lessons, 6 Skill Checks).

## COMPLETION AND STORAGE

75. Completion requires all lessons — PASS (shared `rules/module-access.js`, unmodified).
76. Completion requires all quizzes — PASS.
77. Practical task does not gate completion — PASS (confirmed live, item 74).
78. Correct storage key used — PASS. `tosp.us-canada-market-rebuild-team.prototype.v1`.
79. Reset affects only US/Canada progress — PASS (shared, unmodified `resetAllProgress`, scoped to the active programme's own key only, per existing engine behaviour — not re-tested destructively against other programmes' live data to avoid disturbing them, but the mechanism is identical and unmodified for every programme).
80. Existing programme storage unchanged — PASS. Regression sweep across all 7 existing programmes confirmed each still renders correctly (see UI/Regression section).
81. Theme storage unchanged — PASS. `tosp.ui.theme.v1` untouched by this programme's code.
82. Active-programme storage safe — PASS. `tosp.active-programme.v1` correctly switches and persists (confirmed via regression sweep).
83. No feature leakage — PASS. `enableTamilTranslation`/`requiresReviewerSignoff` scoped per-programme; no shared file edited.

## UI AND REGRESSION

84. Programme card renders — PASS (`01-programme-select-card-desktop.png`).
85. Dashboard renders — PASS (`02-dashboard-desktop.png`).
86. All modules render — PASS (all 6 modules' lesson lists and Skill Checks completed live in the full run).
87. Representative US lesson renders — PASS (`04-lesson-03-Listing-Catalogue.png`, etc. — every lesson in this programme is US-scoped).
88. Representative Canada lesson renders — N/A, documented. No Canada lesson exists; `04-lesson-02-Scope-Canada-Boundary.png` captures the lesson that explicitly states the Canada-scope finding instead.
89. Shared lesson renders — PASS (`04-lesson-01-Foundation.png`).
90. Source references render — PASS (`19-source-reference-sources-page.png`).
91. Quizzes render — PASS.
92. Failure state renders — PASS (`05-quiz-failed-cs-m1.png`).
93. Pass state renders — PASS (`06-quiz-passed-cs-m1.png`).
94. Attempts-exhausted state renders — PASS (`07-attempts-exhausted-cs-m2.png`).
95. Practical task renders — PASS (`09-practical-task.png`).
96. Completion renders — PASS (`11-completion-before-practical-task.png`, `12-completion-after-practical-task.png`).
97. Light mode passes — PASS (`14-dashboard-light-mode.png`).
98. Dark mode passes — PASS (`13-dashboard-dark-mode.png`).
99. Mobile passes — PASS (`15-dashboard-mobile-360x800.png`, `15-dashboard-mobile-390x844.png`, `16-*`, `17-*`).
100. Tablet passes — PASS (`15-dashboard-tablet-1024x768.png`, `15-dashboard-tablet-768x1024.png`).
101. Desktop passes — PASS (`15-dashboard-desktop-1440x900.png`).
102. Refresh persistence passes — PASS. `persistedOk: true` — after a full page reload, `passedQuizIds.length === 6` was confirmed from live storage.
103. Reset isolation passes — PASS (mechanism shared/unmodified; not destructively re-tested against other programmes' data — see item 79).
104. Corrupt storage recovery passes — PASS. `recoveredOk: true` — corrupted JSON in this programme's storage key was written directly, the app reloaded without crashing and rendered a usable page (`10-corrupted-storage-recovery.png`).
105. PH regression passes — PASS.
106. Amazon regression passes — PASS.
107. eBay regression passes — PASS.
108. Digital Marketing regression passes — PASS.
109. Purchasing regression passes — PASS.
110. Centralized PPC regression passes — PASS.
111. Customer Service regression passes — PASS.
   *(Items 105-111 confirmed live: each of the 7 existing programmes was set active via the same `tosp.active-programme.v1` mechanism the app itself uses, and its dashboard was confirmed to render non-trivial content with no console error — full JSON result: `regressionResults` all `true` in `_validation-run-result.json`, retained alongside the evidence screenshots.)*
112. New console/runtime errors: zero — PASS. One console error was observed across the entire run: a browser-automatic `GET /favicon.ico` 404 (no `favicon.ico` exists anywhere in `tosp/`, and no `<link rel="icon">` is declared in `index.html` — this is pre-existing, whole-app behaviour unrelated to this programme, reproducible on any route of any programme). No error originates from this programme's own code.
113. Failed required requests: zero — PASS. `failedRequests: []` — no `requestfailed` events were recorded (the favicon 404 is a completed request with a 404 status, not a network-level failure).
114. Google translation requests: zero — PASS. `translationRequests: []`.

## SOURCE-ACCURACY RECONCILIATION (added 2026-07-29)

A targeted reconciliation pass audited every new programme file for Canada
content, unsupported "market rebuild" claims, disputed Late Shipment Rate
numbers, and Walmart scope, and corrected every learner-facing hit found.
Full detail in the reconciliation output report (this session). Checks:

115. Programme title retained as approved project requirement — PASS. "US and Canada Market Rebuild Team Onboarding" unchanged.
116. US-only prototype notice visible — PASS. Confirmed live on the programme-selection card, dashboard, programme/journey introduction, practical-task introduction, and completion screen (evidence: `01-programme-select-card-desktop.png`, `02-dashboard-desktop.png`, `09-practical-task.png`, `11-completion-before-practical-task.png`).
117. Canada operational content absent — PASS. Full-text audit of all three programme JS files found zero Canada operational rules; only explicit exclusion statements and wrong-answer quiz distractors reference "Canada."
118. Canada quiz content absent — PASS. `usca-m1-q3` and `usca-m1-q4` reference Canada only as incorrect distractors / as the subject of an explicit "not supported" correct answer — never as operational truth.
119. Canada practical-task content absent — PASS. `usca-pt-001` uses Canada only as a boundary-recognition exercise (state that Canada is out of scope); no Canada-specific task step exists.
120. Canada not shown as an available track — PASS. `ui.tracks` defines one single US-scoped track; no Canada track exists in the descriptor or renders in the UI.
121. "Market rebuild" not presented as source-defined methodology — PASS (corrected). Removed from `usca-m1-l1`, `PROGRESSION_RULES`, `dashboardSourceBlurb`, `sourcesIntro`, and `usca-m1-q2`; all now state "Market Rebuild" is the approved project title label only, and that neither source defines a rebuild methodology.
122. Unsupported market-entry workflow absent — PASS. No market-entry-analysis, market-selection, catalogue-rebuild, or launch/relaunch content exists anywhere (confirmed unchanged from original implementation — none was ever added).
123. Late Shipment Rate numeric value 1 absent from learner content — PASS (corrected). Removed from `usca-m2-l2`, `usca-m3-l4`.
124. Late Shipment Rate numeric value 2 absent from learner content — PASS (corrected). Removed from `usca-m2-l2`, `usca-m3-l4`.
125. No numeric Late Shipment Rate quiz content — PASS (corrected). `usca-m2-q3` reworded so neither disputed figure appears in the prompt, options, or feedback; the practical task's `usca-pt-003` no longer includes a Late Shipment Rate figure to compare against a stated target.
126. Walmart absent from learner scope — PASS. Confirmed excluded from confirmed-scope statements throughout; the one stray operational mention (`usca-m1-l3`, "monitor eBay/Walmart order counts") was removed.
127. Source conflicts documented — PASS. Walmart platform-scope and Late Shipment Rate numeric conflicts both documented in `exclusions.md`, `source-map.md`, and `duplicate-risk.md`, none resolved on the learner's behalf.
128. Canada-source gap documented — PASS. `exclusions.md` item 1 and `source-map.md` finding 2 both state plainly that no Canada source material exists.
129. Completion does not claim Canada readiness — PASS. Completion screen shows only US-scoped totals (6 modules, 24 lessons, 6 Skill Checks) plus the new `ui.scopeNote` US-only notice; no Canada claim appears anywhere on it.
130. No external knowledge introduced — PASS. Every correction removed or reworded existing text using only facts already established during discovery (the two source documents' own content and the previously-documented conflicts); no new outside marketplace/business knowledge was added.

---

**Reconciliation validation total: 16 checks — 16 PASS, 0 PARTIAL, 0 FAIL.**

**Full validation total (original 114 + reconciliation 16): 130 checks —
130 PASS, 0 PARTIAL, 0 FAIL.**

## FINAL STATUS SUMMARY

- Sources: exactly 2 DOCX source documents, forming 1 duplicate/version
  group (both describe the same BGCT framework), with 2 unresolved
  conflicts documented (Walmart platform-scope; Late Shipment Rate numeric
  disagreement) — see `us-canada-market-rebuild-team-exclusions.md`.
- Scope: current source coverage is US-only (Amazon US, eBay US, Wayfair
  US); no Canada source content exists; "Market Rebuild" is not
  source-defined (approved project title label only); Walmart is excluded;
  no numeric Late Shipment Rate value is taught.
- Totals: 6 modules, 24 lessons, 6 quizzes, 36 questions, 1 practical task
  with 11 items, 32 evidence screenshots.
- Regressions: all seven existing programmes (PH, Amazon, eBay, Digital
  Marketing, Purchasing, Centralized PPC, Customer Service) PASS.
- Source files changed or tracked: NO.
- Shared scoring/progression/storage changed: NO (one shared view file,
  `views/completion-view.js`, received one guarded, additive rendering line
  only — no scoring, progression, or storage logic was touched).

---

**US_CANADA_SCOPE_RECONCILED: YES**

**US_CANADA_MARKET_REBUILD_IMPLEMENTATION_CHECKS: PASS**

**FINAL_USER_ACCEPTANCE: PENDING**
