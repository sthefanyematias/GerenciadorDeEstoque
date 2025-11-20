# 📦 Gerenciador Supermercado Bom Preço (Full Stack Mock)

Este repositório contém o código-fonte de uma aplicação Angular que simula um Gerenciador de Estoque e Pessoal para o cenário fictício do Supermercado Bom Preço.

A ferramenta foi desenvolvida para demonstrar a implementação completa da arquitetura CRUD (Create, Read, Update, Delete), combinada com um sistema robusto de Controle de Acesso Baseado em Perfis (RBAC) e fluxos de autenticação, como Login, Onboarding obrigatório para novos usuários e Recuperação de Senha via e-mail. O projeto foca na manipulação eficiente de dados, na utilização de Guards de rota para segurança e no desenvolvimento front-end com o framework Angular.

Contexto Acadêmico: Trabalho de tema livre para a disciplina de Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas.

## ✨ Principais Funcionalidades

- **Gestão de Estoque**: CRUD completo (Cadastro, Consulta, Listagem, Edição, Exclusão), incluindo controle de Movimentação (Entrada/Baixa) e alertas de Estoque Crítico/Alerta.
- **Gestão de Funcionários**: Módulo completo de controle de pessoal (apenas para admin), incluindo cadastro, edição de dados corporativos e gerenciamento de perfis.
- **Autenticação Avançada**:
  - **Perfis de Acesso (role)**: admin, operador e consulta.
  -  **Guards de Rota**: Segurança implementada via Guards para restringir acessos com base no perfil e status de login.
  -   **Fluxo de Onboarding**: Obriga novos funcionários a alterarem sua senha inicial no primeiro acesso.
- **Interface**: Navegação intuitiva com Header e Footer dinâmicos, e sistema de feedback ao usuário via Modais de aviso e confirmação.

## 🚀 Como Executar o Projeto
Para rodar este projeto, você precisa iniciar a API Mock (Backend) e o Servidor de Desenvolvimento do Angular (Frontend) em terminais separados.

**Pré-requisitos**

- Node.js (v18+)
- npm
- Angular CLI (npm install -g @angular/cli)
- JSON-Server (npm install -g json-server)

## ⚙️ Instruções de Inicialização
Na pasta raiz do projeto

**1. Clonar e instalar**

```bash
npm install
```

**2. Iniciar a API Mock (Terminal 1)**

```bash
json-server --watch data/db.json
```

**ou**

```bash
cd data
```

```bash
npx json-server db.json
```

**3. Iniciar o Frontend Angular (Terminal 2)**

```bash
ng serve --open
```

## 🔑 Credenciais de Teste
Use estas credenciais (do arquivo _`data/db.json`_) para testar os diferentes perfis em _http://localhost:4200/login_:

| ID   | Senha  | Perfil   | Descrição e Permissões Principais |
|------|--------|----------|-----------------------------------|
| 1015 | 123456 | **Admin** | **Administrador Total**. Tem acesso completo a **todos os módulos** do sistema. Pode cadastrar, editar e excluir Produtos, e também gerencia todos os dados e acessos de Funcionários. |
| 1104 | 123456 | **Operador** | **Gestão de Inventário**. Pode **visualizar** todo o estoque e tem permissão para **Cadastrar**, **Editar** e registrar **Movimentações (Entrada/Baixa)** de Produtos. Não tem acesso à gestão de Funcionários. |
| 1098 | 456123 | **Consulta** | **Acesso Mínimo (Somente Leitura)**. Pode apenas **Visualizar** a listagem de Produtos e fazer **Consultas Rápidas** por ID. Não pode cadastrar, editar, excluir ou movimentar estoque. |

- **Observação**: Qualquer perfil tem permissão para acessar a tela de Editar Perfil (_`/funcionarios/editar/:id`_) para alterar sua própria senha, que é um requisito de segurança do Onboarding.
