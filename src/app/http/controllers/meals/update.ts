import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeUpdateService } from '@/app/services/factories/meals/make-update-service'

export async function update(req: FastifyRequest, rep: FastifyReply) {
  const updateMealRequestParams = z.object({
    id: z.string(),
  })

  const userId = req.user.sub
  const { id: mealId } = updateMealRequestParams.parse(req.params)

  const updateMealRequestBody = z.object({
    name: z.string(),
    description: z.string(),
    ateAt: z.coerce.date(),
    isInDiet: z.boolean(),
  })

  const { name, description, ateAt, isInDiet } = updateMealRequestBody.parse(
    req.body,
  )

  const sut = makeUpdateService()

  const { meal } = await sut.execute(
    { userId, mealId },
    { name, description, ateAt, isInDiet },
  )

  return rep.status(200).send({ meal })
}
