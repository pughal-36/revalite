import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const CONDITIONS  = ['Excellent', 'Good', 'Fair', 'Poor', 'Very Poor'];
const OUTCOMES    = ['Cleared for Use', 'Needs Repair', 'Schedule Disposal', 'Monitor Closely'];

export default function InspectionForm({ device, onSubmit, onCancel }) {
  const overlayRef = useRef();
  const panelRef = useRef();

  useGSAP(() => {
    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
    gsap.fromTo(panelRef.current, 
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.2)" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(panelRef.current, { y: 40, opacity: 0, scale: 0.95, duration: 0.2, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, onComplete: onCancel });
  };

  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    inspectorName: '',
    date: today,
    condition: device?.condition || 'Fair',
    outcome: 'Cleared for Use',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    // In a real app this would persist the result.
    // Here we show a success state and call onSubmit after a short delay.
    setTimeout(() => {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, onComplete: () => onSubmit({ device, ...form }) });
    }, 1500);
  }

  if (submitted) {
    return (
      <div className="overlay" role="dialog" aria-modal="true" ref={overlayRef}>
        <div className="detail-panel form-panel glass-elevated">
          <div className="form-success">
            <span className="success-icon" aria-hidden="true">✅</span>
            <h2>Inspection Logged</h2>
            <p>Record saved for <strong>{device?.name}</strong>.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overlay" role="dialog" aria-modal="true" aria-label="Inspection form" ref={overlayRef}>
      <div className="detail-panel form-panel glass-elevated" ref={panelRef}>
        {/* Header */}
        <div className="detail-header">
          <div>
            <h2 className="detail-title">Log Inspection</h2>
            <p className="detail-subtitle">{device?.name}</p>
          </div>
          <button className="close-btn" onClick={handleClose} aria-label="Cancel" type="button">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="inspection-form" noValidate>
          <div className="form-group">
            <label htmlFor="inspectorName" className="field-label">Inspector Name *</label>
            <input
              id="inspectorName"
              name="inspectorName"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={form.inspectorName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date" className="field-label">Inspection Date *</label>
              <input
                id="date"
                name="date"
                type="date"
                className="form-input"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="condition" className="field-label">Observed Condition</label>
              <select
                id="condition"
                name="condition"
                className="filter-select form-input"
                value={form.condition}
                onChange={handleChange}
              >
                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="outcome" className="field-label">Recommended Outcome</label>
            <select
              id="outcome"
              name="outcome"
              className="filter-select form-input"
              value={form.outcome}
              onChange={handleChange}
            >
              {OUTCOMES.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes" className="field-label">Notes</label>
            <textarea
              id="notes"
              name="notes"
              className="form-input form-textarea"
              placeholder="Describe findings, issues, or observations…"
              value={form.notes}
              onChange={handleChange}
              rows={4}
            />
          </div>

          <div className="detail-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!form.inspectorName.trim()}
            >
              Submit Inspection
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
