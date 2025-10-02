import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.entity';
import { Organization } from './organization.entity';


@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Unique identifier for the task' })
  id!: number;

  @Column()
  @ApiProperty({ example: 'Implement login endpoint', description: 'Title of the task' })
  title!: string;

  @Column({ nullable: true })
  @ApiProperty({ 
    example: 'Develop the /auth/login endpoint with JWT authentication in NestJS.', 
    description: 'Detailed description of the task', 
    required: false 
  })
  description?: string;

  @Column({ default: 'todo' })
  @ApiProperty({ 
    example: 'in-progress', 
    description: 'Current status of the task', 
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  })
  status!: 'todo' | 'in-progress' | 'done';

  @Column({ nullable: true })
  @ApiProperty({ 
    example: 'Backend', 
    description: 'Optional category used to classify the task', 
    required: false 
  })
  category?: string;

  @ManyToOne(() => User, user => user.tasks)
  @ApiProperty({ 
    type: () => User, 
    description: 'User who owns the task' 
  })
  owner!: User;

  @ManyToOne(() => Organization)
  @ApiProperty({ 
    type: () => Organization, 
    description: 'Organization associated with the task' 
  })
  organization!: Organization;

  @CreateDateColumn()
  @ApiProperty({ 
    example: '2025-09-28T14:35:00.000Z', 
    description: 'Date when the task was created' 
  })
  createdAt!: Date;

  @UpdateDateColumn()
  @ApiProperty({ 
    example: '2025-09-29T09:10:00.000Z', 
    description: 'Date when the task was last updated' 
  })
  updatedAt!: Date;

}
