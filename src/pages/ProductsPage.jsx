import { AppLayout } from '../components/layout/AppLayout';
import { ProductsTable } from '../components/products/ProductsTable';

export function ProductsPage() {
  return (
    <AppLayout title="Produtos" maxWidth="max-w-6xl">
      <ProductsTable />
    </AppLayout>
  );
}