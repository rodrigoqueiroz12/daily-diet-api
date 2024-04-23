import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { MealsRepository } from '@/app/repositories/interfaces/meals-repository'
import { UsersRepository } from '@/app/repositories/interfaces/users-repository'

interface GetMealServiceRequest {
  userId: string
  mealId: string
}

export class GetMealService {
  private usersRepository: UsersRepository
  private mealsRepository: MealsRepository

  constructor(
    usersRepository: UsersRepository,
    mealsRepository: MealsRepository,
  ) {
    this.usersRepository = usersRepository
    this.mealsRepository = mealsRepository
  }

  async execute(params: GetMealServiceRequest) {
    const { userId, mealId } = params

    const user = await this.usersRepository.findById(userId)
    const meal = await this.mealsRepository.findById(mealId)

    if (!user || !meal || user.id !== meal.userId) {
      throw new ResourceNotFoundError()
    }

    return { meal }
  }
}
