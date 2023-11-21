import { Module } from '@nestjs/common';
import { UserSurveyService } from './user-suvey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSurveyController } from './user-survey.controller';
import { Survey } from 'src/entities/survey.entity';
import { Users } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserSurvey } from 'src/entities/user-survey.entity';
import { SurveyModule } from 'src/survey/survey.module';
import { UserAnswer } from 'src/entities/user-answer.entity';
import { UserQuestion } from 'src/entities/user-question.entity';
import { Question } from 'src/entities/question.entity';
import { Answer } from 'src/entities/answer.entity';

@Module({
  imports: [
    UserModule,
    SurveyModule,
    TypeOrmModule.forFeature([Survey, Question, Answer, Users, UserSurvey, UserQuestion, UserAnswer]),
  ],
  controllers: [UserSurveyController],
  providers: [UserSurveyService],
  exports: [UserSurveyService],
})
export class UserSurveyModule {}