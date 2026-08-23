export function TableSkeleton({ columns, rows = 4 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <tr key={rowIndex} className="border-b border-hairline-soft">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <td key={colIndex} className="px-4 py-3">
              <div className="h-3 w-full max-w-24 animate-pulse rounded bg-panel-raised" />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
