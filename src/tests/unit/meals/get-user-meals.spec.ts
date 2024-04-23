import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/app/repositories/_in-memory/in-memory-meals-repository'
import { GetUserMealsService } from '@/app/services/meals/get-user-meals'

let mealsRepository: InMemoryMealsRepository
let sut: GetUserMealsService

describe('Get User Meals Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetUserMealsService(mealsRepository)
  })

  it('should be able to get all the user meals', async () => {
    await mealsRepository.create({
      userId: 'any-user',
      name: 'Meat',
      description: '',
      ateAt: new Date(),
      isInDiet: false,
    })

    await mealsRepository.create({
      userId: 'any-user',
      name: 'Banana',
      description: '',
      ateAt: new Date(),
      isInDiet: true,
    })

    const { meals } = await sut.execute('any-user')

    expect(meals).toHaveLength(2)
    expect(meals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Meat' }),
        expect.objectContaining({ name: 'Banana' }),
      ]),
    )
  })
})
