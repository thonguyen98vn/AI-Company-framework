"use client";
import { useEffect, useState, Fragment } from 'react';
import './globals.css';

const STAGES = [
  'UNINITIALIZED',
  'INITIALIZED',
  'PLANNING',
  'EXECUTING',
  'AUDITING',
  'RELEASING',
  'USER_FEEDBACK'
];

export default function Home() {
  const [data, setData] = useState({ state: { current_state: 'LOADING...' }, events: [] });
  const [reports, setReports] = useState([]);
  const [roadmap, setRoadmap] = useState([]);
  const [selectedTransitionState, setSelectedTransitionState] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/agents');
      const json = await res.json();
      if (json.success) {
        setData({ state: json.state, events: json.events });
      }
    } catch (e) {
      console.error('Error fetching agent state/events:', e);
    }
  };

  const fetchReports = async () => {
    try {
      const res = await fetch('/api/reports');
      const json = await res.json();
      if (json.success) {
        setReports(json.reports);
      }
    } catch (e) {
      console.error('Error fetching audit reports:', e);
    }
  };

  const fetchRoadmap = async () => {
    try {
      const res = await fetch('/api/roadmap');
      const json = await res.json();
      if (json.success) {
        setRoadmap(json.phases);
      }
    } catch (e) {
      console.error('Error fetching decadal roadmap:', e);
    }
  };

  useEffect(() => {
    async function initData() {
      setLoading(true);
      await Promise.all([fetchData(), fetchReports(), fetchRoadmap()]);
      setLoading(false);
    }

    initData();
    const interval = setInterval(() => {
      fetchData();
      fetchReports();
      fetchRoadmap();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleEventAction = async (type, desc, target = 'All') => {
    setActionLoading(true);
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'event',
          type,
          desc,
          emitter: 'Dashboard',
          target
        })
      });
      const json = await res.json();
      if (json.success) {
        await Promise.all([fetchData(), fetchReports(), fetchRoadmap()]);
      } else {
        alert(`Error triggering event: ${json.error}`);
      }
    } catch (e) {
      console.error('Action failed:', e);
    } finally {
      setActionLoading(false);
    }
  };

  const handleTransitionAction = async () => {
    if (!selectedTransitionState) return;
    setActionLoading(true);
    try {
      const res = await fetch('/api/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'transition',
          to: selectedTransitionState,
          reason: 'Manual transition triggered from Web Dashboard'
        })
      });
      const json = await res.json();
      if (json.success) {
        setSelectedTransitionState('');
        await Promise.all([fetchData(), fetchReports(), fetchRoadmap()]);
      } else {
        alert(`Error transitioning state: ${json.error}`);
      }
    } catch (e) {
      console.error('Transition failed:', e);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="spinner"></div>
        <p>Initializing AI Company Framework...</p>
      </main>
    );
  }

  const { state, events } = data;
  const currentStageIndex = STAGES.indexOf(state.current_state);

  return (
    <main className="dashboard-main">
      <div className="bg-gradients">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="content-wrapper">
        <header className="header-glass">
          <h1>⚡ AI Company Dashboard</h1>
          <div className="status-indicator">
            <span className="pulse"></span>
            LIVE
          </div>
        </header>

        {/* Stepper container */}
        <div className="stepper-container">
          {STAGES.map((stage, index) => {
            const isCompleted = currentStageIndex > index;
            const isActive = state.current_state === stage;
            return (
              <Fragment key={stage}>
                <div className={`step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                  <div className="step-circle">{isCompleted ? '✓' : index + 1}</div>
                  <div className="step-label">{stage.replace('_', ' ')}</div>
                </div>
                {index < STAGES.length - 1 && (
                  <div className={`step-divider ${isCompleted ? 'completed' : ''}`} />
                )}
              </Fragment>
            );
          })}
        </div>

        <div className="grid-layout">
          <div>
            <section className="glass-card state-card">
              <h2>Project Core State</h2>
              <div className="state-display">
                <div className="state-badge">{state.current_state}</div>
              </div>
              <p className="state-desc">The high-level operational phase of your AI workforce.</p>
              
              <div className="mini-stats">
                <div className="stat-box">
                  <span className="stat-label">Total Events</span>
                  <span className="stat-value">{events.length}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">Active Agents</span>
                  <span className="stat-value">4</span>
                </div>
              </div>
            </section>

            {/* Actions Card */}
            <section className="glass-card actions-card">
              <h2>Interactive Control Center</h2>
              <div className="actions-grid">
                <button 
                  className="btn-action" 
                  disabled={actionLoading}
                  onClick={() => handleEventAction('AUDIT_REQ', 'Quality assurance audit requested from Dashboard UI')}
                >
                  🔍 Trigger Audit
                </button>
                <button 
                  className="btn-action" 
                  disabled={actionLoading}
                  onClick={() => handleEventAction('HANDOFF_REQ', 'Handoff to Coder requested from Dashboard UI', 'Coder')}
                >
                  💻 Handoff to Coder
                </button>
                <button 
                  className="btn-action" 
                  disabled={actionLoading}
                  onClick={() => handleEventAction('FEEDBACK_RECEIVED', 'User feedback received from Dashboard UI')}
                >
                  💬 Collect Feedback
                </button>
                
                <div style={{ display: 'flex', gap: '0.5rem', gridColumn: '1 / -1', marginTop: '0.5rem' }}>
                  <select 
                    value={selectedTransitionState} 
                    onChange={(e) => setSelectedTransitionState(e.target.value)}
                    style={{
                      flexGrow: 1,
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-color)',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '0.85rem'
                    }}
                  >
                    <option value="">-- Transition To State --</option>
                    {STAGES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button 
                    className="btn-action" 
                    disabled={actionLoading || !selectedTransitionState}
                    onClick={handleTransitionAction}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    🔄 Dispatch
                  </button>
                </div>
              </div>
            </section>
          </div>

          <section className="glass-card events-card">
            <h2>Event Log Stream</h2>
            {events.length === 0 ? (
              <div className="empty-state">No events logged yet. Trigger the workflow!</div>
            ) : (
              <div className="events-stream">
                {events.slice().reverse().map((ev, i) => (
                  <div key={i} className="event-item">
                    <div className="event-time">
                      {ev.timestamp ? new Date(ev.timestamp).toLocaleTimeString() : 'N/A'}
                    </div>
                    <div className="event-content">
                      <div className="event-type-row">
                        <span className={`event-type type-${ev.type.toLowerCase()}`}>{ev.type}</span>
                        <span className="event-status">{ev.status}</span>
                      </div>
                      <div className="event-routing">
                        <span className="role-chip">{ev.emitter_role}</span>
                        <span className="arrow">➔</span>
                        <span className="role-chip">{ev.target_role}</span>
                      </div>
                      <div className="event-desc">{ev.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Compliance Audit Reports Card */}
          <section className="glass-card reports-card">
            <h2>Compliance Audit Reports</h2>
            {reports.length === 0 ? (
              <div className="empty-state">No audit reports generated yet. Run an audit to generate one!</div>
            ) : (
              <div className="reports-list">
                {reports.map((rep, idx) => (
                  <div key={idx} className="report-item-card">
                    <div className="report-header">
                      <span className="report-date">{rep.filename.replace('-audit.md', '')}</span>
                      <span className={`badge-status ${rep.status.toLowerCase()}`}>
                        {rep.status}
                      </span>
                    </div>
                    <div>
                      <div className="report-violations-title">
                        Violations Found: {rep.violationsCount}
                      </div>
                      {rep.violations && rep.violations.length > 0 && (
                        <ul className="violations-list" style={{ marginTop: '0.5rem' }}>
                          {rep.violations.map((vio, vidx) => (
                            <li key={vidx}>{vio}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* 10-Year Strategic Roadmap */}
          <section className="glass-card reports-card">
            <h2>10-Year Decadal Roadmap Progress</h2>
            {roadmap.length === 0 ? (
              <div className="empty-state">No decadal roadmap found. Define strategy-10y.md!</div>
            ) : (
              <div className="reports-list" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))' }}>
                {roadmap.map((phase, idx) => {
                  const isCurrent = phase.status === 'IN_PROGRESS';
                  const isCompleted = phase.status === 'COMPLETED';
                  
                  return (
                    <div 
                      key={idx} 
                      className="report-item-card"
                      style={{
                        borderLeft: isCurrent ? '4px solid var(--accent-color)' : (isCompleted ? '4px solid var(--success)' : '4px solid #475569'),
                        boxShadow: isCurrent ? '0 0 15px rgba(59, 130, 246, 0.2)' : 'none'
                      }}
                    >
                      <div className="report-header">
                        <span className="report-date" style={{ fontSize: '1.05rem', color: '#f8fafc' }}>
                          {phase.years} • {phase.title}
                        </span>
                        <span 
                          className="badge-status"
                          style={{
                            background: isCurrent ? 'rgba(59, 130, 246, 0.2)' : (isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.05)'),
                            color: isCurrent ? 'var(--accent-color)' : (isCompleted ? 'var(--success)' : '#94a3b8'),
                            border: isCurrent ? '1px solid rgba(59, 130, 246, 0.3)' : (isCompleted ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(255,255,255,0.1)'),
                            fontSize: '0.75rem',
                            fontWeight: '700',
                            padding: '0.25rem 0.6rem',
                            borderRadius: '20px'
                          }}
                        >
                          {phase.status}
                        </span>
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.5rem' }}>
                          <strong>Focus:</strong> {phase.focus}
                        </div>
                        {phase.milestones && phase.milestones.length > 0 && (
                          <ul className="violations-list" style={{ marginTop: '0.5rem' }}>
                            {phase.milestones.map((mil, midx) => (
                              <li 
                                key={midx}
                                style={{
                                  borderLeft: isCompleted ? '2px solid var(--success)' : (isCurrent ? '2px solid var(--accent-color)' : '2px solid #475569'),
                                  fontSize: '0.8rem',
                                  color: '#cbd5e1',
                                  paddingLeft: '0.5rem',
                                  background: 'rgba(255, 255, 255, 0.03)',
                                  padding: '0.4rem 0.6rem',
                                  borderRadius: '6px',
                                  marginBottom: '0.25rem'
                                }}
                              >
                                {mil}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
