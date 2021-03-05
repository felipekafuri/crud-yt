import { getCustomRepository } from 'typeorm'
import UsersRepository from '../repositories/UsersRepository'
import AppError from '../../../shared/errors/AppError'

interface IRequestDTO {
  user_id: string
}

class DeleteUserService {
  private usersRepository = getCustomRepository(UsersRepository)

  public async execute({ user_id }: IRequestDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id)

    if (!userExists) {
      throw new AppError('User does not exists')
    }

    await this.usersRepository.delete({ id: user_id })
  }
}

export { DeleteUserService }
