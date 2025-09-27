import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuditService } from './audit.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Permissions } from '../auth/permissions.decorator';
import { PermissionsGuard } from '../auth/permissions.guard';
import { AttachUserIdGuard, ExpressRequestWithUserId } from '../auth/attach-user-id.guard';

@Controller('audit-log')
// @UseGuards(JwtAuthGuard, PermissionsGuard)
@UseGuards(AttachUserIdGuard, PermissionsGuard)
export class AuditController {
  constructor(private auditService: AuditService) {}

  @Get()
  @Permissions('audit.read')
  async findAll(@Request() req: ExpressRequestWithUserId) {
    // Permissions guard ensures Owner/Admin only
    return this.auditService.getAll();
  }
}

