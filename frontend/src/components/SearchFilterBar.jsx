const FILTERS = ["All", "Pending", "Completed"];

const SearchFilterBar = ({ search, onSearchChange, status, onStatusChange }) => (
  <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
    <div className="relative flex-1">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks by title or description..."
        className="input pl-9"
      />
    </div>
    <select
      value={status}
      onChange={(e) => onStatusChange(e.target.value)}
      className="input sm:w-44"
    >
      {FILTERS.map((f) => (
        <option key={f} value={f}>
          {f}
        </option>
      ))}
    </select>
  </div>
);

export default SearchFilterBar;
