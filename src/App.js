import React, { useState } from 'react';
import './App.css';
import CustomerView from './CustomerView';
import CounterManagerView from './CounterManagerView';

function App() {
  const [counters, setCounters] = useState([
    { id: 1, status: false, currentTicket: null },
    // Add more counters as needed...
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <CustomerView counters={counters} />
      </header>
      <main>
        <CounterManagerView counters={counters} setCounters={setCounters} />
      </main>
    </div>
  );
}

export default App;
