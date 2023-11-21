import { Body, Controller, Get, Delete, Res, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserSurveyService } from './user-suvey.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Survey } from 'src/entities/survey.entity';

@Controller('user-survey')
export class UserSurveyController {
  constructor(
    private readonly userSurveyService: UserSurveyService,
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Post(':userId')
  async writeSurvey(@Param('userId') userId: number, @Body() body: {survey: Survey} ,@Res() res) {
    try {
      const { survey } = body;
      await this.userSurveyService.writeSurvey(userId, survey)
      return res.status(HttpStatus.OK).json({
        message: "설문지가 작성되었습니다."
      })
    } catch (e) {
      console.log(e.message)
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  async getAllWritedSurvey(@Param('userId') userId: number, @Res() res) {
    try {
      const allWritrdSurvey = await this.userSurveyService.getAllWritedSurvey(userId)
      return res.status(HttpStatus.OK).json({
        allWritrdSurvey
      })
    } catch (e) {
      console.log(e)
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:userSurveyId')
  async getWritedSurvey(@Param('userSurveyId') userSurveyId: number, @Res() res) {
    try {
      const writedSurvey = await this.userSurveyService.getWritedSurvey(userSurveyId)
      return res.status(HttpStatus.OK).json({
        writedSurvey
      })
    } catch (e) {
      console.log(e)
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateWritedSurvey(@Body() body, @Res() res) {
    try {
      const { reWritedSurvey } = body;
      await this.userSurveyService.updateWritedSurvey(reWritedSurvey)
      return res.status(HttpStatus.OK).json({
        message: "설문지가 수정되었습니다."
      })
    } catch (e) {
      console.log(e.message)
      throw new HttpException(e.message, e.getStatus());
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':writedSuveyId')
  async deleteWritedSurvey(@Param('writedSuveyId') writedSuveyId: number, @Res() res) {
    try {
      await this.userSurveyService.deleteWritedSurvey(writedSuveyId)
      return res.status(HttpStatus.OK).json({
        message: "설문지가 삭제되었습니다."
      })
    } catch (e) {
      console.log(e.message)
      throw new HttpException(e.message, e.getStatus());
    }
  }
}