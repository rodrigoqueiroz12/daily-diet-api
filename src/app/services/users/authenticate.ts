import { compare } from 'bcryptjs'

import { InvalidCredentialsError } from '@/app/errors/invalid-credentials-error'
import { UsersRepository } from '@/app/repositories/interfaces/users-repository'

interface AuthenticateServiceRequest {
  email: string
  password: string
}

export class AuthenticateService {
  private usersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute(params: AuthenticateServiceRequest) {
    const { email, password } = params

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
