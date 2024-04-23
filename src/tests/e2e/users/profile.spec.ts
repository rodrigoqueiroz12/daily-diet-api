import { describe } from 'node:test'

import request from 'supertest'
import { afterAll, beforeAll, expect, it } from 'vitest'

import { app } from '@/app'

describe('Get User Profile E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a user profile', async () => {
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
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    const { user } = res.body

    expect(res.status).toBe(200)
    expect(user).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      }),
    )
  })
})
