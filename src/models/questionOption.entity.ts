import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import Custom_Question from './customQuestion.entity'

@Entity()
export default class Question_Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id_option!: number

  @Column()
  description!: string

  @Column()
  impediment! : string

  @Column( { nullable: true })
  impedimentDays?: number

  @ManyToOne(() => Custom_Question, custom_question => custom_question.option)
  custom_question!: Custom_Question

}