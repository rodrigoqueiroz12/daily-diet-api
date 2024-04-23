import fastifyCookie from '@fastify/cookie'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'

import { mealsRoutes } from './app/http/controllers/meals/routes'
import { usersRoutes } from './app/http/controllers/users/routes'
import { env } from './env'
import { globalErrorHandler } from './global-error-handler'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  sign: {
    expiresIn: '10m',
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(mealsRoutes)

app.setErrorHandler(globalErrorHandler)
