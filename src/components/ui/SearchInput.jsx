import { Search, X } from 'lucide-react';

export function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <div className="relative w-full max-w-xs">
      <Search
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-faint"
      />
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-hairline bg-panel-raised py-1.5 pl-8 pr-7 text-sm text-text-primary
          placeholder:text-text-faint outline-none transition-colors focus:border-accent/60"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-text-faint transition-colors hover:text-text-primary"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}