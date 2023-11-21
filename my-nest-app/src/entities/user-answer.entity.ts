import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Answer } from './answer.entity';
import { UserQuestion } from './user-question.entity';

@Entity()
export class UserAnswer {
  
  @PrimaryGeneratedColumn({ name: 'user_answer_id' })
  id: number;

  @ManyToOne(() => Answer, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;

  @ManyToOne(() => UserQuestion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_question_id' })
  userQuestion: UserQuestion;
}