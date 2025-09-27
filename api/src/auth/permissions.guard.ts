import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from './permissions.decorator';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersService: UsersService,
    private rolesService: RolesService,
    private auditService: AuditService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    const req = context.switchToHttp().getRequest();
    const userId = req.userId;
    if (!userId) throw new ForbiddenException('Unauthenticated USERID');

    const user = await this.usersService.findById(userId);

    if (!user) throw new ForbiddenException('Unauthenticated USER');

    if (!user.role) {
      await this.auditService.log(user.id, user.email, 'permission_denied', { required });
      throw new ForbiddenException('User has no role assigned');
    }

    // load role and permissions
    const role = await this.rolesService.findByName(user.role.name);
    if (!role) {
      await this.auditService.log(user.id, user.email, 'permission_denied', { required });
      throw new ForbiddenException('Role not found');
    }
    
    const permissions = (role.permissions || []).map(p => p.name);
    // role inheritance: if parent role exists, add parent's permissions
    const parentName = role.parentRole?.name ?? null;
    if (parentName) {
      const parent = await this.rolesService.findByName(parentName);
      permissions.push(...(parent?.permissions ?? []).map(p => p.name));
    }

    const allowed = required ? required.every(r => permissions.includes(r)) : true;

    if (!allowed) {
      await this.auditService.log(user.id, user.email, 'permission_denied', { required });
    } else {
      await this.auditService.log(user.id, user.email, 'permission_granted', { required });
    }
    return allowed;
    //return true;
  }
    //await this.auditService.log(user.id, user.email, 'permission_denied', { required });
    //return true;
  //}
}

