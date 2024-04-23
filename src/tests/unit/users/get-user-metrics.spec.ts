import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryMealsRepository } from '@/app/repositories/_in-memory/in-memory-meals-repository'
import { InMemoryUsersRepository } from '@/app/repositories/_in-memory/in-memory-users-repository'
import { GetUserMetricsService } from '@/app/services/users/get-user-metrics'

let usersRepository: InMemoryUsersRepository
let mealsRepository: InMemoryMealsRepository
let sut: GetUserMetricsService

describe('Get User Metrics Service', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    mealsRepository = new InMemoryMealsRepository()
    sut = new GetUserMetricsService(usersRepository, mealsRepository)
  })

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to get user metrics', async () => {
    vi.setSystemTime(new Date(2024, 2, 14, 20, 20))

    const user = await usersRepository.create({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '123456',
    })

    await mealsRepository.create({
      userId: user.id,
      name: 'Meat',
      description: '',
      createdAt: new Date().toISOString(),
      ateAt: new Date().toISOString(),
      isInDiet: false,
    })

    vi.setSystemTime(new Date(2024, 2, 14, 20, 50))

    await mealsRepository.create({
      userId: user.id,
      name: 'Banana',
      description: '',
      ateAt: new Date().toISOString(),
      isInDiet: true,
      createdAt: new Date().toISOString(),
    })

    await mealsRepository.create({
      userId: user.id,
      name: 'Apple',
      description: '',
      ateAt: new Date().toISOString(),
      isInDiet: true,
      createdAt: new Date().toISOString(),
    })

    await mealsRepository.create({
      userId: user.id,
      name: 'Ice Cream',
      description: '',
      ateAt: new Date().toISOString(),
      isInDiet: true,
      createdAt: new Date().toISOString(),
    })

    const { metrics } = await sut.execute({ userId: user.id })

    expect(metrics).toEqual(
      expect.objectContaining({
        mealsQuantity: 4,
        inDietMealsQuantity: 3,
        outDietMealsQuantity: 1,
        bestInDietMealsSequence: 3,
      }),
    )
  })
})
