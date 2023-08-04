import React, { useState, useEffect } from 'react';
import './styles/style.css';

const CustomerView = ({ ticketNumber, counters, onTakeNumber, onUpdateCounterStatus }) => {
  const [lastServedTicket, setLastServedTicket] = useState('None');
  const [nowServingTicket, setNowServingTicket] = useState('None');

  const handleTakeNumber = () => {
    onTakeNumber();
  };

  const getLastServedTicket = () => {
    const lastServed = Math.max(
      ...counters.map((counter) => (counter.isServing ? parseInt(counter.servingNumber) : 0))
    );
    return lastServed === 0 ? 'None' : lastServed.toString().padStart(4, '0');
  };

  useEffect(() => {
    onUpdateCounterStatus(counters);

    // Find the latest ticket that is now being served
    const servingTickets = counters.filter((counter) => counter.isServing);
    const latestServingTicket = Math.max(
      ...servingTickets.map((counter) => parseInt(counter.servingNumber))
    );
    setNowServingTicket(latestServingTicket === -Infinity ? 'None' : latestServingTicket.toString().padStart(4, '0'));
  }, [counters, onUpdateCounterStatus]);

  useEffect(() => {
  // Update the last served ticket whenever a new ticket is taken
  setLastServedTicket(getLastServedTicket());
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [counters, ticketNumber]);

  return (
    <div className="customer-view">
       <h2>Customer View</h2>
      <div className="customer-section">

        <p>Now Serving: {nowServingTicket}</p>
        <p>Last Number: {lastServedTicket}</p>
        <button onClick={handleTakeNumber}>Take a Number</button>
      </div>
      <div className="counters-section">
        {counters.map((counter) => (
          <div
            key={counter.id}
            className={`counter ${counter.isOnline ? (counter.isServing ? 'red' : 'green') : 'gray'}`}
            onClick={() => (counter.isServing ? null : handleTakeNumber())}
          >
            <div className={`dot ${counter.isServing ? 'red' : counter.isOnline ? 'green' : 'gray'}`} />
            {counter.isServing ? (
              <span>Currently Serving: {counter.servingNumber}</span>
            ) : (
              <span>Status: {counter.isOnline ? 'Online' : 'Offline'}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerView;
