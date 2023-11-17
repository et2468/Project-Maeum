import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from 'src/entities/survey.entity';
import { Users } from 'src/entities/user.entity';

@Injectable()
export class SurveyService {

  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async createSurvey(title: string, userId: number) {
    const user = await this.userRepository.findOneBy({id: userId})
    const survey = await this.surveyRepository.create({title, user})
    const savedSurvey = await this.surveyRepository.save(survey)
    return savedSurvey
  }

  async getAllSurveys() {
    return await this.surveyRepository.find()
  }

  async getUserSurveys(username: string) {
    const user = await this.userRepository.findOne({ where: { username }, relations: ['surveys'] });
    console.log(user)
    if (!user) {
      throw new HttpException('사용자의 설문이 없습니다.', HttpStatus.NOT_FOUND);
    }
    return user.surveys
  }
}
