import { PrismaUsersRepository } from '@/app/repositories/_prisma/prisma-users-repository'

import { AuthenticateService } from '../../users/authenticate'

export function makeAuthenticateService() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateService = new AuthenticateService(usersRepository)

  return authenticateService
}
