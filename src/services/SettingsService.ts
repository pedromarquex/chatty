import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { SettingsRepository } from '../repositories/SettingsRepository';

interface SettingsCreate {
  chat: boolean;
  username: string;
}

class SettingsService {
  private settingsRepository: Repository<Setting>;

  constructor() {
    this.settingsRepository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: SettingsCreate): Promise<Setting> {
    const userAlreadyExists = await this.settingsRepository.findOne({
      username,
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const settings = this.settingsRepository.create({
      chat,
      username,
    });

    await this.settingsRepository.save(settings);

    return settings;
  }

  async findByUsername(username: string): Promise<Setting> {
    const settings = await this.settingsRepository.findOne({ username });

    return settings;
  }
}

export { SettingsService };
