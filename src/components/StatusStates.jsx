import './StatusStates.css';

export function LoadingSpinner({ label = 'Loading…' }) {
  return (
    <div className="status-state status-state--loading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <p>{label}</p>
    </div>
  );
}

export function EmptyState({ message }) {
  return (
    <div className="status-state status-state--empty">
      <svg
        className="status-state__icon"
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M3 10h18M8 3v4M16 3v4M8.5 15h7" strokeLinecap="round" />
      </svg>
      <p>{message}</p>
    </div>
  );
}

export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="status-state status-state--error" role="alert">
      <p>{message || 'Something went wrong. Please try again.'}</p>
      <button type="button" className="status-state__retry" onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className={`toast toast--${toast.type}`} role="status" aria-live="polite">
      {toast.message}
    </div>
  );
}
