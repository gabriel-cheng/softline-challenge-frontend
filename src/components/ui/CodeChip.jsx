export function CodeChip({ code, padLength = 3 }) {
  return (
    <span className="inline-flex items-center rounded border border-hairline bg-panel-raised px-2 py-0.5 font-mono text-xs text-text-primary">
      {String(code).padStart(padLength, '0')}
    </span>
  );
}