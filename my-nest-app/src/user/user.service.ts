import { Injectable, ConflictException } from '@nestjs/common';
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
      throw new ConflictException('이미 존재하는 사용자 이름입니다.');
    }
    
    const user = this.userRepository.create({ username, password });
    this.userRepository.save(user);
  }

  findAll(): Promise<Users[]> {
    return this.userRepository.find();
  }
}
