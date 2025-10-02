import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  findByEmail(email: string) {
    return this.repo.findOne({
      where: { email },
      relations: [
        'role',
        'role.permissions',
        'role.parentRole',
        'role.parentRole.permissions',
        'organization'
      ],
    });
  }

  findById(id: number) {
    return this.repo.findOne({ where: { id }, relations: ['role', 'organization'] });
  }

  async create(data: Partial<User>): Promise<User> {
    const user = this.repo.create(data); // Creates an entity instance
    return await this.repo.save(user);   // Persists it to DB
  }
}

