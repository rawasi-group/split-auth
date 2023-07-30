import { PartialType } from '@nestjs/swagger';
import { CreateVerificationDto } from './create-Verification.dto';

export class UpdateVerificationDto extends PartialType(CreateVerificationDto) {}
