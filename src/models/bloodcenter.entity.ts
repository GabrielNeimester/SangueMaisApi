import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import User from './user.entity'
import Free_Date from './freeDate.entity'
import Custom_Question from './customQuestion.entity'
import Donation from './donation.entity'


@Entity()
export default class Bloodcenter extends BaseEntity {
  @PrimaryGeneratedColumn()
  cod_bloodcenter!: number

  @Column()
  cpnj!: string

  @Column()
  nome!: string

  @Column()
  estado!: string

  @Column()
  cidade!: string

  @Column()
  bairro!: string

  @Column()
  telefone!: string

  @Column()
  email!: string

  @OneToMany(() => User, user => user.bloodcenter)
  user?: User[];

  @OneToMany(() => Free_Date, free_date => free_date.bloodcenter)
  free_date!: Free_Date[]

  @OneToMany(()=> Custom_Question, custom_question => custom_question.bloodcenter)
  custom_question!: Custom_Question[]

  @OneToMany(() => Donation, donation => donation.bloodcenter)
  donation!: Donation[]
}