# Gerenciador de Tarefas API

Esta é uma API de gerenciamento de tarefas desenvolvida com NestJS, utilizando TypeORM para interagir com o banco de dados MySQL. A API suporta operações de criação, leitura, atualização e exclusão (CRUD) de tarefas, além de recursos de autenticação e controle de acesso por usuários.

## Funcionalidades
* Autenticação JWT: A API utiliza tokens JWT para autenticar e autorizar usuários.
* Gerenciamento de Tarefas: Criação, listagem, atualização e exclusão de tarefas com diferentes status.
* Relacionamento Usuário-Tarefa: Cada tarefa está associada a um usuário específico.

## Deploy da api
https://jackexperts-api.onrender.com/

## Documentação da API
https://jackexperts-api.onrender.com/doc

## Instalação
Clone o repositório e instale as depedências do projeto:
```
git clone https://github.com/CiceroLucas/desafio-jackexperts-backend.git

cd desafio-jackexperts-backend

npm install
```

Tenha o MySQL na sua máquina

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:
```
MYSQL_CONNECTION=mysql
MYSQL_HOST=localhost
MYSQL_DOCKER_PORT=3306
MYSQL_DATABASE=tasks
MYSQL_USERNAME=root
MYSQL_PASSWORD=yourpassword
JWT_SECRET=your_jwt_secret
```

Execute a aplicação:
```
npm run dev
```

Acesse a aplicação via http://localhost:3001

## Endpoints Principais

### Autenticação

* Login: POST api/login
  * Body: { "email": "user@example.com", "password": "yourpassword" }
  * Retorna: JWT token
* Registro de usuário: POST api/register
  * Body: { "name": "username", "email": "user@example.com", "password": "yourpassword" }
  * Registra usuário
 
### Tarefas
* Criar Tarefa: POST api/tasks
  * Body: { "title": "Nova Tarefa", "description": "Descrição da tarefa" }
  * Requer token JWT
* Listar Tarefas do Usuário: GET api/tasks
  * Retorna todas as tarefas do usuário autenticado
* Atualizar Status da Tarefa: PATCH api/tasks/:id
  * Body: { "status": "completed" }
  * Atualiza o status de uma tarefa específica
* Atualizar Status da Tarefa: PATCH api/tasks/update/:id
  * Body: { "title": "Atualizado", "description": "Atualizado" }
  * Atualiza uma tarefa específica
* Deletar Tarefa: DELETE api/tasks/:id
  * Remove uma tarefa do usuário autenticado.

## Decisões Técnicas

* NestJS: Escolhi o NestJS pela sua arquitetura modular e suporte nativo a injeção de dependências, o que facilita a organização de grandes projetos. Ele também é compatível com TypeScript, o que permite uma melhor verificação de tipos.
* TypeORM: Para persistência de dados, o TypeORM foi selecionado por sua facilidade de integração com o NestJS e suporte a recursos avançados de ORM, como migrações e relacionamentos.
* MySQL: O MySQL foi escolhido como banco de dados por sua robustez, confiabilidade e ampla adoção no mercado. A combinação com o TypeORM possibilita um mapeamento eficiente de entidades.
* JWT: Para autenticação, optei por tokens JWT, que são amplamente utilizados em APIs REST. Eles oferecem uma maneira segura e escalável de autenticar e autorizar usuários sem a necessidade de armazenar estado no servidor
* Docker: O Docker foi utilizado para garantir um ambiente consistente e facilitar o deploy em diferentes plataformas, além de simplificar o gerenciamento do MySQL e da API em containers.
