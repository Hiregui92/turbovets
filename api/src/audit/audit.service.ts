import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditLog } from '../entities/audit-log.entity';
import { Repository } from 'typeorm';
import * as winston from 'winston';

@Injectable()
export class AuditService {
  private logger = winston.createLogger({
    transports: [new winston.transports.Console()]
  });

  constructor(@InjectRepository(AuditLog) private repo: Repository<AuditLog>) {}

  async log(actorId: number, actorEmail: string, action: string, metadata?: any) {
    const userIdString: string = actorId.toString();
    this.logger.info('audit', { userIdString, actorEmail, action, metadata });
    const entry = this.repo.create({ actorId: userIdString, actorEmail, action, metadata });
    await this.repo.save(entry);
  }

  async getAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
}

