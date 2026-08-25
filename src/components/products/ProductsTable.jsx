import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { Table, TableHead, TableHeaderCell, TableBody } from '../table/Table';
import { TableSkeleton } from '../ui/TableSkeleton';
import { EmptyState } from '../ui/EmptyState';
import { ConfirmDialog } from '../ui/ConfirmDialog';
import { Button } from '../ui/Button';
import { LiveIndicator } from '../ui/LiveIndicator';
import { SearchInput } from '../ui/SearchInput';
import { ProductsRow } from './ProductsRow';
import { ProductsFormModal } from './ProductsFormModal';
import { filterItems } from '../../utils/filterUtils';

const COLUMNS = ['code', 'description', 'bar code', 'selling price', 'gross weight', 'net weight', 'actions'];

const SEARCH_FIELDS = ['code', 'description', 'barCode'];

export function ProductsTable() {
  const { products, status, error, deletingCode, refetch, removeProduct, create, update } =
    useProducts();

  const [pendingDelete, setPendingDelete] = useState(null);
  const [formState, setFormState] = useState({ mode: null, product: null });
  const [search, setSearch] = useState('');

  const filteredProducts = filterItems(products, search, SEARCH_FIELDS);
  const isSearching = search.trim().length > 0;

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
      <header className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-semibold tracking-wide text-text-primary">
            Produtos
          </h1>
          <LiveIndicator />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={refetch}>
            atualizar
          </Button>
          <Button
            variant="primary"
            onClick={() => setFormState({ mode: 'create', product: null })}
          >
            + criar
          </Button>
        </div>
      </header>

      <div className="mb-3">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="code, description ou bar code"
        />
      </div>

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
                  title="Não há produtos"
                  description="Crie seu primeiro produto para vê-lo listado aqui."
                  action={
                    <Button
                      variant="primary"
                      onClick={() => setFormState({ mode: 'create', product: null })}
                    >
                      + criar
                    </Button>
                  }
                />
              </td>
            </tr>
          )}

          {status === 'ready' && products.length > 0 && filteredProducts.length === 0 && (
            <tr>
              <td colSpan={COLUMNS.length}>
                <EmptyState
                  title="Nada encontrado"
                  description={`Não há resultados para "${search}". Tente uma busca diferente.`}
                />
              </td>
            </tr>
          )}

          {status === 'ready' &&
            filteredProducts.map((product) => (
              <ProductsRow
                key={product.code}
                product={product}
                onEdit={(p) => setFormState({ mode: 'edit', product: p })}
                onDelete={setPendingDelete}
                isDeleting={deletingCode === product.code}
              />
            ))}
        </TableBody>
      </Table>

      {status === 'ready' && isSearching && (
        <p className="mt-2 text-xs text-text-faint">
          {filteredProducts.length} of {products.length} products
        </p>
      )}

      {status === 'error' && (
        <div className="mt-4 rounded-lg border border-danger/30 bg-danger-soft px-4 py-3 text-sm text-danger">
          Não foi possível carregar os produtos{error?.message ? `: ${error.message}` : '.'}{' '}
          <button onClick={refetch} className="underline underline-offset-2 hover:text-text-primary">
            Tente novamente
          </button>
        </div>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={`Deletar produto ${pendingDelete ? String(pendingDelete.code).padStart(3, '0') : ''}?`}
        description="Esta ação não poderá ser desfeita."
        confirmLabel="Delete"
        variant="danger"
        loading={deletingCode === pendingDelete?.code}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />

      <ProductsFormModal
        open={formState.mode !== null}
        mode={formState.mode}
        product={formState.product}
        onClose={() => setFormState({ mode: null, product: null })}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
}