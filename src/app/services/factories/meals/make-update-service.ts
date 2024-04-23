import { PrismaMealsRepository } from '@/app/repositories/_prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/app/repositories/_prisma/prisma-users-repository'

import { UpdateService } from '../../meals/update'

export function makeUpdateService() {
  const usersRepository = new PrismaUsersRepository()
  const mealsRepository = new PrismaMealsRepository()
  const registerService = new UpdateService(usersRepository, mealsRepository)

  return registerService
}
