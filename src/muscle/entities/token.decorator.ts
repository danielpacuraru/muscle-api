import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

export function Token() {
  return applyDecorators(
    UseGuards(JwtAuthGuard)
  );
}
