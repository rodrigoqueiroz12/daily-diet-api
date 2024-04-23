import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Get User Meals E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get the user meals', async () => {
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

    await request(app.server)
      .post('/meals')
      .send({
        name: 'first meal',
        description: 'first meal',
        ateAt: new Date().toISOString(),
        isInDiet: false,
      })
      .set('Authorization', `Bearer ${token}`)

    await request(app.server)
      .post('/meals')
      .send({
        name: 'second meal',
        description: 'second meal',
        ateAt: new Date().toISOString(),
        isInDiet: false,
      })
      .set('Authorization', `Bearer ${token}`)

    const res = await request(app.server)
      .get('/meals')
      .set('Authorization', `Bearer ${token}`)

    const { meals } = res.body

    expect(meals).toHaveLength(2)
  })
})
