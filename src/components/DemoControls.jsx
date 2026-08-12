import './DemoControls.css';

/**
 * QA / demo aid so the "spotty connection" edge cases can be shown live
 * during review instead of only via devtools throttling. In a production
 * build this panel would sit behind a debug flag or be removed.
 */
function DemoControls({ simulateSlow, simulateOffline, onToggleSlow, onToggleOffline }) {
  return (
    <section className="demo-controls" aria-label="Demo: simulate connectivity conditions">
      <p className="demo-controls__label">Demo — simulate connectivity</p>
      <div className="demo-controls__toggles">
        <label className="demo-controls__toggle">
          <input type="checkbox" checked={simulateSlow} onChange={onToggleSlow} />
          Slow 3G
        </label>
        <label className="demo-controls__toggle">
          <input type="checkbox" checked={simulateOffline} onChange={onToggleOffline} />
          Network error
        </label>
      </div>
    </section>
  );
}

export default DemoControls;
