import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Verification } from '../verification/entities/verfication.entity';
import { VerificationService } from '../verification/verification.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtService, VerificationService],
})
export class AuthModule {}
