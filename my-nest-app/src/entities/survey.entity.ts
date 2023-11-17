import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './user.entity';
import { Question } from './question.entity';

@Entity()
export class Survey {
  
	@PrimaryGeneratedColumn({ name: 'survey_id' })
	id: number;

  @ManyToOne(() => Users, (user) => user.surveys)
	@JoinColumn({ name: 'user_id' })
  user: Users;

  @OneToMany(() => Question, (question) => question.survey)
  questions: Question[];

	@Column()
	title: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}