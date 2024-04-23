import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'

import { InvalidCredentialsError } from './app/errors/invalid-credentials-error'
import { ResourceNotFoundError } from './app/errors/resource-not-found-error'
import { UserAlreadyExistsError } from './app/errors/user-already-exists-error'
import { env } from './env'

export function globalErrorHandler(
  error: FastifyError,
  _: FastifyRequest,
  reply: FastifyReply,
) {
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (error instanceof UserAlreadyExistsError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof ResourceNotFoundError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof InvalidCredentialsError) {
    return reply.status(409).send({ message: error.message })
  }

  return reply.status(500).send({ message: 'Internal server error.' })
}
