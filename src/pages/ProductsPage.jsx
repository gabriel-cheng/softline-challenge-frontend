import { ProductsTable } from '../components/products/ProductsTable'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'

export function ProductsPage() {
  const { user, logout } = useAuth()

  function handleCreate() {
    console.log('navegar para /products/create')
  }

  function handleEdit(product) {
    console.log('editar produto', product.code)
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-canvas px-6 py-12">
      <div className="mb-4 flex w-full max-w-4xl items-center justify-end gap-3">
        {user?.username && (
          <span className="text-xs text-text-faint">Logado como {user.username}</span>
        )}
        <Button variant="ghost" onClick={logout}>
          Desconectar-se
        </Button>
      </div>

      <ProductsTable onCreate={handleCreate} onEdit={handleEdit} />
    </main>
  )
}
