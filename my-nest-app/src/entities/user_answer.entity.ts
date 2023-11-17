import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Users } from './user.entity';
import { Question } from './question.entity';

@Entity()
export class UserAnswer {

	@PrimaryGeneratedColumn({ name: 'user_answer_id' })
	id: number;

  @ManyToOne(() => Users, (user) => user.surveys)
	@JoinColumn({ name: 'user_id' })
  user: Users;

  @ManyToOne(() => Question, (question) => question.userAnswers)
	@JoinColumn({ name: 'question_id' })
  question: Question;

	@Column({ name: 'answer_number' })
  answerNumber: number;
}