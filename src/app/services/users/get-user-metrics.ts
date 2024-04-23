import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { MealsRepository } from '@/app/repositories/interfaces/meals-repository'
import { UsersRepository } from '@/app/repositories/interfaces/users-repository'

interface GetUserMetricsServiceRequest {
  userId: string
}

interface GetUserMetricsServiceResponse {
  metrics: {
    mealsQuantity: number
    inDietMealsQuantity: number
    outDietMealsQuantity: number
    bestInDietMealsSequence: number
  }
}

export class GetUserMetricsService {
  private usersRepository: UsersRepository
  private mealsRepository: MealsRepository

  constructor(
    usersRepository: UsersRepository,
    mealsRepository: MealsRepository,
  ) {
    this.mealsRepository = mealsRepository
    this.usersRepository = usersRepository
  }

  async execute(
    params: GetUserMetricsServiceRequest,
  ): Promise<GetUserMetricsServiceResponse> {
    const { userId } = params

    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    const metrics = await this.mealsRepository.getUserMetrics(userId)

    return { metrics }
  }
}
