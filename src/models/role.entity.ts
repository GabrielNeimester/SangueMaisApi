import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import User from './user.entity'


@Entity()
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_role!: number

  @Column()
  type!: string

  @OneToMany(()=> User, user => user.role)
  user!: User
}