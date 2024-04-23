import { beforeEach, describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/app/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/app/repositories/_in-memory/in-memory-users-repository'
import { RegisterService } from '@/app/services/users/register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterService

describe('Register User Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterService(usersRepository)
  })

  it('should be able to register a user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: 'password',
    })

    expect(user).toEqual(
      expect.objectContaining({
        email: 'john.doe@mail.com',
      }),
    )
  })

  it('should not be able to register the same email twice', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: 'password',
    })

    await expect(() =>
      sut.execute({
        name: 'John Doe',
        email: 'john.doe@mail.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
