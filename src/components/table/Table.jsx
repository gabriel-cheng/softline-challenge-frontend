export function Table({ children }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-hairline">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  )
}

export function TableHead({ children }) {
  return (
    <thead className="bg-panel-raised">
      <tr>{children}</tr>
    </thead>
  )
}

export function TableHeaderCell({ children, align = 'left' }) {
  return (
    <th
      className={`border-b border-hairline px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-muted
        ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {children}
    </th>
  )
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-hairline-soft">{children}</tbody>
}

export function TableRow({ children, className = '' }) {
  return (
    <tr className={`group transition-colors hover:bg-panel-raised/60 ${className}`}>
      {children}
    </tr>
  )
}

export function TableCell({ children, align = 'left', className = '' }) {
  return (
    <td
      className={`px-4 py-3 text-text-primary
        ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'} ${className}`}
    >
      {children}
    </td>
  )
}
