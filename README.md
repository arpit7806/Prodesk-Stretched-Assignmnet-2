# ENG-57896 — Dental Office Appointment Calendar

React Calendar Widget for a dental practice's front-desk staff, replacing paper scheduling
sheets and Excel. Built for the **Core Infrastructure Overhaul** epic.

| | |
|---|---|
| Ticket | ENG-57896 |
| Priority | P1 |
| Points | 5 |
| Reporter | Amit Sharma |

## Stack

React 19 + Vite, plain CSS (class-based, no inline styles, no UI framework). State is
local component state only — `useState` / `useEffect` + prop drilling, per the ticket's
constraint. No Redux, no React Router. No real backend — appointment data is seeded
mock data served through a simulated async API in `src/utils/mockApi.js`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint        # oxlint — 0 warnings, 0 errors
npm run build        # production build
```

## Structure

```
src/
  App.jsx                  top-level state, data fetching, layout
  components/
    CalendarGrid.jsx        month grid, date selection, month nav
    AppointmentPanel.jsx     per-day list + composes the states below
    AppointmentForm.jsx      booking form, validation, sanitization
    StatusStates.jsx         LoadingSpinner / EmptyState / ErrorBanner / Toast
    DemoControls.jsx         demo-only toggles for slow/offline conditions
  utils/
    dateHelpers.js           month-grid generation, date formatting
    sanitize.js               strips markup/script patterns from text input
    mockApi.js                 simulated fetch (delay + failure modes)
    analytics.js               console telemetry ping
  data/mockAppointments.js    seed data, generated relative to today
```

## Requirements → implementation

**Happy path** — the calendar loads to the current month with today selected; clicking
any day swaps the side panel to that day's appointments and booking form; booking or
cancelling updates the list immediately (no network round-trip on those actions, so
input always feels instant).

**Empty states** — an empty day shows "No appointments scheduled for this day."
instead of a blank panel.

**Bad connectivity** — the initial appointment fetch is simulated with a delay and shows
a spinner (`aria-live="polite"`) while pending. A failed fetch shows an inline error with
a Retry button rather than a blank screen or crash. The **Demo — simulate connectivity**
panel (bottom-right) lets you trigger the slow and failure paths live instead of only via
devtools throttling — worth clicking through before the review.

**Invalid input** — submitting the form with missing fields is blocked client-side;
offending fields get a red border, `aria-invalid`, and an inline message wired up with
`aria-describedby`/`role="alert"` so it's announced, not just visible.

**Accessibility** — every interactive element is a real `<button>`/`<input>`/`<select>`
(keyboard-operable by default, no custom `div` click handlers), all inputs have
associated `<label>`s, the calendar grid uses `role="grid"`/`gridcell` with descriptive
`aria-label`s per day, focus is always visible (`:focus-visible`), there's a skip link,
loading/error regions are `aria-live`, and `prefers-reduced-motion` is respected. Run it
through Lighthouse before submitting — flag anything it catches that isn't listed here.

**Telemetry** — `trackInteraction()` logs `[Analytics] User interacted with React
Calendar Widget — <action>` on the two primary actions (booking, cancelling).

**Security** — `sanitizeInput()` strips tag-like substrings, `javascript:` protocol
strings, and inline event-handler patterns before values reach state. Worth noting in
review: React renders text as text nodes, so it isn't vulnerable to the classic
`<script>` injection either way — this sanitization is defense-in-depth for if this data
ever gets logged, exported, or sent to a real API.

## Known trade-offs

- Calendar days are individually tabbable `<button>`s rather than a roving-tabindex
  grid, so keyboard users tab through every day instead of arrow-keying between them.
  Fine at this scale; would revisit for a full production build.
- No persistence — appointments reset on refresh, since there's no backend in scope
  for this ticket.
