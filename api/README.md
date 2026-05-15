# 📦 API - Estoque Alimentício

Backend API para gerenciamento de estoque alimentício desenvolvida com **NestJS**, **TypeORM** e **PostgreSQL**.

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
- [Módulos Principais](#módulos-principais)
- [Banco de Dados](#banco-de-dados)
- [Autenticação](#autenticação)
- [Testes](#testes)
- [Docker](#docker)
- [Troubleshooting](#troubleshooting)

---

## 👁️ Visão Geral

Esta é uma API RESTful para gerenciamento completo de estoque alimentício, incluindo:

- **Gestão de Funcionários**: Admin e funcionários comuns
- **Fornecedores**: Cadastro e gerenciamento de fornecedores
- **Produtos**: Cadastro e gerenciamento de produtos
- **Lotes**: Controle de lotes de produtos
- **Transações**: Registro de entrada/saída de produtos
- **Autenticação**: Sistema de autenticação com JWT

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| **Node.js** | 20 | Runtime JavaScript |
| **NestJS** | 11.x | Framework backend progressivo |
| **TypeScript** | 5.7 | Superset tipado de JavaScript |
| **PostgreSQL** | 16 | Banco de dados relacional |
| **TypeORM** | 0.3 | ORM para Node.js |
| **JWT** | 11.x | Autenticação com JSON Web Tokens |
| **Bcrypt** | 6.x | Hash de senhas |
| **Jest** | 30.x | Framework de testes |
| **Swagger** | 11.x | Documentação de API |

---

## 📋 Pré-requisitos

### Obrigatório
- **Node.js** >= 20.x
- **Yarn** >= 1.22.x (ou npm)
- **PostgreSQL** >= 16 (ou Docker)
- **Git**

### Opcional
- **Docker** e **Docker Compose** (para ambiente containerizado)

---

## 📦 Instalação

### 1. Clonar o Repositório
```bash
git clone https://github.com/Kazees/estoque-alimenticio.git
cd estoque-alimenticio/api
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

Edite o arquivo `.env` com as configurações do seu ambiente:

```env
# Banco de Dados
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

# Aplicação
APP_ENV=
APP_URL=
PORT=

# JWT
JWT_SECRET=sua-chave-secreta-aqui
JWT_EXPIRES=1d
```

#### Descrição das Variáveis

| Variável | Descrição |
|----------|-----------|
| `DB_HOST` | Host do PostgreSQL |  
| `DB_PORT` | Porta do PostgreSQL | 
| `DB_USER` | Usuário do banco | 
| `DB_PASSWORD` | Senha do banco |
| `DB_NAME` | Nome do banco |
| `APP_ENV` | Ambiente (dev/prod) | 
| `APP_URL` | URL base da aplicação |
| `PORT` | Porta da API |
| `JWT_SECRET` | Chave para assinar tokens JWT | [veja .env] |
| `JWT_EXPIRES` | Expiração do token JWT | 1d |

### Configuração do Banco de Dados

A API utiliza **TypeORM** para gerenciar o banco de dados. As entidades e migrations estão em:
- Entidades: `src/domain/*/entities/`
- Migrations: `src/configs/migrations/`

---

## 🚀 Executar a Aplicação

### Desenvolvimento Local

#### Pré-requisito: Banco de Dados PostgreSQL Rodando

**Opção 1: Docker Compose (Recomendado)**
```bash
# Na raiz do projeto
docker-compose up -d db
```

**Opção 2: PostgreSQL Local**
Certifique-se de que PostgreSQL está rodando na porta (ou ajuste `DB_PORT` no `.env`)

### Executar Aplicação em Desenvolvimento

```bash
# Modo watch (recarrega automático)
yarn start:dev
```

A API estará disponível em: **http://localhost:8080**

### Executar em Produção

```bash
# Build
yarn build

# Iniciar
yarn start:prod
```

---

## 📜 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `yarn start` | Inicia a aplicação normalmente |
| `yarn start:dev` | Inicia em modo watch (desenvolvimento) |
| `yarn start:debug` | Inicia em modo debug com watch |
| `yarn start:prod` | Inicia compilada para produção |
| `yarn build` | Compila TypeScript para JavaScript |
| `yarn format` | Formata código com Prettier |
| `yarn lint` | Executa ESLint e corrige issues |
| `yarn test` | Executa testes unitários |
| `yarn test:watch` | Executa testes em modo watch |
| `yarn test:cov` | Executa testes com cobertura |
| `yarn test:debug` | Executa testes em modo debug |
| `yarn test:e2e` | Executa testes de integração |
| `yarn migrations:create` | Cria nova migration |
| `yarn migrations:show` | Lista todas as migrations |
| `yarn migrations:run` | Executa migrations pendentes |
| `yarn migrations:revert` | Reverte última migration |

---

## 📁 Estrutura do Projeto

```
src/
├── main.ts                          # Entry point
├── app.module.ts                    # Módulo principal
├── configs/
│   ├── database/
│   │   ├── database.config.ts       # Configuração TypeORM
│   │   └── datasource.config.ts     # Data source para migrations
│   └── migrations/                  # TypeORM migrations
├── domain/                          # Domínios da aplicação
│   ├── auth/                        # Autenticação e autorização
│   ├── admin/
│   │   └── funcionario/             # Gestão de funcionários admin
│   └── main/
│       ├── funcionario/             # Gestão de funcionários
│       ├── fornecedor/              # Gestão de fornecedores
│       ├── produto/                 # Gestão de produtos
│       ├── lote/                    # Gestão de lotes
│       └── transacoes/              # Gestão de transações
└── shared/                          # Código compartilhado
    ├── enum/                        # Enums Bases

test/                               # Testes
dist/                               # Build compilado
```

---

## 🏢 Módulos Principais

### 1. **Auth Module**
Responsável por autenticação e autorização:
- Login de usuários
- Geração de JWT
- Validação de tokens
- Refresh de tokens

**Endpoints principais:**
- `POST /auth/login` - Login
- `POST /auth/refresh` - Renovar token

### 2. **Admin Funcionário**
Gerenciamento de funcionários administradores:
- Criar funcionários
- Listar funcionários
- Atualizar informações
- Ativar/desativar

**Endpoints principais:**
- `GET /admin/funcionarios` - Listar todos
- `POST /admin/funcionarios` - Criar novo
- `GET /admin/funcionarios/:id` - Buscar por ID
- `PUT /admin/funcionarios/:id` - Atualizar
- `DELETE /admin/funcionarios/:id` - Deletar

### 3. **Funcionário**
Gestão de funcionários comuns:
- Cadastro de funcionários
- Atualização de perfil
- Listagem

**Endpoints principais:**
- `GET /funcionarios` - Listar todos
- `POST /funcionarios` - Criar novo
- `GET /funcionarios/:id` - Buscar por ID
- `PUT /funcionarios/:id` - Atualizar

### 4. **Fornecedor**
Gerenciamento de fornecedores:
- Cadastro de fornecedores
- Atualizar informações
- Listar fornecedores

**Endpoints principais:**
- `GET /fornecedores` - Listar todos
- `POST /fornecedores` - Criar novo
- `GET /fornecedores/:id` - Buscar por ID
- `PUT /fornecedores/:id` - Atualizar

### 5. **Produto**
Gestão de produtos:
- Cadastro de produtos
- Atualização de preços
- Controle de quantidades

**Endpoints principais:**
- `GET /produtos` - Listar todos
- `POST /produtos` - Criar novo
- `GET /produtos/:id` - Buscar por ID
- `PUT /produtos/:id` - Atualizar

### 6. **Lote**
Controle de lotes de produtos:
- Criar lotes
- Rastrear lotes
- Controle de validade

**Endpoints principais:**
- `GET /lotes` - Listar todos
- `POST /lotes` - Criar novo
- `GET /lotes/:id` - Buscar por ID
- `PUT /lotes/:id` - Atualizar

### 7. **Transações**
Registro de movimentações de estoque:
- Entrada de produtos
- Saída de produtos
- Histórico de movimentações

**Endpoints principais:**
- `GET /transacoes` - Listar todas
- `POST /transacoes` - Criar nova
- `GET /transacoes/:id` - Buscar por ID

---

## 💾 Banco de Dados

### Configuração TypeORM

A configuração está em `src/configs/database/database.config.ts` e usa variáveis de ambiente para conectar ao PostgreSQL.

### Migrations

As migrations são gerenciadas com TypeORM:

```bash
# Criar nova migration
yarn migrations:create -- -n CreateTableProduto

# Ver status das migrations
yarn migrations:show

# Executar migrations pendentes
yarn migrations:run

# Reverter última migration
yarn migrations:revert
```

### Entidades Principais

- **User** - Usuários do sistema
- **Funcionario** - Dados de funcionários
- **Fornecedor** - Dados de fornecedores
- **Produto** - Catálogo de produtos
- **Lote** - Lotes de produtos
- **Transacao** - Movimentações de estoque

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Tokens)** para autenticação:

### Fluxo de Login

1. **POST /auth/login** com credenciais
2. API retorna um token JWT
3. Cliente inclui o token no header: `Authorization: Bearer <token>`
4. API valida o token em cada requisição

### Exemplo de Requisição Autenticada

```bash
curl -H "Authorization: Bearer seu_token_aqui" \
     http://localhost:8080/funcionarios
```

### Expiração e Refresh

- Tokens expiram conforme configurado em `JWT_EXPIRES` (padrão: 1 dia)
- Use `POST /auth/refresh` para obter um novo token

---

## 🧪 Testes

### Executar Testes Unitários

```bash
yarn test
```

### Modo Watch (Desenvolvimento)

```bash
yarn test:watch
```

### Cobertura de Testes

```bash
yarn test:cov
```

A cobertura será gerada em: `coverage/`

### Testes E2E

```bash
yarn test:e2e
```

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
docker-compose logs -f api

# Parar serviços
docker-compose down
```

### Build Manual da Imagem

```bash
# Na pasta api/
docker build -t estoque-api:latest .

# Rodar imagem
docker run -p 8080:8080 \
           --env DB_HOST=seu_host \
           --env DB_PORT=5432 \
           estoque-api:latest
```

### Notas sobre Docker

- A imagem usa **Node 20 Alpine** para tamanho mínimo
- Timezone configurado para **America/Sao_Paulo**
- Multistage build: builder → runtime
- Healthcheck automático no docker-compose

---

## 🔍 Troubleshooting

### Erro: "Cannot connect to database"

**Solução:**
1. Verificar se PostgreSQL está rodando: `docker-compose logs db`
2. Verificar credenciais em `.env`
3. Verificar porta (padrão: 5433)

```bash
# Testar conexão
psql -h localhost -p 5433 -U postgres -d dbestoque
```

### Erro: "Port 8080 already in use"

**Solução:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :8080
kill -9 <PID>
```

Ou altere `PORT` no `.env`

### Erro: "Migrations not found"

**Solução:**
1. Executar: `yarn migrations:run`
2. Verificar pasta: `src/configs/migrations/`

### Erro: "Cannot find module..."

**Solução:**
1. Reinstalar dependências: `yarn install`
2. Limpar node_modules: `rm -rf node_modules && yarn install`
3. Limpar build: `rm -rf dist`

### Erro ao Clonar (Windows/Git)

Se encontrar problemas com line endings:
```bash
git config core.autocrlf true
```

---

## 📝 Variáveis de Ambiente Importantes

### Desenvolvimento
```env
APP_ENV=
JWT_EXPIRES=7d
```

### Produção
```env
APP_ENV=
JWT_EXPIRES=1d
JWT_SECRET=<gerar-chave-forte>
```

Gerar JWT_SECRET seguro:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## 📚 Documentação Adicional

- [NestJS Docs](https://docs.nestjs.com)
- [TypeORM Docs](https://typeorm.io)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

## 📄 Licença

UNLICENSED
