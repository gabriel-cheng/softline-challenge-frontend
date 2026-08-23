import { useState } from 'react';
import { useCustomers } from '../../hooks/useCustomers';
import { Table, TableHead, TableHeaderCell, TableBody } from '../table/Table';
import { TableSkeleton } from '../ui/TableSkeleton';
import { EmptyState } from '../ui/EmptyState';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import { LiveIndicator } from '../ui/LiveIndicator';
import { CustomersRow } from './CustomersRow';
import { CustomerFormModal } from './CustomerFormModal';

const COLUMNS = ['code', 'name', 'nickname', 'document', 'address', 'actions'];

export function CustomersTable() {
  const { customers, status, error, deletingCode, refetch, removeCustomer, create, update } =
    useCustomers();

  const [pendingDelete, setPendingDelete] = useState(null);
  const [formState, setFormState] = useState({ mode: null, customer: null });

  async function handleConfirmDelete() {
    await removeCustomer(pendingDelete.code);
    setPendingDelete(null);
  }

  function handleFormSubmit(payload) {
    return formState.mode === 'edit'
      ? update(formState.customer.code, payload)
      : create(payload);
  }

  return (
    <section className="w-full">
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold tracking-wide text-text-primary">
            Customers
          </h1>
          <LiveIndicator />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={refetch}>
            refresh
          </Button>
          <Button
            variant="primary"
            onClick={() => setFormState({ mode: 'create', customer: null })}
          >
            + create
          </Button>
        </div>
      </header>

      <Table>
        <TableHead>
          {COLUMNS.map((col) => (
            <TableHeaderCell key={col} align={col === 'actions' ? 'center' : 'left'}>
              {col}
            </TableHeaderCell>
          ))}
        </TableHead>
        <TableBody>
          {status === 'loading' && <TableSkeleton columns={COLUMNS.length} />}

          {status === 'ready' && customers.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length}>
                <EmptyState
                  title="No customers yet"
                  description="Create your first customer to see it listed here."
                  action={
                    <Button
                      variant="primary"
                      onClick={() => setFormState({ mode: 'create', customer: null })}
                    >
                      + create
                    </Button>
                  }
                />
              </td>
            </tr>
          )}

          {status === 'ready' &&
            customers.map((customer) => (
              <CustomersRow
                key={customer.code}
                customer={customer}
                onEdit={(c) => setFormState({ mode: 'edit', customer: c })}
                onDelete={setPendingDelete}
                isDeleting={deletingCode === customer.code}
              />
            ))}
        </TableBody>
      </Table>

      {status === 'error' && (
        <div className="mt-4 rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          Couldn't load customers{error?.message ? `: ${error.message}` : '.'}{' '}
          <button onClick={refetch} className="underline underline-offset-2 hover:text-text-primary">
            Try again
          </button>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={`Delete customer ${pendingDelete ? String(pendingDelete.code).padStart(3, '0') : ''}?`}
        description="This action can't be undone."
        confirmLabel="Delete"
        variant="danger"
        loading={deletingCode === pendingDelete?.code}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <CustomerFormModal
        open={formState.mode !== null}
        mode={formState.mode}
        customer={formState.customer}
        onClose={() => setFormState({ mode: null, customer: null })}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
}