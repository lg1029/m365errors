export default function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ color: 'var(--text-muted)', width: 16, height: 16 }}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      <input
        type="text"
        className="search-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Search by error code or description...'}
      />
    </div>
  )
}
