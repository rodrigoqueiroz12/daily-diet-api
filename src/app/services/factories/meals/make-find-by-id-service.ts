import { PrismaMealsRepository } from '@/app/repositories/_prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/app/repositories/_prisma/prisma-users-repository'

import { GetMealService } from '../../meals/get-meal'

export function makeFindByIdService() {
  const usersRepository = new PrismaUsersRepository()
  const mealsRepository = new PrismaMealsRepository()
  const registerService = new GetMealService(usersRepository, mealsRepository)

  return registerService
}
