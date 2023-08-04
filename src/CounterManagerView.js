import React from 'react';
import './styles/style.css';

const CounterManagerView = ({ counters, onServeNext, onToggleCounter }) => {
  const handleToggleStatus = (counterId) => {
    onToggleCounter(counterId);
  };



  return (
    <div className="counter-manager-view-container">
      <div className="counter-manager-view">
        <h2>Counter Manager View</h2>
        <div className="counters">
          {counters.map((counter) => (
            <div
              key={counter.id}
              className={`counter ${counter.isOnline ? (counter.isServing ? 'red' : 'green') : 'gray'}`}
              onClick={() => handleToggleStatus(counter.id)} // Always enable the click event
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
    </div>
  );
};

export default CounterManagerView;
