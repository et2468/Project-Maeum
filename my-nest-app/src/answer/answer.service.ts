import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/entities/answer.entity';
import { Question } from 'src/entities/question.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswerService {

 constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
  ) {}

  async createAnswer(title: string, score: number, questionId: number) {
    const question = await this.questionRepository.findOneBy({id: questionId})
    if (!question) {
      throw new HttpException('해당 문항은 없습니다.', HttpStatus.NOT_FOUND);
    }
    const answer = await this.answerRepository.create({title, score, question})
    const savesAnswer =  await this.answerRepository.save(answer)
    return savesAnswer
  }

  async updateAnswer(title: string, score: number, answerId: number) {
    const answer = await this.answerRepository.findOneBy({id: answerId})
    if (!answer) {
      throw new HttpException('해당 답변은 없습니다.', HttpStatus.NOT_FOUND);
    }
    answer.title = title
    answer.score = score
    const savesAnswer =  await this.answerRepository.save(answer)
    return savesAnswer
  }

  async deleteSurveys(answerId: number) {
    const result = await this.answerRepository.delete({id: answerId})
    if (result.affected === 0) {
      throw new HttpException('해당 답변은 없습니다.', HttpStatus.NOT_FOUND);
    }
  }
}