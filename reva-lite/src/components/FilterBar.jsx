import React from 'react';

function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange
}) {
  const categories = ["All", "Laptop", "Phone", "Tablet", "Monitor"];
  const statuses = ["All", "Working", "Faulty", "Needs Inspection", "Recyclable"];

  return (
    <div className="filter-bar-container">
      <div className="filter-group">
        <label htmlFor="category-select" className="filter-label">Category</label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="filter-select"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="status-select" className="filter-label">Status</label>
        <select
          id="status-select"
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="filter-select"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FilterBar;
