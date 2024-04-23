import { PrismaMealsRepository } from '@/app/repositories/_prisma/prisma-meals-repository'

import { RegisterService } from '../../meals/register'

export function makeRegisterService() {
  const mealsRepository = new PrismaMealsRepository()
  const registerService = new RegisterService(mealsRepository)

  return registerService
}
