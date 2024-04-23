import { Prisma } from '@prisma/client'

import { MealsRepository } from '@/app/repositories/interfaces/meals-repository'

export class RegisterService {
  private mealsRepository: MealsRepository

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository
  }

  async execute(data: Prisma.MealUncheckedCreateInput) {
    const meal = await this.mealsRepository.create(data)

    return { meal }
  }
}
