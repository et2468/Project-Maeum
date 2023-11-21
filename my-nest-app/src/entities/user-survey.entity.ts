import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { Users } from './user.entity';
import { UserQuestion } from './user-question.entity';

@Entity()
export class UserSurvey {
  
  @PrimaryGeneratedColumn({ name: 'user_survey_id' })
  id: number;

  @ManyToOne(() => Users, user => user.userSurvey, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'user_id' })
  performer: Users;
  
  @ManyToOne(() => Survey, (survey) => survey.userSurveys, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'survey_id' })
  survey: Survey

  @OneToMany(() => UserQuestion, userQuestion => userQuestion.userSurvey, { cascade: true, onDelete: 'CASCADE' })
  userQuestions: UserQuestion[];
}