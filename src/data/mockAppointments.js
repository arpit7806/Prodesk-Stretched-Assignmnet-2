function addDays(base, days) {
  const date = new Date(base);
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * Seed data, generated relative to "today" so the demo always shows
 * relevant appointments no matter when it's opened.
 */
export function createMockAppointments() {
  const today = new Date();

  return [
    { id: 'seed-1', date: addDays(today, 0), time: '09:30', patientName: 'Riya Kapoor', reason: 'Routine cleaning' },
    { id: 'seed-2', date: addDays(today, 0), time: '11:00', patientName: 'Karan Mehta', reason: 'Cavity filling' },
    { id: 'seed-3', date: addDays(today, 2), time: '14:00', patientName: 'Ananya Singh', reason: 'Root canal follow-up' },
    { id: 'seed-4', date: addDays(today, 5), time: '10:15', patientName: 'Vivaan Joshi', reason: 'Braces adjustment' },
  ];
}
