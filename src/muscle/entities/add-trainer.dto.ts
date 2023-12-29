import { IsNotEmpty, IsString, IsEmail, Matches, IsArray, ArrayNotEmpty } from 'class-validator';

export class AddTrainerDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please provide a valid email address' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'Please provide a valid 10-digit phone number' })
  phone: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  skills: string[];

}
