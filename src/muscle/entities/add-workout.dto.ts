import { IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';

export class AddWorkoutDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  details?: string;

  @IsNotEmpty()
  @IsString()
  coach: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

}
