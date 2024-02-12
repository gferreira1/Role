import React, { useState } from 'react';
import '../App.css';

function EventForm({ onAddEvent }) {
  const [eventType, setEventType] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [originCity, setOriginCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');

  const handleTypeChange = (e) => {
    setEventType(e.target.value);
  };

  const handleNameChange = (e) => {
    setEventName(e.target.value);
  };

  const handleOriginCityChange = (e) => {
    setOriginCity(e.target.value);
  };

  const handleDestinationCityChange = (e) => {
    setDestinationCity(e.target.value);
  };

  const handleDateChange = (e) => {
    setEventDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      type: eventType,
      name: eventName,
      date: eventDate,
      originCity: originCity,
      destinationCity: destinationCity,
    };

    onAddEvent(newEvent);

    // Limpe os estados após adicionar o evento
    setEventType('');
    setEventName('');
    setOriginCity('');
    setDestinationCity('');
    setEventDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Tipo de Evento:
        <select value={eventType} onChange={handleTypeChange}>
          <option value="selecione">Selecione...</option>
          <option value="evento">Evento</option>
          <option value="carona">Carona</option>
          {/* Adicione outras opções conforme necessário */}
        </select>
      </label>

      {eventType === 'carona' && (
        <div>
          <label>
            Cidade de Origem:
            <input type="text" value={originCity} onChange={handleOriginCityChange} />
          </label>
          <label>
            Cidade de Destino:
            <input type="text" value={destinationCity} onChange={handleDestinationCityChange} />
          </label>
          <label>
        Data do Eventoss:
        <input type="date" value={eventDate} onChange={handleDateChange} />
      </label>
        </div>
      )}

      {eventType === 'evento' && (
        <div>
          <label>
            Nome do Evento:
            <input type="text" value={eventName} onChange={handleNameChange} />
          </label>
          <label>
            Cidade:
            <input type="text" value={originCity} onChange={handleOriginCityChange} />
          </label>
          <label>
        Data do Eventoss:
        <input type="date" value={eventDate} onChange={handleDateChange} />
      </label>
        </div>
      )}

{eventType === 'selecione' && (
  <div>
    <h1> Olá selecione seu Role... </h1>
  </div>
      
      )}

      

      <button type="submit">Adicionar Evento</button>
    </form>
  );
}

export default EventForm;
