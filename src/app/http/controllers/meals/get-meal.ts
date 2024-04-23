import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFindByIdService } from '@/app/services/factories/meals/make-find-by-id-service'

export async function getMeal(req: FastifyRequest, rep: FastifyReply) {
  const getMealRequestParams = z.object({
    id: z.string(),
  })

  const userId = req.user.sub
  const { id: mealId } = getMealRequestParams.parse(req.params)

  const sut = makeFindByIdService()
  const { meal } = await sut.execute({ userId, mealId })

  return rep.status(200).send({ meal })
}
