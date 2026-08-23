# Products Frontend

Tela de listagem de produtos (`/products`), em React + Vite + Tailwind CSS v4,
consumindo a API Spring Boot (`GET /products`, `DELETE /products/{code}`).

## Como rodar

```bash
npm install
cp .env.example .env   # ajuste VITE_API_URL se sua API não estiver em localhost:8080
npm run dev
```

Abra http://localhost:5173

## Autenticação

O cliente HTTP (`src/api/client.js`) usa `withCredentials: true`, pois a API
autentica via cookie `HttpOnly`. Certifique-se de que o CORS do backend
Spring permite o domínio do front (`Access-Control-Allow-Origin` específico,
não `*`, já que cookies exigem origem explícita) e `Access-Control-Allow-Credentials: true`.

## Estrutura

```
src/
  api/            -> chamadas HTTP (client.js = instância axios, products.js = endpoints)
  hooks/          -> useProducts: estado, fetch, delete, refetch automático
  components/
    ui/           -> Button, ConfirmDialog, EmptyState, TableSkeleton, LiveIndicator
                     (genéricos, reutilizáveis em qualquer tela)
    table/        -> Table, TableRow, TableCell, etc. (primitivas de tabela genéricas)
    products/     -> ProductsTable, ProductRow, ProductCodeChip (específicos de produto)
  pages/
    ProductsPage.jsx -> tela /products
```

## Reaproveitando em outras telas (Customers, Users)

- `components/ui/*` e `components/table/*` não têm nada específico de produto —
  são a base para montar as tabelas de `Customers` e `Users` do mesmo jeito.
- Basta criar `components/customers/CustomersTable.jsx` seguindo o mesmo padrão
  de `ProductsTable.jsx`, e um hook `useCustomers` espelhando `useProducts.js`.

## Próximos passos (fora do escopo desta entrega)

- Telas de criação (`/products/create`) e edição — os callbacks `onCreate` e
  `onEdit` em `ProductsPage.jsx` já estão prontos para receber navegação
  (ex: react-router) quando essas telas existirem.
