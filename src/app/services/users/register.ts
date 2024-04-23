import { Prisma } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '@/app/errors/user-already-exists-error'
import { UsersRepository } from '@/app/repositories/interfaces/users-repository'

export class RegisterService {
  private usersRepository

  constructor(usersRepository: UsersRepository) {
    this.usersRepository = usersRepository
  }

  async execute({ name, email, password }: Prisma.UserCreateInput) {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const hashedPassword = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return { user }
  }
}
