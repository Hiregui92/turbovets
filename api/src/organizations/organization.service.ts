import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Organization } from '../entities/organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
//import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectRepository(Organization) private readonly repo: Repository<Organization>,
    private usersService: UsersService
  ) {}
  /**async create(dto: CreateTaskDto, user: any) {
    const u = await this.usersService.findById(user.id);
    if (!u) {
      throw new NotFoundException(`User with id ${user.id} not found`);
    }

    const task = this.repo.create({
      ...dto,
      owner: u, // ahora TS sabe que u es un User válido
      organization: u.organization,
    });
    return this.repo.save(task);
  }*/
async findAll(): Promise<Organization[]> {
  return this.repo.find({
    relations: ['parent', 'children'],
  });
}

  async findAllForUser(user: any) {
    return this.repo.find({
      relations: ['parent', 'children'],
    });
  }
}
/*
async update(id: number, dto: UpdateTaskDto, user: any) {
  const task = await this.repo.findOne({ where: { id }, relations: ['owner', 'organization'] });
  if (!task) throw new NotFoundException();

  if (user.role === 'Viewer' && task.owner.id !== user.id) {
    throw new ForbiddenException('Viewer cannot edit others tasks');
  }
  if (user.role === 'Admin' && task.organization.id !== user.orgId) {
    throw new ForbiddenException('Admin outside org');
  }

  Object.assign(task, dto);
  return this.repo.save(task);
}

async remove(id: number, user: any) {
  const task = await this.repo.findOne({ where: { id }, relations: ['owner', 'organization'] });
  if (!task) throw new NotFoundException();

  if (user.role === 'Viewer') throw new ForbiddenException();
  if (user.role === 'Admin' && task.organization.id !== user.orgId) {
    throw new ForbiddenException();
  }

  await this.repo.remove(task);
  return { success: true };
}*/


