import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { MealsRepository } from '@/app/repositories/interfaces/meals-repository'
import { UsersRepository } from '@/app/repositories/interfaces/users-repository'

interface DeleteServiceRequest {
  userId: string
  mealId: string
}

export class DeleteService {
  private usersRepository: UsersRepository
  private mealsRepository: MealsRepository

  constructor(
    usersRepository: UsersRepository,
    mealsRepository: MealsRepository,
  ) {
    this.usersRepository = usersRepository
    this.mealsRepository = mealsRepository
  }

  async execute(params: DeleteServiceRequest) {
    const { userId, mealId } = params

    const user = await this.usersRepository.findById(userId)
    const createdMeal = await this.mealsRepository.findById(mealId)

    if (!user || !createdMeal || user.id !== createdMeal.userId) {
      throw new ResourceNotFoundError()
    }

    const meal = await this.mealsRepository.delete(createdMeal.id)

    return { meal }
  }
}
