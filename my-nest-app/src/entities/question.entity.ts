import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { Answer } from './answer.entity';
import { UserQuestion } from './user-question.entity';

@Entity()
export class Question {
  
  @PrimaryGeneratedColumn({ name: 'question_id' })
  id: number;

  @ManyToOne(() => Survey, (survey) => survey.questions, {onDelete: 'CASCADE'})
	@JoinColumn({ name: 'survey_id' })
  survey: Survey;

  @OneToMany(() => Answer, answer => answer.question, { eager: true, cascade: true, onDelete: 'CASCADE' })
  answers: Answer[];

  @OneToMany(() => UserQuestion, userQuestion => userQuestion.question, { cascade: true, onDelete: 'CASCADE' })
  userQuestion: UserQuestion[];

  @Column()
  title: string;
}