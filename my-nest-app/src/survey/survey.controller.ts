import { Body, Controller, Get, Delete, Res, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { SurveyService } from './suvey.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createSurvey(@Body() body: { title: string, createrId: number }, @Res() res) {
    const { title, createrId } = body;
    try {
      const survey = await this.surveyService.createSurvey(title, createrId)
      return res.status(HttpStatus.OK).json({
        message: "설문지가 생성되었습니다."
      })
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllSurveys(@Res() res) {
    try {
      const surveys = await this.surveyService.getAllSurveys()
      return res.status(HttpStatus.OK).json({
        surveys
      })
    } catch (e) {
      throw new HttpException(e.message, e.getStatus())
    }

  }

  @UseGuards(JwtAuthGuard)
  @Get(':username')
  async getUserSurveys(@Param('username') username: string, @Res() res) {
    try {
      const createdSurveys = await this.surveyService.getUserSurveys(username)
      return res.status(HttpStatus.OK).json({
        createdSurveys
      })
    } catch (e) {
      console.log(e.message)
      throw new HttpException(e.message, e.getStatus())
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:surveyId')
  async getSurvey(@Param('surveyId') surveyId: number, @Res() res) {
    try {
      const survey = await this. surveyService.getSurveys(surveyId)
      return res.status(HttpStatus.OK).json({
        survey
      })
    } catch (e) {
      console.log(e.message)
      throw new HttpException(e.message, e.getStatus())
    }
  }


  @UseGuards(JwtAuthGuard)
  @Put(':surveyId')
  async updateSurveys(@Body() body: { title: string }, @Param('surveyId') surveyId: number,  @Res() res) {
    const { title } = body;
    try {
      const survey = await this.surveyService.updateSurveys(surveyId, title);
      return res.status(HttpStatus.OK).json({
        message: "설문지가 수정되었습니다."
      })
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':surveyId')
  async deleteSurvey(@Param('surveyId') surveyId: number,  @Res() res) {
    try {
      const survey = await this.surveyService.deleteSurveys(surveyId);
      return res.status(HttpStatus.OK).json({
        message: "설문지가 삭제 되었습니다."
      })
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }
}