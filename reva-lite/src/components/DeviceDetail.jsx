import React from 'react';
import InspectionForm from './InspectionForm';

function DeviceDetail({
  device,
  showInspectionForm,
  onClose,
  onInspectClick,
  onInspectSubmit,
  onInspectCancel
}) {
  if (!device) {
    return (
      <div className="device-detail-empty">
        <p className="empty-message">Select a device to view details.</p>
      </div>
    );
  }

  const statusClass = `status-badge badge-${device.status.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="device-detail-container">
      <div className="detail-header">
        <h2 className="detail-header-title">Device Detail</h2>
        <button onClick={onClose} className="btn-close" aria-label="Close details">
          ✕
        </button>
      </div>

      {showInspectionForm ? (
        <InspectionForm
          device={device}
          onSubmit={onInspectSubmit}
          onCancel={onInspectCancel}
        />
      ) : (
        <div className="detail-content">
          <div className="detail-title-section">
            <h3 className="detail-device-name">{device.name}</h3>
            <span className={statusClass}>{device.status}</span>
          </div>

          <div className="detail-specs-grid">
            <div className="spec-row">
              <span className="spec-label">Category</span>
              <span className="spec-value">{device.category}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Location</span>
              <span className="spec-value">{device.location}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Condition</span>
              <span className="spec-value">{device.condition}</span>
            </div>
            <div className="spec-row">
              <span className="spec-label">Last Inspected</span>
              <span className="spec-value">{device.lastInspected}</span>
            </div>
          </div>

          <div className="detail-actions-section">
            <button onClick={onInspectClick} className="btn-inspect">
              Inspect Device
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DeviceDetail;
