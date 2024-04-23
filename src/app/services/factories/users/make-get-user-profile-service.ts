import { PrismaUsersRepository } from '@/app/repositories/_prisma/prisma-users-repository'

import { GetUserProfileService } from '../../users/get-user-profile'

export function makeGetUserProfileService() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileService = new GetUserProfileService(usersRepository)

  return getUserProfileService
}
