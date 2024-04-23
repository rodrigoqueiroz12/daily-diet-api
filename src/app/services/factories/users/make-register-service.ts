import { PrismaUsersRepository } from '@/app/repositories/_prisma/prisma-users-repository'

import { RegisterService } from '../../users/register'

export function makeRegisterService() {
  const usersRepository = new PrismaUsersRepository()
  const registerService = new RegisterService(usersRepository)

  return registerService
}
