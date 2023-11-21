import { Body, Controller, Get, Delete, Res, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { AnswerService } from './answer.service';

@Controller('answer')
export class AnswerController {
  constructor(
    private readonly answerService: AnswerService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':questionId')
  async createAnswer(@Param('questionId') questionId: number, @Body() body: { title: string, score: number }, @Res() res) {
    const { title, score } = body;
    try {
      const answer = await this.answerService.createAnswer(title, score, questionId)
      return res.status(HttpStatus.CREATED).json({
        message: "답변이 생성되었습니다."
      }) 
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':answerId')
  async updateAnswer(@Param('answerId') answerId: number, @Body() body: { title: string, score: number }, @Res() res) {
    const { title, score } = body;
    try {
      const answer = await this.answerService.updateAnswer(title, score, answerId)
      return res.status(HttpStatus.CREATED).json({
        message: "답변이 수정되었습니다."
      }) 
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':answerId')
  async deleteSurvey(@Param('answerId') answerId: number, @Res() res) {
    try {
      const survey = await this.answerService.deleteSurveys(answerId);
      return res.status(HttpStatus.OK).json({
        message: "답변이 삭제 되었습니다."
      })
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }
}