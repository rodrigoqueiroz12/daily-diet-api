import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { UsersRepository } from '@/app/repositories/interfaces/users-repository'

interface GetUserProfileServiceRequest {
  id: string
}

export class GetUserProfileService {
  private usersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(params: GetUserProfileServiceRequest) {
    const { id } = params

    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return { user }
  }
}
