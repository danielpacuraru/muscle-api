import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

import { AuthService, Payload } from '../services/auth.service';
import { User } from '../schemas/user.schema';
import { Member } from '../../muscle/schemas/member.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(private config: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
      ignoreExpiration: true
    });
  }

  async validate(payload: Payload): Promise<Member> {
    return this.authService.validateUserByPayload(payload);
  }

}
