import { Controller, UseGuards, Post, Get, Body } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { TokenAuthGuard } from '../../auth/guards/token-auth.guard';
import { AuthService } from '../services/auth.service';
import { SignupDto } from '../entities/signup.dto';
import { TokenDto } from '../entities/token.dto';
import { User } from '../schemas/user.schema';
import { GetUser } from '../decorators/user.decorator';

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService
  ) { }

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto
  ): Promise<User> {
    const user: User = await this.authService.createUser(signupDto);
    return user;
  }

  @UseGuards(TokenAuthGuard)
  @Post('login')
  async login(
    @GetUser() user: User
  ) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      token: await this.authService.signToken(user)
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(
    @GetUser() user: User
  ) {
    return {
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
      phone: user.phone,
      role: user.role
    };
  }

}
