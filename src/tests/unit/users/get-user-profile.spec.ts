import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/app/repositories/_in-memory/in-memory-users-repository'
import { GetUserProfileService } from '@/app/services/users/get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileService

describe('Get User Profile Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileService(usersRepository)
  })

  it('should be able to get the user`s profile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      id: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get the profile of an inexistent user', async () => {
    await expect(() =>
      sut.execute({
        id: 'any',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
