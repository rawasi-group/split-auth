import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Verification } from '../verification/entities/verfication.entity';
import { VerificationService } from '../verification/verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  controllers: [UserController],
  providers: [UserService, VerificationService],
})
export class UserModule {}
