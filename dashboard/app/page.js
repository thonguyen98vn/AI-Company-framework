"use client";

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stateData, setStateData] = useState({ state: 'LOADING' });
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [stateRes, eventsRes] = await Promise.all([
          fetch('/api/state'),
          fetch('/api/events')
        ]);
        
        const stateJson = await stateRes.json();
        const eventsJson = await eventsRes.json();
        
        if (stateRes.ok) setStateData(stateJson);
        if (eventsRes.ok) setEvents(eventsJson.events || []);
      } catch (e) {
        console.error('Failed to fetch data', e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    // Poll every 5 seconds
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div className="dashboard-container"><div className="header"><h1>Loading...</h1></div></div>;
  }

  const statusClass = stateData.state.toLowerCase();

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>AI Company Dashboard</h1>
        <div className={`status-badge ${statusClass}`}>
          System State: {stateData.state}
        </div>
      </header>

      <main className="grid">
        <section className="card">
          <h2>Event Log (Live)</h2>
          {events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            <div className="event-list">
              {events.slice().reverse().map((ev) => (
                <div key={ev.id} className={`event-item ${ev.status}`}>
                  <div className="event-header">
                    <span>{ev.timestamp}</span>
                    <span className="event-roles">{ev.emitter} ➔ {ev.target}</span>
                  </div>
                  <div className="event-desc">
                    <strong>[{ev.type}]</strong> {ev.description}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
