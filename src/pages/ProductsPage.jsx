import { AppLayout } from '../components/layout/AppLayout';
import { ProductsTable } from '../components/products/ProductsTable';

export function ProductsPage() {
  return (
    <AppLayout>
      <ProductsTable />
    </AppLayout>
  );
}