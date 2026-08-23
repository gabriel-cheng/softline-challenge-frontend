export function LiveIndicator({ label = 'live' }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-text-faint font-mono">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {label}
    </span>
  )
}
