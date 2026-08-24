import { Package, Users } from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';
import { OptionCard } from '../components/home/OptionCard';

export function HomePage() {
  return (
    <AppLayout title="Home">
      <h1 className="mb-4 text-sm font-semibold tracking-wide text-text-primary">
        O que você quer gerenciar?
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <OptionCard
          to="/products"
          title="Produtos"
          description="visualiza, cria, atualiza e remove produtos."
          icon={<Package size={18} />}
        />
        <OptionCard
          to="/customers"
          title="Clientes"
          description="visualiza, cria, atualiza e remove clientes."
          icon={<Users size={18} />}
        />
      </div>
    </AppLayout>
  );
}