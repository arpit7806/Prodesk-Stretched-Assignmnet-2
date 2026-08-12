# Prompts Log — ENG-57896

## Prompt 1
**Used for:** Full project scaffold + implementation — calendar grid, appointment
booking/cancel flow, empty/loading/error states, accessibility, telemetry logging,
input sanitization.

**Prompt given to the assistant:** the full ENG-57896 ticket (Slack context, TRD,
DoD checklist), asking for a ready-to-run Vite + React build following the stated
constraints (useState/useEffect/prop drilling only, monochrome design system).

**What the assistant produced:** the project in this repo — scaffold, all components,
styles, utils, and this documentation. Verified with `npm run lint` (0 warnings) and
`npm run build` (clean) before handoff.

**Still to do:** review the implementation notes in the README, walk through
`App.jsx` and `AppointmentForm.jsx` in particular, and note here what you changed
or would explain differently in review.
