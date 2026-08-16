import React from 'react';

function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Search by name, category, or location..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
        aria-label="Search devices"
      />
    </div>
  );
}

export default SearchBar;
