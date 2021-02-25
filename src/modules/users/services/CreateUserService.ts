import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'
import { hash } from 'bcryptjs'
import AppError from '../../../shared/errors/AppError'

interface IRequestDTO {
  email: string
  password: string
}

class CreateUserService {
  private usersRepository = getCustomRepository(UsersRepository)

  public async execute({ email, password }: IRequestDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new AppError('User already exists')
    }

    const hashedPassword = await hash(password, 8)

    const user = await this.usersRepository.createUser({
      email,
      password: hashedPassword
    })

    return user
  }
}

export default CreateUserService
