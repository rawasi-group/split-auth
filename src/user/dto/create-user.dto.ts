import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { Gender } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @Expose()
  @ApiProperty()
  @IsPhoneNumber('EG')
  phone: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  gender: Gender;
  @ApiProperty()
  @IsString()
  nationality: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsEmail()
  email: string;
}
