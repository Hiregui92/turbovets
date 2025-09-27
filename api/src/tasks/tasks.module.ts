import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from '../entities/task.entity';
import { UsersModule } from '../users/users.module';
import { RoleModule } from '../roles/role.module';
import { AttachUserIdGuard } from '../auth/attach-user-id.guard';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    RoleModule,
    AuditModule
  ],
  controllers: [TasksController],
  providers: [TasksService, AttachUserIdGuard, PermissionsGuard],
})
export class TasksModule {}

