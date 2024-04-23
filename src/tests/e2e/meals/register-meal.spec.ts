import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register a Meal E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new meal', async () => {
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

    const res = await request(app.server)
      .post('/meals')
      .send({
        name: 'first meal',
        description: 'first meal',
        ateAt: new Date().toISOString(),
        isInDiet: false,
      })
      .set('Authorization', `Bearer ${token}`)

    const { meal } = res.body

    expect(meal).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
