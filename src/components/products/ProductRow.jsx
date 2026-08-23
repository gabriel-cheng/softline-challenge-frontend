import { TableRow, TableCell } from '../table/Table'
import { Button } from '../ui/Button'
import { CodeChip } from '../ui/CodeChip';

export function ProductRow({ product, onEdit, onDelete, isDeleting }) {
  return (
    <TableRow>
      <TableCell>
        <CodeChip code={product.code} />
      </TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell className="font-mono text-text-muted">{product.barCode}</TableCell>
      <TableCell align="right" className="font-mono">
        {product.grossWeight}
      </TableCell>
      <TableCell align="right" className="font-mono">
        {product.netWeight}
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
  );
}
