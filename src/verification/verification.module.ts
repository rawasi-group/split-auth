import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Verification } from './entities/verfication.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification])],
  controllers: [VerificationController],
  providers: [VerificationService],
})
export class VerificationModule {}
