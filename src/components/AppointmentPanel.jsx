import AppointmentForm from './AppointmentForm';
import { LoadingSpinner, EmptyState, ErrorBanner } from './StatusStates';
import { formatFriendlyDate } from '../utils/dateHelpers';
import './AppointmentPanel.css';

function AppointmentPanel({
  selectedDate,
  status,
  errorMessage,
  appointments,
  onRetry,
  onAddAppointment,
  onCancelAppointment,
}) {
  const dateLabel = formatFriendlyDate(selectedDate);

  return (
    <section className="appt-panel" aria-labelledby="appt-panel-heading">
      <h2 id="appt-panel-heading" className="appt-panel__heading">
        {dateLabel}
      </h2>

      <div className="appt-panel__list" aria-live="polite">
        {status === 'loading' && <LoadingSpinner label="Loading appointments…" />}

        {status === 'error' && <ErrorBanner message={errorMessage} onRetry={onRetry} />}

        {status === 'success' && appointments.length === 0 && (
          <EmptyState message="No appointments scheduled for this day." />
        )}

        {status === 'success' && appointments.length > 0 && (
          <ul className="appt-list">
            {appointments.map((appt) => (
              <li key={appt.id} className="appt-list__item">
                <div>
                  <p className="appt-list__time">{appt.time}</p>
                  <p className="appt-list__name">{appt.patientName}</p>
                  <p className="appt-list__reason">{appt.reason}</p>
                </div>
                <button
                  type="button"
                  className="appt-list__cancel"
                  onClick={() => onCancelAppointment(appt.id)}
                  aria-label={`Cancel appointment for ${appt.patientName} at ${appt.time}`}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AppointmentForm selectedDateLabel={dateLabel} onAddAppointment={onAddAppointment} />
    </section>
  );
}

export default AppointmentPanel;
