import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeDeleteService } from '@/app/services/factories/meals/make-delete-service'

export async function destroy(req: FastifyRequest, rep: FastifyReply) {
  const destroyMealRequestParams = z.object({
    id: z.string(),
  })

  const userId = req.user.sub
  const { id: mealId } = destroyMealRequestParams.parse(req.params)

  const sut = makeDeleteService()
  const { meal } = await sut.execute({ userId, mealId })

  return rep.status(200).send({ meal })
}
