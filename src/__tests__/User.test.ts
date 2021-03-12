import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../app'
import createConnection from '../shared/typeorm'

describe('User', () => {
  beforeAll(async () => {
    const connection = await createConnection()

    await connection.runMigrations()
  })

  afterAll(async () => {
    const connection = getConnection()

    await connection.dropDatabase()

    await connection.close()
  })

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      email: 'user@gmail.com',
      password: '123456'
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })
})
