const TAG_PATTERN = /<[^>]*>?/g;
const JS_PROTOCOL_PATTERN = /javascript:/gi;
const EVENT_HANDLER_PATTERN = /on\w+\s*=/gi;

/**
 * Strips markup and script-triggering patterns from user-entered text
 * before it's stored in state. React already escapes text when rendering
 * (it uses text nodes, not innerHTML), so this isn't fixing a rendering
 * bug — it's defense in depth so the stored value itself stays clean if
 * it's ever logged, exported, or sent to a real API later.
 */
export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';

  return value
    .replace(TAG_PATTERN, '')
    .replace(JS_PROTOCOL_PATTERN, '')
    .replace(EVENT_HANDLER_PATTERN, '')
    .trim();
}
