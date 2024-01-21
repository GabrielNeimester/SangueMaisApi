import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Bloodcenter from './bloodcenter.entity'
import User from './user.entity'


@Entity()
export default class Free_Date extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_date!: number

  @Column()
  date!: Date

  @ManyToOne(() => Bloodcenter, bloodcenter => bloodcenter.free_date)
  bloodcenter!: Bloodcenter



  @ManyToOne(() => User, user => user.free_date)
  user!: User
}