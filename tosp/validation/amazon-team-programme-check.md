# Amazon Team Programme — Validation Check

Verification methods:
- **[static]** — verified by the Node validation harness over the actual
  content/registry/dispatcher modules (`validate.mjs` / `validate2.mjs`),
  reproduced from the source files.
- **[smoke]** — verified by a DOM-shim render of every view for both programmes
  without throwing (`smoke.mjs`) — a proxy for "no console errors on render".
- **[code]** — verified by reading the implementing code path.
- **[reuse]** — inherited unchanged from the shared engine/UI/CSS that the PH
  programme already passes (see `ui-ux-regression-check.md`), because Amazon
  renders through the identical components, `theme-service`, `speech-service`,
  and stylesheet.

Recorded totals for the Amazon programme:

| Metric | Value |
|--------|-------|
| Total Amazon source documents inspected | 21 (18 used to author content) |
| Total modules | 16 |
| Total lessons | 42 |
| Total quizzes | 16 |
| Total questions | 62 |
| Duplicate-source groups | 4 |
| Conflicts recorded (SOURCE_CONFLICT) | 3 substantive + 2 flags |
| Unsupported/invented rules introduced | 0 |

---

## Binary checks

| # | Check | Result | Method |
|---|-------|:------:|--------|
| 1 | All root Amazon source documents were inventoried | PASS | source-map §1 |
| 2 | All used documents are marked FINAL_TRUTH | PASS | user-confirmed FINAL_TRUTH; SOURCE_DOCUMENTS |
| 3 | Duplicate documents were assessed | PASS | source-map §3 (4 groups) |
| 4 | Conflicts were recorded | PASS | source-map §4 |
| 5 | Module sequence is source-backed | PASS | source-map §2 (Vendor CSV 01–10 + headings) |
| 6 | Every module has a source reference | PASS | [static] every `module.source` set |
| 7 | Every lesson has a source reference | PASS | [static] every `lesson.source` set |
| 8 | Every question has a source reference | PASS | [static] every `question.source` set |
| 9 | No PH lesson appears in Amazon content | PASS | [static] blob excludes bgct/ph/asin-ownership/etc. |
| 10 | No PH quiz appears in Amazon content | PASS | [static] Amazon QUESTIONS only reference `az-*` quizzes |
| 11 | No unsupported Amazon rule was invented | PASS | [code] every figure traced to a FINAL doc; conflicts omitted |
| 12 | Existing quiz configuration is reused unchanged | PASS | [static] 80% / 3 attempts; scoring rules untouched |
| 13 | Failed quiz does not unlock the next module | PASS | [reuse] `quiz-service`/`module-access` unchanged |
| 14 | Passed quiz unlocks the next module | PASS | [reuse] `tryUnlockNextModule` (no signoff → immediate) |
| 15 | No team-leader sign-off is required | PASS | [static] every module `requiresSignoff:false` |
| 16 | No sign-off UI appears in Amazon programme | PASS | [smoke]/[code] `module-view` renders no signoff panel |
| 17 | All modules are required for completion | PASS | [code] `isProgrammeComplete` over all 16; no optional flag |
| 18 | Final completion requires all module quizzes passed | PASS | [reuse] `isProgrammeComplete` |
| 19 | Amazon progress uses its own storage key | PASS | [static] `tosp.amazon-team.prototype.v1` |
| 20 | PH progress is unchanged | PASS | [static] PH key `tosp.prototype.v2` unchanged; content byte-identical |
| 21 | Theme storage is unchanged | PASS | [code] `tosp.ui.theme.v1` untouched |
| 22 | Amazon reset removes only Amazon progress | PASS | [reuse] `storage.resetProgress` removes only active STORAGE_KEY |
| 23 | Tamil controls do not appear in Amazon programme | PASS | [static]/[code] `enableTamilTranslation:false` → render returns '' |
| 24 | Google Translation is not called by Amazon programme | PASS | [code] no translation control mounts → service never called |
| 25 | English text-to-speech works | PASS | [reuse] `speaker-control`/`speech-service` unchanged |
| 26 | Light mode works | PASS | [reuse] shared theme + tokens |
| 27 | Dark mode works | PASS | [reuse] shared theme + tokens |
| 28 | Mobile layout works | PASS | [reuse] shared responsive CSS; new switcher uses max-width:100% |
| 29 | Desktop layout works | PASS | [reuse] shared shell |
| 30 | No horizontal overflow | PASS | [reuse]/[code] switcher `width:100%; max-width:100%` |
| 31 | No console errors | PASS | [smoke] all views render for both programmes without throwing |
| 32 | Direct locked-module navigation is blocked | PASS | [reuse] `canOpenModule` gate in module/lesson/quiz views |
| 33 | Refresh preserves Amazon progress | PASS | [static] persisted under Amazon key; loaded on init |
| 34 | Corrupt Amazon storage recovers safely | PASS | [reuse] `storage.loadProgress` fallback (never throws) |
| 35 | Completion screen works | PASS | [smoke] renders; shows Team/version/date/count/PROTOTYPE_ONLY |
| 36 | Source-reference screen works | PASS | [smoke] renders Amazon docs + rules; PH-only tables hidden |
| 37 | All configured module IDs are unique | PASS | [static] uniqueness assert |
| 38 | Lesson IDs are unique | PASS | [static] uniqueness assert |
| 39 | Quiz and question IDs are unique | PASS | [static] uniqueness assert |
| 40 | Existing PH Team programme still loads and works | PASS | [static]/[smoke] PH resolves 18 modules; all PH views render |

---

## Markers

`AMAZON_PROGRAMME_IMPLEMENTATION_CHECKS: PASS`

`FINAL_USER_ACCEPTANCE: PENDING`

(No separate business acceptance rule was provided by the user.)
