import React, { useState } from 'react';

function InspectionForm({ device, onSubmit, onCancel }) {
  const [condition, setCondition] = useState(device.condition || 'Good');
  const [status, setStatus] = useState(device.status || 'Needs Inspection');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      id: device.id,
      condition,
      status,
      notes
    });
  };

  return (
    <form onSubmit={handleSubmit} className="inspection-form">
      <h3 className="form-title">Inspect Device</h3>
      
      <div className="form-info-row">
        <span className="info-label font-bold">Device Name:</span>
        <span className="info-value font-bold text-highlight">{device.name}</span>
      </div>

      <div className="form-field">
        <label htmlFor="condition-select" className="form-label">Condition</label>
        <select
          id="condition-select"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="form-input-select"
          required
        >
          <option value="Good">Good</option>
          <option value="Fair">Fair</option>
          <option value="Poor">Poor</option>
          <option value="Non-functional">Non-functional</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="status-outcome-select" className="form-label">Inspection Outcome</label>
        <select
          id="status-outcome-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="form-input-select"
          required
        >
          <option value="Working">Working</option>
          <option value="Faulty">Faulty</option>
          <option value="Recyclable">Recyclable</option>
          <option value="Needs Inspection">Needs Inspection</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="notes-textarea" className="form-label">Notes</label>
        <textarea
          id="notes-textarea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Enter audit notes or hardware findings..."
          className="form-input-textarea"
          rows="3"
        />
      </div>

      <div className="form-button-group">
        <button type="button" onClick={onCancel} className="btn-cancel">
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          Submit Inspection
        </button>
      </div>
    </form>
  );
}

export default InspectionForm;
