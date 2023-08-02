import React, { useState } from 'react';
import './styles/CounterManagerView.css';

const CounterManagerView = ({ counters, setCounters }) => {
  const handleToggleStatus = (counterId) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === counterId
          ? {
              ...counter,
              status: !counter.status,
              currentTicket: !counter.status ? 'A001' : null, // Assign a default ticket number when toggling online
            }
          : counter
      )
    );
  };

  const handleAssignTicket = (counterId, ticketNumber) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === counterId ? { ...counter, currentTicket: ticketNumber } : counter
      )
    );
  };

  return (
    <div className="counter-manager-view">
      <h2>Counter Manager View</h2>
      <div className="counters">
        {counters.map((counter) => (
          <div key={counter.id} className={`counter ${counter.status ? 'online' : 'offline'}`}>
            <span className={`dot ${counter.status ? 'red' : 'green'}`} />
            <p>{counter.status ? counter.currentTicket || 'Offline' : 'Offline'}</p>
            <div>
              <button onClick={() => handleToggleStatus(counter.id)}>
                {counter.status ? 'Offline' : 'Online'}
              </button>
              <input
                type="text"
                placeholder="Ticket Number"
                value={counter.currentTicket || ''}
                onChange={(e) => handleAssignTicket(counter.id, e.target.value)}
                disabled={!counter.status}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterManagerView;
