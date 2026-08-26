# Soft-Line Code Challenge — Frontend

> Frontend do desafio técnico para Desenvolvedor Pleno da Soft-Line Sistemas, em React + Vite + Tailwind CSS v4, consumindo a API Spring Boot do desafio.

## 🌐 Aplicação em Produção

Acesse: [https://ghcarvalho.com.br](https://ghcarvalho.com.br)

## 🚀 Como rodar este projeto

Você pode rodar o projeto de duas formas: **localmente** (Node.js instalado na sua máquina) ou via **Docker Compose** (sobe frontend, backend e banco de dados automaticamente).

---

### 🖥️ Opção 1 — Rodando localmente

#### 📋 Requisitos

- 🟢 **Node.js 18+** — [Download](https://nodejs.org/)
- 💻 **Git** — [Download](https://git-scm.com/downloads)
- A **API backend** rodando (veja o README do repositório do backend)

#### ⚙️ Configuração

1. Clonando o repositório:

```bash
git clone http://github.com/gabriel-cheng/softline-challenge-frontend
cd softline-challenge-frontend
```

2. Configurando o `.env`
> - Copie e cole o arquivo `.env.example` na raíz do projeto <br>
> - Nomeie o arquivo copiado para `.env` <br>
> - Ajuste `VITE_API_URL` caso sua API não esteja rodando em `localhost:8080`

```env
VITE_API_URL=http://localhost:8080
```

3. Instalando as dependências
> - Na raíz do projeto, rode o seguinte comando e aguarde a instalação das dependências:
```bash
npm install
```

4. Rodando o projeto
```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

---

### 🐳 Opção 2 — Rodando com Docker Compose

Acesse a documentação do backend para rodar a aplicação completa pelo compose.

---

### ☸️ Deploy em Produção (Kubernetes)

Em produção, a aplicação roda em um cluster **k3s**, com:

- **Traefik** como Ingress Controller, roteando `/api` para o backend e `/` para o frontend
- **cert-manager** gerenciando certificados TLS via Let's Encrypt
- Variáveis de ambiente injetadas via `Secret` (`softline-secrets`) e lidas em build/runtime pelo pod

Os manifests (`Deployment`, `Service`, `Ingress`, `Middleware`) estão disponíveis na pasta `k8s/` do repositório.

---

## 🔐 Autenticação

O cliente HTTP (`src/api/client.js`) usa `withCredentials: true`, pois a API autentica via cookie `HttpOnly` (`auth_token`). Certifique-se de que o CORS do backend Spring permite o domínio do front (`Access-Control-Allow-Origin` específico, não `*`, já que cookies exigem origem explícita) e `Access-Control-Allow-Credentials: true`.

O fluxo de sessão é gerenciado pelo `AuthContext` (`src/context/AuthContext.jsx`), que:
- Verifica a sessão atual em `GET /users/me` ao carregar a aplicação
- Escuta um evento global (`AUTH_EVENT`) disparado pelo cliente HTTP quando uma requisição retorna `401`, deslogando o usuário automaticamente
- Expõe `login`, `logout` e `refresh` via o hook `useAuth()`

Rotas privadas são protegidas pelo componente `ProtectedRoute` (`src/components/auth/ProtectedRoute.jsx`), que redireciona para `/login` quando não há sessão válida.

## 🗂️ Estrutura

```
src/
  api/              -> chamadas HTTP (client.js = instância axios, auth.js, users.js, products.js, customers.js)
  context/          -> AuthContext (sessão, login, logout)
  hooks/            -> useProducts, useCustomers: estado, fetch, create, update, delete, refetch automático
  utils/            -> MaskUtils.js (máscaras de documento, moeda, peso)
  components/
    ui/             -> Button, Input, Modal, ConfirmDialog, EmptyState, TableSkeleton, LiveIndicator, CodeChip
                       (genéricos, reutilizáveis em qualquer tela)
    table/          -> Table, TableRow, TableCell, etc. (primitivas de tabela genéricas)
    layout/         -> AppLayout (layout compartilhado entre as páginas autenticadas)
    auth/           -> ProtectedRoute
    products/       -> ProductsTable, ProductsRow, ProductsFormModal, ProductsCodeChip
    customers/      -> CustomersTable, CustomersRow, CustomersFormModal
    home/           -> OptionCard
  pages/
    LoginPage.jsx        -> tela /login
    RegisterPage.jsx     -> tela /register
    HomePage.jsx          -> tela / (escolha entre Produtos e Clientes)
    ProductsPage.jsx      -> tela /products
    CustomersPage.jsx     -> tela /customers
    EditUserPage.jsx      -> tela /account (configurações da conta)
```

## 🖼️ Telas

- **`/login`** e **`/register`** — autenticação e cadastro de usuário
- **`/`** — homepage, com atalhos para Produtos e Clientes
- **`/products`** — listagem, criação, edição e remoção de produtos do usuário autenticado
- **`/customers`** — listagem, criação, edição e remoção de clientes do usuário autenticado
- **`/account`** — atualização de username e senha do usuário autenticado

## 🔑 Integração com a API

Consome os seguintes endpoints da API Spring Boot (veja o README do backend para detalhes completos de payload):

- `POST /auth/login`, `POST /auth/logout`
- `POST /users`, `GET /users/me`, `PATCH /users/me`
- `GET /products`, `POST /products`, `PATCH /products/{code}`, `DELETE /products/{code}`
- `GET /customers`, `POST /customers`, `PATCH /customers/{code}`, `DELETE /customers/{code}`

Rotas de `products` e `customers` retornam e afetam apenas os registros pertencentes ao usuário autenticado.
