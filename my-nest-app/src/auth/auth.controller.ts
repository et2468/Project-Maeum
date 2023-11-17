import { Controller, Post, Body, HttpException, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }, @Res() res) {
    const { username, password } = body;

    try {
      // 사용자 인증
      await this.authService.validateUser(username, password);
      const token = await this.authService.makeToken(username);
      res.header('X-ACCESS-TOKEN', `Bearer ${token.access_token}`);
      return res.status(HttpStatus.OK).json({
        message: '로그인 성공',
      });
    } catch (e) {
      throw new HttpException(e.message, e.getStatus());
    }
  }
}