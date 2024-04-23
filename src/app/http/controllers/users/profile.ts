import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileService } from '@/app/services/factories/users/make-get-user-profile-service'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const id = request.user.sub

  const findByIdService = makeGetUserProfileService()

  const { user } = await findByIdService.execute({ id })

  return reply.status(200).send({ user })
}
