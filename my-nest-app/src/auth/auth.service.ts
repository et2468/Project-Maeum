import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username, password) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new HttpException('해당 유저가 없습니다.', HttpStatus.NOT_FOUND);
    }

    const isPasswordValidated: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValidated) {
      throw new HttpException('비밀번호가 틀렸습니다.', HttpStatus.UNAUTHORIZED);
    }
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
