export default function StatsBar({ devices }) {
  const total       = devices.length;
  const faulty      = devices.filter(d => d.status === 'Faulty').length;
  const forDisposal = devices.filter(d => d.status === 'For Disposal').length;
  const working     = devices.filter(d => d.status === 'Working').length;

  const stats = [
    { label: 'Total Devices', value: total,       icon: '📦', accent: 'stat-blue'    },
    { label: 'Working',        value: working,     icon: '✅', accent: 'stat-green'   },
    { label: 'Faulty',         value: faulty,      icon: '⚠️', accent: 'stat-orange'  },
    { label: 'For Disposal',   value: forDisposal, icon: '🗑️', accent: 'stat-red'    },
  ];

  return (
    <div className="stats-bar" role="region" aria-label="Dashboard statistics">
      {stats.map(s => (
        <div key={s.label} className={`stat-card ${s.accent}`}>
          <span className="stat-icon" aria-hidden="true">{s.icon}</span>
          <div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
