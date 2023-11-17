import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { UserAnswer } from './user_answer.entity';

@Entity()
export class Users {
  
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @OneToMany(() => Survey, (survey) => survey.user)
  surveys: Survey[]

  @OneToMany(() => UserAnswer, (user_answer) => user_answer.user)
  userAnswers: UserAnswer[]

  @Column()
  username: string;

  @Column()
  password: string;
}