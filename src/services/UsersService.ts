import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

class UsersService {
  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create(email: string): Promise<User> {
    // Verificar se usuario existe

    const userExists = await this.usersRepository.findOne({
      email,
    });

    // Se existir, retornar user
    if (userExists) {
      return userExists;
    }

    const user = this.usersRepository.create({
      email,
    });

    await this.usersRepository.save(user);

    // Se não existir, salvar no DB
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      email,
    });
    return user;
  }
}

export { UsersService };
