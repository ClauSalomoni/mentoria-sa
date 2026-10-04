# 🤖 MentorIA - Plataforma de Mentoria Automatizada com IA

O **MentorIA** é uma solução inteligente multiplataforma voltada para a personalização do aprendizado. Através de inteligência artificial generativa (API Gemini) e uma arquitetura robusta baseada no padrão MVC, o sistema avalia o conhecimento do estudante, gera trilhas de ensino dinâmicas e faz o acompanhamento completo do plano de estudos.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React, React Router DOM, Axios, CSS3 (Design Responsivo)
* **Backend:** Node.js, Express, JWT (JSON Web Tokens)
* **Banco de Dados & ORM:** PostgreSQL, Sequelize ORM
* **Inteligência Artificial:** Google Gemini API

---

## 🗺️ Arquitetura do Banco de Dados (Modelo Relacional)

A persistência e os relacionamentos do sistema seguem rigidamente as regras de negócio mapeadas via Sequelize:



* Um **User** possui várias **trilhas** (`hasMany`) e vários históricos de chat.
* Uma **trilha** possui vários **planos de estudo** (`planoEstudo`) e vários **históricos de avaliações** (`historicoAvaliacao`).

---

## 🖥️ Fluxo da Aplicação & Telas

Abaixo está detalhada a jornada completa do estudante dentro da plataforma MentorIA.

### 1. 📝 Tela de Cadastro
Porta de entrada para novos alunos. O formulário captura as informações básicas de segurança (`nome`, `email`, `senha`) exigidas pelo modelo de dados. A validação de e-mail duplicado é tratada nativamente pelo banco através do Sequelize.

### 2. 🔐 Tela de Login & Autenticação
Garante o acesso seguro às funcionalidades internas da plataforma. Após a validação das credenciais no Backend, um token **JWT (JSON Web Token)** é gerado e armazenado, protegendo todas as rotas subsequentes através do componente `<RotaProtegida>`.

### 3. 🏠 Home (Dashboard de Vídeos)
Ao se autenticar, o aluno é direcionado para a página inicial. Esta interface funciona como um hub centralizado de conteúdos, apresentando o catálogo de vídeos e aulas disponíveis para consumo imediato.

### 4. 🎛️ Painel de Trilhas (`/trilhas`)
Exibe os cards das trilhas de aprendizado ativas do usuário. Dentro de cada trilha, o estudante tem acesso ao seu **Plano de Estudos** estruturado de forma sequencial com:
* Título e descrição do módulo.
* Tempo estimado de dedicação.
* Status de progresso (`PENDENTE`, `EM_ANDAMENTO`, `CONCLUIDO`).
* *Insira o print das suas Trilhas aqui:* `![Trilhas](docs/printScreens/08HistoricoTrilhas.png)`

### 5. 🚀 Personalização e Avaliação Diagnóstica com IA (`/criar-trilha`)
Ao criar uma nova trilha, o aluno escolhe a área que deseja aprender. O sistema oferece duas abordagens inovadoras:
* **Seleção Direta:** O aluno escolhe o seu nível atual de conhecimento (`INICIANTE`, `INTERMEDIARIO` ou `AVANCADO`) e o seu objetivo.
* **Avaliação Avançada com IA:** O botão **"Avaliar com IA"** aciona a API do Gemini, que gera perguntas diagnósticas personalizadas. A IA corrige as respostas, define o nível atual do aluno automaticamente, calcula a pontuação e salva o registro no `historicoAvaliacao`.

### 6. 👤 Gerenciamento de Perfil (`/perfil`)
Espaço dedicado para que o estudante mantenha seus dados atualizados. O formulário permite a edição de campos pessoais como `nome` e `email`, além de disponibilizar a alteração segura de senha diretamente integrada com o banco de dados.

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js instalado (versão 18+ recomendada)
* Instância do PostgreSQL ativa

### 1. Clonar o Repositório
```bash
git clone [https://github.com/ClauSalomoni/mentoria-sa.git](https://github.com/ClauSalomoni/mentoria-sa.git)
```
#### Backend
```bash
cd backend
npm install
```
### Frontend
```bash
cd frantend
npm install
```
