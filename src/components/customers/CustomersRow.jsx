import { TableRow, TableCell } from '../table/Table';
import { Button } from '../ui/Button';
import { CodeChip } from '../ui/CodeChip';
import { documentMask } from '../../utils/MaskUtils';

export function CustomersRow({ customer, onEdit, onDelete, isDeleting }) {
  return (
    <TableRow>
      <TableCell>
        <CodeChip code={customer.code} />
      </TableCell>
      <TableCell>{customer.name}</TableCell>
      <TableCell className="text-text-muted">{customer.nickname}</TableCell>
      <TableCell className="font-mono text-text-muted">{documentMask(customer.document)}</TableCell>
      <TableCell className="text-text-muted">{customer.address}</TableCell>
      <TableCell align="center">
        <div className="flex items-center justify-center gap-2">
          <Button variant="warn" onClick={() => onEdit(customer)}>
            update
          </Button>
          <Button
            variant="danger"
            loading={isDeleting}
            onClick={() => onDelete(customer)}
          >
            delete
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}