import { classToClass } from 'class-transformer'
import { Request, Response } from 'express'
import CreateUserService from '../services/CreateUserService'
import { DeleteUserService } from '../services/DeleteUserService'
import { ShowUserService } from '../services/ShowUserService'
import { UpdateUserService } from '../services/UpdateUserService'

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const createUser = new CreateUserService()

    const user = await createUser.execute({ email, password })

    return response.status(201).json(classToClass(user))
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params // users/:id

    const deleteUser = new DeleteUserService()

    await deleteUser.execute({ user_id: id })

    return response.status(200).json({ ok: true })
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params // users/:id

    const showUser = new ShowUserService()

    const user = await showUser.execute({ user_id: id })

    return response.status(201).json(classToClass(user))
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { prevPassword, newPassword } = request.body
    const { id } = request.params

    const updateUser = new UpdateUserService()

    const user = await updateUser.execute({
      prevPassword,
      newPassword,
      user_id: id
    })

    return response.status(201).json(classToClass(user))
  }
}

export { UsersController }
