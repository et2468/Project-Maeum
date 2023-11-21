import { Module } from '@nestjs/common';
import { SurveyService } from './suvey.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyController } from './survey.controller';
import { Survey } from 'src/entities/survey.entity';
import { Users } from 'src/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Survey, Users]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService],
  exports: [SurveyService],
})
export class SurveyModule {}