import { TableRow, TableCell } from '../table/Table'
import { Button } from '../ui/Button'
import { CodeChip } from '../ui/CodeChip';
import { formatCurrencyDisplay, formatWeightDisplay } from '../../utils/MaskUtils';

export function ProductRow({ product, onEdit, onDelete, isDeleting }) {
  return (
    <TableRow>
      <TableCell>
        <CodeChip code={product.code} />
      </TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell className="font-mono text-text-muted">{product.barCode}</TableCell>
      <TableCell className="font-mono text-text-muted">{formatCurrencyDisplay(product.sellingPrice)}</TableCell>
      <TableCell align="right" className="font-mono">
        {formatWeightDisplay(product.grossWeight)}
      </TableCell>
      <TableCell align="right" className="font-mono">
        {formatWeightDisplay(product.netWeight)}
      </TableCell>
      <TableCell align="center">
        <div className="flex items-center justify-center gap-2">
          <Button variant="warn" onClick={() => onEdit(product)}>
            atualizar
          </Button>
          <Button
            variant="danger"
            loading={isDeleting}
            onClick={() => onDelete(product)}
          >
            deletar
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
