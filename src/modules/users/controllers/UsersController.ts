import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({ email, password })

    return response.status(201).json(classToClass(user))
  }
}

export { UsersController }
