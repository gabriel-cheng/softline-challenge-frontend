export function Input({ label, id, error, className = '', ...props }) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-text-muted">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-md border bg-panel-raised px-3 py-2 text-sm text-text-primary
          placeholder:text-text-faint outline-none transition-colors
          focus:border-accent/60
          ${error ? 'border-danger/50' : 'border-hairline'}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-danger">{error}</p>}
    </div>
  )
}