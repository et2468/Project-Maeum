import { Body, Controller, Get, HttpException, HttpStatus, Req, Post, UseGuards } from '@nestjs/common';
import { SurveyService } from './suvey.service';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('survey')
export class SurveyController {
  constructor(
    private readonly surveyService: SurveyService,
  ) {}

  @UseGuards()
  @Post()
  async createSurvey(@Body() body: { title: string }, @Req() request: Request) {
    const accessToken = request.headers['X-ACCESS-TOKEN'];
    console.log(accessToken)
    const { title } = body;
    try {
      await this.surveyService.createSurvey(title)
    } catch (e) {

    }
  }
}