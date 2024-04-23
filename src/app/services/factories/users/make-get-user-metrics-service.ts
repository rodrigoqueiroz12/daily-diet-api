import { PrismaMealsRepository } from '@/app/repositories/_prisma/prisma-meals-repository'
import { PrismaUsersRepository } from '@/app/repositories/_prisma/prisma-users-repository'

import { GetUserMetricsService } from '../../users/get-user-metrics'

export function makeGetUserMetricsService() {
  const usersRepository = new PrismaUsersRepository()
  const mealsRepository = new PrismaMealsRepository()
  const getUserMetricsService = new GetUserMetricsService(
    usersRepository,
    mealsRepository,
  )

  return getUserMetricsService
}
