import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}

  async signup(username: string, password: string){

    const existingUser = await this.userRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new HttpException('중복된 유저이름',HttpStatus.CONFLICT);
    }
    
    const user = this.userRepository.create({ username, password });
    this.userRepository.save(user);
  }
}
