import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AddMemberDto {

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{10}$/)
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

}
