import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, ManyToMany, OneToMany, JoinColumn } from 'typeorm';
import { Users } from './user.entity';
import { Question } from './question.entity';
import { UserSurvey } from './user-survey.entity';

@Entity()
export class Survey {
  
	@PrimaryGeneratedColumn({ name: 'survey_id' })
	id: number;

  @ManyToOne(() => Users, (user) => user.createdSurveys)
	@JoinColumn({ name: 'user_id' })
  creater: Users;

  @ManyToMany(() => Users, user => user.performedSurveys)
  performers: Users[];

  @OneToMany(() => UserSurvey, userSurvey => userSurvey.survey)
  userSurveys: UserSurvey[];

  @OneToMany(() => Question, (question) => question.survey, { cascade: true, onDelete: 'CASCADE' })
  questions: Question[];

	@Column()
	title: string;

	@CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}