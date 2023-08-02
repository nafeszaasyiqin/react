import React, { useState } from 'react';
import './styles/CustomerView.css';

const CustomerView = ({ counters }) => {
  const [ticketNumber, setTicketNumber] = useState(0);
  const [lastNumber, setLastNumber] = useState(0);

  const handleTakeNumber = () => {
    const newTicketNumber = ticketNumber + 1;
    setTicketNumber(newTicketNumber);
    setLastNumber(newTicketNumber);
  };

  const getLastServedTicket = () => {
    const lastServed = Math.max(...counters.map((counter) => counter.currentTicket || 0));
    return lastServed === 0 ? 'None' : lastServed;
  };

  return (
    <div className="customer-view">
      <div className="customer-section">
        <h2>Customer View</h2>
        <button onClick={handleTakeNumber}>Take a Number</button>
        <p>Now Serving: {getLastServedTicket()}</p>
        <p>Last Number: {lastNumber}</p>
      </div>
      <div className="counters-section">
        {counters.map((counter) => (
          <div key={counter.id} className={`counter ${counter.status ? 'online' : 'offline'}`}>
            <span className={`dot ${counter.status ? 'red' : 'green'}`} />
            <span>{counter.status ? counter.currentTicket || 'Offline' : 'Offline'}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerView;
