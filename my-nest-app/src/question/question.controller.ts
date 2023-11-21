import { Body, Controller, Get, Delete, Res, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { QuestionService } from './question.service';

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':surveyId')
  async createQuestion(@Param('surveyId') surveyId: number, @Body() body: { title: string }, @Res() res) {
    const { title } = body;
    try {
      const question = await this.questionService.createQuestion(title, surveyId)
      return res.status(HttpStatus.CREATED).json({
        message: "문항이 생성되었습니다."
      }) 
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':questionId')
  async getQuestion(@Param('questionId') questionId: number, @Res() res) {
    try {
      const question = await this.questionService.getQuestion(questionId)
      return res.status(HttpStatus.CREATED).json({
        question
      }) 
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }


  @UseGuards(JwtAuthGuard)
  @Put(':questionId')
  async updateQuestion(@Param('questionId') questionId: number, @Body() body: { title: string }, @Res() res) {
    const { title } = body;
    try {
      const question = await this.questionService.updateQuestion(title, questionId)
      return res.status(HttpStatus.CREATED).json({
        message: "문항이 수정되었습니다."
      }) 
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':questionId')
  async deleteSurvey(@Param('questionId') questionId: number,  @Res() res) {
    try {
      const survey = await this.questionService.deleteSurveys(questionId);
      return res.status(HttpStatus.OK).json({
        message: "문항이 삭제되었습니다."
      })
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }
}