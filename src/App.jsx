import { useEffect, useState } from 'react';
import './App.css';
import CalendarGrid from './components/CalendarGrid';
import AppointmentPanel from './components/AppointmentPanel';
import DemoControls from './components/DemoControls';
import { Toast } from './components/StatusStates';
import { fetchAppointments } from './utils/mockApi';
import { trackInteraction } from './utils/analytics';
import { getMonthMatrix, formatDateKey, formatMonthLabel } from './utils/dateHelpers';

const today = new Date();
const todayKey = formatDateKey(today);

function App() {
  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selectedDate, setSelectedDate] = useState(today);
  const [appointments, setAppointments] = useState([]);
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error'
  const [errorMessage, setErrorMessage] = useState('');
  const [simulateSlow, setSimulateSlow] = useState(false);
  const [simulateOffline, setSimulateOffline] = useState(false);
  const [retryToken, setRetryToken] = useState(0);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    setStatus('loading');
    setErrorMessage('');

    fetchAppointments({ simulateSlow, simulateOffline })
      .then((data) => {
        if (isCancelled) return;
        setAppointments(data);
        setStatus('success');
      })
      .catch((err) => {
        if (isCancelled) return;
        setErrorMessage(err.message || 'Something went wrong. Please try again.');
        setStatus('error');
      });

    return () => {
      isCancelled = true;
    };
  }, [simulateSlow, simulateOffline, retryToken]);

  useEffect(() => {
    if (!toast) return undefined;
    const timer = setTimeout(() => setToast(null), 3200);
    return () => clearTimeout(timer);
  }, [toast]);

  const monthMatrix = getMonthMatrix(currentMonth.getFullYear(), currentMonth.getMonth());
  const selectedDateKey = formatDateKey(selectedDate);

  const countsByDate = appointments.reduce((acc, appt) => {
    const key = formatDateKey(appt.date);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const appointmentsForSelectedDate = appointments
    .filter((appt) => formatDateKey(appt.date) === selectedDateKey)
    .sort((a, b) => a.time.localeCompare(b.time));

  function handlePrevMonth() {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }

  function handleNextMonth() {
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }

  function handleAddAppointment(formValues) {
    const newAppointment = {
      id: `local-${Date.now()}`,
      date: selectedDate,
      time: formValues.time,
      patientName: formValues.patientName,
      reason: formValues.reason,
    };
    setAppointments((prev) => [...prev, newAppointment]);
    trackInteraction('appointment_booked');
    setToast({ id: Date.now(), type: 'success', message: `Booked ${formValues.time} for ${formValues.patientName}.` });
  }

  function handleCancelAppointment(id) {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
    trackInteraction('appointment_cancelled');
    setToast({ id: Date.now(), type: 'info', message: 'Appointment cancelled.' });
  }

  function handleRetry() {
    setRetryToken((t) => t + 1);
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <header className="app-header">
        <div className="app-header__brand">
          <span className="app-header__logo" aria-hidden="true">
            +
          </span>
          <div>
            <h1>Willow Dental Care</h1>
            <p className="app-header__subtitle">Front-desk appointment calendar</p>
          </div>
        </div>
      </header>

      <main id="main-content" className="app-main">
        <CalendarGrid
          monthMatrix={monthMatrix}
          monthLabel={formatMonthLabel(currentMonth)}
          selectedDateKey={selectedDateKey}
          todayKey={todayKey}
          countsByDate={countsByDate}
          onSelectDate={setSelectedDate}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        <AppointmentPanel
          selectedDate={selectedDate}
          status={status}
          errorMessage={errorMessage}
          appointments={appointmentsForSelectedDate}
          onRetry={handleRetry}
          onAddAppointment={handleAddAppointment}
          onCancelAppointment={handleCancelAppointment}
        />
      </main>

      <footer className="app-footer">ENG-57896 · Core Infrastructure Overhaul</footer>

      <DemoControls
        simulateSlow={simulateSlow}
        simulateOffline={simulateOffline}
        onToggleSlow={() => setSimulateSlow((v) => !v)}
        onToggleOffline={() => setSimulateOffline((v) => !v)}
      />

      <Toast toast={toast} />
    </div>
  );
}

export default App;
