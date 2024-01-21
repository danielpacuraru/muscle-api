import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UniqueTokenStrategy } from 'passport-unique-token';

import { AuthService } from '../services/auth.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class TokenStrategy extends PassportStrategy(UniqueTokenStrategy) {

  constructor(private authService: AuthService) {
    super({
      tokenField: 'token'
    });
  }

  async validate(token: string): Promise<User> {
    return await this.authService.validateToken(token);
  }

}
