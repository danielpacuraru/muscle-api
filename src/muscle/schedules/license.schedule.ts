import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { LicenseService } from '../services/license.service';

@Injectable()
export class LicenseSchedule {

  constructor(
    private licenseService: LicenseService
  ) { }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
    timeZone: 'Europe/Bucharest'
  })
  async checkStatus() {
    console.log('midnight');
    await this.licenseService.checkLicenseStatus();
  }

}
