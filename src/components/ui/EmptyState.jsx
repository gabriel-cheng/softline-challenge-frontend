export function EmptyState({ title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center">
      <p className="font-mono text-sm text-text-muted">{title}</p>
      {description && <p className="max-w-xs text-xs text-text-faint">{description}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}
