# 🖥️ Web - Estoque Alimentício

Frontend para gerenciamento de estoque alimentício desenvolvido com **Vue 3**, **Vuetify** e **Vite**.

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Stack Tecnológico](#stack-tecnológico)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executar a Aplicação](#executar-a-aplicação)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Módulos e Rotas](#módulos-e-rotas)
- [Autenticação](#autenticação)
- [Docker](#docker)
- [Troubleshooting](#troubleshooting)

---

## 👁️ Visão Geral

Interface web para gerenciamento completo de estoque alimentício, incluindo:

- **Autenticação**: Login com JWT e controle de acesso por perfil
- **Gestão de Produtos**: Cadastro, listagem e filtragem de produtos com informações nutricionais
- **Gestão de Lotes**: Controle de lotes, validade, preço de custo e venda
- **Fornecedores**: Cadastro e gerenciamento de fornecedores
- **Transações**: Registro de entradas e saídas do estoque
- **Perfil do Funcionário**: Visualização e edição de dados pessoais
- **Área Admin**: Gerenciamento de funcionários (exclusivo para administradores)

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Vue 3** | 3.5.x | Framework JavaScript progressivo |
| **TypeScript** | 6.x | Superset tipado de JavaScript |
| **Vuetify** | 3.x | Biblioteca de componentes Material Design |
| **Vite** | 8.x | Bundler e dev server ultrarrápido |
| **Pinia** | 3.x | Gerenciamento de estado |
| **Vue Router** | 5.x | Roteamento SPA |
| **Axios** | 1.x | Cliente HTTP |
| **jwt-decode** | 4.x | Decodificação de JWT no cliente |

---

## 📋 Pré-requisitos

- **Node.js** >= 20.x
- **Yarn** >= 1.22.x (ou npm)
- **API** rodando em `http://localhost:8080` (ou configure `VITE_API_URL`)

---

## 📦 Instalação

### 1. Clonar o Repositório
```bash
git clone https://github.com/Kazees/estoque-alimenticio.git
cd estoque-alimenticio/web
```

### 2. Instalar Dependências
```bash
yarn install
```

Ou com npm:
```bash
npm install
```

### 3. Copiar Arquivo de Ambiente
```bash
cp .env.example .env
```

---

## ⚙️ Configuração

### Variáveis de Ambiente

Edite o arquivo `.env`:

```env
VITE_API_URL=http://localhost:8080
```

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `VITE_API_URL` | URL base da API backend | `http://localhost:8080` |

> Todas as variáveis do Vite devem ter o prefixo `VITE_` para serem expostas ao cliente.

---

## 🚀 Executar a Aplicação

### Desenvolvimento Local

```bash
yarn dev
```

A aplicação estará disponível em: **http://localhost:5173**

### Build para Produção

```bash
yarn build
```

### Preview do Build

```bash
yarn preview
```

---

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `yarn dev` | Inicia o servidor de desenvolvimento (HMR) |
| `yarn build` | Compila e minifica para produção |
| `yarn preview` | Pré-visualiza o build de produção |
| `yarn type-check` | Verifica tipos com `vue-tsc` |
| `yarn lint` | Executa oxlint + ESLint com correção automática |
| `yarn format` | Formata o código com Prettier |

---

## 📁 Estrutura do Projeto

```
src/
├── main.ts                        # Entry point
├── assets/                        # Arquivos estáticos (imagens, fontes)
├── layouts/
│   └── AppLayout.vue              # Layout principal com menu lateral
├── router/
│   └── index.ts                   # Definição de rotas e guards de navegação
├── stores/
│   └── transcoes.store.ts         # Store Pinia para filtros de transações
├── components/
│   ├── feedback/
│   │   └── ToastComponent.vue     # Notificações de sucesso/erro
│   ├── layouts/
│   │   └── ...                    # Componentes de layout (navbar, sidebar)
│   ├── login/                     # Componentes da tela de login
│   ├── funcionario/               # Formulários e perfil de funcionário
│   ├── fornecedor/                # Formulários e listagem de fornecedor
│   ├── produto/                   # Formulários, listagem e filtros de produto
│   ├── lote/                      # Formulários e listagem de lote
│   └── transacoes/                # Formulários, listagem e filtros de transações
├── views/
│   ├── login/                     # Página de login
│   ├── admin/                     # Página de gestão de funcionários (admin)
│   ├── funcionario/               # Página de perfil do funcionário
│   ├── fornecedor/                # Página de fornecedores
│   ├── produto/                   # Página de produtos
│   ├── lote/                      # Página de lotes
│   ├── transacao/                 # Página de transações
│   └── erros/                     # Páginas de erro (404)
└── scripts/
    ├── models/                    # Interfaces TypeScript (Input/Output)
    ├── services/                  # Serviços de comunicação com a API
    └── utils/                     # Utilitários (Enums, Format, Filter)
```

---

## 🗺️ Módulos e Rotas

### Rotas Públicas

| Rota | Descrição |
|------|-----------|
| `/login` | Tela de login (redireciona para `/produto` se já autenticado) |

### Rotas Protegidas (requer autenticação)

| Rota | Descrição |
|------|-----------|
| `/produto` | Listagem e cadastro de produtos |
| `/lote` | Listagem e cadastro de lotes |
| `/fornecedor` | Listagem e cadastro de fornecedores |
| `/transacao` | Listagem e registro de transações |
| `/perfil` | Perfil do funcionário logado |

### Rotas Exclusivas para Admin

| Rota | Descrição |
|------|-----------|
| `/admin/funcionarios` | Gerenciamento de funcionários |

### Páginas de Erro

| Rota | Descrição |
|------|-----------|
| `/:pathMatch(.*)*` | Página 404 — rota não encontrada |

---

## 🔐 Autenticação

O frontend utiliza **JWT** para autenticação:

### Fluxo

1. Usuário faz login em `/login`
2. API retorna um token JWT
3. Token é armazenado no `localStorage`
4. Todas as requisições incluem o token via interceptor do Axios
5. Respostas `401` ou `403` redirecionam automaticamente para `/login`

### Guards de Navegação

O Vue Router valida automaticamente:
- `requiresAuth` — redireciona para `/login` se não autenticado
- `guestOnly` — redireciona para `/produto` se já autenticado
- `requiredRole` — verifica o perfil do JWT (ex: `ADMIN`) e redireciona para `/not-found` se não autorizado

---

## 🐳 Docker

### Usar Docker Compose (Recomendado)

Na raiz do projeto:

```bash
# Iniciar todos os serviços (API + Banco de Dados + Web)
docker-compose up

# Iniciar em background
docker-compose up -d

# Ver logs
docker-compose logs -f web

# Parar serviços
docker-compose down
```

A aplicação web estará disponível em: **http://localhost:3000**

### Build Manual da Imagem

```bash
# Na pasta web/
docker build -t estoque-web:latest .

# Rodar imagem
docker run -p 3000:3000 \
           --env VITE_API_URL=http://localhost:8080 \
           estoque-web:latest
```

---

## 🔍 Troubleshooting

### Erro: "Failed to resolve import..."

**Causa:** Caminho de importação incorreto.

**Solução:** Verifique se os imports usam o alias `@/scripts/services/` (não `@/services/`) e exports nomeados:
```typescript
import { ProdutoService } from '@/scripts/services/ProdutoService'
```

### Erro: "Cannot connect to API" / Requisições falhando

**Solução:**
1. Verificar se a API está rodando: `http://localhost:8080`
2. Verificar `VITE_API_URL` no arquivo `.env`
3. Após alterar `.env`, reiniciar o servidor: `yarn dev`

### Erro: "Port 5173 already in use"

```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

Ou altere a porta no `vite.config.ts`:
```typescript
server: { port: 5174 }
```

### Token expirado / Loop de redirect para login

**Solução:** Limpar o `localStorage` no DevTools do navegador:
```javascript
localStorage.clear()
```

---

## 📚 Documentação Adicional

- [Vue 3 Docs](https://vuejs.org)
- [Vuetify 3 Docs](https://vuetifyjs.com)
- [Vite Docs](https://vite.dev)
- [Pinia Docs](https://pinia.vuejs.org)
- [Vue Router Docs](https://router.vuejs.org)

---

## 📄 Licença

UNLICENSED
