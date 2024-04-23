import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateService } from '@/app/services/factories/users/make-authenticate-service'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const requestBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = requestBodySchema.parse(request.body)

  const authenticateService = makeAuthenticateService()

  const { user } = await authenticateService.execute({ email, password })

  const token = await reply.jwtSign(
    {},
    {
      sign: {
        sub: user.id,
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    {},
    { sign: { sub: user.id, expiresIn: '1d' } },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({ token })
}
