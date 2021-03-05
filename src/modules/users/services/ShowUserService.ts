import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import { hash } from 'bcryptjs'
import AppError from '../../../shared/errors/AppError'

interface IRequestDTO {
  user_id: string
}

class ShowUserService {
  private usersRepository = getCustomRepository(UsersRepository)

  public async execute({ user_id }: IRequestDTO): Promise<User> {
    const userExists = await this.usersRepository.findById(user_id)

    if (!userExists) {
      throw new AppError('User does not exists')
    }

    return userExists
  }
}

export { ShowUserService }
