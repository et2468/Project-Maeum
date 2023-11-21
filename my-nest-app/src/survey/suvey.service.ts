import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from 'src/entities/survey.entity';
import { Users } from 'src/entities/user.entity';
import { Question } from 'src/entities/question.entity';

@Injectable()
export class SurveyService {

  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createSurvey(title: string, createrId: number) {
    const creater = await this.userRepository.findOneBy({id: createrId})
    if (!creater) {
      throw new HttpException('해당 사용자는 없습니다.', HttpStatus.NOT_FOUND);
    }
    const survey = await this.surveyRepository.create({title, creater})
    const savedSurvey = await this.surveyRepository.save(survey)
    return savedSurvey
  }

  async getAllSurveys() {
    return await this.surveyRepository.find()
  }

  async getUserSurveys(username: string) {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['createdSurveys'] });
    console.log(user)
    if (!user) {
      throw new HttpException('사용자가 없습니다.', HttpStatus.NOT_FOUND);
    }
    return user.createdSurveys
  }

  async getSurveys(surveyId: number) {
    const survey = await this.surveyRepository.findOne({
      where: { id: surveyId },
      relations: ['questions', 'questions.answers'],
    });

    if (!survey) {
      throw new HttpException('해당 설문지가 없습니다.', HttpStatus.NOT_FOUND);
    }
    
    return survey
  }

  async updateSurveys(surveyId: number, title: string) {
    const survey = await this.surveyRepository.findOneBy({id: surveyId})
    if (!survey) {
      throw new HttpException('해당 설문지가 없습니다.', HttpStatus.NOT_FOUND);
    }
    survey.title = title;
    return await this.surveyRepository.save(survey);
  }

  async deleteSurveys(surveyId: number) {
    const result = await this.surveyRepository.delete({id: surveyId})
    if (result.affected === 0) {
      throw new HttpException('해당 설문지가 없습니다.', HttpStatus.NOT_FOUND);
    }
  }
}
