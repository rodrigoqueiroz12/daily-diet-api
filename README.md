# Daily Diet API

This project was developed using the Fastify framework!

## Introduction

This project is an API developed with Node.js and Fastify intended to serve as a backend for a diet management application. This project is one of the challenges from the Node track at [Rocketseat](https://www.rocketseat.com.br/)!

## Prerequisites

Before starting, you will need to have the following tools installed on your machine:
- [Node.js](https://nodejs.org/en)
- [NPM](https://npmjs.com/)
- [Docker](https://www.docker.com/) (Optional)

## Installation

Clone the project and install the dependencies:

```bash
git clone https://github.com/rodrigoqueiroz12/daily-diet-api.git
cd daily-diet-api
npm install
```

To run the project locally:

Clone the `.env.example` file, rename it to `.env`, and configure the variables, especially the `DATABASE_URL`.

```bash
docker compose up -d
npm run build
npm start
```

## Endpoints

### Endpoint: POST /users

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| POST | `/users` | `Content-Type: application/json` | `{ "name": "John Doe", "email": "john.doe@mail.com", "password": "password" }` |

**Description:** Creates a new user in the app and returns the created user's information.

**CURL Example:**

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

**Response Example:**

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

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| POST | `/authenticate` | `Content-Type: application/json` | `{ "email": "john.doe@mail.com", "password": "password" }` |

**Description:** Authenticates the user to the system and returns the JWT access token.

**CURL Example:**

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

**Response Example:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQxODEsImV4cCI6MTcxMzkwNDc4MX0.0XEMQpb4rcgYDNnfeefEUx1kCzqVdnCFxU6B0BzP-NM"
}
```

### Endpoint: PATCH /token/refresh

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| PATCH | `/token/refresh` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Description:** Updates the user's JWT token.

**CURL Example:**

```bash
curl --request PATCH \
  --url http://localhost:3333/token/refresh \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQwNjgsImV4cCI6MTcxMzkwNDY2OH0.2GhPnA7Zq4uyi2cz8sVy-DFLGYQjEzovXY_w8iKqbgI' \
  --header 'User-Agent: insomnia/8.6.1'
```

**Response Example:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQxODEsImV4cCI6MTcxMzkwNDc4MX0.0XEMQpb4rcgYDNnfeefEUx1kCzqVdnCFxU6B0BzP-NM"
}
```

### Endpoint: GET /me

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/me` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Description:** Returns the authenticated user's profile information.

**CURL Example:**

```bash
curl --request GET \
  --url http://localhost:3333/me \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQwNjgsImV4cCI6MTcxMzkwNDY2OH0.2GhPnA7Zq4uyi2cz8sVy-DFLGYQjEzovXY_w8iKqbgI' \
  --header 'User-Agent: insomnia/8.6.1'
```

**Response Example:**

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

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/metrics` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Description:** Returns the user's meal information.

**CURL Example:**

```bash
curl --request GET \
  --url http://localhost:3333/metrics \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDQwNjgsImV4cCI6MTcxMzkwNDY2OH0.2GhPnA7Zq4uyi2cz8sVy-DFLGYQjEzovXY_w8iKqbgI' \
  --header 'User-Agent: insomnia/8.6.1'
```

**Response Example:**

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

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/meals` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Description:** Returns all of the user's meals.

**CURL Example:**

```bash
curl --request GET \
  --url http://localhost:3333/meals \
  --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkOWQ1NjYyMi04MzMwLTQxMDMtOGQyMS1lOThjMGY0M2VkMDUiLCJpYXQiOjE3MTM5MDc4NTEsImV4cCI6MTcxMzkwODQ1MX0.S0HEveN3j1Am1kYWgIqPN5mO6tPfidJGSWG5Hln2BSk' \
  --header 'User-Agent: insomnia/8.6.1'
```

### Endpoint: POST /meals

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| POST | `/meals` | `Content-Type: application/json`; `Authorization: Bearer {token}` | `{"name": "First meal", "description": "Meal description", "ateAt": "2024-04-23T21:33:22.393Z", "isInDiet": true}` |

**Description:** Creates a new meal and returns the information about the created meal.

**CURL Example:**

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

**Response Example:**

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

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| GET | `/meals/:id` | `Content-Type: application/json`; `Authorization: Bearer {token}` | `{"name": "First meal", "description": "Meal description", "ateAt": "2024-04-23T21:33:22.393Z", "isInDiet": true}` |

**Description:** Returns a meal from the authenticated user.

**CURL Example:**

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

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| PUT | `/meals/:id` | `Content-Type: application/json`; `Authorization: Bearer {token}` | `{"name": "First meal", "description": "Meal description", "ateAt": "2024-04-23T21:33:22.393Z", "isInDiet": true}` |

**Description:** Updates a user's meal.

**CURL Example:**

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

| Method | URL | Header | Body |
| ------ | --- | ------ | ---- |
| DELETE | `/meals/:id` | `Content-Type: application/json`; `Authorization: Bearer {token}` | ---- |

**Description:** Deletes a user's meal.

**CURL Example:**

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

## Development

### Directory Structure

- `prisma`: Contains the schema and database migrations.
- `src`: Contains all the application files.
  - `\@types`: Contains the application's typing files.
  - `\lib`: Contains files with functions that may be useful in more than one part of the application.
  - `\tests`: Contains the application's test files.
  - `\app`: Contains the errors, controllers, middlewares, repositories, and services of the application.

### Important Scripts

- `npm run dev`: Runs the application in development mode.
- `npm run build`: Builds the application.
- `npm run start`: Runs the built version of the application.
- `npm run test`: Executes the unit tests of the application.
- `npm run test:e2e`: Executes the end-to-end tests of the application.

## Contact

- Rodrigo Queiroz - [LinkedIn](https://www.linkedin.com/in/rodrigo-queiroz-a113a9212)
- rodrigo.queiroz0629@gmail.com
