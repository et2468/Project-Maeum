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
      await this.userService.signup(username, hashedPassword);
    }
    catch (e) {
      if (e instanceof HttpException && e.getStatus() === HttpStatus.CONFLICT) {
        return {
          statusCode: HttpStatus.CONFLICT,
          message: '이미 존재하는 사용자 이름입니다.',
        };
      } else {
        console.error('회원가입 중 에러 발생:', e.message);
        return {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: '회원가입 중 에러가 발생했습니다.',
        };
      }
    }    

    return {
    statusCode: HttpStatus.CREATED,
    message: '회원가입이 성공적으로 완료되었습니다.',
    };

  }
  
}