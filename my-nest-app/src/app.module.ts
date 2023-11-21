import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { SurveyModule } from './survey/survey.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { UserSurvey } from './entities/user-survey.entity';
import { UserSurveyModule } from './user-survey/user-survey.module';
import { UserQuestion } from './entities/user-question.entity';
import { UserAnswer } from './entities/user-answer.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'maeum',
      password: 'maeum',
      database: 'maeum',
      synchronize: true,
      entities: [Users, Survey, Question, Answer, UserSurvey, UserQuestion, UserAnswer],
    }),
    PassportModule,
    UserModule,
    AuthModule,
    SurveyModule,
    QuestionModule,
    AnswerModule,
    UserSurveyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}