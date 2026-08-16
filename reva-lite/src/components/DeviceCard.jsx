import React from 'react';

function DeviceCard({ device, isSelected, onSelect }) {
  const statusClass = `status-badge badge-${device.status.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      className={`device-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(device)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(device);
        }
      }}
    >
      <div className="card-header">
        <h3 className="card-title">{device.name}</h3>
        <span className={statusClass}>{device.status}</span>
      </div>
      <div className="card-body">
        <div className="card-meta">
          <span className="meta-label">Category:</span>
          <span className="meta-value">{device.category}</span>
        </div>
        <div className="card-meta">
          <span className="meta-label">Location:</span>
          <span className="meta-value">{device.location}</span>
        </div>
        <div className="card-meta">
          <span className="meta-label">Condition:</span>
          <span className="meta-value">{device.condition}</span>
        </div>
        <div className="card-meta">
          <span className="meta-label">Last Inspected:</span>
          <span className="meta-value">{device.lastInspected}</span>
        </div>
      </div>
    </div>
  );
}

export default DeviceCard;
