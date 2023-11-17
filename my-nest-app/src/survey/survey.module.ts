import { Module } from '@nestjs/common';
import { SurveyService } from './suvey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './survey.controller';
import { Survey } from 'src/entities/survey.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}