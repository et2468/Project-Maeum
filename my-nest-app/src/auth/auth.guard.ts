import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 사용자 인증을 위함
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
