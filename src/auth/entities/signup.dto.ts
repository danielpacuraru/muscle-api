import { IsNotEmpty, IsString, IsBoolean, IsEmail, Matches, IsEnum } from 'class-validator';

import { Roles } from '../entities/roles.enum';

export class SignupDto {

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsBoolean()
  gender: boolean;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^\d{10}$/)
  phone: string;

  @IsNotEmpty()
  @IsEnum(Roles)
  role: Roles;

}
