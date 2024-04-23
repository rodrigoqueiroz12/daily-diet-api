import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricsService } from '@/app/services/factories/users/make-get-user-metrics-service'

export async function metrics(request: FastifyRequest, reply: FastifyReply) {
  const id = request.user.sub

  const sut = makeGetUserMetricsService()

  const { metrics } = await sut.execute({ userId: id })

  return reply.status(200).send({ metrics })
}
