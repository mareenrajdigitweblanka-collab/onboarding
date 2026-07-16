# Team Onboarding & Skill Progression Platform (TOSP) — Frontend Prototype

**Project code:** TOSP
**Status:** PROTOTYPE_ONLY (system evidence) · Programme content status: FINAL_TRUTH (see below)

## Purpose

This is the frontend prototype of the onboarding workflow for the Digitweb
Lanka PH/Sales Team. It lets a single demo learner:

1. view an assigned onboarding programme;
2. access Module 1 immediately;
3. view all 18 progressive modules;
4. open available modules;
5. complete required lessons;
6. take a module Skill Check;
7. receive a pass or fail result;
8. unlock the next module only after passing (and, for PH-specific modules,
   after a simulated Team Leader Sign-off);
9. view overall progress;
10. retain demo progress after refreshing the browser;
11. reset all demo progress.

## Content sourcing model — read this first

Programme content (`js/data.js`) is **not placeholder demo data**. Every
Module, Lesson, Quiz Question, and progression rule is derived from, and
carries a `source` citation to, one of two authoritative documents:

1. **Digitweb Lanka New Employee Onboarding Guide v1.0** (May 2026) — the
   company-wide 7-day BGCT evaluation plan (Modules 1–7).
2. **Digitweb Lanka PH/Sales Team BGCT Handbook v1.0** (May 2026) — the
   department's 11-step Sales Learning Path (Modules 8–18).

Per that authorisation, this content is labelled `FINAL_TRUTH`, not
`DEMO_DATA` / `CONFIGURATION_REQUIRED` / `VERIFY`. Where a value genuinely
is **not** stated in either document (the per-module Skill Check passing
percentage and max-attempts count — see `js/config.js`), it remains
`CONFIGURATION_REQUIRED` and is documented as such, distinct from the
source's own scoring model (a whole-programme 25-question evaluation with
score bands, and separate monthly probation gates — both reproduced with
citations in the "Programme & Source Reference" panel on the Dashboard).

**Both source documents are marked "Confidential Internal Document" /
"Internal Use Only — Do Not Share Outside the Company."** This file is
loaded into the browser as plain JavaScript and is readable via
view-source/devtools by anyone with access to the deployed app — the same
constraint that already applies to the quiz correct answers. Deploy/share
this prototype only within an authorised internal audience.

## Prototype limitations (system evidence only)

> **This is a frontend-only prototype. Progress is stored in this browser and
> is not official onboarding evidence.**

- No backend, no database, no network calls.
- No real authentication or authorization — there is exactly one hard-coded
  demo learner (`Demo Learner`), unrelated to the sourced programme content.
- Quiz correct answers are shipped in the browser-loaded JavaScript and can be
  read or edited via developer tools — see [Known production blockers](#known-production-blockers).
- The "Team Leader Sign-off" step required by the PH Handbook for Modules
  8–18 is **simulated**: a learner clicking "Confirm" in this prototype is
  not a real reviewer action, is not verified by any actual team leader, and
  is not official evidence.
- Progress lives entirely in `localStorage` on the device/browser used and can
  be cleared, edited, or lost at any time.

## How to run

No installation is required — this project uses only HTML, CSS, and vanilla
JavaScript ES modules.

**Option 1 — open directly**
Open `tosp/index.html` directly in a browser. This works in most modern
browsers, but some browsers restrict `type="module"` script loading over the
`file://` protocol.

**Option 2 — local static server (preferred)**

```bash
cd tosp
python -m http.server 8000
```

Then open:

```
http://localhost:8000
```

Do not install anything else — no `npm install`, no build step.

## Folder structure

```
tosp/
├── index.html              # application shell only, no business logic
├── css/
│   └── styles.css          # all styling, responsive, no external assets
├── js/
│   ├── app.js               # entry point: wires router, header, views
│   ├── config.js             # CONFIGURATION_REQUIRED values
│   ├── data.js                # FINAL_TRUTH sourced programme content
│   ├── router.js               # hash-based router, no framework
│   ├── storage.js               # the only module that touches localStorage
│   ├── state.js                  # transient in-memory UI state (not persisted)
│   ├── rules/                     # pure business functions, no DOM/localStorage
│   │   ├── module-access.js
│   │   ├── scoring.js
│   │   └── progression.js
│   ├── services/                   # coordinate rules + storage for the UI
│   │   ├── quiz-service.js
│   │   └── progress-service.js
│   ├── views/                       # render screens, call rules/services
│   │   ├── dashboard-view.js
│   │   ├── programme-view.js
│   │   ├── module-view.js
│   │   ├── lesson-view.js
│   │   ├── quiz-view.js
│   │   └── completion-view.js
│   └── components/                    # small reusable render helpers
│       ├── header.js
│       ├── module-card.js
│       ├── progress-bar.js
│       └── status-badge.js
├── docs/
│   ├── architecture.md
│   └── migration-notes.md
├── validation/
│   └── frontend-prototype-check.md
└── README.md
```

## Programme structure

18 modules, in two tiers:

| Tier | Modules | Source |
|---|---|---|
| Company-wide BGCT Evaluation (Days 1–7) | 1–7 | Onboarding Guide v1.0, Section 3 |
| PH/Sales Learning Path (Steps 1–11) | 8–18 | PH/Sales BGCT Handbook v1.0, Section 1 |

Modules 8–18 additionally require a simulated **Team Leader Sign-off**
(PROTOTYPE_ONLY) after the Skill Check is passed, before the next module
unlocks — reflecting the Handbook's requirement that "each step be verified
by team leader sign-off" (Section 1, Checklist).

## Architecture boundaries

- **`rules/`** are pure functions: no DOM access, no `localStorage` access, no
  rendering. They take plain data in and return plain data out.
- **`services/`** coordinate `rules/` and `storage.js` for the UI. The UI never
  calculates an authoritative score, unlock decision, or sign-off state
  itself — it always asks a service.
- **`storage.js`** is the only file allowed to read or write `localStorage`.
- **`views/`** render screens and collect interaction, delegating all logic to
  `rules/`/`services/`.
- **`router.js`** is a minimal hash router with no framework dependency.

## Storage key

All progress is stored under a single versioned `localStorage` key:

```
tosp.prototype.v2
```

(Bumped from `v1` when the programme content was replaced with the sourced
PH/Sales curriculum, so progress recorded against the old generic demo
content is discarded rather than misapplied to different module content
sharing the same ids.) Bump `config.js`'s `storageVersion` again to
invalidate old stored progress shapes in the future.

## Demo reset process

From the Dashboard or the Completion screen, click **Reset Demo Progress** and
confirm the dialog. This removes only the `tosp.prototype.v2` key — no other
site data or files are touched. The next read of progress will start fresh at
Module 1.

## Known production blockers

See [docs/migration-notes.md](docs/migration-notes.md) for the full list and
migration path. In short: no real auth, no backend, no database, client-side
quiz scoring/answers, editable `localStorage`, simulated (not real) sign-off,
no audit log, no real certificate.

## Future upgrade path

See [docs/migration-notes.md](docs/migration-notes.md) for how this maps onto
a React/Next.js + TypeScript + Neon PostgreSQL implementation.
