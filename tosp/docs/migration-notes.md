# Migration Notes — Prototype to Production

Status: PROTOTYPE_ONLY. This document maps the current frontend-only
prototype onto a future production stack and lists what must change before
any real onboarding evidence can be recorded.

## Current stack

HTML5 + CSS3 + vanilla JavaScript (ES modules) + `localStorage`.

## Target stack

React or Next.js + TypeScript + Neon PostgreSQL (+ a real authentication
provider and a backend API layer).

## Mapping

| Prototype (today)                          | Production target                                             |
|---------------------------------------------|-----------------------------------------------------------------|
| `views/*.js` (string-templated screens)     | React components / Next.js pages                                |
| `rules/*.js` (pure functions)               | TypeScript domain rules — same pure-function shape, ported 1:1 |
| `services/*.js` (coordination layer)        | Server services / API route handlers (e.g. `/api/quiz/submit`) |
| `storage.js` + `localStorage`               | PostgreSQL repositories (`learner_progress`, `quiz_attempts` tables) |
| `DEMO_LEARNER` (single hard-coded identity) | Real authenticated identity (SSO / auth provider session)       |
| Client-side `calculateQuizScore`            | Server-side scoring — client never sees correct answers          |
| `unlockedModuleIds` computed/stored in browser | Backend progression service; unlock decisions made and enforced server-side |
| `router.js` hash routing                    | Next.js file-based routing / React Router with real history API |
| `config.js` constants                       | Environment-driven configuration / admin-managed programme settings |
| `data.js` (`FINAL_TRUTH`, sourced from the two BGCT documents) | Content migrated into the database with the same source citations preserved as an audit trail, editable via an admin/content workflow |
| Simulated Team Leader Sign-off (`progress-service.confirmSignoff`) | Real reviewer workflow: a team-leader-authenticated action recorded server-side against the actual reviewer's identity, not a self-service browser click |

## Migration steps (suggested order)

1. Stand up PostgreSQL (Neon) with tables mirroring the current data model:
   `programmes`, `modules`, `lessons`, `quizzes`, `questions`,
   `learner_progress`, `quiz_attempts`.
2. Port `rules/*.js` to TypeScript with the same pure function signatures —
   they need almost no behavioural change, only typing.
3. Rebuild `services/*.js` as server-side API handlers that call the ported
   rules and read/write PostgreSQL instead of `storage.js`.
4. Replace `DEMO_LEARNER` with a real authenticated session and scope all
   progress queries to the authenticated user.
5. Move quiz correct-answer data out of any client-shipped bundle; only send
   the client questions/options, never `correctOptionId`.
6. Rebuild `views/*.js` and `components/*.js` as React components consuming
   the same service responses (shapes can stay close to today's).
7. Add authorization checks so a learner cannot request another learner's
   progress or a locked module's content from the API directly.
8. Add an audit log table recording every lesson-completion and quiz
   submission event server-side.
9. Retire `tosp.prototype.v2` `localStorage` usage entirely once server-backed
   progress is live; optionally offer a one-time import for continuity.
10. Replace `progress-service.confirmSignoff` (a self-service browser button)
    with a real team-leader-facing review queue/approval action, authenticated
    as the reviewer, not the learner.

## Known production blockers (frontend prototype)

- No real authentication — one hard-coded `Demo Learner`.
- No authorization — anything in the app is reachable by anyone with the URL.
- No backend and no PostgreSQL — all state lives in one browser's
  `localStorage`.
- Skill Check correct answers exist in client-loaded JavaScript
  (`data.js`) and can be read or edited via browser developer tools —
  including the two confidential source documents' content, indirectly.
- `localStorage` itself can be directly edited by the learner (e.g. to mark
  modules unlocked, quizzes passed, or sign-offs confirmed without actually
  earning them).
- The "Team Leader Sign-off" step (Modules 8–18) is **simulated** — a
  self-service browser button, not a real team leader's action. It is not
  verified by anyone other than the learner themselves.
- Progress is not official evidence of onboarding completion.
- No audit log of who did what, when.
- No rate limiting on quiz attempts beyond the client-enforced `maxAttempts`.
- No content approval workflow — `data.js` content ships as-is, though it is
  sourced from and cites the two BGCT documents (see README.md).
- No data retention policy — progress persists indefinitely in the browser
  until manually reset or the browser's storage is cleared.
- No real certificate is issued on completion — the completion screen is a
  browser-rendered summary only.
- The prototype's per-module Skill Check passing percentage (`config.js`,
  80%) and max attempts (3) are not stated in either source document — they
  are prototype defaults, distinct from the source's own whole-programme
  score-band and monthly probation-gate model (see the Dashboard's
  "Programme & Source Reference" panel).
