import { formatDateKey } from '../utils/dateHelpers';
import './CalendarGrid.css';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function CalendarGrid({
  monthMatrix,
  monthLabel,
  selectedDateKey,
  todayKey,
  countsByDate,
  onSelectDate,
  onPrevMonth,
  onNextMonth,
}) {
  return (
    <section className="calendar-card" aria-labelledby="calendar-heading">
      <div className="calendar-card__header">
        <button
          type="button"
          className="calendar-card__nav-btn"
          onClick={onPrevMonth}
          aria-label="Go to previous month"
        >
          &#8249;
        </button>
        <h2 id="calendar-heading" className="calendar-card__month">
          {monthLabel}
        </h2>
        <button
          type="button"
          className="calendar-card__nav-btn"
          onClick={onNextMonth}
          aria-label="Go to next month"
        >
          &#8250;
        </button>
      </div>

      <div className="calendar-card__weekdays" aria-hidden="true">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="calendar-card__weekday">
            {label}
          </span>
        ))}
      </div>

      <div className="calendar-card__grid" role="grid" aria-label={`Days in ${monthLabel}`}>
        {monthMatrix.map((week, weekIndex) => (
          <div className="calendar-card__row" role="row" key={`week-${weekIndex}`}>
            {week.map(({ date, inCurrentMonth }) => {
              const dateKey = formatDateKey(date);
              const count = countsByDate[dateKey] || 0;
              const isSelected = dateKey === selectedDateKey;
              const isToday = dateKey === todayKey;
              const dayLabel = date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              });

              return (
                <button
                  type="button"
                  role="gridcell"
                  key={dateKey}
                  onClick={() => onSelectDate(date)}
                  aria-pressed={isSelected}
                  aria-label={`${dayLabel}${count > 0 ? `, ${count} appointment${count === 1 ? '' : 's'}` : ', no appointments'}`}
                  className={[
                    'calendar-card__day',
                    !inCurrentMonth ? 'calendar-card__day--muted' : '',
                    isSelected ? 'calendar-card__day--selected' : '',
                    isToday ? 'calendar-card__day--today' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="calendar-card__day-number">{date.getDate()}</span>
                  {count > 0 && (
                    <span className="calendar-card__day-badge" aria-hidden="true">
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

export default CalendarGrid;
