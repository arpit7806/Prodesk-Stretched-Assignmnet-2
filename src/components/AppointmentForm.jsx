import { useState } from 'react';
import { sanitizeInput } from '../utils/sanitize';
import './AppointmentForm.css';

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

function AppointmentForm({ selectedDateLabel, onAddAppointment }) {
  const [patientName, setPatientName] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState({});

  function validate() {
    const nextErrors = {};
    if (!patientName.trim()) nextErrors.patientName = 'Patient name is required.';
    if (!time) nextErrors.time = 'Please choose a time slot.';
    if (!reason.trim()) nextErrors.reason = 'Reason for visit is required.';
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onAddAppointment({
      patientName: sanitizeInput(patientName),
      time,
      reason: sanitizeInput(reason),
    });

    setPatientName('');
    setTime('');
    setReason('');
    setErrors({});
  }

  return (
    <form className="appt-form" onSubmit={handleSubmit} noValidate>
      <h3 className="appt-form__heading">
        New appointment <span className="appt-form__heading-date">— {selectedDateLabel}</span>
      </h3>

      <div className="appt-form__field">
        <label htmlFor="patientName">Patient name</label>
        <input
          id="patientName"
          type="text"
          value={patientName}
          onChange={(event) => setPatientName(event.target.value)}
          className={errors.patientName ? 'appt-form__input appt-form__input--error' : 'appt-form__input'}
          aria-invalid={Boolean(errors.patientName)}
          aria-describedby={errors.patientName ? 'patientName-error' : undefined}
        />
        {errors.patientName && (
          <p id="patientName-error" className="appt-form__error" role="alert">
            {errors.patientName}
          </p>
        )}
      </div>

      <div className="appt-form__field">
        <label htmlFor="time">Time slot</label>
        <select
          id="time"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          className={errors.time ? 'appt-form__input appt-form__input--error' : 'appt-form__input'}
          aria-invalid={Boolean(errors.time)}
          aria-describedby={errors.time ? 'time-error' : undefined}
        >
          <option value="">Select a time</option>
          {TIME_SLOTS.map((slot) => (
            <option key={slot} value={slot}>
              {slot}
            </option>
          ))}
        </select>
        {errors.time && (
          <p id="time-error" className="appt-form__error" role="alert">
            {errors.time}
          </p>
        )}
      </div>

      <div className="appt-form__field">
        <label htmlFor="reason">Reason for visit</label>
        <textarea
          id="reason"
          rows={3}
          value={reason}
          onChange={(event) => setReason(event.target.value)}
          className={errors.reason ? 'appt-form__input appt-form__input--error' : 'appt-form__input'}
          aria-invalid={Boolean(errors.reason)}
          aria-describedby={errors.reason ? 'reason-error' : undefined}
        />
        {errors.reason && (
          <p id="reason-error" className="appt-form__error" role="alert">
            {errors.reason}
          </p>
        )}
      </div>

      <button type="submit" className="appt-form__submit">
        Book appointment
      </button>
    </form>
  );
}

export default AppointmentForm;
