// attach-user-id.guard.ts
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

export interface ExpressRequestWithUserId extends ExpressRequest {
  userId?: number;
}

@Injectable()
export class AttachUserIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: ExpressRequestWithUserId = context.switchToHttp().getRequest();

    const userIdHeader = req.headers['x-user-id'];

    if (!userIdHeader) {
      throw new BadRequestException('User ID header missing Guard');
    }

    // Si viene como array, tomamos el primer valor; si es string, convertimos a number
    const userId = Array.isArray(userIdHeader)
      ? Number(userIdHeader[0])
      : Number(userIdHeader);

    if (isNaN(userId)) {
      throw new BadRequestException('User ID is not a valid number');
    }

    // Adjuntamos el userId al request
    req.userId = userId;

    return true;
  }
}

