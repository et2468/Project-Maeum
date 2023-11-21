import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Survey } from 'src/entities/survey.entity';
import { Users } from 'src/entities/user.entity';
import { UserSurvey } from 'src/entities/user-survey.entity';
import { UserQuestion } from 'src/entities/user-question.entity';
import { UserAnswer } from 'src/entities/user-answer.entity';
import { Question } from 'src/entities/question.entity';
import { Answer } from 'src/entities/answer.entity';

@Injectable()
export class UserSurveyService {

  constructor(
    @InjectRepository(Survey)
    private surveyRepository: Repository<Survey>,
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(UserSurvey)
    private userSurveyRepository: Repository<UserSurvey>,
    @InjectRepository(UserQuestion)
    private userQuestionRepository: Repository<UserQuestion>,
    @InjectRepository(UserAnswer)
    private userAnswerRepository: Repository<UserAnswer>,
  ) {}

  async writeSurvey(userId: number, writedSurvey:Survey) {
    const performer = await this.userRepository.findOneBy({id: userId})
    if (!performer) {
      throw new HttpException('해당 사용자는 없습니다.', HttpStatus.NOT_FOUND);
    }

    const survey = await this.surveyRepository.findOneBy({id: writedSurvey.id})
    if (!survey) {
      throw new HttpException('해당 설문지는 없습니다.', HttpStatus.NOT_FOUND);
    }

    const userSurveyToSave = await this.userSurveyRepository.create({performer, survey})
    const userSurvey = await this.userSurveyRepository.save(userSurveyToSave)

    for (const question of writedSurvey.questions) {
      const userQuestionToSave = await this.userQuestionRepository.create({question, userSurvey})
      const userQuestion = await this.userQuestionRepository.save(userQuestionToSave)
      for (const answer of question.answers) {
        const userSurveyAnswer = await this.userAnswerRepository.create({userQuestion, answer})
        await this.userAnswerRepository.save(userSurveyAnswer)
      }
    }
  }

  async getAllWritedSurvey(userId: number) {
    const performer = await this.userRepository.findOneBy({id: userId})
    if (!performer) {
      throw new HttpException('해당 사용자는 없습니다.', HttpStatus.NOT_FOUND);
    }

    const writedSurvey = await this.userSurveyRepository.find({ 
      where: { performer },
      relations: ['survey']

    });
    return writedSurvey
  }

  async getWritedSurvey(writedSurveyId: number) {
    const writedSurvey = await this.userSurveyRepository.findOne({
      where: { id: writedSurveyId },
      relations: ['userQuestions', 'userQuestions.userAnswers', 'userQuestions.userAnswers.answer', 'userQuestions.question']
    })
    return writedSurvey
  }

  async updateWritedSurvey(reWritedSurvey: UserSurvey) {
    const existingUserSurvey = await this.userSurveyRepository.findOneBy({id: reWritedSurvey.id})
    if (!existingUserSurvey){
      throw new HttpException('해당 설문지를 작성한적 없습니다.', HttpStatus.NOT_FOUND);
    }
    
    const existingSurvey = await this.surveyRepository.findOneBy({id: reWritedSurvey.id})
    for (const reWritedUserQuestion of reWritedSurvey.userQuestions) {
      const existingQuestion = await this.questionRepository
        .createQueryBuilder('question')
        .where('question_id = :id', {id: reWritedUserQuestion.id})
        .andWhere('question.survey = :survey', { survey: existingSurvey.id })
        .getOne();

      if (!existingQuestion) {
        throw new HttpException('설문지에 해당 문항이 없습니다.', HttpStatus.NOT_FOUND);
      }
      console.log('#', existingQuestion)
      for (const rewritedUserAnswer of reWritedUserQuestion.userAnswers) {

        console.log(existingQuestion.id, rewritedUserAnswer.answer.id)
        
        const answerToConvet = await this.answerRepository
          .createQueryBuilder('answer')
          .where('answer_id = :id', {id: rewritedUserAnswer.answer.id})
          .andWhere('answer.question = :question', { question: existingQuestion.id })
          .getOne();
        if (!answerToConvet) {
          throw new HttpException('문항에 해당 답변이 없습니다.', HttpStatus.NOT_FOUND);
        }
        console.log('##', answerToConvet)
        
        await this.userAnswerRepository
        .createQueryBuilder()
        .update()
        .set({ answer: answerToConvet })
        .where("id = :rewritedUserAnswer", { rewritedUserAnswer: rewritedUserAnswer.id })
        .execute();
      }
    }
  }  

  async deleteWritedSurvey(writedSurveyId: number) {
    const result = await this.userSurveyRepository.delete({id: writedSurveyId})
    if (result.affected === 0) {
      throw new HttpException('해당 설문지를 작성한 적 없습니다.', HttpStatus.NOT_FOUND);
    }
  } 
}