import { Controller, UseGuards, Post, Get, Param, Body } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { TokenAuthGuard } from '../../auth/guards/token-auth.guard';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SignupDto } from '../entities/signup.dto';
import { TokenDto } from '../entities/token.dto';
import { User } from '../schemas/user.schema';
import { GetUser } from '../decorators/get-user.decorator';
import { Admin } from '../decorators/admin.decorator';

@Controller()
export class AuthController {

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  @UseGuards(TokenAuthGuard)
  @Post('login')
  async login(
    @GetUser() user: User
  ) {
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: await this.authService.signToken(user)
    };
  }

  @Post('signup')
  async signup(
    @Body() signupDto: SignupDto
  ): Promise<User> {console.log(signupDto);
    const user: User = await this.authService.createUser(signupDto);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('token/:userId')
  async token(
    @GetUser() user: User,
    @Param('userId') userId: string
  ) {
    const token: string = await this.authService.invitationCode(userId, user.role);
    return { token };
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(
    @GetUser() user: User
  ) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: user.token,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  async user(
    @GetUser() user: User
  ) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      email: user.email,
      phone: user.phone,
      role: user.role,
      token: user.token,
    };
  }

  @Admin()
  @Get('users')
  async users(
  ) {
    const users: User[] = await this.userService.getUsers();
    const list = users.map(user => {
      return {
        _id: user._id.toString(),
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
      }
    });
    return list;
  }

}
