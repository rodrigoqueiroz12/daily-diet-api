import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/app/errors/resource-not-found-error'
import { InMemoryMealsRepository } from '@/app/repositories/_in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/app/repositories/_in-memory/in-memory-users-repository'
import { GetMealService } from '@/app/services/meals/get-meal'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetMealService

describe('Find Meal By Id Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetMealService(usersRepository, mealsRepository)
  })

  it('should be able to find a meal by its id', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    const createdMeal = await mealsRepository.create({
      userId: createdUser.id,
      name: 'Meat',
      description: '',
      ateAt: new Date().toISOString(),
      isInDiet: false,
    })

    const { meal } = await sut.execute({
      userId: createdUser.id,
      mealId: createdMeal.id,
    })

    expect(meal.id).toEqual(expect.any(String))
  })

  it('should not be able to find an inexistent meal', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    await expect(() =>
      sut.execute({ userId: createdUser.id, mealId: 'any-meal' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to find meals from other user', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    const createdMeal = await mealsRepository.create({
      userId: 'any-user',
      name: 'Meat',
      description: '',
      ateAt: new Date().toISOString(),
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
