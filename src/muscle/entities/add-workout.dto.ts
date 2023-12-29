import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class AddWorkoutDto {

  @IsNotEmpty()
  @IsString()
  trainerName: string;

  @IsNotEmpty()
  @IsString()
  trainerSkill: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

}
