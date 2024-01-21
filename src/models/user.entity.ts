import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import Token from './token.entity'
import Bloodcenter from './bloodcenter.entity'
import Free_Date from './freeDate.entity'
import DateHour from './dateHour.entity'
import Custom_Question from './customQuestion.entity'
import Role from './role.entity'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  password!: string

  @ManyToOne(() => Role, role => role.user)
  role!: Role

  @ManyToOne(() => Bloodcenter, bloodcenter => bloodcenter.user)
  bloodcenter?: Bloodcenter;

  @OneToMany(() => Free_Date, free_date => free_date.user)
  free_date!:Free_Date

  @OneToMany(() => DateHour, date_hour => date_hour.user)
  date_hour!:DateHour

  @OneToMany(()=> Custom_Question, custom_question => custom_question.user)
  custom_question!: Custom_Question[]

  @OneToMany(() => Token, token => token.user)
tokens!: Token[]
}