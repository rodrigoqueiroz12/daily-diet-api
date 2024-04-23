import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Authenticate User Service E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a user', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345678',
    })

    const res = await request(app.server).post('/authenticate').send({
      email: 'john.doe@mail.com',
      password: '12345678',
    })

    const { token } = res.body

    expect(token).toEqual(expect.any(String))
  })
})
