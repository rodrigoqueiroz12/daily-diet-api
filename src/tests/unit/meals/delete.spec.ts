import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { InMemoryMealsRepository } from '@/app/repositories/_in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/app/repositories/_in-memory/in-memory-users-repository'
import { DeleteService } from '@/app/services/meals/delete'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: DeleteService

describe('Delete Meal Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new DeleteService(usersRepository, mealsRepository)
  })

  it('should be able to delete a meal', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    const createdMeal = await mealsRepository.create({
      userId: createdUser.id,
      name: 'Meat',
      description: '',
      ateAt: new Date(),
      isInDiet: false,
    })

    const { meal } = await sut.execute({
      userId: createdUser.id,
      mealId: createdMeal.id,
    })

    expect(meal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })

  it('should not be able to delete a meal from other user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    const createdMeal = await mealsRepository.create({
      userId: 'any-user',
      name: 'Meat',
      description: '',
      ateAt: new Date(),
      isInDiet: false,
    })

    await expect(() =>
      sut.execute({
        userId: createdUser.id,
        mealId: createdMeal.id,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
