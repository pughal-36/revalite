import React from 'react';

function StatsBar({ devices }) {
  const safeDevices = devices || [];

  // Dynamically calculate counts using array.filter().length
  const totalCount = safeDevices.length;
  const workingCount = safeDevices.filter(device => device.status === 'Working').length;
  const needsInspectionCount = safeDevices.filter(device => device.status === 'Needs Inspection').length;
  const recyclableCount = safeDevices.filter(device => device.status === 'Recyclable').length;

  return (
    <section className="stats-bar" aria-label="Device Triage Statistics">
      <div className="stat-item">
        <span className="stat-title">Total Devices</span>
        <span className="stat-number">{totalCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-title">Working</span>
        <span className="stat-number">{workingCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-title">Needs Inspection</span>
        <span className="stat-number">{needsInspectionCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-title">Recyclable</span>
        <span className="stat-number">{recyclableCount}</span>
      </div>
    </section>
  );
}

export default StatsBar;
