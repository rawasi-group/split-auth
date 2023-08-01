import { Injectable } from '@nestjs/common';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './entities/verfication.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private verificationRepo: Repository<Verification>,
  ) {}
  async create(user: User): Promise<boolean> {
    const code = Math.floor(100000 + Math.random() * 900000);
    const verification = new Verification();
    verification.code = code;
    verification.user_id = user.id;
    await this.verificationRepo.save(verification);
    return true;
  }

  findAll() {
    return `This action returns all verification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} verification`;
  }

  update(id: number, updateVerificationDto: UpdateVerificationDto) {
    console.info(updateVerificationDto);
    return `This action updates a #${id} verification`;
  }

  remove(id: number) {
    return `This action removes a #${id} verification`;
  }
}
