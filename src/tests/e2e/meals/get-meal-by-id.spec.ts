import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Get User Meal E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a user meal by id', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345678',
    })

    const authRes = await request(app.server).post('/authenticate').send({
      email: 'john.doe@mail.com',
      password: '12345678',
    })

    const { token } = authRes.body

    const mealRes = await request(app.server)
      .post('/meals')
      .send({
        name: 'first meal',
        description: 'first meal',
        ateAt: new Date().toISOString(),
        isInDiet: false,
      })
      .set('Authorization', `Bearer ${token}`)

    const { meal } = mealRes.body

    const res = await request(app.server)
      .get(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(res.body).toEqual(
      expect.objectContaining({
        meal: expect.objectContaining({
          id: meal.id,
        }),
      }),
    )
  })

  it('should not be able to get a meal from a different user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe1@mail.com',
      password: '12345678',
    })

    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe2@mail.com',
      password: '12345678',
    })

    const authRes = await request(app.server).post('/authenticate').send({
      email: 'john.doe1@mail.com',
      password: '12345678',
    })

    const authSecondRes = await request(app.server).post('/authenticate').send({
      email: 'john.doe2@mail.com',
      password: '12345678',
    })

    const { token } = authRes.body
    const secondToken = authSecondRes.body.token

    const mealRes = await request(app.server)
      .post('/meals')
      .send({
        name: 'first meal',
        description: 'first meal',
        ateAt: new Date().toISOString(),
        isInDiet: false,
      })
      .set('Authorization', `Bearer ${token}`)

    const { meal } = mealRes.body

    const res = await request(app.server)
      .get(`/meals/${meal.id}`)
      .set('Authorization', `Bearer ${secondToken}`)

    expect(res).toEqual(
      expect.objectContaining({
        status: 400,
      }),
    )
  })
})
