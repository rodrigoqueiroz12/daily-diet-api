import { FastifyReply, FastifyRequest } from 'fastify'

export async function auth(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify()
  } catch (error) {
    reply.status(403).send({ message: 'Unauthorized.' })
  }
}
