import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { Answer } from './answer.entity';
import { UserAnswer } from './user_answer.entity';

@Entity()
export class Question {
  
  @PrimaryGeneratedColumn({ name: 'question_id' })
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.questions)
	@JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @OneToMany(() => UserAnswer, (userAnswer) => userAnswer.question)
  @JoinColumn({ name: 'user_answer_id' })
  userAnswers: UserAnswer[];

  @Column()
  title: string;
}