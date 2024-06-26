import { Prisma, User } from '@prisma/client'
import { randomUUID } from 'crypto'

import { UsersRepository } from '../interfaces/users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  private users: User[] = []

  async findById(id: string) {
    const user = this.users.find((user) => user.id === id) || null

    return user
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    return user || null
  }
}
