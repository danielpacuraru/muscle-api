import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

import { LicenseService } from '../services/license.service';

@Injectable()
export class LicenseSchedule {

  constructor(
    private licenseService: LicenseService
  ) { }

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, {
  @Cron('42 22 * * *', {
    timeZone: 'Europe/Bucharest'
  })
  async checkStatus() {
    console.log('it is 22:42');
    await this.licenseService.checkLicenseStatus();
  }

}
