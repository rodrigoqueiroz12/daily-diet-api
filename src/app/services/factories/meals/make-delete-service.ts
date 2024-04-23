import { PrismaMealsRepository } from '@/app/repositories/_prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/app/repositories/_prisma/prisma-users-repository'

import { DeleteService } from '../../meals/delete'

export function makeDeleteService() {
  const usersRepository = new PrismaUsersRepository()
  const mealsRepository = new PrismaMealsRepository()
  const registerService = new DeleteService(usersRepository, mealsRepository)

  return registerService
}
