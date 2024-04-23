import { describe } from 'node:test'

import request from 'supertest'
import { afterAll, beforeAll, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register User Service E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a user', async () => {
    const res = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@mail.com',
      password: '12345678',
    })

    expect(res.status).toBe(201)
  })
})
