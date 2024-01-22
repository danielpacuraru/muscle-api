import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { AdminGuard } from '../guards/admin.guard';

export function Admin() {
  return applyDecorators(
    UseGuards(JwtAuthGuard),
    UseGuards(AdminGuard),
  );
}
