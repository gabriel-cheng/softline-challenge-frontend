import { TableRow, TableCell } from '../table/Table'
import { Button } from '../ui/Button'
import { ProductCodeChip } from './ProductCodeChip'

export function ProductRow({ product, onEdit, onDelete, isDeleting }) {
  return (
    <TableRow>
      <TableCell>
        <ProductCodeChip code={product.code} />
      </TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell className="font-mono text-text-muted">{product.bar_code}</TableCell>
      <TableCell align="right" className="font-mono">
        {product.gross_weight}
      </TableCell>
      <TableCell align="right" className="font-mono">
        {product.net_weight}
      </TableCell>
      <TableCell align="center">
        <div className="flex items-center justify-center gap-2">
          <Button variant="warn" onClick={() => onEdit(product)}>
            update
          </Button>
          <Button
            variant="danger"
            loading={isDeleting}
            onClick={() => onDelete(product)}
          >
            delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
