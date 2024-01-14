import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserService } from '../services/user.service';
import { User } from '../schemas/user.schema';
import { SignupDto } from '../dtos/signup.dto';
import { MemberService } from '../../muscle/services/member.service';
import { Member } from '../../muscle/schemas/member.schema';

export interface Payload { sub: string; }

export const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

@Injectable()
export class AuthService {

  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private memberService: MemberService,
  ) { }

  public async createUser(signupDto: SignupDto): Promise<User> {
    const userExists: boolean = await this.userService.findByEmail(signupDto.email) !== null;

    if(userExists) {
      throw new ConflictException();
    }

    return this.userService.create(signupDto);
  }

  public async validateUserByCredentials(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findByEmail(email);

    if(!user || user.password !== await bcrypt.hash(password, user.salt)) {
      await sleep(2000);
      throw new UnauthorizedException();
    }

    return user;
  }

  public async generateToken(id: string): Promise<string> {
    const payload: Payload = {
      sub: id
    };

    return this.jwtService.sign(payload);
  }

  public async validateUserByPayload(payload: Payload): Promise<Member> {
    const userId: string = payload.sub;
    const user: Member | null = await this.memberService.getById(userId);

    if(!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

}
