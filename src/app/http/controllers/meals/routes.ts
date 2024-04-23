import { FastifyInstance } from 'fastify'

import { auth } from '../../middlewares/auth'
import { destroy } from './delete'
import { getMeal } from './get-meal'
import { getMeals } from './get-meals'
import { register } from './register'
import { update } from './update'

export async function mealsRoutes(app: FastifyInstance) {
  app.get('/meals', { onRequest: [auth] }, getMeals)
  app.post('/meals', { onRequest: [auth] }, register)
  app.get('/meals/:id', { onRequest: [auth] }, getMeal)
  app.put('/meals/:id', { onRequest: [auth] }, update)
  app.delete('/meals/:id', { onRequest: [auth] }, destroy)
}
