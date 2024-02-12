import React from 'react';
import '../App.css';

function formatarData(data) {
  const options = { day: '2-digit', month: '2-digit' };
  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(data));
}

function EventList({ events, onRemoveEvent }) {
  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id} className="event-list-item">
          <div className="event-image" style={{ backgroundImage: `url(${event.imageUrl})` }}></div>
          
          <div className="event-details">
            <div className="event-header">
              <h3>{formatarData(event.date)}</h3>
              <h3>{event.name}</h3>
              <button onClick={() => onRemoveEvent(event.id)}>X</button>
            </div>
            <h4 className="event-city">{event.city}</h4>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default EventList;
