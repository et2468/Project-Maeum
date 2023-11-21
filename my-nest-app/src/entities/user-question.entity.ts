import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Question } from './question.entity';
import { UserSurvey } from './user-survey.entity';
import { UserAnswer } from './user-answer.entity';

@Entity()
export class UserQuestion {
  
  @PrimaryGeneratedColumn({ name: 'user_question_id' })
  id: number;

  @ManyToOne(() => Question, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'question_id' })
  question: Question

  @ManyToOne(() => UserSurvey, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_survey_id' })
  userSurvey: UserSurvey

  @OneToMany(() => UserAnswer, userAnswer => userAnswer.userQuestion, { eager:true, cascade: true, onDelete: 'CASCADE' })
  userAnswers: UserAnswer[];
}