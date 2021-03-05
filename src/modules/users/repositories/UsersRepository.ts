import { EntityRepository, Repository } from 'typeorm'
import ICreateUserDTO from '../dtos/ICreateUserDTO'
import User from '../entities/User'

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.findOne({ email })

    return user
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.findOne({ id })

    return user
  }

  public async createUser({ email, password }: ICreateUserDTO): Promise<User> {
    const user = this.create({ email, password })

    await this.save(user)

    return user
  }
}

export default UsersRepository
