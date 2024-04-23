import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryMealsRepository } from '@/app/repositories/_in-memory/in-memory-meals-repository'
import { RegisterService } from '@/app/services/meals/register'

let mealsRepository: InMemoryMealsRepository
let sut: RegisterService

describe('Register Meal Service', () => {
  beforeEach(() => {
    mealsRepository = new InMemoryMealsRepository()
    sut = new RegisterService(mealsRepository)
  })

  it('should be able to register a meal', async () => {
    const { meal } = await sut.execute({
      user_id: 'user-id',
      name: 'Meat',
      description: '',
      ate_at: new Date(),
      is_in_diet: false,
    })

    expect(meal.id).toEqual(expect.any(String))
  })
})
