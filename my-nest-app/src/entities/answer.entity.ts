import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Question } from './question.entity';
import { UserAnswer } from './user-answer.entity';

@Entity()
export class Answer {
  
  @PrimaryGeneratedColumn({ name: 'answer_id' })
  id: number;

  @ManyToOne(() => Question, (question) => question.answers, {onDelete: 'CASCADE'})
	@JoinColumn({ name: 'question_id' })
  question: Question;

  @OneToMany(() => UserAnswer, userAnswer => userAnswer.answer, { cascade: true, onDelete: 'CASCADE' })
  userAnswer: UserAnswer[];
  
  @Column()
  title: string;

  @Column()
  score: number;
}