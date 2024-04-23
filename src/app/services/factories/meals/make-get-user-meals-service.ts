import { PrismaMealsRepository } from '@/app/repositories/_prisma/prisma-meals-repository'

import { GetUserMealsService } from '../../meals/get-user-meals'

export function makeGetUserMealsService() {
  const mealsRepository = new PrismaMealsRepository()
  const registerService = new GetUserMealsService(mealsRepository)

  return registerService
}
