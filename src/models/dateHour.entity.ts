import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import User from './user.entity'
import Donation from './donation.entity'
import Bloodcenter from './bloodcenter.entity'
import Free_Date from './freeDate.entity'

@Entity()
export default class DateHour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_date_hour!: number

  @Column({ type: 'time' })
  start_hour!: Date

  @Column({ type: 'time' })
  finish_hour!: Date

  @Column()
  isActive!: boolean

  @ManyToOne(() => Free_Date, free_date => free_date.dateHour)
  free_date!: Free_Date

  @ManyToOne(() => User, user => user.date_hour)
  user!: User

  @OneToMany(() => Donation, donation => donation.date_hour)
  donation!: Donation
}