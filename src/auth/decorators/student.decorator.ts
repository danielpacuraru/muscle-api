import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { StudentGuard } from '../guards/student.guard';

export function Student() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseGuards(StudentGuard),
  );
}
