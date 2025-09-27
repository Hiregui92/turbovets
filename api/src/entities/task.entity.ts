import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Organization } from './organization.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number; // <-- el "!" indica que TypeORM se encargará

  @Column()
  title!: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 'todo' })
  status!: 'todo' | 'in-progress' | 'done';

  @Column({ nullable: true })
  category?: string;

  @ManyToOne(() => User, user => user.tasks)
  owner!: User;

  @ManyToOne(() => Organization)
  organization!: Organization;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

