import React, { useState } from 'react';
import Calendar from './calendar.tsx';
import './schedule.css';

interface Event {
  date: string;
  description: string;
}

const Schedule: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [newEventDate, setNewEventDate] = useState('');
  const [newEventDescription, setNewEventDescription] = useState('');

  const handleAddEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (newEventDate && newEventDescription) {
      setEvents([...events, { date: newEventDate, description: newEventDescription }]);
      setNewEventDate('');
      setNewEventDescription('');
    }
  };

  const eventsForSelectedDate = selectedDate
    ? events.filter((event) => event.date === selectedDate)
    : [];

  return (
    <div className="schedule">
      <div className="schedule_container">
        <h1 className="schedule_title">Schedule</h1>
        <div className="schedule_layout">
          <div className="calendar_wrapper">
            <Calendar
              events={events}
              onDateClick={(date) => setSelectedDate(date)}
            />
          </div>
          <div className="event_form">
            <h2 className="event_form_title">Add Event</h2>
            <div className="event_form_fields">
              <input
                type="date"
                value={newEventDate}
                onChange={(e) => setNewEventDate(e.target.value)}
                required
              />
              <input
                type="text"
                value={newEventDescription}
                onChange={(e) => setNewEventDescription(e.target.value)}
                placeholder="Event description"
                required
              />
              <button onClick={handleAddEvent}>Add Event</button>
            </div>
          </div>
        </div>
        {selectedDate && (
          <div className="event_list">
            <h2 className="event_list_title">Events for {selectedDate}</h2>
            {eventsForSelectedDate.length > 0 ? (
              <ul className="event_list_items">
                {eventsForSelectedDate.map((event, index) => (
                  <li key={index}>{event.description}</li>
                ))}
              </ul>
            ) : (
              <p className="event_list_empty">No events for this date.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;