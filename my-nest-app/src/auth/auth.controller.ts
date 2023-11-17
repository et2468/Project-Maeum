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

      // 로그인 성공 시 토큰 생성 및 반환
      const user = { username, userId: 1 }; // 이 부분을 실제 사용자 정보로 대체
      const token = await this.authService.login(user);

      res.header('X-ACCESS-TOKEN', `Bearer ${token.access_token}`);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: '로그인 성공',
      });
    } catch (error) {
      // 사용자 인증 실패 시 예외 처리
      if (error instanceof HttpException) {
        throw error;
      }
      // 기타 예외 발생 시 500 Internal Server Error 반환
      throw new HttpException('로그인 중 오류가 발생했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}