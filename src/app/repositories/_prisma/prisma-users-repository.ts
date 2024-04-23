import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { UsersRepository } from '../interfaces/users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async create({ name, email, password }: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    return user
  }
}
