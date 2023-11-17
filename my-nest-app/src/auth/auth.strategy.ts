import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

// 실제로 JWT를 검증하고 사용자를 찾음
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: (req) => {
        const token = req.headers['x-access-token'] || req.headers.authorization;
        return token?.replace('Bearer ', ''); // 'Bearer ' 제거
      },
      secretOrKey: 'maeum',
    });
  }
  
  async validate(payload) {
    return { userId: payload.userId, username: payload.username };
  }
}
