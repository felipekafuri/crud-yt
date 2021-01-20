import { getCustomRepository } from 'typeorm'
import User from '../entities/User'
import UsersRepository from '../repositories/UsersRepository'

interface IRequestDTO {
  email: string
  password: string
}

class CreateUserService {
  private usersRepository = getCustomRepository(UsersRepository)

  public async execute({ email, password }: IRequestDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email)

    if (userExists) {
      throw new Error('User already exists')
    }

    const user = await this.usersRepository.createUser({ email, password })

    return user
  }
}

export default CreateUserService
