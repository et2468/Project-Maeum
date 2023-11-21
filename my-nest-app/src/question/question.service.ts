import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { Survey } from 'src/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {

 constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
  ) {}

  async createQuestion(title: string, surveyId: number) {
    const survey = await this.surveyRepository.findOneBy({id: surveyId})
    if (!survey) {
      throw new HttpException('설문지가 없습니다.', HttpStatus.NOT_FOUND)
    }
    if (!title.trim()) {
      throw new HttpException('제목을 입력하세요.', HttpStatus.BAD_REQUEST)
    }
    const question = await this.questionRepository.create({title, survey})
    const savedQuestion = await this.questionRepository.save(question);
    return savedQuestion
  }

  async getQuestion(questionId: number) {
    const question = await this.questionRepository.findOneBy({id: questionId})
    if (!question) {
      throw new HttpException('해당 문항은 없습니다.', HttpStatus.NOT_FOUND);
    }
    return question
  }

  async updateQuestion(title: string, questionId: number) {
    const question = await this.questionRepository.findOneBy({id: questionId})
    if (!question) {
      throw new HttpException('해당 문항은 없습니다.', HttpStatus.NOT_FOUND);
    }
    if (!title.trim()) {
      throw new HttpException('제목을 입력하세요.', HttpStatus.BAD_REQUEST)
    }
    question.title = title;
    return await this.surveyRepository.save(question);
  }

  async deleteSurveys(questionId: number) {
    const result = await this.questionRepository.delete({id: questionId})
    if (result.affected === 0) {
      throw new HttpException('해당 문항이 없습니다.', HttpStatus.NOT_FOUND);
    }
  }
}