import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import { hash, compare } from 'bcryptjs'
import AppError from '../../../shared/errors/AppError'

interface IRequestDTO {
  user_id: string
  newPassword: string
  prevPassword: string
}

class UpdateUserService {
  private usersRepository = getCustomRepository(UsersRepository)

  public async execute({
    newPassword,
    prevPassword,
    user_id
  }: IRequestDTO): Promise<User> {
    const userExists = await this.usersRepository.findById(user_id)

    if (!userExists) {
      throw new AppError('User does not exists')
    }

    const isPasswordValid = await compare(prevPassword, userExists.password)

    if (!isPasswordValid) {
      throw new AppError('The prev password was wrong')
    }

    userExists.password = newPassword

    const user = await this.usersRepository.save(userExists)

    return user
  }
}

export { UpdateUserService }
