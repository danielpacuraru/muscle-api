import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MemberGuard } from '../guards/member.guard';

export function Token() {
  return applyDecorators(
    UseGuards(JwtAuthGuard)
  );
}
