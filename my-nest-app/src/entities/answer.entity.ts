import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class Answer {
  
  @PrimaryGeneratedColumn({ name: 'answer_id' })
  id: number;

  @ManyToOne(() => Question, (question) => question.answers)
	@JoinColumn({ name: 'question_id' })
  question: Question;

  @Column()
  title: string;

  @Column()
  score: number;
}