import { CATEGORIES, STATUSES } from '../data/devices';

export default function FilterBar({ category, status, onCategoryChange, onStatusChange, resultCount }) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="filter-category" className="filter-label">Category</label>
        <select
          id="filter-category"
          className="filter-select"
          value={category}
          onChange={e => onCategoryChange(e.target.value)}
        >
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="filter-status" className="filter-label">Status</label>
        <select
          id="filter-status"
          className="filter-select"
          value={status}
          onChange={e => onStatusChange(e.target.value)}
        >
          {STATUSES.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="filter-result-count" aria-live="polite">
        {resultCount} device{resultCount !== 1 ? 's' : ''} found
      </div>
    </div>
  );
}
