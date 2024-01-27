import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import User from './user.entity'
import Donation from './donation.entity'

@Entity()
export default class DateHour extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_date_hour!: number

  @Column()
  start_hour!: Date

  @Column()
  finish_hour!: Date

  @Column()
  spaces!: number

  @Column({name: 'user_id'})
  userId!: number

  
  @ManyToOne(() => User, user => user.date_hour)
  user!: User

  @OneToMany(() => Donation, donation => donation.date_hour)
  donation!: Donation
}