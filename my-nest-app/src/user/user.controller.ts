import { Body, Controller, Get, Post } from '@nestjs/common';
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
    this.userService.signup(username, hashedPassword);
    return '회원가입이 성공적으로 완료되었습니다.';
  }

  @Get()
  findAllUsers() {
    return this.userService.findAll();
  }
}