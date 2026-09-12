import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const STATUS_STYLES = {
  'Working':           'badge-green',
  'Faulty':            'badge-orange',
  'For Disposal':      'badge-red',
  'Under Inspection':  'badge-blue',
};

const CONDITION_BAR = {
  'Excellent': { width: '100%', color: '#22c55e' },
  'Good':      { width: '75%',  color: '#86efac' },
  'Fair':      { width: '50%',  color: '#facc15' },
  'Poor':      { width: '30%',  color: '#f97316' },
  'Very Poor': { width: '10%',  color: '#ef4444' },
};

export default function DeviceDetail({ device, onClose, onInspect }) {
  const overlayRef = useRef();
  const panelRef = useRef();

  useGSAP(() => {
    // Entrance animation
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(panelRef.current, 
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
    );
  }, []);

  const handleClose = () => {
    // Exit animation before calling onClose
    gsap.to(panelRef.current, { y: 40, opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onClose });
  };

  if (!device) return null;

  const badgeClass = STATUS_STYLES[device.status] || 'badge-gray';
  const condBar    = CONDITION_BAR[device.condition] || { width: '50%', color: '#94a3b8' };

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Device details" ref={overlayRef}>
      <div className="detail-panel glass-elevated" ref={panelRef}>
        {/* Header */}
        <div className="detail-header">
          <div>
            <h2 className="detail-title">{device.name}</h2>
            <p className="detail-subtitle">{device.category} · {device.serialNumber}</p>
          </div>
          <button className="close-btn" onClick={handleClose} aria-label="Close details" type="button">✕</button>
        </div>

        {/* Status badge */}
        <div className="detail-status-row">
          <span className={`badge ${badgeClass}`}>{device.status}</span>
          <span className="detail-age">{device.age} year{device.age !== 1 ? 's' : ''} old</span>
        </div>

        {/* Info grid */}
        <div className="detail-grid">
          <div className="detail-field">
            <span className="field-label">Location</span>
            <span className="field-value">{device.location}</span>
          </div>
          <div className="detail-field">
            <span className="field-label">Last Inspected</span>
            <span className="field-value">{device.lastInspected}</span>
          </div>
          <div className="detail-field">
            <span className="field-label">Serial Number</span>
            <span className="field-value mono">{device.serialNumber}</span>
          </div>
          <div className="detail-field">
            <span className="field-label">Condition</span>
            <span className="field-value">{device.condition}</span>
          </div>
        </div>

        {/* Condition bar */}
        <div className="condition-section">
          <span className="field-label">Condition Rating</span>
          <div className="condition-track">
            <div
              className="condition-fill"
              style={{ width: condBar.width, backgroundColor: condBar.color }}
              role="progressbar"
              aria-valuenow={condBar.width}
              aria-label={`Condition: ${device.condition}`}
            />
          </div>
          <span className="condition-label">{device.condition}</span>
        </div>

        {/* Notes */}
        <div className="detail-notes">
          <span className="field-label">Notes</span>
          <p className="notes-text">{device.notes}</p>
        </div>

        {/* Actions */}
        <div className="detail-actions">
          <button className="btn btn-primary" onClick={onInspect} type="button">
            📋 Log Inspection
          </button>
          <button className="btn btn-ghost" onClick={handleClose} type="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
