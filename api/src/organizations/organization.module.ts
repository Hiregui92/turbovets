/*import { Module } from '@nestjs/common';

@Module({})
export class TasksModule {}
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationsController } from './organization.controller';
import { OrganizationsService } from './organization.service';
import { Organization } from '../entities/organization.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Organization]),
    UsersModule
  ],
  controllers: [OrganizationsController],
  providers: [OrganizationsService],
})
export class OrganizationsModule {}

