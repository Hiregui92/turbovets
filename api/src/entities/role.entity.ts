import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string; // Owner, Admin, Viewer

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable()
  permissions!: Permission[];

  // optional parent role to implement inheritance
  /*@Column({ nullable: true })
  parentRoleName?: string;
 */
 @ManyToOne(() => Role, (role: Role) => role.children, { nullable: true })
 @JoinColumn({ name: 'parent_role_id' })
 parentRole?: Role;

 @OneToMany(() => Role, (role: Role) => role.parentRole)
 children!: Role[];
}

