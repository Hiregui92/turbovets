import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
// import type Request from 'express';
import { Request as ExpressRequest } from 'express';
import { OrganizationsService } from './organization.service';
// import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';

@Controller('organizations')
//@UseGuards(JwtAuthGuard, PermissionsGuard)
export class OrganizationsController {
  constructor(private organizationsService: OrganizationsService) {}

  @Post()
  @Permissions('organization.create')
  async create(/*@Body() dto: CreateTaskDto, */@Req() req: ExpressRequest) {
    const user = req.user;
    return true;
    // return this.organizationsService.create(dto, user);
  }

  @Get()
  // @Permissions('organization.read')
  async findAll(@Req() req: ExpressRequest) {
    const user = req.user;
    // return true;
    return this.organizationsService.findAll();
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

