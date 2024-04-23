import { MealsRepository } from '@/app/repositories/interfaces/meals-repository'

export class GetUserMealsService {
  private mealsRepository

  constructor(mealsRepository: MealsRepository) {
    this.mealsRepository = mealsRepository
  }

  async execute(userId: string) {
    const meals = await this.mealsRepository.getUserMeals(userId)

    return { meals }
  }
}
