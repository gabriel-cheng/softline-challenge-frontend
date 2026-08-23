import { Link } from 'react-router-dom';

export function OptionCard({ to, title, description, icon }) {
  return (
    <Link
      to={to}
      className="group flex flex-col gap-3 rounded-lg border border-hairline bg-panel p-6
        transition-colors hover:border-accent/50 hover:bg-panel-raised"
    >
      <div className="flex items-center gap-3">
        {icon && (
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-hairline bg-panel-raised text-accent">
            {icon}
          </span>
        )}
        <h2 className="text-sm font-semibold text-text-primary">{title}</h2>
      </div>
      {description && <p className="text-xs text-text-muted">{description}</p>}
      <span className="mt-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
        abrir →
      </span>
    </Link>
  );
}