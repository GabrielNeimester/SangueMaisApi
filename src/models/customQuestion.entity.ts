import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import User from './user.entity'
import Question_Option from './questionOption.entity'
import Bloodcenter from './bloodcenter.entity'

@Entity()
export default class Custom_Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_question!: number

  @Column()
  question_number!: number

  @Column()
  description!: string

  @ManyToOne(() => Bloodcenter, bloodcenter => bloodcenter.custom_question)
  bloodcenter!: Bloodcenter

  @ManyToOne(() => User, user => user.custom_question)
  user!: User

  @OneToMany(() => Question_Option, option => option.custom_question)
  option!: Question_Option
}