import { Controller, Post, Get, Body } from '@nestjs/common';

import { Admin } from '../../auth/decorators/admin.decorator';
import { Member } from '../../auth/decorators/member.decorator';
import { GetUser } from '../../auth/decorators/get-user.decorator';
import { User } from '../../auth/schemas/user.schema';
import { LicenseService } from '../services/license.service';
import { License } from '../schemas/license.schema';
import { AddLicenseDto } from '../entities/add-license.dto';

@Controller('licenses')
export class LicenseController {

  constructor(
    private licenseService: LicenseService
  ) { }

  @Admin()
  @Post()
  async add(
    @Body() data: AddLicenseDto
  ): Promise<License> {
    const license: License = await this.licenseService.addLicense(data);
    return license;
  }

  @Member()
  @Get()
  async getAll(
    @GetUser() user: User,
  ): Promise<License[]> {
    const licenses: License[] = await this.licenseService.getActiveLicenses(user._id.toString());
    return licenses;
  }

}
