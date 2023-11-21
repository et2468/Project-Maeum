import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Survey } from 'src/entities/survey.entity';
import { Users } from 'src/entities/user.entity';
import { Answer } from 'src/entities/answer.entity';
import { AnswerController } from './answer.controller';
import { QuestionModule } from 'src/question/question.module';
import { AnswerService } from './answer.service';

@Module({
  imports: [
    QuestionModule,
    TypeOrmModule.forFeature([Question, Survey, Users, Answer]),
  ],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}