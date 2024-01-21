import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth.service';
import { User } from '../schemas/user.schema';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    super({
      usernameField: 'phone',
      passwordField: 'password'
    });
  }

  async validate(phone: string, password: string): Promise<User> {
    return await this.authService.validateCredentials(phone, password);
  }

}
