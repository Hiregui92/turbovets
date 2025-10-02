import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req, BadRequestException } from '@nestjs/common';
// import type Request from 'express';
import { Request as ExpressRequest } from 'express';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AttachUserIdGuard, ExpressRequestWithUserId } from '../auth/attach-user-id.guard';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@ApiTags('users')
@Controller('tasks')
//@UseGuards(JwtAuthGuard, PermissionsGuard)
@UseGuards(AttachUserIdGuard, PermissionsGuard)
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  @Permissions('task.create')
  async create(@Body() dto: CreateTaskDto, @Req() req: ExpressRequestWithUserId) {
    if (req.userId === undefined) {
      throw new BadRequestException('User ID missing');
    }
    // const user = req.user;
    return this.tasksService.create(dto, req.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, description: 'List of tasks returned successfully' })
  @Permissions('task.read')
  async findAll(@Req() req: ExpressRequestWithUserId) {
    if (req.userId === undefined) {
      throw new BadRequestException('User ID missing');
    }
    return this.tasksService.findAllForUser(req.userId);
  }

  @Get(':id')
  @Permissions('task.read')
  async findOne(@Param('id') id: number, @Req() req: ExpressRequestWithUserId) {
    if (req.userId === undefined) {
      throw new BadRequestException('User ID missing');
    }
    const task = await this.tasksService.findOneForUser(id, req.userId);
    if (!task) {
      throw new BadRequestException('Task not found or access denied');
    }
    return task;
  }


  @Put(':id')
  @Permissions('task.update')
  async update(@Param('id') id: number, @Body() dto: UpdateTaskDto, @Req() req: ExpressRequestWithUserId) {
    console.log('req.body:', req.body);
    console.log('DTO:', dto);
    if (req.userId === undefined) {
      throw new BadRequestException('User ID missing');
    }
    // ehrow new BadRequestException(dto);
    // const user = req.user;
    return this.tasksService.update(id, dto, req.userId);
  }

  @Delete(':id')
  @Permissions('task.delete')
  async remove(@Param('id') id: number, @Req() req: ExpressRequestWithUserId) {
    if (req.userId === undefined) {
      throw new BadRequestException('User ID missing');
    }

    // const user = req.user;
    return this.tasksService.remove(id, req.userId);
  }
}

