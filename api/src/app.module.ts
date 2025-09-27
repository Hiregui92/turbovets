import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';
import { OrganizationsModule } from './organizations/organization.module';
import { RoleModule } from './roles/role.module';
import { UsersModule } from './users/users.module';
import { AuditModule } from './audit/audit.module';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Organization } from './entities/organization.entity';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';
import { Task } from './entities/task.entity';
import { AuditLog } from './entities/audit-log.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.DB_TYPE as any || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: +(process.env.DB_PORT || 5432),
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASS || 'postgres',
        database: process.env.DB_NAME || 'taskdb',
        entities: [User, Organization, Role, Permission, Task, AuditLog],
        // synchronize: process.env.TYPEORM_SYNC === 'true',
        autoLoadEntities: true,
	synchronize: true,
	migrationsRun: false,
        logging: true
      })
    }),
    TypeOrmModule.forFeature([User, Organization, Role, Permission, Task, AuditLog]),
    AuthModule,
    UsersModule,
    TasksModule,
    OrganizationsModule,
    RoleModule,
    AuditModule
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}


