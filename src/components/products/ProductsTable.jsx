import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Table, TableHead, TableHeaderCell, TableBody } from '../table/Table';
import { TableSkeleton } from '../ui/TableSkeleton';
import { EmptyState } from '../ui/EmptyState';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import { LiveIndicator } from '../ui/LiveIndicator';
import { ProductRow } from './ProductRow';
import { ProductFormModal } from './ProductFormModal';

const COLUMNS = ['code', 'description', 'bar code', 'selling price', 'gross weight', 'net weight', 'actions'];

export function ProductsTable() {
  const { products, status, error, deletingCode, refetch, removeProduct, create, update } =
    useProducts();

  const [pendingDelete, setPendingDelete] = useState(null);
  const [formState, setFormState] = useState({ mode: null, product: null });

  async function handleConfirmDelete() {
    await removeProduct(pendingDelete.code);
    setPendingDelete(null);
  }

  function handleFormSubmit(payload) {
    return formState.mode === 'edit'
      ? update(formState.product.code, payload)
      : create(payload);
  }

  return (
    <section className="w-full">
      <header className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold tracking-wide text-text-primary">
            Products
          </h1>
          <LiveIndicator />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={refetch}>
            refresh
          </Button>
          <Button
            variant="primary"
            onClick={() => setFormState({ mode: 'create', product: null })}
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

          {status === 'ready' && products.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length}>
                <EmptyState
                  title="No products yet"
                  description="Create your first product to see it listed here."
                  action={
                    <Button
                      variant="primary"
                      onClick={() => setFormState({ mode: 'create', product: null })}
                    >
                      + create
                    </Button>
                  }
                />
              </td>
            </tr>
          )}

          {status === 'ready' &&
            products.map((product) => (
              <ProductRow
                key={product.code}
                product={product}
                onEdit={(p) => setFormState({ mode: 'edit', product: p })}
                onDelete={setPendingDelete}
                isDeleting={deletingCode === product.code}
              />
            ))}
        </TableBody>
      </Table>

      {status === 'error' && (
        <div className="mt-4 rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          Couldn't load products{error?.message ? `: ${error.message}` : '.'}{' '}
          <button onClick={refetch} className="underline underline-offset-2 hover:text-text-primary">
            Try again
          </button>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={`Delete product ${pendingDelete ? String(pendingDelete.code).padStart(3, '0') : ''}?`}
        description="This action can't be undone."
        confirmLabel="Delete"
        variant="danger"
        loading={deletingCode === pendingDelete?.code}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <ProductFormModal
        open={formState.mode !== null}
        mode={formState.mode}
        product={formState.product}
        onClose={() => setFormState({ mode: null, product: null })}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
}