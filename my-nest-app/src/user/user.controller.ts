import { Body, Controller, Get, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  
  @Post('signup')
  async signup(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await this.userService.signup(username, hashedPassword)
      return {
        statusCode: HttpStatus.CREATED,
        message: '회원가입이 성공적으로 완료되었습니다.',
      }
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }    
  }
  
}