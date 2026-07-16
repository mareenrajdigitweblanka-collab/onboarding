# Accessibility and Text-to-Speech

Status: PROTOTYPE_ONLY. Documents what the built-in accessibility features
and speaker (text-to-speech) controls actually do, their browser support
limits, and what would need to change for a production rollout.

## Text-to-speech: what's supported

Implemented entirely via the browser's native Web Speech API
(`window.speechSynthesis` / `SpeechSynthesisUtterance`) in
`js/services/speech-service.js`. No external dependency, no network request,
no server call — speech happens locally in the learner's browser using
whatever voices that browser/OS provides.

**Supported controls** (`js/components/speaker-control.js`):
- Read Aloud, Pause, Resume, Stop
- Reading speed selector (0.75× / 1× / 1.25× / 1.5×)
- Live status text: "Ready to read." / "Reading…" / "Paused." / "Speech is
  not supported in this browser."

## What is read

Only content explicitly supplied by the view as a plain-text string — never
`document.body.innerText` or a DOM read. This is a deliberate boundary
(`speaker-control.js`'s `getText()` callback) so the spoken content can never
accidentally include navigation, buttons, badges, or unrelated chrome:

| Screen | What's read | What's excluded |
|---|---|---|
| Lesson (`lesson-view.js`) | Lesson title + lesson body content | Source citation, breadcrumb, buttons, progress meta |
| Module (`module-view.js`) | Module title + module summary, only when the learner explicitly presses Read Aloud on that screen | Lesson list, Skill Check status, sign-off panel, source citation |
| Skill Check, pre-submission (`quiz-view.js`) | Quiz title, question count, each question's prompt and answer-option labels, and a short general instruction | **Which option is correct** — the pre-submission speech text is built without ever referencing `correctOptionId`; it is structurally impossible for it to disclose the answer |

**Deliberately not given a speaker control at all:** the Dashboard and the
post-submission "Review Your Answers" panel. The dashboard mixes many
unrelated cards (progress stats, readiness status, module grid, source
reference) that don't form one coherent "read me" narrative, and reading
correctness information after submission was judged out of scope for a
"read the question, not the answer" boundary — the visual review panel
already covers that case.

## Behavior guarantees

- **Never auto-speaks.** Rendering a speaker control never calls
  `speakText()` — only a Read Aloud click does.
- **One utterance at a time.** `speakText()` always calls `stopSpeech()`
  first, so starting a new reading can never overlap a previous one.
- **Route changes cancel speech.** `app.js`'s `mount()` — which every
  navigation and same-route rerender goes through — calls `stopSpeech()`
  and `clearSpeechListeners()` before rendering the next screen.
- **No persistence.** Speech state (`idle`/`reading`/`paused`) lives in a
  module-level variable in `speech-service.js`, the same category as
  `state.js`'s transient quiz-draft state — it is never written to
  `localStorage` and has no connection to learner progress.

## Keyboard operation

All speaker controls are native `<button>`/`<select>` elements — fully
keyboard operable (Tab to focus, Enter/Space to activate, arrow keys on the
rate `<select>`) with no custom key handling required. Button `disabled`
state (e.g. Pause disabled while idle) is reflected to assistive tech
automatically via the native `disabled` attribute.

## Browser support limitations

- `speechSynthesis` support and voice availability vary significantly by
  browser and OS (`getAvailableVoices()` may return an empty list until the
  browser's async `voiceschanged` event fires — this prototype does not wait
  on that event and omits a voice picker for this reason, per the task's own
  "voice selector only when available and stable" guidance).
- In headless/server-rendered or embedded-webview contexts, `speechSynthesis`
  may report as supported but never actually produce audio, or may fire
  `onstart` without ever firing `onend`. The control's Pause/Resume/Stop
  buttons work independently of `onend` (they check `speechSynthesis.speaking`
  / `.paused` directly), so the UI stays correct even in that situation — but
  a learner in such an environment may see "Reading…" persist longer than
  expected.
- iOS Safari and some mobile browsers require the triggering click to be a
  direct user gesture (already satisfied here — Read Aloud is always a
  direct button click) and may cap utterance length or ignore `rate` in some
  older versions.

## Accessibility decisions

- **Skip link**: `<a href="#app-main" class="skip-link">Skip to main
  content</a>`, visually hidden until focused, first focusable element on
  the page.
- **Landmarks**: `<nav aria-label="Primary">` (sidebar), `<header>`
  (mobile top bar), `<main id="app-main" tabindex="-1">`, `<footer>`.
- **Heading order**: exactly one `<h1>` per screen, `<h2>` per panel,
  `<h3>` for sub-groups, never skipping a level (checked in
  `validation/ui-ux-regression-check.md`).
- **Focus visibility**: a single `--focus-ring` token applied via
  `:focus-visible` on every interactive element — never suppressed.
- **No color-only status**: every status badge, module card, and toast
  pairs its color with a text label and a symbol (see
  `docs/ui-design-system.md`, "Component states").
- **Live regions**: quiz results (`role="status" aria-live="polite"` on the
  result panel), the quiz answered-count indicator, the speaker status line,
  and the toast region are all announced without moving focus.
- **Reduced motion**: a global `@media (prefers-reduced-motion: reduce)`
  rule collapses all transitions/animations to near-zero duration.
- **Modal focus handling**: the confirm dialog uses the native `<dialog>`
  element's `showModal()`, which provides focus trapping for free; on close
  (confirm, cancel, or Escape) focus is explicitly returned to whatever
  control opened it (`js/components/confirm-dialog.js`). The mobile nav
  drawer follows the same pattern manually (focus moves to the drawer's
  close button on open, returns to the menu button on close via Escape,
  overlay click, or the close button).
- **Escape-to-close**: works for both the confirm dialog (native `cancel`
  event) and the mobile nav drawer (explicit `keydown` listener scoped to
  while the drawer is open).

## Privacy boundary

Nothing spoken by the speaker control is transmitted anywhere, logged, or
stored — it exists only as an in-memory `SpeechSynthesisUtterance` for the
duration of that single reading. This matches the rest of the prototype's
local-only data boundary (see README.md).

## Production considerations

- A production build should verify target-browser/OS voice availability
  and, if a voice picker is added, wait on `voiceschanged` before
  populating it rather than reading `getVoices()` once.
- Long-form lesson content may benefit from server-side TTS (consistent
  voice quality across browsers) if this prototype's content model moves
  to a real backend — see `docs/migration-notes.md`.
- Consider adding sentence-level highlighting synced to speech for
  low-vision/cognitive-accessibility use cases; not implemented here to
  keep the text-extraction boundary simple (plain string in, no DOM
  correlation back out).
