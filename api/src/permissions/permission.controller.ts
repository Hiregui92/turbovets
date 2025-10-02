import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
// import type Request from 'express';
import { Request as ExpressRequest } from 'express';
import { PermissionService } from './permission.service';
// import { CreateTaskDto, UpdateTaskDto } from '../dtos/task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';

@Controller('permissions')
//@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Post()
  @Permissions('permission.create')
  async create(/*@Body() dto: CreateTaskDto, */@Req() req: ExpressRequest) {
    const user = req.user;
    return true;
    // return this.organizationsService.create(dto, user);
  }

  @Get()
  @Permissions('permission.read')
  async findAll(@Req() req: ExpressRequest) {
    const user = req.user;
    return this.permissionService.findAll();
  }

}

