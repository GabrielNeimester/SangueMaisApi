import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import DateHour from './dateHour.entity'
import Bloodcenter from './bloodcenter.entity'


@Entity()
export default class Donation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_donation!: number

  @Column()
  donor_name!: string

  @ManyToOne(() => DateHour, date_hour => date_hour.donation)
  date_hour!: DateHour

  @Column()
  impediment!: string

  @Column()
  creation_date!: Date

  @Column()
  donation_status!: string

  @ManyToOne(() => Bloodcenter, bloodcenter => bloodcenter.donation)
  bloodcenter!: Bloodcenter

}