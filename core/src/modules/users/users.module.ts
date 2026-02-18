import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { UserSession } from '../database/entities/user-session.entity';
import { UserController } from './controllers/user.controller';
import { UsersService } from './services/users.service';

@Module({
   imports: [
    TypeOrmModule.forFeature([User, UserSession])
  ],

  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule { }