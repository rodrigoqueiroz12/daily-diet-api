import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMealsService } from '@/app/services/factories/meals/make-get-user-meals-service'

export async function getMeals(req: FastifyRequest, rep: FastifyReply) {
  const userId = req.user.sub

  const sut = makeGetUserMealsService()
  const { meals } = await sut.execute(userId)

  return rep.status(200).send({ meals })
}
