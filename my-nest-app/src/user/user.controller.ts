import { Body, Controller, Get, Res, HttpException, HttpStatus, Post } from '@nestjs/common';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  
  @Post('signup')
  async signup(@Body() body: { username: string; password: string }, @Res() res) {
    const { username, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await this.userService.signup(username, hashedPassword)
      return res.status(HttpStatus.CREATED).json({
        message: "회원가입이 완료되었습니다."
      })
        
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }    
  }
  
}