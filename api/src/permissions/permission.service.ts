import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PermissionService {

  constructor(
    @InjectRepository(Permission) private readonly repo: Repository<Permission>
  ) {}

  hasPermission(userId: number, permission: string): boolean {
    return true;
  }

  async findAll(): Promise<Permission[]> {
    return this.repo.find({});
  }

  async findByName(name: string): Promise<Permission> {
    const permission = await this.repo.findOne({
      where: { name },
    });
    if (!permission) {
      throw new NotFoundException(`Permission with name ${name} not found`);
    }
    return permission;
  }
}

