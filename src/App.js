import React, { useState } from 'react';
import './App.css';
import CounterManagerView from './CounterManagerView';
import CustomerView from './CustomerView';

const App = () => {
  const [ticketNumber, setTicketNumber] = useState(0);
  const [counters, setCounters] = useState([
    { id: 1, isOnline: true, isServing: false, servingNumber: "Offline", waitingList: [] },
    { id: 2, isOnline: true, isServing: false, servingNumber: "Offline", waitingList: [] },
    { id: 3, isOnline: true, isServing: false, servingNumber: "Offline", waitingList: [] },
    { id: 4, isOnline: true, isServing: false, servingNumber: "Offline", waitingList: [] },
  ]);

  const handleTakeNumber = () => {
    setTicketNumber((prevTicketNumber) => prevTicketNumber + 1);
    const servingCounter = counters.find((counter) => counter.isOnline && !counter.isServing);
    if (servingCounter) {
      setCounters((prevCounters) =>
        prevCounters.map((counter) =>
          counter.id === servingCounter.id
            ? {
                ...counter,
                isServing: true,
                servingNumber: ticketNumber + 1,
                waitingList: [...counter.waitingList, ticketNumber + 1],
              }
            : counter
        )
      );
    }
  };

  const handleServeNext = (counterId) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === counterId
          ? {
              ...counter,
              servingNumber: counter.waitingList.length > 0 ? counter.waitingList[0] : "Offline",
              waitingList: counter.waitingList.slice(1),
            }
          : counter
      )
    );
  };

  const handleToggleCounter = (counterId) => {
    setCounters((prevCounters) =>
      prevCounters.map((counter) =>
        counter.id === counterId
          ? {
              ...counter,
              isOnline: !counter.isOnline,
              isServing: false,
              servingNumber: "Offline",
            }
          : counter
      )
    );
  };

  const updateCounterStatusInCustomerView = (updatedCounters) => {
    setCounters(updatedCounters);
  };

  return (
    <div className="App">
      <CustomerView
        ticketNumber={ticketNumber}
        counters={counters}
        onTakeNumber={handleTakeNumber}
        onUpdateCounterStatus={updateCounterStatusInCustomerView}
      />
      <CounterManagerView
        counters={counters}
        onServeNext={handleServeNext}
        onToggleCounter={handleToggleCounter}
      />
    </div>
  );
};

export default App;
