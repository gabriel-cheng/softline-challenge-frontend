import { ProductsTable } from '../components/products/ProductsTable'

export function ProductsPage() {
  function handleCreate() {
    console.log('navegar para /products/create')
  }

  function handleEdit(product) {
    console.log('editar produto', product.code)
  }

  return (
    <main className="flex min-h-screen justify-center bg-canvas px-6 py-12">
      <ProductsTable onCreate={handleCreate} onEdit={handleEdit} />
    </main>
  )
}
