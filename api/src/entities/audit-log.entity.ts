
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class AuditLog {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  actorId!: string;

  @Column()
  actorEmail!: string;

  @Column()
  action!: string;

  @Column('json', { nullable: true })
  metadata?: any;

  @CreateDateColumn()
  createdAt!: Date;
}

