import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './entities/user.entity';
import { UserModule } from './user/user.module';
import { Survey } from './entities/survey.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { UserAnswer } from './entities/user_answer.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'maeum',
      password: 'maeum',
      database: 'maeum',
      synchronize: true,
      entities: [Users, Survey, Question, Answer, UserAnswer],
    }),

    JwtModule.register({
      secret: 'maeum',
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}