import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { SurveyService } from './suvey.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSurvey(@Body() body: { title: string, userId: number }) {
    const { title, userId } = body;
    try {
      const survey = await this.surveyService.createSurvey(title, userId)
      return survey.id
    } catch (e) {
      if (e instanceof HttpException) {
        throw e
      }
      throw new HttpException('게시판 생성중 오류가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllSurveys() {
    try {
      const surveys = await this.surveyService.getAllSurveys()
      return surveys
    } catch (e) {
      if (e instanceof HttpException) {
        throw e
      }
      throw new HttpException('게시판 조회중 오류가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }
  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getMySurveys(@Param('username') username: string) {
    console.log(username)
    try {
      const surveys = await this.surveyService.getUserSurveys(username);
      return surveys;
    } catch (e) {
      if (e instanceof HttpException) {
        throw new HttpException(e.message, e.getStatus());
      } 
    }
  }
}