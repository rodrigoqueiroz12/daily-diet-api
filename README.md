# Daily Diet API

Este projeto foi desenvolvido utilizando o framework Fastify!

## Introdução

Este projeto é uma API desenvolvida com Node.js e Fastify destinada a servir como backend para uma aplicação de gerenciamento de dietas. Esse projeto é um dos desafios da trilha de Node da [Rocketseat](https://www.rocketseat.com.br/)!

## Pré-requisitos

Antes de iniciar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
- [Node.js](https://nodejs.org/en)
- [NPM](https://npmjs.com/)
- [Docker](https://www.docker.com/) (Opcional)

## Instalação

Clone o projeto e instale as dependências:

```bash
git clone https://github.com/rodrigoqueiroz12/daily-diet-api.git
cd daily-diet-api
npm install
```

Para rodar o projeto localmente:

Clone o arquivo `.env.example`, o renomeie para `.env` e configure as variáveis, especialmente a `DATABASE_URL`.

```bash
docker compose up -d
npm run build
npm start
```

## Endpoints

### Endpoint: POST /users

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| POST | `/users` | `Content-Type: application/json` | `{ "name": "John Doe", "email": "john.doe@mail.com", "password": "password" }` |

**Descrição:** Cria um novo usuário no sistema.

**CURL Exemplo:**

```bash
curl --request POST \
  --url http://localhost:3333/users \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1' \
  --data '{
    "name": "John Doe",
    "email": "john.doe@mail.com",
    "password": "password"
  }'
```

**Exemplo de Resposta:**

```json
{
  "user": {
    "id": "d9d56622-8330-4103-8d21-e98c0f43ed05",
    "name": "Rodrigo",
    "email": "teste.1@teste.com",
    "password": "$2a$06$5GcPhJrhXyJ07bRaMGpj2emO3/RMUK9xQ3xvvmIx588qLVKCA0GV.",
    "createdAt": "2024-04-23T20:25:10.291Z",
    "updatedAt": "2024-04-23T20:25:10.291Z"
  }
}
```

### Endpoint: POST /authenticate

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| POST | `/authenticate` | `Content-Type: application/json` | `{ "email": "john.doe@mail.com", "password": "password" }` |

**Descrição:** Autentica o usuário no sistema.

**CURL Exemplo:**

```bash
curl --request POST \
  --url http://localhost:3333/authenticate \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1' \
  --data '{
    "email": "john.doe@mail.com",
    "password": "password"
  }'
```

**Exemplo de Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQxODEsImV4cCI6MTcxMzkwNDc4MX0.0XEMQpb4rcgYDNnfeefEUx1kCzqVdnCFxU6B0BzP-NM"
}
```

### Endpoint: PATCH /token/refresh

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| PATCH | `/token/refresh` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Descrição:** Atualiza o token do usuário.

**CURL Exemplo:**

```bash
curl --request PATCH \
  --url http://localhost:3333/token/refresh \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQwNjgsImV4cCI6MTcxMzkwNDY2OH0.2GhPnA7Zq4uyi2cz8sVy-DFLGYQjEzovXY_w8iKqbgI' \
  --header 'User-Agent: insomnia/8.6.1'
```

**Exemplo de Resposta:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQxODEsImV4cCI6MTcxMzkwNDc4MX0.0XEMQpb4rcgYDNnfeefEUx1kCzqVdnCFxU6B0BzP-NM"
}
```

### Endpoint: GET /me

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/me` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Descrição:** Retorna as informações do perfil do usuário autenticado.

**CURL Exemplo:**

```bash
curl --request GET \
  --url http://localhost:3333/me \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQwNjgsImV4cCI6MTcxMzkwNDY2OH0.2GhPnA7Zq4uyi2cz8sVy-DFLGYQjEzovXY_w8iKqbgI' \
  --header 'User-Agent: insomnia/8.6.1'
```

**Exemplo de Resposta:**

```json
{
  "user": {
    "id": "d9d56622-8330-4103-8d21-e98c0f43ed05",
    "name": "John Doe",
    "email": "john.doe@mail.com",
    "password": "$2a$06$5GcPhJrhXyJ07bRaMGpj2emO3/RMUK9xQ3xvvmIx588qLVKCA0GV.",
    "created_at": "2023-01-01T09:00:00Z",
    "updated_at": "2023-01-01T09:00:00Z"
  }
}
```

### Endpoint: GET /metrics

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/metrics` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Descrição:** Pega as informações de refeições do usuário.

**CURL Exemplo:**

```bash
curl --request GET \
  --url http://localhost:3333/metrics \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQwNjgsImV4cCI6MTcxMzkwNDY2OH0.2GhPnA7Zq4uyi2cz8sVy-DFLGYQjEzovXY_w8iKqbgI' \
  --header 'User-Agent: insomnia/8.6.1'
```

**Exemplo de Resposta:**

```json
{
  "metrics": {
    "mealsQuantity": 0,
    "inDietMealsQuantity": 0,
    "outDietMealsQuantity": 0,
    "bestInDietMealsSequence": 0
  }
}
```

### Endpoint: GET /meals

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/meals` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Descrição:** Pega as refeições do usuário.

**CURL Exemplo:**

```bash
curl --request GET \
  --url http://localhost:3333/meals \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDc4NTEsImV4cCI6MTcxMzkwODQ1MX0.S0HEveN3j1Am1kYWgIqPN5mO6tPfidJGSWG5Hln2BSk' \
  --header 'User-Agent: insomnia/8.6.1'
```

### Endpoint: POST /meals

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| POST | `/meals` | `Content-Type: application/json`; `Authorization: Bearer {token}` | `{"name": "First meal", "description": "Meal description", "ateAt": "2024-04-23T21:33:22.393Z", "isInDiet": true}` |

**Descrição:** Cria uma nova refeição.

**CURL Exemplo:**

```bash
curl --request POST \
  --url http://localhost:3333/meals \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDc4NTEsImV4cCI6MTcxMzkwODQ1MX0.S0HEveN3j1Am1kYWgIqPN5mO6tPfidJGSWG5Hln2BSk' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1' \
  --data '{
    "name": "First meal",
    "description": "Meal description",
    "ateAt": "2024-04-23T21:33:22.393Z",
    "isInDiet": true
  }'
```

**Exemplo de Resposta:**

```json
{
  "meals": [
    {
      "id": "fcabe4d3-468e-447c-a534-05580793dc51",
      "userId": "d9d56622-8330-4103-8d21-e98c0f43ed05",
      "name": "First meal",
      "description": "Meal description",
      "ateAt": "2024-04-23T21:33:22.393Z",
      "isInDiet": true,
      "createdAt": "2024-04-23T23:31:25.826Z",
      "updatedAt": "2024-04-23T23:31:25.826Z"
    },
    {
      "id": "4096534d-39f3-43f7-8a85-241dc43af199",
      "userId": "d9d56622-8330-4103-8d21-e98c0f43ed05",
      "name": "Second meal",
      "description": "Meal description",
      "ateAt": "2024-04-23T21:33:22.393Z",
      "isInDiet": true,
      "createdAt": "2024-04-23T23:31:28.919Z",
      "updatedAt": "2024-04-23T23:31:28.919Z"
    },
  ]
}
```

### Endpoint: GET /meals/:id

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/meals/:id` | `Content-Type: application/json`; `Authorization: Bearer {token}` | `{"name": "First meal", "description": "Meal description", "ateAt": "2024-04-23T21:33:22.393Z", "isInDiet": true}` |

**Descrição:** Pega uma refeição do usuário.

**CURL Exemplo:**

```bash
curl --request GET \
  --url http://localhost:3333/meals/fcabe4d3-468e-447c-a534-05580793dc51 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDc4NTEsImV4cCI6MTcxMzkwODQ1MX0.S0HEveN3j1Am1kYWgIqPN5mO6tPfidJGSWG5Hln2BSk' \
  --header 'User-Agent: insomnia/8.6.1'
```

```json
{
  "meal": {
    "id": "fcabe4d3-468e-447c-a534-05580793dc51",
    "userId": "d9d56622-8330-4103-8d21-e98c0f43ed05",
    "name": "First meal",
    "description": "Meal description",
    "ateAt": "2024-04-23T21:33:22.393Z",
    "isInDiet": true,
    "createdAt": "2024-04-23T23:31:25.826Z",
    "updatedAt": "2024-04-23T23:31:25.826Z"
  },
}
```

### Endpoint: PUT /meals/:id

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| PUT | `/meals/:id` | `Content-Type: application/json`; `Authorization: Bearer {token}` | `{"name": "First meal", "description": "Meal description", "ateAt": "2024-04-23T21:33:22.393Z", "isInDiet": true}` |

**Descrição:** Atualiza uma refeição do usuário.

**CURL Exemplo:**

```bash
curl --request PUT \
  --url http://localhost:3333/meals/fcabe4d3-468e-447c-a534-05580793dc51 \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDc4NTEsImV4cCI6MTcxMzkwODQ1MX0.S0HEveN3j1Am1kYWgIqPN5mO6tPfidJGSWG5Hln2BSk' \
  --header 'Content-Type: application/json' \
  --header 'User-Agent: insomnia/8.6.1' \
  --data '{
    "name": "Updated first meal",
    "description": "Meal description",
    "ateAt": "2024-04-23T21:33:22.393Z",
    "isInDiet": false
  }'
```

```json
{
  "meal": {
    "id": "fcabe4d3-468e-447c-a534-05580793dc51",
    "userId": "d9d56622-8330-4103-8d21-e98c0f43ed05",
    "name": "Updated first meal",
    "description": "Meal description",
    "ateAt": "2024-04-23T21:33:22.393Z",
    "isInDiet": true,
    "createdAt": "2024-04-23T23:31:25.826Z",
    "updatedAt": "2024-04-23T23:31:25.826Z"
  },
}
```

### Endpoint: DELETE /meals/:id

| Método | URL | Header | Body |
| ------ | --- | ------ | ---- |
| DELETE | `/meals/:id` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Descrição:** Exclui uma refeição do usuário.

**CURL Exemplo:**

```bash
curl --request DELETE \
  --url http://localhost:3333/meals/d1d4dd60-513c-4c11-ba18-fc329c19a99b \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDc4NTEsImV4cCI6MTcxMzkwODQ1MX0.S0HEveN3j1Am1kYWgIqPN5mO6tPfidJGSWG5Hln2BSk' \
  --header 'User-Agent: insomnia/8.6.1'
```

```json
{
  "meal": {
    "id": "fcabe4d3-468e-447c-a534-05580793dc51",
    "userId": "d9d56622-8330-4103-8d21-e98c0f43ed05",
    "name": "Updated first meal",
    "description": "Meal description",
    "ateAt": "2024-04-23T21:33:22.393Z",
    "isInDiet": true,
    "createdAt": "2024-04-23T23:31:25.826Z",
    "updatedAt": "2024-04-23T23:31:25.826Z"
  },
}
```

## Desenvolvimento

### Estrutura de diretórios

- `prisma`: Contém o schema e as migrations do banco de dados.
- `src`: Contém todos os arquivos da aplicação.
  - `\@types`: Contém os arquivos de tipagem da aplicação.
  - `\lib`: Contém arquivos com funções que podem ser úteis em mais de um lugar da aplicação.
  - `\tests`: Contém os arquivos de testes da aplicação.
  - `\app`: Contém os erros, controllers, middlewares, repositórios e serviços da aplicação.

### Scripts importantes

- `npm run dev`: Executa a aplicação em modo de desenvolvimento.
- `npm run build`: Realiza o build da aplicação.
- `npm run start`: Executa a versão de build da aplicação.
- `npm run test`: Executa os testes unitários da aplicação.
- `npm run test:e2e`: Executa os testes end-to-end da aplicação.

## Contato

- Rodrigo Queiroz - [LinkedIn](https://www.linkedin.com/in/rodrigo-queiroz-a113a9212)
- rodrigo.queiroz0629@gmail.com
