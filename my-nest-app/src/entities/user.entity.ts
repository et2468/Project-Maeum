import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Survey } from './survey.entity';
import { UserSurvey } from './user-survey.entity';

@Entity()
export class Users {
  
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @OneToMany(() => Survey, (survey) => survey.creater)
  createdSurveys: Survey[]

  @ManyToMany(() => Survey, (survey) => survey.performers)
  performedSurveys: Survey[]

  @OneToMany(() => UserSurvey, userSurvey => userSurvey.performer, { cascade: true, onDelete: 'CASCADE' })
  userSurvey: UserSurvey[];

  @Column()
  username: string;

  @Column()
  password: string;
}