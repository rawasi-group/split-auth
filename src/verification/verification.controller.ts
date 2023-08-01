import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { UpdateVerificationDto } from './dto/update-verification.dto';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @Get()
  findAll() {
    return this.verificationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.verificationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVerificationDto: UpdateVerificationDto,
  ) {
    return this.verificationService.update(+id, updateVerificationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.verificationService.remove(+id);
  }
}
