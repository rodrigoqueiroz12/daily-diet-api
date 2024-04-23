import { beforeAll, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { InMemoryMealsRepository } from '@/app/repositories/_in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/app/repositories/_in-memory/in-memory-users-repository'
import { UpdateService } from '@/app/services/meals/update'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: UpdateService

describe('Update Meal Service', () => {
  beforeAll(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new UpdateService(usersRepository, mealsRepository)
  })

  it('should be able to update a meal', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345678',
    })

    const createdMeal = await mealsRepository.create({
      userId: createdUser.id,
      name: 'Meat',
      description: '',
      ateAt: new Date(),
      isInDiet: false,
    })

    const { meal } = await sut.execute(
      { userId: createdUser.id, mealId: createdMeal.id },
      {
        name: 'Updated Meat',
      },
    )

    expect(meal).toEqual(
      expect.objectContaining({
        name: 'Updated Meat',
      }),
    )
  })

  it('should not be able to update an inexistent meal', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345678',
    })

    await expect(() =>
      sut.execute(
        { userId: createdUser.id, mealId: 'any-id' },
        {
          name: 'Updated Meat',
        },
      ),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
