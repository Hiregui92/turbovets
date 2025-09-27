import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly repo: Repository<Task>,
    private usersService: UsersService
  ) {}
/*
  async create(dto: CreateTaskDto, user: any) {
    const u = await this.usersService.findById(user.id);
    const task = this.repo.create({ ...dto, owner: u, organization: u.organization });
    return this.repo.save(task);
  }

  async findAllForUser(user: any) {
    // scope visibility:
    // owner => all tasks in their org
    // admin => all tasks in org and children
    // viewer => tasks in org only but maybe only read fields
    const u = await this.usersService.findById(user.id);
    const roleName = user.role;
    if (roleName === 'Owner' || roleName === 'Admin') {
      // return all tasks in same org (and children if admin)
      // simplistic: if Org has parent, include siblings? For two-level hierarchy, we'll include org and its children
      return this.repo.find({ where: { organization: { id: u.organization.id } }, relations: ['owner', 'organization'] });
    } else {
      // viewer: only tasks where owner == user OR in same org but can read
      return this.repo.find({ where: [{ owner: { id: u.id } }, { organization: { id: u.organization.id } }], relations: ['owner', 'organization'] });
    }
  }

  async update(id: string, dto: UpdateTaskDto, user: any) {
    const task = await this.repo.findOne({ where: { id }, relations: ['owner', 'organization'] });
    if (!task) throw new NotFoundException();
    // check permission by owner/org
    if (user.role === 'Viewer' && task.owner.id !== user.id) throw new ForbiddenException('Viewer cannot edit others tasks');
    // Admin can edit tasks in same org; Owner can edit all
    if (user.role === 'Admin' && task.organization.id !== user.orgId) throw new ForbiddenException('Admin outside org');
    Object.assign(task, dto);
    return this.repo.save(task);
  }

  async remove(id: string, user: any) {
    const task = await this.repo.findOne({ where: { id }, relations: ['owner', 'organization']});
    if (!task) throw new NotFoundException();
    if (user.role === 'Viewer') throw new ForbiddenException();
    if (user.role === 'Admin' && task.organization.id !== user.orgId) throw new ForbiddenException();
    await this.repo.remove(task);
    return { success: true };
  }*/
async create(dto: CreateTaskDto, user: any) {
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
}

async findAllForUser(userId: number) {
  const u = await this.usersService.findById(userId);
  if (!u) {
    throw new NotFoundException(`User with id ${userId} not found`);
  }
  return this.repo.find({
    relations: ['owner', 'organization'],
  });
/*
  const roleName = user.role;
  if (roleName === 'Owner' || roleName === 'Admin') {
    return this.repo.find({
      where: { organization: { id: u.organization.id } },
      relations: ['owner', 'organization'],
    });
  } else {
    return this.repo.find({
      where: [
        { owner: { id: u.id } },
        { organization: { id: u.organization.id } },
      ],
      relations: ['owner', 'organization'],
    });
  }*/
}

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
}

}

