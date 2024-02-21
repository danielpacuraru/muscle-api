import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { License, LicenseStatus } from '../schemas/license.schema';
import { UserService } from '../../auth/services/user.service';
import { AddLicenseDto } from '../entities/add-license.dto';
import { rightNow, calcExpireDate } from '../entities/time.utils';

@Injectable()
export class LicenseService {

  constructor(
    @InjectModel(License.name) private licenseModel: Model<License>,
    private userService: UserService
  ) { }

  async addLicense(data: AddLicenseDto): Promise<License> {
    const licenseData = {
      entryCount: data.entryCount,
      expireDate: calcExpireDate(data.durationValue, data.durationUnit),
      user: data.user
    }
    const license: License = await this.licenseModel.create(licenseData);
    console.log(license.entryCount);
    await this.userService.updatePass(data.user, data.entryCount);
    return license;
  }

  async getActiveLicenses(userId: string): Promise<License[]> {
    const x = rightNow();
    return await this.licenseModel.find({ status: LicenseStatus.ACTIVE, user: userId });
  }

  async checkLicenseStatus(): Promise<void> {
    const now = rightNow();
    const expiredLicenses = await this.licenseModel.find({ expireDate: { $lt: now } });

    for(const license of expiredLicenses) {
      license.status = LicenseStatus.EXPIRED;
      await license.save();
    }

    console.log('done');
  }

}
