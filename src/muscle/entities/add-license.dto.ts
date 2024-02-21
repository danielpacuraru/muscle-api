import { IsInt, IsPositive, IsEnum, IsMongoId } from 'class-validator';

import { TimeUnit } from './time.utils';

export class AddLicenseDto {

  @IsInt()
  @IsPositive()
  entryCount: number;

  @IsInt()
  @IsPositive()
  durationValue: number;

  @IsEnum(TimeUnit)
  durationUnit: TimeUnit;

  @IsMongoId()
  user: string;

}
