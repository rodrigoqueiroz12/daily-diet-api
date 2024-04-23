import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeRegisterService } from '@/app/services/factories/meals/make-register-service'

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const id = req.user.sub

  const registerBodySchema = z.object({
    name: z.string().min(2),
    description: z.string(),
    ateAt: z.coerce.date(),
    isInDiet: z.boolean(),
  })

  const { name, description, ateAt, isInDiet } = registerBodySchema.parse(
    req.body,
  )

  const sut = makeRegisterService()

  const { meal } = await sut.execute({
    userId: id,
    name,
    description,
    ateAt,
    isInDiet,
  })

  return rep.status(201).send({ meal })
}
