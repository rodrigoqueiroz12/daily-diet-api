import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/app/errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/app/repositories/_in-memory/in-memory-users-repository'
import { AuthenticateService } from '@/app/services/users/authenticate'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateService

describe('Authenticate User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateService(usersRepository)
  })

  it('should be able to authenticate a user', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'john.doe@mail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate a user with wrong credentials', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'john.doe@mail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to try to authenticate a inexistent user', async () => {
    await expect(() =>
      sut.execute({
        email: 'inexistent.user@mail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
