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

  async create(dto: CreateTaskDto, userId: number) {
    const u = await this.usersService.findById(userId);
    if (!u) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    const task = this.repo.create({
      ...dto,
      owner: u, // ahora TS sabe que u es un User válido
      organization: u.organization,
    });
    return this.repo.save(task);
  }

  async findOneForUser(id: number, userId: number) {
    return this.repo.findOne({
      where: { id, owner: { id: userId } },
    });
  }

  async findAllForUser(userId: number) {
    const u = await this.usersService.findById(userId);
    if (!u) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    return this.repo.find({
      relations: ['owner', 'organization'],
    });
  }

  async update(id: number, dto: UpdateTaskDto, userId: number) {
    // console.log('DTO recibido:', dto);
    const task = await this.repo.findOne({ where: { id }, relations: ['owner', 'organization'] });
    if (!task) throw new NotFoundException();
    /*
    if (user.role === 'Viewer' && task.owner.id !== userId) {
      throw new ForbiddenException('Viewer cannot edit others tasks');
    }*/
    /*
    if (user.role === 'Admin' && task.organization.id !== user.orgId) {
      throw new ForbiddenException('Admin outside org');
    }*/

    // Object.assign(task, dto);
    // return dto;
    this.repo.merge(task, dto);
    // task.title = "hola mundo";
    return this.repo.save(task);
  }

  async remove(id: number, userId: number) {
    const task = await this.repo.findOne({ where: { id }, relations: ['owner', 'organization'] });
    if (!task) throw new NotFoundException();
  /*
    if (user.role === 'Viewer') throw new ForbiddenException();
    if (user.role === 'Admin' && task.organization.id !== user.orgId) {
      throw new ForbiddenException();
    }
  */
    await this.repo.remove(task);
    return { success: true };
  }

}

