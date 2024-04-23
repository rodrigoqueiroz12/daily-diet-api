import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { authenticate } from './authenticate'
import { metrics } from './metrics'
import { profile } from './profile'
import { refresh } from './refresh'
import { register } from './register'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/authenticate', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticated routes */

  app.get('/me', { onRequest: [auth] }, profile)
  app.get('/metrics', { onRequest: [auth] }, metrics)
}
