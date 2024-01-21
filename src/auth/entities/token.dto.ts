import { IsNotEmpty, IsString, Matches } from 'class-validator';

import { Roles } from '../entities/roles.enum';

export class TokenDto {

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}$/)
  token: string;

}
