// import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Users } from 'src/entities/user.entity';
// import { Repository } from 'typeorm';
// import * as bcrypt from 'bcrypt';

// @Injectable()
// export class AuthService {
//   constructor(
//     @InjectRepository(Users)
//     private readonly userRepository: Repository<Users>,
//     private readonly jwtService: JwtService,
//   ) {}

//   async login(username, password) {
    
//     const user = await this.userRepository.findOne({ where: { username } });
//     if (!user) {
//       throw new NotFoundException('해당 유저가 없습니다.');
//     }

//     const isPasswordValidated: boolean = await bcrypt.compare(
//       password,
//       user.password,
//     );

//     if (!isPasswordValidated) {
//       throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
//     }

//     const payload = { username, sub: user.id };
//     return {
//       token: this.jwtService.sign(payload),
//     };
//   }

// }
