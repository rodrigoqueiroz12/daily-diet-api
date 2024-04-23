import { Meal, Prisma } from '@prisma/client'

import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { MealsRepository } from '@/app/repositories/interfaces/meals-repository'
import { UsersRepository } from '@/app/repositories/interfaces/users-repository'

interface UpdateServiceRequest {
  userId: string
  mealId: string
}

interface UpdateServiceResponse {
  meal: Meal
}

export class UpdateService {
  private usersRepository: UsersRepository
  private mealsRepository: MealsRepository

  constructor(
    usersRepository: UsersRepository,
    mealsRepository: MealsRepository,
  ) {
    this.usersRepository = usersRepository
    this.mealsRepository = mealsRepository
  }

  async execute(
    params: UpdateServiceRequest,
    { name, description, ateAt, isInDiet }: Prisma.MealUpdateInput,
  ): Promise<UpdateServiceResponse> {
    const { userId, mealId } = params

    const user = await this.usersRepository.findById(userId)
    const meal = await this.mealsRepository.findById(mealId)

    if (!user || !meal || user.id !== meal.userId) {
      throw new ResourceNotFoundError()
    }

    const updatedMeal = await this.mealsRepository.update(meal.id, {
      name,
      description,
      ateAt,
      isInDiet,
    })

    return { meal: updatedMeal }
  }
}
