const VARIANTS = {
  primary:
    'border-accent/40 text-accent bg-accent-soft hover:bg-accent/20 focus-visible:outline-accent',
  warn:
    'border-warn/40 text-warn bg-warn-soft hover:bg-warn/20 focus-visible:outline-warn',
  danger:
    'border-danger/40 text-danger bg-danger-soft hover:bg-danger/20 focus-visible:outline-danger',
  ghost:
    'border-hairline text-text-muted bg-transparent hover:text-text-primary hover:border-text-faint focus-visible:outline-text-muted',
}

const SIZES = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
}

export function Button({
  variant = 'primary',
  size = 'sm',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  children,
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-md border font-medium
        transition-colors duration-150 outline-offset-2
        disabled:opacity-40 disabled:cursor-not-allowed
        ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {loading && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {children}
    </button>
  )
}
