/**
 * Simulated telemetry ping for the analytics NFR. A real integration
 * would call an analytics SDK here instead of logging to the console.
 */
export function trackInteraction(action) {
  // eslint-disable-next-line no-console
  console.log(`[Analytics] User interacted with React Calendar Widget — ${action}`);
}
