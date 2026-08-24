import { AppLayout } from '../components/layout/AppLayout'
import { CustomersTable } from '../components/customers/CustomersTable'

export function CustomersPage() {
  return (
    <AppLayout title="Clientes">
      <CustomersTable />
    </AppLayout>
  )
}