import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class RolesService {

  constructor(
    @InjectRepository(Role) private readonly repo: Repository<Role>
  ) {}

  hasPermission(userId: number, permission: string): boolean {
    return true; // ⚠️ reemplazar con lógica real
  }

  async findAll(): Promise<Role[]> {
    return this.repo.find({
      relations: ['permissions', 'parentRole', 'children'],
    });
  }

  async findByName(name: string): Promise<Role> {
    //const role = await this.repo.findOne({ where: { name } });
    const role = await this.repo.findOne({
      where: { name },
      relations: ['permissions', 'parentRole'], // <- asegúrate de incluir parentRole
    });
    if (!role) {
      throw new NotFoundException(`Role with name ${name} not found`);
    }
    return role;
  }
}

