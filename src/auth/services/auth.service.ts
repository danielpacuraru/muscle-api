import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';

import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { SignupDto } from '../entities/signup.dto';
import { TokenDto } from '../entities/token.dto';
import { Payload } from '../entities/payload.interface';
import { Roles } from '../entities/roles.enum';

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) { }

  public async createUser(signupDto: SignupDto): Promise<User> {
    const user: User = await this.userService.create(signupDto);

    if(!user) {
      throw new ConflictException();
    }

    return user;
  }

  public async validatePayload(payload: Payload): Promise<User> {
    const user: User = await this.userService.findById(payload.sub);

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  public async validateCredentials(phone: string, password: string): Promise<User> {
    const user: User = await this.userService.findByPhone(phone);

    if(!user || user.role === Roles.MEMBER) {
      await sleep(1000);
      throw new UnauthorizedException();
    }

    return user;
  }

  public async validateToken(token: string): Promise<User> {
    const tokenDto = new TokenDto();

    tokenDto.token = token;

    const errors = await validate(tokenDto);

    if(errors.length > 0) {
      await sleep(1000);
      throw new UnauthorizedException();
    }

    const user: User = await this.userService.findByToken(token);

    if(!user) {
      await sleep(1000);
      throw new UnauthorizedException();
    }

    // user.token = undefined;

    return await user.save();
  }

  public async signToken(user: User): Promise<string> {
    const payload: Payload = {
      sub: user._id.toString(),
      role: user.role
    };

    return this.jwtService.signAsync(payload);
  }

}
