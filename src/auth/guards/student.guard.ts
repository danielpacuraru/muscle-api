import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

import { Roles } from '../entities/roles.enum';

@Injectable()
export class StudentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return user.role === Roles.MEMBER;
  }
}
