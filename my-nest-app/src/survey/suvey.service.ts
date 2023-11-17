import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from 'src/entities/survey.entity';

@Injectable()
export class SurveyService {

  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}


  async createSurvey(title: string) {
    const survey = this.surveyRepository.create({title,})
    this.surveyRepository.save(survey)
    console.log(survey)
  }

}
