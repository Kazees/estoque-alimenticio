# 📦 Estoque Alimentício — Full Stack

Plataforma completa para gerenciamento de estoque de produtos alimentícios, composta por uma API RESTful e um frontend SPA, integrados via Docker Compose.

---

## 📋 Sumário

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Pré-requisitos](#pré-requisitos)
- [Início Rápido com Docker](#início-rápido-com-docker)
- [Início Local (sem Docker)](#início-local-sem-docker)
- [Estrutura do Repositório](#estrutura-do-repositório)
- [Documentação por Módulo](#documentação-por-módulo)

---

## 👁️ Visão Geral

Sistema de gestão de estoque alimentício com controle de:

- **Funcionários** — cadastro e perfis com endereço completo
- **Fornecedores** — cadastro com contato e endereço
- **Produtos** — catálogo com informações nutricionais e unidade de medida
- **Lotes** — controle de validade, preço de custo/venda e localização no estoque
- **Transações** — registro de entradas e saídas por lote e produto
- **Autenticação** — login com JWT e controle de acesso por perfil (Admin / Funcionário)

---

## 🏗️ Arquitetura

```
estoque-alimenticio/
├── api/          # Backend NestJS + TypeORM + PostgreSQL
├── web/          # Frontend Vue 3 + Vuetify + Vite
└── docker-compose.yml
```

| Serviço | Tecnologia | Porta |
|---------|-----------|-------|
| **API** | NestJS + TypeScript | `8080` |
| **Web** | Vue 3 + Vuetify + Vite | `3000` |
| **Banco** | PostgreSQL 16 | `5433` |

---

## 📋 Pré-requisitos

| Ferramenta | Versão mínima |
|-----------|---------------|
| **Node.js** | 20.x |
| **Yarn** | 1.22.x |
| **Docker** | 24.x |
| **Docker Compose** | 2.x |

---

## 🐳 Início Rápido com Docker

### 1. Clonar o Repositório

```bash
git clone https://github.com/Kazees/estoque-alimenticio.git
cd estoque-alimenticio
```

### 2. Configurar a API

```bash
cp api/.env.example api/.env
```

Edite `api/.env` com as configurações do banco e JWT (os valores padrão já funcionam com o Docker Compose).

### 3. Subir todos os serviços

```bash
docker-compose up -d
```

| Serviço | URL |
|---------|-----|
| Web | http://localhost:3000 |
| API | http://localhost:8080 |
| Swagger | http://localhost:8080/docs#/ |

### 4. Executar Migrations

Na primeira execução, aplique as migrations do banco:

```bash
docker-compose exec api yarn migrations:run
```

### Comandos úteis

```bash
# Ver logs de um serviço
docker-compose logs -f api
docker-compose logs -f web

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (apaga o banco)
docker-compose down -v

# Rebuild após mudanças no código
docker-compose up -d --build
```

---

## 💻 Início Local (sem Docker)

### Banco de Dados

Suba apenas o PostgreSQL via Docker:

```bash
docker-compose up -d db
```

### API

```bash
cd api
cp .env.example .env   # configure as variáveis
yarn install
yarn migrations:run
yarn start:dev
```

API disponível em: **http://localhost:8080**

### Web

```bash
cd web
cp .env.example .env   # configure VITE_API_URL
yarn install
yarn dev
```

Web disponível em: **http://localhost:5173**

---

## 📁 Estrutura do Repositório

```
estoque-alimenticio/
├── api/
│   ├── src/
│   │   ├── configs/          # TypeORM, migrations
│   │   ├── domain/
│   │   │   ├── auth/         # Autenticação JWT
│   │   │   ├── admin/        # Módulo admin (funcionários)
│   │   │   └── main/         # Módulos principais
│   │   │       ├── funcionario/
│   │   │       ├── fornecedor/
│   │   │       ├── produto/
│   │   │       ├── lote/
│   │   │       └── transacoes/
│   │   └── shared/           # Enums, utilitários compartilhados
│   ├── Dockerfile
│   └── .env.example
├── web/
│   ├── src/
│   │   ├── components/       # Componentes Vue por módulo
│   │   ├── views/            # Páginas (uma por rota)
│   │   ├── stores/           # Estado global com Pinia
│   │   ├── router/           # Rotas e guards de navegação
│   │   ├── layouts/          # Layout principal da aplicação
│   │   └── scripts/
│   │       ├── services/     # Chamadas à API via Axios
│   │       ├── models/       # Interfaces TypeScript
│   │       └── utils/        # Enums, formatadores, filtros
│   ├── Dockerfile
│   └── .env.example
└── docker-compose.yml
```

---

## 📚 Documentação por Módulo

Para instruções detalhadas de cada parte do projeto:

- [README da API](./api/README.md) — configuração, scripts, endpoints, migrations, testes e Docker
- [README do Web](./web/README.md) — configuração, scripts, rotas, autenticação e estrutura de componentes

---

## 📄 Licença

UNLICENSED
