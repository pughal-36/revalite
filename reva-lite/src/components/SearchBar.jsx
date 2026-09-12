export default function SearchBar({ query, onQueryChange }) {
  return (
    <div className="search-bar">
      <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <circle cx="11" cy="11" r="8"/>
        <path d="M21 21l-4.35-4.35"/>
      </svg>
      <input
        id="device-search"
        type="search"
        className="search-input"
        placeholder="Search by name, location, or serial number…"
        value={query}
        onChange={e => onQueryChange(e.target.value)}
        aria-label="Search devices"
      />
      {query && (
        <button
          className="search-clear"
          onClick={() => onQueryChange('')}
          aria-label="Clear search"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
}
