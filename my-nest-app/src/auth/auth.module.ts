import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { JwtAuthGuard } from './auth.guard';


@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    JwtModule.register({
      secret: 'maeum', // 토큰 서명을 위한 시크릿 키
      signOptions: { expiresIn: '1h' }, // 토큰 만료 시간
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [JwtModule, AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}