import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/user.entity';
import { VerificationService } from '../verification/verification.service';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private verificationService: VerificationService,
  ) {}

  async create(createUserDto: CreateUserDto, client_id): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.nationality = createUserDto.nationality;
    user.password = createUserDto.password;
    user.gender = createUserDto.gender;
    user.phone = createUserDto.phone;
    user.email = createUserDto.email;
    user.client_id = client_id;

    const created_user = await this.userRepo.save(user);
    await this.verificationService.create(created_user);
    return created_user;
  }

  getUserByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  getUserById(id: number) {
    return this.userRepo.findOne({ where: { id } });
  }

  async validateUserByEmail(email: string) {
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  getUserByUserName(user_name: string) {
    return this.userRepo.findOne({ where: { user_name } });
  }

  async validateUserById(id: number) {
    const user = await this.getUserById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUser(username: string) {
    return (
      (await this.getUserByUserName(username)) ??
      (await this.getUserByEmail(username))
    );
  }

  async validateUserByUserName(username: string) {
    const user = await this.getUserByUserName(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.info(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
