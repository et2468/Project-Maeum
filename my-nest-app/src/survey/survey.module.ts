import { Module } from '@nestjs/common';
import { SurveyService } from './suvey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './survey.controller';
import { Survey } from 'src/entities/survey.entity';
import { Users } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, Users]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService, UserService],
  exports: [SurveyService, UserService],
})
export class SurveyModule {}