import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Survey } from 'src/entities/survey.entity';
import { SurveyModule } from 'src/survey/survey.module';
import { Users } from 'src/entities/user.entity';

@Module({
  imports: [
    SurveyModule,
    TypeOrmModule.forFeature([Question, Survey, Users]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}