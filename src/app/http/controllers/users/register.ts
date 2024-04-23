import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterService } from '@/app/services/factories/users/make-register-service'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string().max(255),
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  const registerService = makeRegisterService()

  const { user } = await registerService.execute({ name, email, password })

  return reply.status(201).send({ user })
}
