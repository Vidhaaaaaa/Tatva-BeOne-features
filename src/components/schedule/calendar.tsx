import React, { useState } from 'react';
import './calendar.css'

interface CalendarProps {
  events: { date: string; description: string }[];
  onDateClick: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events, onDateClick }) => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  const handleDateClick = (day: number) => {
    const selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateClick(selectedDate);
  };

  const hasEvents = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some((event) => event.date === dateStr);
  };

  return (
    <div className="calendar">
      <div className="navigate_date">
        <h2>{monthsOfYear[currentMonth]}</h2>
        <h2>{currentYear}</h2>
        <div className="buttons">
          <span
            className="material-symbols-outlined"
            onClick={prevMonth}
            role="button"
            aria-label="Previous month"
          >
            chevron_left
          </span>
          <span
            className="material-symbols-outlined"
            onClick={nextMonth}
            role="button"
            aria-label="Next month"
          >
            chevron_right
          </span>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>
      <div className="days">
        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <span key={`empty-${index}`} />
        ))}
        {[...Array(daysInMonth).keys()].map((day) => {
          const isCurrentDay =
            day + 1 === currentDate.getDate() &&
            currentMonth === currentDate.getMonth() &&
            currentYear === currentDate.getFullYear();
          const dateHasEvents = hasEvents(day + 1);
          return (
            <span
              key={day + 1}
              onClick={() => handleDateClick(day + 1)}
              className={isCurrentDay ? 'current_day' : ''}
              aria-current={isCurrentDay ? 'date' : undefined}
            >
              {day + 1}
              {dateHasEvents && <span className="event_indicator" />}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;