import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import Bloodcenter from './bloodcenter.entity'
import User from './user.entity'
import DateHour from './dateHour.entity'


@Entity()
export default class Free_Date extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_date!: number

  @Column({ unique: true})
  date!: string

  @Column()
  isActive!: boolean

  @ManyToOne(() => Bloodcenter, bloodcenter => bloodcenter.free_date)
  bloodcenter!: Bloodcenter

  @ManyToOne(() => User, user => user.free_date)
  user!: User

  @OneToMany(() => DateHour, dateHour => dateHour.free_date)
  dateHour!: DateHour
}