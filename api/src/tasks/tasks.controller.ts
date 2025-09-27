import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
// import type Request from 'express';
import { Request as ExpressRequest } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AttachUserIdGuard, ExpressRequestWithUserId } from '../auth/attach-user-id.guard';


@Controller('tasks')
//@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseGuards(AttachUserIdGuard, PermissionsGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @Permissions('task.create')
  async create(@Body() dto: CreateTaskDto, @Req() req: ExpressRequest) {
    const user = req.user;
    return this.tasksService.create(dto, user);
  }

  @Get()
  @Permissions('task.read')
  async findAll(@Req() req: ExpressRequestWithUserId) {
    if (req.userId === undefined) {
      throw new BadRequestException('User ID missing');
    }
    return this.tasksService.findAllForUser(req.userId);
  }
/*
  @Put(':id')
  @Permissions('task.update')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto, @Req() req: ExpressRequest) {
    const user = req.user;
    return this.tasksService.update(id, dto, user);
  }

  @Delete(':id')
  @Permissions('task.delete')
  async remove(@Param('id') id: string, @Req() req: ExpressRequest) {
    const user = req.user;
    return this.tasksService.remove(id, req.user);
  }*/
}

