import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditService } from './audit.service';
import { AuditLog } from '../entities/audit-log.entity';
import { AuditController } from './audit.controller';
import { UsersModule } from '../users/users.module';
import { RoleModule } from '../roles/role.module';

@Module({
	imports: [
	    TypeOrmModule.forFeature([AuditLog]),
	    UsersModule,
	    RoleModule,
  	],
	//imports: [TypeOrmModule.forFeature([AuditLog])],
	providers: [AuditService],
	controllers: [AuditController],
  	exports: [AuditService],
})
export class AuditModule {}

