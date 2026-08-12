import { createMockAppointments } from '../data/mockAppointments';

const SEED_APPOINTMENTS = createMockAppointments();

/**
 * Simulates a network call to load appointments. `simulateSlow` and
 * `simulateOffline` let the UI's loading/error states be demoed on
 * demand instead of only in devtools throttling.
 */
export function fetchAppointments({ simulateSlow = false, simulateOffline = false } = {}) {
  const delay = simulateSlow ? 3200 : 650;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (simulateOffline) {
        reject(new Error('Unable to reach the server. Check your connection and try again.'));
        return;
      }
      resolve(SEED_APPOINTMENTS.map((appt) => ({ ...appt })));
    }, delay);
  });
}
